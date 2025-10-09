import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import ScreenHeader from '../../src/components/ScreenHeader';
import TransactionItem from '../../src/components/TransactionItem';

export default function ExtractScreen() {
  const router = useRouter();
  const [filtroAtivo, setFiltroAtivo] = useState<'todos' | 'recebidos' | 'enviados'>('todos');

  const todasTransacoes = [
    {
      id: 1,
      tipo: 'received' as const,
      titulo: 'Você recebeu',
      subtitulo: 'Rafael Lucas Frota',
      valor: '+R$ 12.234,90',
      data: '28 abr 2024'
    },
    {
      id: 2,
      tipo: 'sent' as const,
      titulo: 'Pix Efetuado',
      subtitulo: 'RLV Tecnologia',
      valor: '-R$ 5.234,00',
      data: '28 abr 2024'
    },
    {
      id: 3,
      tipo: 'card' as const,
      titulo: 'Pagamento Efetuado',
      subtitulo: 'RLV Tecnologia',
      valor: '-R$ 26,00',
      data: '28 mai 2024'
    },
    {
      id: 4,
      tipo: 'received' as const,
      titulo: 'Você recebeu',
      subtitulo: 'Maria Silva',
      valor: '+R$ 8.500,00',
      data: '27 abr 2024'
    },
    {
      id: 5,
      tipo: 'sent' as const,
      titulo: 'Transferência Efetuada',
      subtitulo: 'João Santos',
      valor: '-R$ 1.200,00',
      data: '26 abr 2024'
    },
    {
      id: 6,
      tipo: 'card' as const,
      titulo: 'Pagamento Efetuado',
      subtitulo: 'Supermercado ABC',
      valor: '-R$ 342,50',
      data: '25 abr 2024'
    },
    {
      id: 7,
      tipo: 'received' as const,
      titulo: 'Você recebeu',
      subtitulo: 'Pedro Costa',
      valor: '+R$ 750,00',
      data: '24 abr 2024'
    },
    {
      id: 8,
      tipo: 'sent' as const,
      titulo: 'Pix Efetuado',
      subtitulo: 'Ana Paula',
      valor: '-R$ 450,00',
      data: '23 abr 2024'
    },
    {
      id: 9,
      tipo: 'card' as const,
      titulo: 'Pagamento Efetuado',
      subtitulo: 'Farmácia Saúde',
      valor: '-R$ 89,90',
      data: '22 abr 2024'
    },
    {
      id: 10,
      tipo: 'received' as const,
      titulo: 'Você recebeu',
      subtitulo: 'Lucas Oliveira',
      valor: '+R$ 3.200,00',
      data: '21 abr 2024'
    }
  ];

  const transacoesFiltradas = todasTransacoes.filter(transacao => {
    if (filtroAtivo === 'todos') return true;
    if (filtroAtivo === 'recebidos') return transacao.tipo === 'received';
    if (filtroAtivo === 'enviados') return transacao.tipo === 'sent' || transacao.tipo === 'card';
    return true;
  });

  const FiltroButton = ({ filtro, label }: { filtro: typeof filtroAtivo; label: string }) => {
    const isActive = filtroAtivo === filtro;
    
    return (
      <TouchableOpacity
        onPress={() => setFiltroAtivo(filtro)}
        className={`px-5 py-2.5 rounded-full ${isActive ? 'bg-primary' : 'bg-gray-100'}`}
      >
        <Text 
          className={`text-sm ${isActive ? 'text-white' : 'text-text-secondary'}`}
          style={{ fontFamily: 'Rubik_500Medium' }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="px-8">
          <ScreenHeader
            titulo="Extrato"
            aoVoltar={() => router.replace('/(tabs)/home')}
          />
        </View>

        <View className="px-8 mb-6">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            <FiltroButton filtro="todos" label="Todos" />
            <FiltroButton filtro="recebidos" label="Recebidos" />
            <FiltroButton filtro="enviados" label="Enviados" />
          </ScrollView>
        </View>

        <ScrollView 
          className="flex-1 px-8"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 90 }}
        >
          {transacoesFiltradas.length > 0 ? (
            transacoesFiltradas.map((transacao) => (
              <TransactionItem
                key={transacao.id}
                tipo={transacao.tipo}
                titulo={transacao.titulo}
                subtitulo={transacao.subtitulo}
                valor={transacao.valor}
                data={transacao.data}
              />
            ))
          ) : (
            <View className="items-center justify-center py-20">
              <Text className="text-text-secondary text-lg text-center" style={{ fontFamily: 'Rubik_400Regular' }}>
                Nenhuma transação encontrada
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

