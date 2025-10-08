import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BiometricPromptProps {
  margemSuperior?: number;
  margemInferior?: number;
}

export default function BiometricPrompt({ 
  margemSuperior = 24, 
  margemInferior = 24 
}: BiometricPromptProps) {
  return (
    <View className="items-center" style={{ marginTop: margemSuperior, marginBottom: margemInferior }}>
      <Ionicons name="finger-print" size={32} color="#7A869A66" />
      <Text className="text-text-secondary/40 text-[14px] text-center mt-2" style={{ fontFamily: 'Rubik_400Regular' }}>
        Toque no sensor{'\n'}para entrar com sua biometria
      </Text>
    </View>
  );
}

