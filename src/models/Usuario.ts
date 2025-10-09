export interface Usuario {
  id: number;
  nomeCompleto: string;
  cpf: string;
  email: string;
  senha: string;
}

export interface UsuarioSemSenha {
  id: number;
  nomeCompleto: string;
  cpf: string;
  email: string;
}

export const removerSenhaDoUsuario = (usuario: Usuario): UsuarioSemSenha => {
  const { senha, ...usuarioSemSenha } = usuario;
  return usuarioSemSenha;
};

export const formatarNomeUsuario = (nomeCompleto: string): string => {
  return nomeCompleto.split(' ')[0];
};

export const formatarCPFParaExibicao = (cpf: string, formato: 'completo' | 'parcial' = 'parcial'): string => {
  const numeros = cpf.replace(/\D/g, '');
  
  if (formato === 'completo') {
    if (numeros.length === 11) {
      return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9, 11)}`;
    }
    return cpf;
  }
  
  if (numeros.length === 11) {
    return `***.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-**`;
  }
  return cpf;
};

