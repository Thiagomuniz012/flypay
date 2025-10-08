import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { autenticarUsuario, salvarUsuarioLogado } from '../services/storage';
import { useAuth } from '../contexts/AuthContext';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';
import CPFInput from '../components/CPFInput';
import PasswordInput from '../components/PasswordInput';

export default function LoginScreen() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { alert, hideAlert, showSuccess, showError } = useCustomAlert();
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const [isCpfFocused, setIsCpfFocused] = useState(false);
  const [isSenhaFocused, setIsSenhaFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!cpfCnpj || !senha) {
      showError('Campos obrigatórios', 'Preencha todos os campos para continuar');
      return;
    }

    setLoading(true);

    const cpfLimpo = cpfCnpj.replace(/\D/g, '');
    const usuario = await autenticarUsuario(cpfLimpo, senha);

    if (usuario) {
      await salvarUsuarioLogado(usuario);
      setUser(usuario);
      router.replace('/home');
    } else {
      setLoading(false);
      router.push('/login-not-found');
    }
  };

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
          <TouchableOpacity className="mb-8" onPress={() => router.replace('/onboarding')}>
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
                fontSize: 24, 
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
              marginBottom: 16
            }}
          >
            Olá, faça login para continuar!
          </Text>

          <CPFInput
            value={cpfCnpj}
            onChangeText={setCpfCnpj}
            label="CPF ou CNPJ"
            isFocused={isCpfFocused}
            onFocus={() => setIsCpfFocused(true)}
            onBlur={() => setIsCpfFocused(false)}
          />

          <PasswordInput
            value={senha}
            onChangeText={setSenha}
            label="Senha"
            isFocused={isSenhaFocused}
            onFocus={() => setIsSenhaFocused(true)}
            onBlur={() => setIsSenhaFocused(false)}
          />
            
          <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
            <Text style={{ 
              color: '#25384D', 
              fontSize: 14, 
              fontFamily: 'Rubik_500Medium' 
            }}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>

        <View className="pb-8" style={{ alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity 
            onPress={handleLogin}
            disabled={loading}
            className="items-center justify-center"
            style={{ 
              backgroundColor: '#25384D', 
              borderRadius: 16,
              width: 290,
              height: 45,
              marginBottom: 20,
              opacity: loading ? 0.7 : 1
            }}
          >
            <Text style={{ 
              color: 'white', 
              fontSize: 16, 
              fontFamily: 'Rubik_500Medium' 
            }}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <View style={{ alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="finger-print" size={32} color="#7A869A66" />
            <Text style={{ 
              color: '#7A869A66', 
              fontSize: 12, 
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
      
      <CustomAlert
        visible={alert.visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={hideAlert}
        onConfirm={alert.onConfirm}
        confirmText={alert.confirmText}
        showCancel={alert.showCancel}
      />
    </LinearGradient>
  );
}