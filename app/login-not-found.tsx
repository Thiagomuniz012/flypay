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
      style={{ flex: 1, overflow: 'hidden' }}
    >
      <View 
        style={{ 
          position: 'absolute',
          top: -50,
          right: -30,
          width: 170,
          height: 170,
          borderRadius: 100,
          backgroundColor: '#F9F9F9',
          opacity: 0.15
        }} 
      />
      
      <View 
        style={{ 
          position: 'absolute',
          top: 28,
          right: -80,
          width: 170,
          height: 170,
          borderRadius: 100,
          backgroundColor: '#01DDC3',
          opacity: 0.12
        }} 
      />
      
      <SafeAreaView>
        <View className="px-10" style={{ paddingTop: 50 }}>
          <TouchableOpacity className="mb-8" onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={28} color="white" />
          </TouchableOpacity>
          <Text 
            style={{ 
              color: 'white', 
              fontSize: 28, 
              fontFamily: 'Rubik_700Bold',
              marginBottom: 36
            }}
          >
            Login
          </Text>
        </View>
      </SafeAreaView>

      <View 
        className="flex-1" 
        style={{ 
          backgroundColor: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          justifyContent: 'space-between', 
          paddingTop: 34,
          paddingHorizontal: 32
        }}
      >
        <View>
          <Text 
            style={{ 
              fontSize: 26, 
              color: '#25384D', 
              fontFamily: 'Rubik_700Bold',
              textAlign: 'center',
              marginBottom: 50
            }}
          >
            Bem-vindo
          </Text>
          
          <Text 
            style={{ 
              fontSize: 16, 
              color: '#7A869A', 
              fontFamily: 'Rubik_400Regular',
              textAlign: 'center',
              marginBottom: 10
            }}
          >
            Parece que você ainda não cadastrou{'\n'}nenhuma conta.
          </Text>

          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Image 
              source={require('../assets/login-image.png')}
              style={{ width: 240, height: 240 }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="pb-8" style={{ alignItems: 'center', marginBottom: 28 }}>
          <TouchableOpacity 
            onPress={() => router.push('/create-account')}
            style={{ 
              backgroundColor: '#04BF7B', 
              borderRadius: 16,
              width: 290,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16
            }}
          >
            <Text style={{ 
              color: 'white', 
              fontSize: 16, 
              fontFamily: 'Rubik_500Medium' 
            }}>
              Cadastrar conta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/create-account')}>
            <Text style={{ 
              color: '#04BF7B', 
              fontSize: 16, 
              fontFamily: 'Rubik_500Medium' 
            }}>
              Criar conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

