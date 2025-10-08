import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { obterTodosUsuariosDaStorage, salvarUsuarioLogado } from '../services/storage';
import { useAuth } from '../contexts/AuthContext';
import GradientBackground from '../components/GradientBackground';
import AccountDropdown from '../components/AccountDropdown';
import PrimaryButton from '../components/PrimaryButton';
import TextButton from '../components/TextButton';

interface Account {
  id: number;
  name: string;
  cpf: string;
}

export default function LoginWithSessionScreen() {
  const router = useRouter();
  const { setUser, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [entrando, setEntrando] = useState(false);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const usuarios = await obterTodosUsuariosDaStorage();
      const contasFormatadas: Account[] = usuarios.map(usuario => ({
        id: usuario.id,
        name: usuario.nomeCompleto.split(' ')[0],
        cpf: `CPF: ***.${usuario.cpf.slice(3, 6)}.${usuario.cpf.slice(6, 9)}-**`
      }));
      
      setAccounts(contasFormatadas);
      if (contasFormatadas.length > 0) {
        setSelectedAccount(contasFormatadas[0]);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEntrar = async () => {
    if (!selectedAccount) return;

    setEntrando(true);

    try {
      const usuarios = await obterTodosUsuariosDaStorage();
      const usuario = usuarios.find(u => u.id === selectedAccount.id);
      
      if (usuario) {
        await salvarUsuarioLogado(usuario);
        setUser(usuario);
        router.push('/home');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    } finally {
      setEntrando(false);
    }
  };

  return (
    <GradientBackground
      titulo="Login"
      aoVoltar={async () => {
        await logout();
        router.push('/login');
      }}
    >
      <View className="flex-1 bg-white rounded-t-3xl justify-between pt-8 px-8">
        <View>
          <View className="flex-row items-center mb-2">
            <Text className="text-3xl text-text-primary mr-2" style={{ fontFamily: 'Rubik_700Bold' }}>
              Bem-vindo de volta
            </Text>
            <Text className="text-2xl">👋</Text>
          </View>
          
          <Text className="text-lg text-text-secondary mb-8" style={{ fontFamily: 'Rubik_400Regular' }}>
            Olá, faça login para continuar!
          </Text>

          <AccountDropdown
            contas={accounts}
            contaSelecionada={selectedAccount}
            aoSelecionarConta={setSelectedAccount}
            carregando={loading}
            aberto={isDropdownOpen}
            aoAlternar={() => setIsDropdownOpen(!isDropdownOpen)}
            aoAdicionarConta={() => router.push('/connect-account')}
          />
        </View>

        <View className="pb-8 items-center -mt-14">
          <PrimaryButton
            texto={entrando ? 'Entrando...' : 'Entrar'}
            onPress={handleEntrar}
            disabled={!selectedAccount}
            carregando={entrando}
          />

          <TextButton
            texto="Preciso de ajuda"
          />
        </View>
      </View>
    </GradientBackground>
  );
}

