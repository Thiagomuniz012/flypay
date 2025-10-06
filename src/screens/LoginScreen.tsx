import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../navigation/types';

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
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
        <View className="px-10" style={{ paddingTop: 70 }}>
          <TouchableOpacity className="mb-8" onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={28} color="white" />
          </TouchableOpacity>
          <Text 
            style={{ 
              color: 'white', 
              fontSize: 28, 
              fontFamily: 'Rubik_700Bold',
              marginBottom:36
            }}
          >
            Login
          </Text>
        </View>
      </SafeAreaView>

      <View 
        className="flex-1 px-6" 
        style={{ 
          backgroundColor: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          justifyContent: 'space-between', 
          paddingTop: 34 
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text 
            style={{ 
              fontSize: 26, 
              color: '#25384D', 
              fontFamily: 'Rubik_700Bold',
              marginBottom: 50
            }}
          >
            Bem vindo
          </Text>
          
          <Text 
            className="text-center"
            style={{ 
              fontSize: 14, 
              color: '#7A869A', 
              fontFamily: 'Rubik_400Regular',
              marginBottom: 40
            }}
          >
            Parece que você ainda não cadastrou{'\n'}nenhuma conta.
          </Text>

          <View style={{ marginBottom: 40 }}>
            <Image 
              source={require('../../assets/login-image.png')} 
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="pb-8" style={{ alignItems: 'center' }}>
          <TouchableOpacity 
            className="items-center justify-center mb-4"
            style={{ 
              backgroundColor: '#04BF7B', 
              borderRadius: 16,
              width: 290,
              height: 45
            }}
          >
            <Text style={{ 
              color: 'white', 
              fontSize: 16, 
              fontFamily: 'Rubik_400Regular' 
            }}>
              Cadastrar conta
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center py-2">
            <Text style={{ 
              color: '#1AB88D', 
              fontSize: 16, 
              fontFamily: 'Rubik_600SemiBold' 
            }}>
              Criar conta
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

