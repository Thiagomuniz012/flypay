import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/types';

export default function ConnectAccountScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [nome, setNome] = useState('');
  const [isCpfFocused, setIsCpfFocused] = useState(false);
  const [isNomeFocused, setIsNomeFocused] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 32 }}>
        <View style={{ paddingTop: 20, marginBottom: 32 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 24 }}>
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
          <View style={{ marginBottom: 40 }}>
            <Text style={{ 
              fontSize: 14, 
              color: (isCpfFocused || cpfCnpj) ? '#04BF7B' : '#C1C7D0', 
              fontFamily: 'Rubik_500Medium',
              marginBottom: 18
            }}>
              CPF ou CNPJ
            </Text>
            <TextInput
              value={cpfCnpj}
              onChangeText={setCpfCnpj}
              onFocus={() => setIsCpfFocused(true)}
              onBlur={() => setIsCpfFocused(false)}
              placeholder="000.000.000-00"
              placeholderTextColor="#B0B8C4"
              keyboardType="numeric"
              style={{
                backgroundColor: isCpfFocused ? '#FFFFFF' : '#F5F7FA',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 16,
                fontFamily: 'Rubik_400Regular',
                color: (isCpfFocused || cpfCnpj) ? '#25384D' : '#B0B8C4',
                borderWidth: isCpfFocused ? 2 : 0,
                borderColor: isCpfFocused ? '#04BF7B' : 'transparent'
              }}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 14, 
              color: (isNomeFocused || nome) ? '#04BF7B' : '#C1C7D0', 
              fontFamily: 'Rubik_500Medium',
              marginBottom: 18
            }}>
              Como deseja ser chamado
            </Text>
            <TextInput
              value={nome}
              onChangeText={setNome}
              onFocus={() => setIsNomeFocused(true)}
              onBlur={() => setIsNomeFocused(false)}
              placeholder="Seu nome"
              placeholderTextColor="#B0B8C4"
              style={{
                backgroundColor: isNomeFocused ? '#FFFFFF' : '#F5F7FA',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 16,
                fontFamily: 'Rubik_400Regular',
                color: (isNomeFocused || nome) ? '#25384D' : '#B0B8C4',
                borderWidth: isNomeFocused ? 2 : 0,
                borderColor: isNomeFocused ? '#04BF7B' : 'transparent'
              }}
            />
          </View>
        </View>

        <View style={{ paddingBottom: 32, alignItems: 'center', marginBottom: 28 }}>
          <TouchableOpacity 
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
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

