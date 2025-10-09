import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import BalanceCard from '../../src/components/BalanceCard';
import ActionCard from '../../src/components/ActionCard';
import TransactionItem from '../../src/components/TransactionItem';
import CarouselCard from '../../src/components/CarouselCard';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="flex-row items-center justify-between px-6 pt-8 pb-6">
          <View className="flex-row items-center">
            <Image 
              source={require('../../assets/logo-fizpay.png')}
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

        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 90 }}>
          <View className="flex-row px-10 gap-3 mt-2">
            <BalanceCard
              titulo="SEU SALDO"
              valor="R$ 23.456,000"
              icone="cash"
              corDeFundo="#04BF7B"
            />

            <BalanceCard
              titulo="SALDO DE CASHBACK"
              valor="R$ 23.456,000"
              icone="gift"
              corDeFundo="#00966D"
            />
          </View>

          <View className="px-8 mt-8">
            <Text className="text-text-primary text-[20px] mb-8" style={{ fontFamily: 'Rubik_500Medium' }}>
              O que deseja fazer hoje?
            </Text>

            <View className="flex-row gap-3">
              <ActionCard icone="qr-code" rotulo="Pagar" onPress={() => router.push('/qr-scanner')} />
              <ActionCard icone="swap-horizontal" rotulo="Transferir" />
              <ActionCard icone="card" rotulo="Meus Cartões" />
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
              <CarouselCard imagemOrigem={require('../../assets/carrousel-1.jpg')} />
              <CarouselCard imagemOrigem={require('../../assets/carrousel-2.png')} />
              <CarouselCard imagemOrigem={require('../../assets/carrousel-3.jpg')} />
            </ScrollView>
          </View>

          <View className="px-8 mt-8 flex-row justify-between items-center mb-4">
            <Text className="text-text-primary text-[20px]" style={{ fontFamily: 'Rubik_500Medium' }}>
              Transações
            </Text>
            <TouchableOpacity onPress={() => router.replace('/(tabs)/extract')}>
              <Text className="text-primary text-[18px]" style={{ fontFamily: 'Rubik_500Medium' }}>
                Ver Tudo
              </Text>
            </TouchableOpacity>
          </View>

          <View className="px-8">
            <TransactionItem
              tipo="received"
              titulo="Você recebeu"
              subtitulo="Rafael Lucas Frota"
              valor="+R$ 12.234,90"
              data="28 abr 2024"
            />

            <TransactionItem
              tipo="sent"
              titulo="Pix Efetuado"
              subtitulo="RLV Tecnologia"
              valor="-R$ 5.234,00"
              data="28 abr 2024"
            />

            <TransactionItem
              tipo="card"
              titulo="Pagamento Efetuado"
              subtitulo="RLV Tecnologia"
              valor="-R$ 26,00"
              data="28 mai 2024"
            />

            <TransactionItem
              tipo="received"
              titulo="Você recebeu"
              subtitulo="Rafael Lucas Frota"
              valor="+R$ 12.234,90"
              data="28 abr 2024"
            />

            <TransactionItem
              tipo="sent"
              titulo="Pagamento Efetuado"
              subtitulo="RLV Tecnologia"
              valor="-R$ 5.234,00"
              data="28 abr 2024"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

