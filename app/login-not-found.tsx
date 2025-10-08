import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function LoginNotFoundScreen() {
  const router = useRouter();

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
          <TouchableOpacity className="mb-8" onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={28} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-[32px] mb-9" style={{ fontFamily: 'Rubik_700Bold' }}>
            Login
          </Text>
        </View>
      </SafeAreaView>

      <View className="flex-1 bg-white rounded-t-3xl justify-between pt-8 px-8">
        <View>
          <Text className="text-3xl text-text-primary text-center mb-12" style={{ fontFamily: 'Rubik_700Bold' }}>
            Bem-vindo
          </Text>
          
          <Text className="text-lg text-text-secondary text-center mb-2" style={{ fontFamily: 'Rubik_400Regular' }}>
            Parece que você ainda não cadastrou{'\n'}nenhuma conta.
          </Text>

          <View className="items-center mt-5">
            <Image 
              source={require('../assets/login-image.png')}
              className="w-60 h-60"
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="pb-8 items-center mb-7">
          <TouchableOpacity 
            onPress={() => router.push('/create-account')}
            className="bg-primary rounded-2xl w-[290px] h-[45px] items-center justify-center mb-4"
          >
            <Text className="text-white text-lg" style={{ fontFamily: 'Rubik_500Medium' }}>
              Cadastrar conta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/create-account')}>
            <Text className="text-primary text-lg" style={{ fontFamily: 'Rubik_500Medium' }}>
              Criar conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

