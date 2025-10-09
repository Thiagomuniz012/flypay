import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { Usuario } from '../src/models/Usuario';

let db: SQLite.SQLiteDatabase | null = null;

const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('fizpay.db');
    
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nomeCompleto TEXT NOT NULL,
        cpf TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha TEXT NOT NULL
      );
    `);
  }
  return db;
};

export const inicializarDB = async (): Promise<void> => {
  try {
    await getDatabase();
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    throw error;
  }
};

export const criarUsuario = async (
  nomeCompleto: string,
  cpf: string,
  email: string,
  senha: string
): Promise<boolean> => {
  try {
    const database = await getDatabase();
    
    const senhaHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      senha
    );
    
    await database.runAsync(
      'INSERT INTO usuarios (nomeCompleto, cpf, email, senha) VALUES (?, ?, ?, ?)',
      [nomeCompleto, cpf, email, senhaHash]
    );
    
    return true;
  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      return false;
    }
    console.error('Erro ao criar usuário:', error);
    return false;
  }
};

export const autenticarUsuario = async (cpf: string, senha: string): Promise<Usuario | null> => {
  try {
    const database = await getDatabase();
    
    const usuario = await database.getFirstAsync<Usuario>(
      'SELECT * FROM usuarios WHERE cpf = ?',
      [cpf]
    );
    
    if (!usuario) {
      return null;
    }
    
    const senhaHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      senha
    );
    
    if (senhaHash !== usuario.senha) {
      return null;
    }
    
    return usuario;
  } catch (error) {
    console.error('Erro ao autenticar:', error);
    return null;
  }
};

export const salvarUsuarioLogado = async (usuario: Usuario): Promise<void> => {
  await AsyncStorage.setItem('@fizpay:usuario', JSON.stringify(usuario));
};

export const obterUsuarioLogado = async (): Promise<Usuario | null> => {
  const data = await AsyncStorage.getItem('@fizpay:usuario');
  return data ? JSON.parse(data) : null;
};

export const limparUsuarioLogado = async (): Promise<void> => {
  await AsyncStorage.removeItem('@fizpay:usuario');
};

export const obterTodosUsuariosDaStorage = async (): Promise<Usuario[]> => {
  try {
    const database = await getDatabase();
    
    const result = await database.getAllAsync<Usuario>('SELECT * FROM usuarios');
    return result;
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return [];
  }
};
