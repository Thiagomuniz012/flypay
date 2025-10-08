import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface CustomInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  isFocused?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  style?: any;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function CustomInput({
  value,
  onChangeText,
  placeholder,
  label,
  isFocused = false,
  onFocus,
  onBlur,
  keyboardType = 'default',
  secureTextEntry = false,
  style,
  multiline = false,
  numberOfLines = 1
}: CustomInputProps) {
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
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="#B0B8C4"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[{
          backgroundColor: (isFocused || value) ? '#FFFFFF' : '#F5F7FA',
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontSize: 16,
          fontFamily: 'Rubik_400Regular',
          color: (isFocused || value) ? '#25384D' : '#B0B8C4',
          borderWidth: (isFocused || value) ? 2 : 0,
          borderColor: (isFocused || value) ? '#04BF7B' : 'transparent',
          textAlignVertical: multiline ? 'top' : 'center'
        }, style]}
      />
    </View>
  );
}
