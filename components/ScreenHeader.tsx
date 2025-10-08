import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ScreenHeaderProps {
  titulo: string;
  aoVoltar: () => void;
}

export default function ScreenHeader({ titulo, aoVoltar }: ScreenHeaderProps) {
  return (
    <View className="pt-5 mb-8">
      <TouchableOpacity onPress={aoVoltar} className="mb-6">
        <Ionicons name="arrow-back-outline" size={28} color="#25384D" />
      </TouchableOpacity>
      <Text className="text-text-primary text-[22px]" style={{ fontFamily: 'Rubik_700Bold' }}>
        {titulo}
      </Text>
    </View>
  );
}

