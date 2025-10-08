import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const translateX = useState(new Animated.Value(0))[0];

  const handlePressIn = () => {
    setIsHovered(true);
    Animated.timing(translateX, {
      toValue: 4,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsHovered(false);
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="absolute top-20 left-6 z-10 w-10 h-10">
        <Image 
          source={require('../assets/logo-flypay.png')} 
          className="w-10 h-10"
          resizeMode="contain"
        />
      </View>

      <View className="flex-1 px-6 justify-center items-center -mt-10">
        <Image 
          source={require('../assets/onboarding-image.gif')} 
          className="mb-5"
          style={{ width: 525, height: 330 }}
          resizeMode="contain"
        />

        <View className="min-h-[180px]">
          <Text 
            className="text-center text-text-primary text-3xl mb-20"
            style={{ fontFamily: 'Rubik_700Bold' }}
          >
            A carteira digital feita para{'\n'}oferecer benefícios!
          </Text>
          <Text 
            className="text-center text-gray-400 text-[18px]"
            style={{ fontFamily: 'Rubik_400Regular' }}
          >
            Acesse sua conta e aproveite todos{'\n'}os benefícios do <Text style={{ fontFamily: 'Rubik_700Bold' }}>FizPay</Text>.
          </Text>
        </View>
      </View>

      <View className="px-6 pb-8">
        <View className="flex-row ml-3.5">
          <TouchableOpacity 
            className="flex-1 bg-primary py-4 rounded-2xl items-center justify-center mr-3"
            onPress={() => router.push('/login')}
          >
            <Text className="text-white text-[18px]" style={{ fontFamily: 'Rubik_500Medium' }}>
              Entrar
            </Text>
          </TouchableOpacity>

          <Pressable 
            className="flex-1 flex-row items-center justify-center py-4"
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onHoverIn={handlePressIn}
            onHoverOut={handlePressOut}
            onPress={() => router.push('/create-account')}
          >
            <Text 
              className={`text-[18px] mr-2 ${isHovered ? 'text-primary' : 'text-text-muted'}`}
              style={{ fontFamily: 'Rubik_500Medium' }}
            >
              Abrir Conta
            </Text>
            <Animated.View style={{ transform: [{ translateX }] }}>
              <Ionicons 
                name="arrow-forward" 
                size={24} 
                color={isHovered ? '#04BF7B' : '#7A869A'} 
              />
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
