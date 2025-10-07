import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/types';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCpfFocused, setIsCpfFocused] = useState(false);
  const [isSenhaFocused, setIsSenhaFocused] = useState(false);

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
            Olá, faça login para continuar!
          </Text>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 14, 
              color: (isCpfFocused || cpfCnpj) ? '#04BF7B' : '#C1C7D0', 
              fontFamily: 'Rubik_600SemiBold',
              marginBottom: 18
            }}>
              CPF ou CNPJ
            </Text>
            <TextInput
              value={cpfCnpj}
              onChangeText={setCpfCnpj}
              onFocus={() => setIsCpfFocused(true)}
              onBlur={() => setIsCpfFocused(false)}
              placeholder="000.000.000-00"
              placeholderTextColor="#B0B8C4"
              keyboardType="numeric"
              style={{
                backgroundColor: isCpfFocused ? '#FFFFFF' : '#F5F7FA',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 16,
                fontFamily: 'Rubik_400Regular',
                color: (isCpfFocused || cpfCnpj) ? '#25384D' : '#B0B8C4',
                borderWidth: isCpfFocused ? 2 : 0,
                borderColor: isCpfFocused ? '#04BF7B' : 'transparent'
              }}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 14, 
              color: (isSenhaFocused || senha) ? '#04BF7B' : '#C1C7D0', 
              fontFamily: 'Rubik_600SemiBold',
              marginBottom: 18
            }}>
              Senha
            </Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                value={senha}
                onChangeText={setSenha}
                onFocus={() => setIsSenhaFocused(true)}
                onBlur={() => setIsSenhaFocused(false)}
                placeholder="********"
                placeholderTextColor="#B0B8C4"
                secureTextEntry={!showPassword}
                style={{
                  backgroundColor: isSenhaFocused ? '#FFFFFF' : '#F5F7FA',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontSize: 16,
                  fontFamily: 'Rubik_400Regular',
                  color: (isSenhaFocused || senha) ? '#25384D' : '#B0B8C4',
                  paddingRight: 48,
                  borderWidth: isSenhaFocused ? 2 : 0,
                  borderColor: isSenhaFocused ? '#04BF7B' : 'transparent'
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 16,
                  top: 14,
                }}
              >
                <Ionicons 
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
                  size={20} 
                  color="#7A869A" 
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={{ alignSelf: 'flex-start', marginTop: 13 }}>
              <Text style={{ 
                color: '#25384D', 
                fontSize: 14, 
                fontFamily: 'Rubik_500Medium' 
              }}>
                Esqueceu a senha?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="pb-8" style={{ alignItems: 'center', marginTop: -60 }}>
          <TouchableOpacity 
            className="items-center justify-center"
            style={{ 
              backgroundColor: '#25384D', 
              borderRadius: 16,
              width: 290,
              height: 45,
              marginBottom: 70
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

          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="finger-print" size={40} color="#7A869A66" />
            <Text style={{ 
              color: '#7A869A66', 
              fontSize: 16, 
              fontFamily: 'Rubik_400Regular',
              textAlign: 'center',
              marginTop: 8,
              marginBottom: 16
            }}>
              Toque no sensor{'\n'}para entrar com sua biometria
            </Text>
          </View>

          <TouchableOpacity className="items-center py-2">
            <Text style={{ 
              color: '#0396A6', 
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

