import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CPFInput from '../components/CPFInput';
import CustomInput from '../components/CustomInput';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';

export default function ConnectAccountScreen() {
  const router = useRouter();
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [nome, setNome] = useState('');
  const [isCpfFocused, setIsCpfFocused] = useState(false);
  const [isNomeFocused, setIsNomeFocused] = useState(false);
  const { alert, showError, hideAlert } = useCustomAlert();

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

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) {
      showError('CPF inválido', 'Digite um CPF válido');
      return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(10, 11))) {
      showError('CPF inválido', 'Digite um CPF válido');
      return false;
    }

    return true;
  };

  const handleEntrar = () => {
    if (!cpfCnpj.trim()) {
      showError('CPF obrigatório', 'Por favor, informe seu CPF.');
      return;
    }

    if (!validarCPF(cpfCnpj)) {
      return;
    }

    if (!nome.trim()) {
      showError('Nome obrigatório', 'Por favor, informe como deseja ser chamado.');
      return;
    }

    if (nome.trim().length < 2) {
      showError('Nome muito curto', 'Digite um nome com pelo menos 2 caracteres');
      return;
    }

    const cpfLimpo = cpfCnpj.replace(/\D/g, '');

    router.push({
      pathname: '/enter-account',
      params: { nome: nome.trim(), cpf: cpfLimpo }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white px-8">
        <ScreenHeader
          titulo="Conectar-se a outra conta"
          aoVoltar={() => router.back()}
        />

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
            <PrimaryButton
              texto="Salvar"
              onPress={handleEntrar}
            />
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

