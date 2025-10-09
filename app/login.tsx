import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { autenticarUsuario, salvarUsuarioLogado } from '../services/storage';
import { useAuth } from '../contexts/AuthContext';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';
import CPFInput from '../components/CPFInput';
import PasswordInput from '../components/PasswordInput';
import GradientBackground from '../components/GradientBackground';
import PrimaryButton from '../components/PrimaryButton';
import TextButton from '../components/TextButton';
import BiometricPrompt from '../components/BiometricPrompt';

export default function LoginScreen() {
  const router = useRouter();
  const { setUser } = useAuth();
  const { alert, hideAlert, showSuccess, showError } = useCustomAlert();
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const [isCpfFocused, setIsCpfFocused] = useState(false);
  const [isSenhaFocused, setIsSenhaFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const validarCPF = (cpf: string): boolean => {
    const cpfLimpo = cpf.replace(/\D/g, '');
    
    if (cpfLimpo.length !== 11) {
      showError('CPF inválido', 'O CPF deve ter 11 dígitos');
      return false;
    }

    if (/^(\d)\1{10}$/.test(cpfLimpo)) {
      showError('CPF inválido', 'Digite um CPF válido');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!cpfCnpj.trim() || !senha) {
      showError('Campos obrigatórios', 'Preencha todos os campos para continuar');
      return;
    }

    if (!validarCPF(cpfCnpj)) {
      return;
    }

    setLoading(true);

    const cpfLimpo = cpfCnpj.replace(/\D/g, '');
    const usuario = await autenticarUsuario(cpfLimpo, senha);

    if (usuario) {
      await salvarUsuarioLogado(usuario);
      setUser(usuario);
      router.replace('/(tabs)/home');
    } else {
      setLoading(false);
      router.push('/login-not-found');
    }
  };

  return (
    <GradientBackground
      titulo="Login"
      aoVoltar={() => router.replace('/onboarding')}
    >
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
          <PrimaryButton
            texto={loading ? 'Entrando...' : 'Entrar'}
            onPress={handleLogin}
            carregando={loading}
            variant="dark"
          />

          <BiometricPrompt margemSuperior={24} margemInferior={24} />

          <TextButton
            texto="Preciso de ajuda"
            cor="cyan"
          />
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
    </GradientBackground>
  );
}