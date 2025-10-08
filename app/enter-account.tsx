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
            Entre na sua conta
          </Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 32 }}>
          <View>
            <View 
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
                marginBottom: 40
              }}
            >
              <View 
                style={{ 
                  width: 64, 
                  height: 64, 
                  borderRadius: 40,
                  borderWidth: 3,
                  borderColor: '#04BF7B',
                  marginRight: 16,
                  backgroundColor: '#F5F7FA',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons name="person" size={32} color="#04BF7B" />
              </View>
              <View>
                <Text style={{ 
                  color: '#25384D', 
                  fontSize: 18, 
                  fontFamily: 'Rubik_600SemiBold',
                  marginBottom: 4
                }}>
                  {nomeUsuario}
                </Text>
                <Text style={{ 
                  color: '#7A869A', 
                  fontSize: 14, 
                  fontFamily: 'Rubik_400Regular'
                }}>
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

          <View style={{ paddingBottom: 32, alignItems: 'center', marginBottom: 28, marginTop: 20 }}>
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

            <TouchableOpacity 
              onPress={handleEntrar}
              disabled={loading}
              style={{ 
                backgroundColor: '#04BF7B', 
                borderRadius: 16,
                width: 290,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
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