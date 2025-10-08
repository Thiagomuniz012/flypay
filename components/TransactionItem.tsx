import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TransactionItemProps {
  tipo: 'received' | 'sent' | 'card';
  titulo: string;
  subtitulo: string;
  valor: string;
  data: string;
  onPress?: () => void;
}

export default function TransactionItem({ 
  tipo, 
  titulo, 
  subtitulo, 
  valor, 
  data,
  onPress 
}: TransactionItemProps) {
  const getIconAndColor = () => {
    switch (tipo) {
      case 'received':
        return { icon: 'arrow-up' as const, color: '#47D187' };
      case 'sent':
        return { icon: 'arrow-down' as const, color: '#E14242' };
      case 'card':
        return { icon: 'card' as const, color: '#E14242' };
      default:
        return { icon: 'arrow-up' as const, color: '#47D187' };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <TouchableOpacity className="flex-row items-center py-4" onPress={onPress}>
      <View 
        className="w-14 h-14 rounded-xl items-center justify-center mr-4"
        style={{ backgroundColor: color }}
      >
        <Ionicons name={icon} size={32} color="white" />
      </View>
      
      <View className="flex-1">
        <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_400Regular' }}>
          {titulo}
        </Text>
        <Text className="text-gray-400 text-base" style={{ fontFamily: 'Rubik_400Regular' }}>
          {subtitulo}
        </Text>
      </View>
      
      <View className="items-end">
        <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_500Medium' }}>
          {valor}
        </Text>
        <Text className="text-gray-400 text-sm" style={{ fontFamily: 'Rubik_400Regular' }}>
          {data}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

