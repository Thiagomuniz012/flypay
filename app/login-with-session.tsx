import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { obterTodosUsuariosDaStorage, salvarUsuarioLogado } from '../services/storage';
import { useAuth } from '../contexts/AuthContext';

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
    <LinearGradient
      colors={['#04BF7B', '#0396A6']}
      locations={[0.4, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="flex-1 overflow-hidden"
    >
      <View className="absolute -top-12 -right-8 w-[170px] h-[170px] rounded-[100px] bg-bg-white opacity-[0.15]" />
      
      <View className="absolute top-7 -right-20 w-[170px] h-[170px] rounded-[100px] bg-primary-teal opacity-[0.12]" />
      
      <SafeAreaView>
        <View className="px-10 pt-12">
          <TouchableOpacity className="mb-8" onPress={async () => {
            await logout();
            router.push('/login');
          }}>
            <Ionicons name="arrow-back-outline" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-[32px] mb-9" style={{ fontFamily: 'Rubik_700Bold' }}>
            Login
          </Text>
        </View>
      </SafeAreaView>

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

          <View className="mb-5">
            {loading ? (
              <View className="bg-white rounded-xl px-5 py-4 items-center">
                <Text className="text-base text-text-secondary" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Carregando contas...
                </Text>
              </View>
            ) : accounts.length === 0 ? (
              <View className="bg-white rounded-xl px-5 py-4 items-center">
                <Text className="text-base text-text-secondary text-center" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Nenhuma conta encontrada.{'\n'}Cadastre-se primeiro!
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-white px-5 py-4 flex-row items-center justify-between shadow-sm"
                style={{
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  borderBottomLeftRadius: isDropdownOpen ? 0 : 12,
                  borderBottomRightRadius: isDropdownOpen ? 0 : 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.02,
                  shadowRadius: 8,
                  elevation: 1
                }}
              >
                <View>
                  <Text className="text-[20px] text-text-primary mb-1" style={{ fontFamily: 'Rubik_600SemiBold' }}>
                    {selectedAccount?.name}
                  </Text>
                  <Text className="text-[16px] text-text-secondary" style={{ fontFamily: 'Rubik_400Regular' }}>
                    {selectedAccount?.cpf}
                  </Text>
                </View>
                <Ionicons 
                  name={isDropdownOpen ? 'chevron-up' : 'chevron-down'} 
                  size={24} 
                  color="#04BF7B" 
                />
              </TouchableOpacity>
            )}

            {isDropdownOpen && accounts.length > 0 && (
              <View 
                className="bg-white rounded-b-xl overflow-visible border-t-[0.5px] border-[#F0F0F0]"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.02,
                  shadowRadius: 8,
                  elevation: 1
                }}
              >
                {accounts
                  .filter(account => account.id !== selectedAccount?.id)
                  .map((account, index) => (
                    <TouchableOpacity
                      key={account.id}
                      onPress={() => {
                        setSelectedAccount(account);
                        setIsDropdownOpen(false);
                      }}
                      className="px-5 py-4 border-b-[0.5px] border-[#F0F0F0]"
                    >
                      <Text className="text-[18px] text-text-primary mb-1" style={{ fontFamily: 'Rubik_600SemiBold' }}>
                        {account.name}
                      </Text>
                      <Text className="text-[16px] text-text-secondary" style={{ fontFamily: 'Rubik_400Regular' }}>
                        {account.cpf}
                      </Text>
                    </TouchableOpacity>
                  ))
                }
                
                <TouchableOpacity
                  onPress={() => router.push('/connect-account')}
                  className="px-5 py-4 items-end"
                >
                  <Text className="text-[16px] text-primary" style={{ fontFamily: 'Rubik_500Medium' }}>
                    Acessar outra conta
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View className="pb-8 items-center -mt-14">
          <TouchableOpacity 
            onPress={handleEntrar}
            disabled={!selectedAccount || entrando}
            className="items-center justify-center rounded-2xl w-[290px] h-[45px] mb-6"
            style={{ 
              backgroundColor: (!selectedAccount || entrando) ? '#7A869A' : '#04BF7B'
            }}
          >
            <Text className="text-white text-lg" style={{ fontFamily: 'Rubik_500Medium' }}>
              {entrando ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center py-2">
            <Text className="text-primary text-lg" style={{ fontFamily: 'Rubik_500Medium' }}>
              Preciso de ajuda
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

