import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  isFocused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: any;
}

export default function PasswordInput({
  value,
  onChangeText,
  placeholder = "Digite sua senha",
  label,
  isFocused = false,
  onFocus,
  onBlur,
  style
}: PasswordInputProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text style={{ 
          fontSize: 16, 
          color: (isFocused || value) ? '#04BF7B' : '#C1C7D0', 
          fontFamily: 'Rubik_500Medium',
          marginBottom: 16
        }}>
          {label}
        </Text>
      )}
      <View style={{ position: 'relative' }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor="#B0B8C4"
          secureTextEntry={!mostrarSenha}
          style={[{
            backgroundColor: (isFocused || value) ? '#FFFFFF' : '#F5F7FA',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            paddingRight: 50,
            fontSize: 16,
            fontFamily: 'Rubik_400Regular',
            color: (isFocused || value) ? '#25384D' : '#B0B8C4',
            borderWidth: (isFocused || value) ? 2 : 0,
            borderColor: (isFocused || value) ? '#04BF7B' : 'transparent'
          }, style]}
        />
        <TouchableOpacity
          onPress={() => setMostrarSenha(!mostrarSenha)}
          style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: [{ translateY: -12 }]
          }}
        >
          <Ionicons
            name={mostrarSenha ? 'eye-off' : 'eye'}
            size={20}
            color="#B0B8C4"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
