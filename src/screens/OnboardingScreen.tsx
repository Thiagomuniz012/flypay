import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/types';

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="absolute top-6 left-6 z-10" style={{ width: 30, height: 30 }}>
        <Image 
          source={require('../../assets/logo-flypay.png')} 
          style={{ width: 30, height: 30 }}
          resizeMode="contain"
        />
      </View>

      <View className="flex-1 px-6" style={{ justifyContent: 'center', alignItems: 'center', marginTop: -40 }}>
        <Image 
          source={require('../../assets/onboarding-image.gif')} 
          style={{ width: 525, height: 330, marginBottom: 20 }}
          resizeMode="contain"
        />

        <View style={{ minHeight: 180 }}>
          <Text 
            className="text-center"
            style={{ fontSize: 24, color: '#25384D', marginBottom: 80, fontFamily: 'Rubik_700Bold' }}
          >
            A carteira digital feita para{'\n'}oferecer benefícios!
          </Text>
          <Text 
            className="text-center"
            style={{ fontSize: 16, color: '#7A869A66', fontFamily: 'Rubik_400Regular' }}
          >
            Acesse sua conta e aproveite todos{'\n'}os benefícios do <Text style={{ fontFamily: 'Rubik_700Bold' }}>FizPay</Text>.
          </Text>
        </View>
      </View>

      <View className="px-6 pb-4" style={{ paddingBottom: 30 }}>
        <View className="flex-row">
          <TouchableOpacity 
            className="flex-1 bg-green-500 py-4 rounded-lg items-center justify-center mr-3"
            style={{ backgroundColor: '#04BF7B' }}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Rubik_400Regular' }}>
              Entrar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex-row items-center justify-center py-4">
            <Text style={{ color: '#7A869A', fontSize: 16, fontFamily: 'Rubik_400Regular', marginRight: 8 }}>
              Abrir Conta
            </Text>
            <Ionicons name="arrow-forward" size={24} color="#7A869A" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
