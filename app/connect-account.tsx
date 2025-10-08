import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CPFInput from '../components/CPFInput';
import CustomInput from '../components/CustomInput';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';

export default function ConnectAccountScreen() {
  const router = useRouter();
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [nome, setNome] = useState('');
  const [isCpfFocused, setIsCpfFocused] = useState(false);
  const [isNomeFocused, setIsNomeFocused] = useState(false);
  const { alert, showError, hideAlert } = useCustomAlert();

  const handleEntrar = () => {
    const cpfLimpo = cpfCnpj.replace(/\D/g, '');
    
    if (!cpfLimpo) {
      showError('CPF/CNPJ obrigatório', 'Por favor, informe seu CPF ou CNPJ.');
      return;
    }

    if (cpfLimpo.length !== 11 && cpfLimpo.length !== 14) {
      showError('CPF/CNPJ inválido', 'Por favor, informe um CPF ou CNPJ válido.');
      return;
    }

    if (!nome.trim()) {
      showError('Nome obrigatório', 'Por favor, informe como deseja ser chamado.');
      return;
    }

    router.push({
      pathname: '/enter-account',
      params: { nome: nome.trim(), cpf: cpfLimpo }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white px-8">
        <View className="pt-5 mb-8">
          <TouchableOpacity onPress={() => router.back()} className="mb-6">
            <Ionicons name="arrow-back-outline" size={28} color="#25384D" />
          </TouchableOpacity>
          <Text className="text-text-primary text-[22px]" style={{ fontFamily: 'Rubik_700Bold' }}>
            Conectar-se a outra conta
          </Text>
        </View>

        <View className="flex-1 justify-between mt-14">
          <View>
            <CPFInput
              value={cpfCnpj}
              onChangeText={setCpfCnpj}
              label="CPF ou CNPJ"
              isFocused={isCpfFocused}
              onFocus={() => setIsCpfFocused(true)}
              onBlur={() => setIsCpfFocused(false)}
              style={{ marginBottom: 20 }}
            />

            <CustomInput
              value={nome}
              onChangeText={setNome}
              label="Como deseja ser chamado"
              placeholder="Seu nome"
              isFocused={isNomeFocused}
              onFocus={() => setIsNomeFocused(true)}
              onBlur={() => setIsNomeFocused(false)}
            />
          </View>

          <View className="pb-8 items-center mb-7">
            <TouchableOpacity 
              onPress={handleEntrar}
              className="bg-primary rounded-2xl w-[290px] h-[45px] items-center justify-center"
            >
              <Text className="text-white text-lg" style={{ fontFamily: 'Rubik_500Medium' }}>
                Salvar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <CustomAlert
        visible={alert.visible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={hideAlert}
      />
    </SafeAreaView>
  );
}

