import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import PasswordInput from '../components/PasswordInput';
import { autenticarUsuario, salvarUsuarioLogado } from '../services/storage';
import { useAuth } from '../contexts/AuthContext';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';
import ScreenHeader from '../components/ScreenHeader';
import UserAvatar from '../components/UserAvatar';
import BiometricPrompt from '../components/BiometricPrompt';
import PrimaryButton from '../components/PrimaryButton';

export default function EnterAccountScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setUser } = useAuth();
  const { alert, hideAlert, showSuccess, showError } = useCustomAlert();
  const [senha, setSenha] = useState('');
  const [isSenhaFocused, setIsSenhaFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const nomeUsuario = params.nome as string || 'Usuário';
  const cpfUsuario = params.cpf as string || '';

  const formatarCPF = (cpf: string) => {
    const numeros = cpf.replace(/\D/g, '');
    if (numeros.length === 11) {
      return `***.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-**`;
    }
    return cpf;
  };

  const handleEntrar = async () => {
    if (!senha) {
      showError('Senha obrigatória', 'Por favor, digite sua senha');
      return;
    }

    setLoading(true);

    const usuario = await autenticarUsuario(cpfUsuario, senha);

    if (usuario) {
      await salvarUsuarioLogado(usuario);
      setUser(usuario);
      router.replace('/home');
    } else {
      showError('Senha incorreta', 'A senha digitada está incorreta. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white px-8">
        <ScreenHeader
          titulo="Entre na sua conta"
          aoVoltar={() => router.back()}
        />

        <View className="flex-1 justify-between mt-8">
          <View>
            <View className="flex-row items-center mb-10">
              <UserAvatar tamanho="md" comBorda />
              <View>
                <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_600SemiBold' }}>
                  {nomeUsuario}
                </Text>
                <Text className="text-text-secondary text-sm" style={{ fontFamily: 'Rubik_400Regular' }}>
                  CPF: {formatarCPF(cpfUsuario)}
                </Text>
              </View>
            </View>

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

          <View className="pb-8 items-center mb-7 mt-5">
            <BiometricPrompt margemInferior={50} />

            <PrimaryButton
              texto={loading ? 'Entrando...' : 'Entrar'}
              onPress={handleEntrar}
              carregando={loading}
            />
          </View>
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
    </SafeAreaView>
  );
}