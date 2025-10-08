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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 32 }}>
        <View style={{ paddingTop: 20, marginBottom: 32 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 24 }}>
            <Ionicons name="arrow-back-outline" size={28} color="#25384D" />
          </TouchableOpacity>
          <Text 
            style={{ 
              color: '#25384D', 
              fontSize: 22, 
              fontFamily: 'Rubik_700Bold'
            }}
          >
            Conectar-se a outra conta
          </Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 60 }}>
        <View>
          <CPFInput
            value={cpfCnpj}
            onChangeText={setCpfCnpj}
            label="CPF ou CNPJ"
            isFocused={isCpfFocused}
            onFocus={() => setIsCpfFocused(true)}
            onBlur={() => setIsCpfFocused(false)}
            style={{ marginBottom: 40 }}
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

        <View style={{ paddingBottom: 32, alignItems: 'center', marginBottom: 28 }}>
          <TouchableOpacity 
            onPress={handleEntrar}
            style={{ 
              backgroundColor: '#04BF7B', 
              borderRadius: 16,
              width: 290,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center'
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

