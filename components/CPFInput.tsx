import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

interface CPFInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  isFocused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: any;
}

export default function CPFInput({
  value,
  onChangeText,
  placeholder = "000.000.000-00",
  label,
  isFocused = false,
  onFocus,
  onBlur,
  style
}: CPFInputProps) {
  const formatarCPF = (texto: string) => {
    const digitos = texto.replace(/[^0-9]/g, '');
    if (digitos.length <= 3) return digitos;
    if (digitos.length <= 6) return `${digitos.slice(0, 3)}.${digitos.slice(3)}`;
    if (digitos.length <= 9) return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6)}`;
    return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9, 11)}`;
  };

  const aoMudarTexto = (texto: string) => {
    const formatado = formatarCPF(texto);
    onChangeText(formatado);
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {label && (
        <Text style={{ 
          fontSize: 14, 
          color: (isFocused || value) ? '#04BF7B' : '#C1C7D0', 
          fontFamily: 'Rubik_600SemiBold',
          marginBottom: 18
        }}>
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={aoMudarTexto}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#B0B8C4"
        keyboardType="numeric"
        style={[{
          backgroundColor: (isFocused || value) ? '#FFFFFF' : '#F5F7FA',
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: 16,
          fontFamily: 'Rubik_400Regular',
          color: (isFocused || value) ? '#25384D' : '#B0B8C4',
          borderWidth: (isFocused || value) ? 2 : 0,
          borderColor: (isFocused || value) ? '#04BF7B' : 'transparent'
        }, style]}
      />
    </View>
  );
}
