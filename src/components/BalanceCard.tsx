import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BalanceCardProps {
  titulo: string;
  valor: string;
  icone: keyof typeof Ionicons.glyphMap;
  corDeFundo: string;
  corIcone?: string;
}

export default function BalanceCard({ 
  titulo, 
  valor, 
  icone, 
  corDeFundo,
  corIcone = '#007D4F' 
}: BalanceCardProps) {
  const [mostrarSaldo, setMostrarSaldo] = useState(true);

  return (
    <View 
      className="flex-1 rounded-2xl min-h-[190px] p-5 overflow-hidden justify-between"
      style={{ backgroundColor: corDeFundo }}
    >
      <View>
        <Ionicons name={icone} size={36} color={corIcone} />
      </View>
      
      <View className="flex-1 justify-center">
        <Text className="text-white/90 text-[12px] mb-1.5" style={{ fontFamily: 'Rubik_400Regular' }}>
          {titulo}
        </Text>
        
        <Text className="text-white text-lg" style={{ fontFamily: 'Rubik_700Bold' }}>
          {mostrarSaldo ? valor : '•••••••'}
        </Text>
      </View>
      
      <TouchableOpacity 
        onPress={() => setMostrarSaldo(!mostrarSaldo)}
        className="self-start w-8 h-8 bg-white/15 rounded-lg items-center justify-center"
      >
        <Ionicons 
          name={mostrarSaldo ? 'eye' : 'eye-off'} 
          size={18} 
          color="white" 
        />
      </TouchableOpacity>
    </View>
  );
}

