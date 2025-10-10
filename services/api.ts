import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  retry?: number;
  retryDelay?: number;
  skipAuth?: boolean;
}

export interface ApiInterceptors {
  request?: (config: RequestInit) => Promise<RequestInit> | RequestInit;
  response?: (response: Response) => Promise<Response> | Response;
  error?: (error: ApiError) => Promise<ApiError> | ApiError;
}

export class ApiClient {
  private static instance: ApiClient;
  private baseURL: string;
  private defaultTimeout: number = 30000;
  private defaultRetry: number = 3;
  private interceptors: ApiInterceptors = {};
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheDuration: number = 5 * 60 * 1000;

  private constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  public static getInstance(baseURL?: string): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(baseURL || '');
    }
    if (baseURL && ApiClient.instance.baseURL !== baseURL) {
      ApiClient.instance.setBaseURL(baseURL);
    }
    return ApiClient.instance;
  }

  public setBaseURL(url: string): void {
    this.baseURL = url;
  }

  public setTimeout(timeout: number): void {
    this.defaultTimeout = timeout;
  }

  public registerInterceptors(interceptors: ApiInterceptors): void {
    this.interceptors = { ...this.interceptors, ...interceptors };
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error('Erro ao obter token:', error);
      return null;
    }
  }

  public async setAuthToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Erro ao salvar token:', error);
    }
  }

  public async clearAuthToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (error) {
      console.error('Erro ao remover token:', error);
    }
  }

  private async buildHeaders(
    customHeaders?: Record<string, string>,
    skipAuth: boolean = false
  ): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...customHeaders,
    };

    if (!skipAuth) {
      const token = await this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private getCacheKey(url: string, method: string, body?: any): string {
    return `${method}:${url}:${JSON.stringify(body || {})}`;
  }

  private getFromCache(cacheKey: string): any | null {
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data;
    }
    return null;
  }

  private setCache(cacheKey: string, data: any): void {
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
  }

  public clearCache(): void {
    this.cache.clear();
  }

  private createTimeoutController(timeout: number): {
    signal: AbortSignal;
    cleanup: () => void;
  } {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    return {
      signal: controller.signal,
      cleanup: () => clearTimeout(timeoutId),
    };
  }

  private async request<T = any>(
    method: string,
    endpoint: string,
    body?: any,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      headers: customHeaders,
      timeout = this.defaultTimeout,
      retry = this.defaultRetry,
      retryDelay = 1000,
      skipAuth = false,
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = this.getCacheKey(url, method, body);

    if (method === 'GET') {
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    let lastError: ApiError | null = null;

    for (let attempt = 0; attempt <= retry; attempt++) {
      try {
        const headers = await this.buildHeaders(customHeaders, skipAuth);
        const { signal, cleanup } = this.createTimeoutController(timeout);

        let requestConfig: RequestInit = {
          method,
          headers,
          signal,
        };

        if (body && method !== 'GET' && method !== 'HEAD') {
          requestConfig.body = JSON.stringify(body);
        }

        if (this.interceptors.request) {
          requestConfig = await this.interceptors.request(requestConfig);
        }

        const response = await fetch(url, requestConfig);
        cleanup();

        let finalResponse = response;
        if (this.interceptors.response) {
          finalResponse = await this.interceptors.response(response);
        }

        if (!finalResponse.ok) {
          const errorData = await this.parseErrorResponse(finalResponse);
          throw errorData;
        }

        const data = await this.parseResponse<T>(finalResponse);
        const apiResponse: ApiResponse<T> = {
          data,
          status: finalResponse.status,
          message: 'Success',
        };

        if (method === 'GET') {
          this.setCache(cacheKey, apiResponse);
        }

        return apiResponse;
      } catch (error: any) {
        lastError = this.handleError(error);

        if (lastError.status && lastError.status >= 400 && lastError.status < 500) {
          break;
        }

        if (attempt < retry) {
          await this.delay(retryDelay * (attempt + 1));
        }
      }
    }

    if (this.interceptors.error && lastError) {
      lastError = await this.interceptors.error(lastError);
    }

    throw lastError;
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      return await response.json();
    }

    const text = await response.text();
    return text as unknown as T;
  }

  private async parseErrorResponse(response: Response): Promise<ApiError> {
    try {
      const errorData = await response.json();
      return {
        message: errorData.message || 'Erro na requisição',
        status: response.status,
        code: errorData.code,
        details: errorData,
      };
    } catch {
      return {
        message: response.statusText || 'Erro desconhecido',
        status: response.status,
      };
    }
  }

  private handleError(error: any): ApiError {
    if (error.name === 'AbortError') {
      return {
        message: 'Tempo limite da requisição excedido',
        code: 'TIMEOUT',
      };
    }

    if (error.message === 'Network request failed') {
      return {
        message: 'Falha na conexão. Verifique sua internet.',
        code: 'NETWORK_ERROR',
      };
    }

    if (error.status) {
      return error;
    }

    return {
      message: error.message || 'Erro desconhecido',
      code: 'UNKNOWN_ERROR',
      details: error,
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async get<T = any>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, config);
  }

  public async post<T = any>(
    endpoint: string,
    body?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, body, config);
  }

  public async put<T = any>(
    endpoint: string,
    body?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, body, config);
  }

  public async patch<T = any>(
    endpoint: string,
    body?: any,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, body, config);
  }

  public async delete<T = any>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }

  public async uploadFile<T = any>(
    endpoint: string,
    file: {
      uri: string;
      name: string;
      type: string;
    },
    additionalData?: Record<string, any>,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();

    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any);

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    const headers = await this.buildHeaders(config?.headers, config?.skipAuth);
    delete headers['Content-Type'];

    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await this.parseErrorResponse(response);
      throw errorData;
    }

    const data = await this.parseResponse<T>(response);
    return {
      data,
      status: response.status,
      message: 'Upload realizado com sucesso',
    };
  }
}

export const api = ApiClient.getInstance();

export const configureApi = (baseURL: string) => {
  api.setBaseURL(baseURL);
};

