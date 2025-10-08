import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import PasswordInput from '../components/PasswordInput';
import { autenticarUsuario, salvarUsuarioLogado } from '../services/storage';
import { useAuth } from '../contexts/AuthContext';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';

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
        <View className="pt-5 mb-8">
          <TouchableOpacity onPress={() => router.back()} className="mb-6">
            <Ionicons name="arrow-back-outline" size={28} color="#25384D" />
          </TouchableOpacity>
          <Text className="text-text-primary text-[22px]" style={{ fontFamily: 'Rubik_700Bold' }}>
            Entre na sua conta
          </Text>
        </View>

        <View className="flex-1 justify-between mt-8">
          <View>
            <View className="flex-row items-center mb-10">
              <View className="w-16 h-16 rounded-full border-[3px] border-primary mr-4 bg-border-light items-center justify-center">
                <Ionicons name="person" size={32} color="#04BF7B" />
              </View>
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
            <View className="items-center mb-4">
              <Ionicons name="finger-print" size={32} color="#7A869A66" />
              <Text className="text-text-secondary/40 text-[14px] text-center mt-2 mb-14" style={{ fontFamily: 'Rubik_400Regular' }}>
                Toque no sensor{'\n'}para entrar com sua biometria
              </Text>
            </View>

            <TouchableOpacity 
              onPress={handleEntrar}
              disabled={loading}
              className="bg-primary rounded-2xl w-[290px] h-[45px] items-center justify-center"
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              <Text className="text-white text-lg" style={{ fontFamily: 'Rubik_500Medium' }}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>
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