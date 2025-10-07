import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/types';

interface Account {
  name: string;
  cpf: string;
}

export default function LoginWithSessionScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account>({
    name: 'Rafa',
    cpf: 'CPF: ***.091.000-**'
  });
  
  const accounts: Account[] = [
    { name: 'Rafa', cpf: 'CPF: ***.091.000-**' },
    { name: 'Maria', cpf: 'CPF: ***.091.000-**' }
  ];

  return (
    <LinearGradient
      colors={['#04BF7B', '#0396A6']}
      locations={[0.4, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1, overflow: 'hidden' }}
    >
      <View 
        style={{ 
          position: 'absolute',
          top: -50,
          right: -30,
          width: 170,
          height: 170,
          borderRadius: 100,
          backgroundColor: '#F9F9F9',
          opacity: 0.15
        }} 
      />
      
      <View 
        style={{ 
          position: 'absolute',
          top: 28,
          right: -80,
          width: 170,
          height: 170,
          borderRadius: 100,
          backgroundColor: '#01DDC3',
          opacity: 0.12
        }} 
      />
      
      <SafeAreaView>
        <View className="px-10" style={{ paddingTop: 50 }}>
          <TouchableOpacity className="mb-8" onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={28} color="white" />
          </TouchableOpacity>
          <Text 
            style={{ 
              color: 'white', 
              fontSize: 28, 
              fontFamily: 'Rubik_700Bold',
              marginBottom:36
            }}
          >
            Login
          </Text>
        </View>
      </SafeAreaView>

      <View 
        className="flex-1" 
        style={{ 
          backgroundColor: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          justifyContent: 'space-between', 
          paddingTop: 34,
          paddingHorizontal: 32
        }}
      >
        <View>
          <View className="flex-row items-center mb-2">
            <Text 
              style={{ 
                fontSize: 26, 
                color: '#25384D', 
                fontFamily: 'Rubik_700Bold',
                marginRight: 8
              }}
            >
              Bem-vindo de volta
            </Text>
            <Text style={{ fontSize: 24 }}>👋</Text>
          </View>
          
          <Text 
            style={{ 
              fontSize: 16, 
              color: '#7A869A', 
              fontFamily: 'Rubik_400Regular',
              marginBottom: 32
            }}
          >
            Selecione uma conta para continuar
          </Text>

          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: isDropdownOpen ? 0 : 12,
                borderBottomRightRadius: isDropdownOpen ? 0 : 12,
                paddingHorizontal: 20,
                paddingVertical: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.02,
                shadowRadius: 8,
                elevation: 1
              }}
            >
              <View>
                <Text style={{ 
                  fontSize: 18, 
                  color: '#25384D', 
                  fontFamily: 'Rubik_600SemiBold',
                  marginBottom: 4
                }}>
                  {selectedAccount.name}
                </Text>
                <Text style={{ 
                  fontSize: 14, 
                  color: '#7A869A', 
                  fontFamily: 'Rubik_400Regular'
                }}>
                  {selectedAccount.cpf}
                </Text>
              </View>
              <Ionicons 
                name={isDropdownOpen ? 'chevron-up' : 'chevron-down'} 
                size={24} 
                color="#04BF7B" 
              />
            </TouchableOpacity>

            {isDropdownOpen && (
              <View style={{ 
                backgroundColor: '#FFFFFF',
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                overflow: 'visible',
                borderTopWidth: 0.5,
                borderTopColor: '#F0F0F0',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.02,
                shadowRadius: 8,
                elevation: 1
              }}>
                {accounts
                  .filter(account => account.name !== selectedAccount.name)
                  .map((account, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setSelectedAccount(account);
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 16,
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#F0F0F0'
                      }}
                    >
                      <Text style={{ 
                        fontSize: 18, 
                        color: '#25384D', 
                        fontFamily: 'Rubik_600SemiBold',
                        marginBottom: 4
                      }}>
                        {account.name}
                      </Text>
                      <Text style={{ 
                        fontSize: 14, 
                        color: '#7A869A', 
                        fontFamily: 'Rubik_400Regular'
                      }}>
                        {account.cpf}
                      </Text>
                    </TouchableOpacity>
                  ))
                }
                
                <TouchableOpacity
                  onPress={() => navigation.navigate('ConnectAccount')}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 16,
                    alignItems: 'flex-end'
                  }}
                >
                  <Text style={{ 
                    fontSize: 14, 
                    color: '#04BF7B', 
                    fontFamily: 'Rubik_500Medium'
                  }}>
                    Acessar outra conta
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        <View className="pb-8" style={{ alignItems: 'center', marginTop: -60 }}>
          <TouchableOpacity 
            className="items-center justify-center"
            style={{ 
              backgroundColor: '#04BF7B', 
              borderRadius: 16,
              width: 290,
              height: 45,
              marginBottom: 24
            }}
          >
            <Text style={{ 
              color: 'white', 
              fontSize: 16, 
              fontFamily: 'Rubik_500Medium' 
            }}>
              Entrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center py-2">
            <Text style={{ 
              color: '#04BF7B', 
              fontSize: 16, 
              fontFamily: 'Rubik_500Medium' 
            }}>
              Preciso de ajuda
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

