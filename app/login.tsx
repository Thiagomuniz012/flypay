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
      className="flex-1 overflow-hidden"
    >
      <View className="absolute -top-12 -right-8 w-[170px] h-[170px] rounded-[100px] bg-bg-white opacity-[0.15]" />
      
      <View className="absolute top-7 -right-20 w-[170px] h-[170px] rounded-[100px] bg-primary-teal opacity-[0.12]" />
      
      <SafeAreaView>
        <View className="px-10 pt-12">
          <TouchableOpacity className="mb-8" onPress={() => router.replace('/onboarding')}>
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
          
          <Text className="text-lg text-text-secondary mb-5" style={{ fontFamily: 'Rubik_400Regular' }}>
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
            
          <TouchableOpacity className="self-start">
            <Text className="text-text-primary text-base" style={{ fontFamily: 'Rubik_500Medium' }}>
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>
        </View>

        <View className="pb-8 items-center mt-5">
          <TouchableOpacity 
            onPress={handleLogin}
            disabled={loading}
            className="items-center justify-center bg-text-primary rounded-2xl w-[290px] h-[45px] mb-14"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            <Text className="text-white text-lg" style={{ fontFamily: 'Rubik_500Medium' }}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <View className="items-center mb-4">
            <Ionicons name="finger-print" size={32} color="#7A869A66" />
            <Text className="text-text-secondary/40 text-[16px] text-center mt-2 mb-5" style={{ fontFamily: 'Rubik_400Regular' }}>
              Toque no sensor{'\n'}para entrar com sua biometria
            </Text>
          </View>

          <TouchableOpacity className="items-center py-2">
            <Text className="text-primary-cyan text-lg" style={{ fontFamily: 'Rubik_500Medium' }}>
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