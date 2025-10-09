import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';

export default function CashbackScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="px-8">
          <ScreenHeader
            titulo="Cashback"
            aoVoltar={() => router.replace('/(tabs)/home')}
          />
        </View>

        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 items-center justify-center px-8 py-12">
            <View className="w-32 h-32 rounded-full bg-bg-light items-center justify-center mb-8">
              <Ionicons name="gift" size={64} color="#04BF7B" />
            </View>

            <Text className="text-text-primary text-2xl text-center mb-4" style={{ fontFamily: 'Rubik_700Bold' }}>
              Em Breve
            </Text>

            <Text className="text-text-secondary text-lg text-center leading-6" style={{ fontFamily: 'Rubik_400Regular' }}>
              A funcionalidade de Cashback{'\n'}será desenvolvida em breve.{'\n\n'}
              Fique atento às novidades!
            </Text>

            <View className="mt-12 w-full max-w-sm">
              <View className="flex-row items-center mb-4 bg-bg-light rounded-xl p-4">
                <Ionicons name="sparkles" size={24} color="#04BF7B" />
                <Text className="text-text-secondary text-sm ml-3 flex-1" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Ganhe cashback em suas compras
                </Text>
              </View>

              <View className="flex-row items-center mb-4 bg-bg-light rounded-xl p-4">
                <Ionicons name="card" size={24} color="#04BF7B" />
                <Text className="text-text-secondary text-sm ml-3 flex-1" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Acumule pontos e troque por prêmios
                </Text>
              </View>

              <View className="flex-row items-center bg-bg-light rounded-xl p-4">
                <Ionicons name="trophy" size={24} color="#04BF7B" />
                <Text className="text-text-secondary text-sm ml-3 flex-1" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Benefícios exclusivos para você
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

