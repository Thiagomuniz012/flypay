import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackgroundProps {
  titulo: string;
  aoVoltar?: () => void;
  mostrarBotaoVoltar?: boolean;
  children: React.ReactNode;
}

export default function GradientBackground({ 
  titulo, 
  aoVoltar, 
  mostrarBotaoVoltar = true,
  children 
}: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={['#04BF7B', '#0396A6']}
      locations={[0.4, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="flex-1 overflow-hidden"
    >
      <View className="absolute -top-12 -right-8 w-[170px] h-[170px] rounded-[100px] bg-bg-white opacity-[0.15]" />
      <View className="absolute top-7 -right-20 w-[170px] h-[170px] rounded-[100px] bg-primary-teal opacity-[0.12]" />
      
      <SafeAreaView>
        <View className="px-10 pt-12">
          {mostrarBotaoVoltar && aoVoltar && (
            <TouchableOpacity className="mb-8" onPress={aoVoltar}>
              <Ionicons name="arrow-back-outline" size={28} color="white" />
            </TouchableOpacity>
          )}
          <Text className="text-white text-[32px] mb-9" style={{ fontFamily: 'Rubik_700Bold' }}>
            {titulo}
          </Text>
        </View>
      </SafeAreaView>

      {children}
    </LinearGradient>
  );
}

