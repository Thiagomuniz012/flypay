import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ActionCardProps {
  icone: keyof typeof Ionicons.glyphMap;
  rotulo: string;
  onPress?: () => void;
}

export default function ActionCard({ icone, rotulo, onPress }: ActionCardProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-1 bg-white rounded-2xl p-4 items-center justify-center border border-gray-200" 
      style={{ aspectRatio: 1 }}
    >
      <View className="items-center justify-center mb-2">
        <Ionicons name={icone} size={36} color="#25384D" />
      </View>
      <Text className="text-text-primary text-[12px] text-center" style={{ fontFamily: 'Rubik_400Regular' }} numberOfLines={1}>
        {rotulo}
      </Text>
    </TouchableOpacity>
  );
}

