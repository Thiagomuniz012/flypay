import React, { createContext, useContext, useState, useEffect } from 'react';
import { obterUsuarioLogado, limparUsuarioLogado } from '../services/storage';
import { Usuario } from '../src/models/Usuario';

interface AuthContextType {
  user: Usuario | null;
  setUser: (user: Usuario | null) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verificarUsuarioLogado();
  }, []);

  const verificarUsuarioLogado = async () => {
    try {
      const usuarioLogado = await obterUsuarioLogado();
      setUser(usuarioLogado);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await limparUsuarioLogado();
      setUser(null);
    } catch (error) {
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
