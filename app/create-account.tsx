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

  const handleCriarConta = async () => {
    if (!nomeCompleto || !cpfCnpj || !email || !senha || !confirmarSenha) {
      showError('Campos obrigatórios', 'Preencha todos os campos para continuar');
      return;
    }

    if (senha !== confirmarSenha) {
      showError('Senhas não coincidem', 'As senhas digitadas não são iguais');
      return;
    }

    setLoading(true);

    const cpfLimpo = cpfCnpj.replace(/\D/g, '');

    const sucesso = await criarUsuario(nomeCompleto, cpfLimpo, email, senha);

    if (sucesso) {
      showSuccess('Conta criada!', 'Sua conta foi criada com sucesso!', () => {
        router.replace({
          pathname: '/enter-account',
          params: {
            nome: nomeCompleto,
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

