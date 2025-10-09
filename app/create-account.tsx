import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { criarUsuario } from '../services/storage';
import CPFInput from '../components/CPFInput';
import CustomInput from '../components/CustomInput';
import PasswordInput from '../components/PasswordInput';
import CustomAlert from '../components/CustomAlert';
import { useCustomAlert } from '../hooks/useCustomAlert';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import TextButton from '../components/TextButton';

export default function CreateAccountScreen() {
  const router = useRouter();
  const { alert, hideAlert, showSuccess, showError } = useCustomAlert();
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isNomeFocused, setIsNomeFocused] = useState(false);
  const [isCpfFocused, setIsCpfFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isSenhaFocused, setIsSenhaFocused] = useState(false);
  const [isConfirmarSenhaFocused, setIsConfirmarSenhaFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const validarNome = (nome: string): boolean => {
    const nomesTrimmed = nome.trim();
    const palavras = nomesTrimmed.split(' ').filter(p => p.length > 0);
    
    if (palavras.length < 2) {
      showError('Nome incompleto', 'Digite seu nome completo (nome e sobrenome)');
      return false;
    }

    if (palavras.some(p => p.length < 2)) {
      showError('Nome inválido', 'Cada parte do nome deve ter pelo menos 2 caracteres');
      return false;
    }

    return true;
  };

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

  const validarEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email.trim())) {
      showError('E-mail inválido', 'Digite um e-mail válido');
      return false;
    }

    return true;
  };

  const validarSenha = (senha: string): boolean => {
    if (senha.length < 6) {
      showError('Senha muito curta', 'A senha deve ter no mínimo 6 caracteres');
      return false;
    }

    return true;
  };

  const handleCriarConta = async () => {
    if (!nomeCompleto.trim() || !cpfCnpj.trim() || !email.trim() || !senha || !confirmarSenha) {
      showError('Campos obrigatórios', 'Preencha todos os campos para continuar');
      return;
    }

    if (!validarNome(nomeCompleto)) return;
    if (!validarCPF(cpfCnpj)) return;
    if (!validarEmail(email)) return;
    if (!validarSenha(senha)) return;

    if (senha !== confirmarSenha) {
      showError('Senhas não coincidem', 'As senhas digitadas não são iguais');
      return;
    }

    setLoading(true);

    const cpfLimpo = cpfCnpj.replace(/\D/g, '');

    const sucesso = await criarUsuario(nomeCompleto.trim(), cpfLimpo, email.trim().toLowerCase(), senha);

    if (sucesso) {
      showSuccess('Conta criada!', 'Sua conta foi criada com sucesso!', () => {
        router.replace({
          pathname: '/enter-account',
          params: {
            nome: nomeCompleto.trim(),
            cpf: cpfLimpo
          }
        });
      });
    } else {
      showError('Erro ao criar conta', 'CPF ou e-mail já cadastrado');
    }

    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white px-8">
        <ScreenHeader
          titulo="Criar sua conta"
          aoVoltar={() => router.back()}
        />

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 justify-between mt-5">
            <View>
              <CustomInput
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
                label="Nome Completo"
                placeholder="Seu nome completo"
                isFocused={isNomeFocused}
                onFocus={() => setIsNomeFocused(true)}
                onBlur={() => setIsNomeFocused(false)}
              />

              <CPFInput
                value={cpfCnpj}
                onChangeText={setCpfCnpj}
                label="CPF ou CNPJ"
                isFocused={isCpfFocused}
                onFocus={() => setIsCpfFocused(true)}
                onBlur={() => setIsCpfFocused(false)}
              />

              <CustomInput
                value={email}
                onChangeText={setEmail}
                label="E-mail"
                placeholder="seu@email.com"
                keyboardType="email-address"
                isFocused={isEmailFocused}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
              />

              <PasswordInput
                value={senha}
                onChangeText={setSenha}
                label="Senha"
                isFocused={isSenhaFocused}
                onFocus={() => setIsSenhaFocused(true)}
                onBlur={() => setIsSenhaFocused(false)}
              />

              <PasswordInput
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                label="Confirmar Senha"
                isFocused={isConfirmarSenhaFocused}
                onFocus={() => setIsConfirmarSenhaFocused(true)}
                onBlur={() => setIsConfirmarSenhaFocused(false)}
              />
            </View>

            <View className="pb-8 items-center mb-7 mt-5">
              <PrimaryButton
                texto={loading ? 'Criando...' : 'Criar Conta'}
                onPress={handleCriarConta}
                carregando={loading}
              />

              <TextButton
                texto="Já tenho uma conta"
                onPress={() => router.push('/login')}
              />
            </View>
          </View>
        </ScrollView>
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

