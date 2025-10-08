import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [showCashback, setShowCashback] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="flex-row items-center justify-between px-6 pt-8 pb-6">
          <View className="flex-row items-center">
            <Image 
              source={require('../assets/logo-flypay.png')}
              className="w-10 h-10 mr-3"
              resizeMode="contain"
            />
            <View>
              <Text className="text-text-primary text-2xl" style={{ fontFamily: 'Rubik_500Medium' }}>
                Olá, {user ? user.nomeCompleto.split(' ')[0] : 'Usuário'}
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.push('/qr-scanner')}>
              <Ionicons name="qr-code-outline" size={28} color="#04BF7B" />
            </TouchableOpacity>
            
            <View className="w-12 h-12 rounded-full bg-bg-light items-center justify-center" style={{ overflow: 'hidden' }}>
              <Ionicons name="person" size={28} color="#04BF7B" />
            </View>
          </View>
        </View>

        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
          <View className="flex-row px-10 gap-3 mt-2">
            <View className="flex-1 bg-primary rounded-2xl min-h-[190px] p-5 overflow-hidden justify-between">
              <View>
                <Ionicons name="cash" size={36} color="#007D4F" />
              </View>
              
              <View className="flex-1 justify-center">
                <Text className="text-white/90 text-[12px] mb-1.5" style={{ fontFamily: 'Rubik_400Regular' }}>
                SEU SALDO
              </Text>
              
                <Text className="text-white text-lg" style={{ fontFamily: 'Rubik_700Bold' }}>
                {showBalance ? 'R$ 23.456,000' : '•••••••'}
              </Text>
              </View>
              
              <TouchableOpacity 
                onPress={() => setShowBalance(!showBalance)}
                className="self-start w-8 h-8 bg-white/15 rounded-lg items-center justify-center"
              >
                <Ionicons 
                  name={showBalance ? 'eye' : 'eye-off'} 
                  size={18} 
                  color="white" 
                />
              </TouchableOpacity>
            </View>

            <View className="flex-1 bg-secondary rounded-2xl min-h-[190px] p-5 overflow-hidden justify-between">
              <View>
                <Ionicons name="gift" size={36} color="#007D4F" />
              </View>
              
              <View className="flex-1 justify-center">
                <Text className="text-white/90 text-[12px] mb-1.5" style={{ fontFamily: 'Rubik_400Regular' }}>
                SALDO DE CASHBACK
              </Text>
              
                <Text className="text-white text-lg" style={{ fontFamily: 'Rubik_700Bold' }}>
                {showCashback ? 'R$ 23.456,000' : '•••••••'}
              </Text>
              </View>
              
              <TouchableOpacity 
                onPress={() => setShowCashback(!showCashback)}
                className="self-start w-8 h-8 bg-white/15 rounded-lg items-center justify-center"
              >
                <Ionicons 
                  name={showCashback ? 'eye' : 'eye-off'} 
                  size={18} 
                  color="white" 
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="px-8 mt-8">
            <Text className="text-text-primary text-[20px] mb-8" style={{ fontFamily: 'Rubik_500Medium' }}>
              O que deseja fazer hoje?
            </Text>

            <View className="flex-row gap-3">
              <TouchableOpacity onPress={() => router.push('/qr-scanner')} className="flex-1 bg-white rounded-2xl p-4 items-center justify-center border border-gray-200" style={{ aspectRatio: 1 }}>
                <View className="items-center justify-center mb-2">
                  <Ionicons name="qr-code" size={36} color="#25384D" />
                </View>
                <Text className="text-text-primary text-s text-center" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Pagar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 items-center justify-center border border-gray-200" style={{ aspectRatio: 1 }}>
                <View className="items-center justify-center mb-2">
                  <Ionicons name="swap-horizontal" size={36} color="#25384D" />
                </View>
                <Text className="text-text-primary text-s text-center" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Transferir
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 bg-white rounded-2xl p-4 items-center justify-center border border-gray-200" style={{ aspectRatio: 1 }}>
                <View className="items-center justify-center mb-2">
                  <Ionicons name="card" size={36} color="#25384D" />
                </View>
                <Text className="text-text-primary text-[12px] text-center" style={{ fontFamily: 'Rubik_400Regular' }} numberOfLines={1}>
                  Meus Cartões
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="px-8 mt-8">
            <Text className="text-text-primary text-[20px] mb-8" style={{ fontFamily: 'Rubik_500Medium' }}>
              Em destaque
            </Text>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="gap-3"
              contentContainerStyle={{ paddingRight: 32 }}
            >
              <View className="rounded-2xl overflow-hidden mr-3" style={{ width: 280, height: 130 }}>
                <Image 
                  source={require('../assets/carrousel-1.jpg')}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              <View className="rounded-2xl overflow-hidden mr-3" style={{ width: 280, height: 130 }}>
                <Image 
                  source={require('../assets/carrousel-2.png')}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              <View className="rounded-2xl overflow-hidden mr-3" style={{ width: 280, height: 130 }}>
                <Image 
                  source={require('../assets/carrousel-3.jpg')}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            </ScrollView>
          </View>

          <View className="px-8 mt-8 flex-row justify-between items-center mb-4">
            <Text className="text-text-primary text-[20px]" style={{ fontFamily: 'Rubik_500Medium' }}>
              Transações
            </Text>
            <TouchableOpacity>
              <Text className="text-primary text-[18px]" style={{ fontFamily: 'Rubik_500Medium' }}>
                Ver Tudo
              </Text>
            </TouchableOpacity>
          </View>

          <View className="px-8">
            {/* Transação 1 */}
            <TouchableOpacity className="flex-row items-center py-4">
              <View className="w-14 h-14 rounded-xl bg-success items-center justify-center mr-4">
                <Ionicons name="arrow-up" size={32} color="white" />
              </View>
              
              <View className="flex-1">
                <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Você recebeu
                </Text>
                <Text className="text-gray-400 text-base" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Rafael Lucas Frota
                </Text>
              </View>
              
              <View className="items-end">
                <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_500Medium' }}>
                  +R$ 12.234,90
                </Text>
                <Text className="text-gray-400 text-sm" style={{ fontFamily: 'Rubik_400Regular' }}>
                  28 abr 2024
                </Text>
              </View>
            </TouchableOpacity>

            {/* Transação 2 */}
            <TouchableOpacity className="flex-row items-center py-4">
              <View className="w-14 h-14 rounded-xl bg-danger items-center justify-center mr-4">
                <Ionicons name="arrow-down" size={32} color="white" />
              </View>
              
              <View className="flex-1">
                <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Pix Efetuado
                </Text>
                <Text className="text-gray-400 text-base" style={{ fontFamily: 'Rubik_400Regular' }}>
                  RLV Tecnologia
                </Text>
              </View>
              
              <View className="items-end">
                <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_500Medium' }}>
                  -R$ 5.234,00
                </Text>
                <Text className="text-gray-400 text-sm" style={{ fontFamily: 'Rubik_400Regular' }}>
                  28 abr 2024
                </Text>
              </View>
            </TouchableOpacity>

            {/* Transação 3 */}
            <TouchableOpacity className="flex-row items-center py-4">
              <View className="w-14 h-14 rounded-xl bg-danger items-center justify-center mr-4">
                <Ionicons name="card" size={32} color="white" />
              </View>
              
              <View className="flex-1">
                <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Pagamento Efetuado
                </Text>
                <Text className="text-gray-400 text-base" style={{ fontFamily: 'Rubik_400Regular' }}>
                  RLV Tecnologia
                </Text>
              </View>
              
              <View className="items-end">
                <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_500Medium' }}>
                  -R$ 26,00
                </Text>
                <Text className="text-gray-400 text-sm" style={{ fontFamily: 'Rubik_400Regular' }}>
                  28 mai 2024
                </Text>
              </View>
            </TouchableOpacity>

            {/* Transação 4 */}
            <TouchableOpacity className="flex-row items-center py-4">
              <View className="w-14 h-14 rounded-xl bg-success items-center justify-center mr-4">
                <Ionicons name="arrow-up" size={32} color="white" />
              </View>
              
              <View className="flex-1">
                <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Você recebeu
                </Text>
                <Text className="text-gray-400 text-base" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Rafael Lucas Frota
                </Text>
              </View>
              
              <View className="items-end">
                <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_500Medium' }}>
                  +R$ 12.234,90
                </Text>
                <Text className="text-gray-400 text-sm" style={{ fontFamily: 'Rubik_400Regular' }}>
                  28 abr 2024
                </Text>
              </View>
            </TouchableOpacity>

            {/* Transação 5 */}
            <TouchableOpacity className="flex-row items-center py-4">
              <View className="w-14 h-14 rounded-xl bg-danger items-center justify-center mr-4">
                <Ionicons name="arrow-down" size={32} color="white" />
              </View>
              
              <View className="flex-1">
                <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_400Regular' }}>
                  Pagamento Efetuado
                </Text>
                <Text className="text-gray-400 text-base" style={{ fontFamily: 'Rubik_400Regular' }}>
                  RLV Tecnologia
                </Text>
              </View>
              
              <View className="items-end">
                <Text className="text-text-primary text-lg mb-1" style={{ fontFamily: 'Rubik_500Medium' }}>
                  -R$ 5.234,00
                </Text>
                <Text className="text-gray-400 text-sm" style={{ fontFamily: 'Rubik_400Regular' }}>
                  28 abr 2024
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View className="flex-row justify-around items-center py-4 px-6 bg-white border-t border-border-light">
          <TouchableOpacity className="items-center flex-1">
            <Ionicons name="home" size={24} color="#04BF7B" />
            <Text className="text-primary text-xs mt-1" style={{ fontFamily: 'Rubik_500Medium' }}>
              Início
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1">
            <Ionicons name="receipt-outline" size={24} color="#B0B8C4" />
            <Text className="text-text-secondary text-xs mt-1" style={{ fontFamily: 'Rubik_400Regular' }}>
              Extrato
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1">
            <Ionicons name="gift-outline" size={24} color="#B0B8C4" />
            <Text className="text-text-secondary text-xs mt-1" style={{ fontFamily: 'Rubik_400Regular' }}>
              Cashback
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1">
            <Ionicons name="person-outline" size={24} color="#B0B8C4" />
            <Text className="text-text-secondary text-xs mt-1" style={{ fontFamily: 'Rubik_400Regular' }}>
              Meu perfil
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
