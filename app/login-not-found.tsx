import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import GradientBackground from '../components/GradientBackground';
import PrimaryButton from '../components/PrimaryButton';
import TextButton from '../components/TextButton';

export default function LoginNotFoundScreen() {
  const router = useRouter();

  return (
    <GradientBackground
      titulo="Login"
      aoVoltar={() => router.back()}
    >
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
          <PrimaryButton
            texto="Cadastrar conta"
            onPress={() => router.push('/create-account')}
          />
          
          <TextButton
            texto="Criar conta"
            onPress={() => router.push('/create-account')}
          />
        </View>
      </View>
    </GradientBackground>
  );
}

