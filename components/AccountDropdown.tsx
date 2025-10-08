import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Account {
  id: number;
  name: string;
  cpf: string;
}

interface AccountDropdownProps {
  contas: Account[];
  contaSelecionada: Account | null;
  aoSelecionarConta: (account: Account) => void;
  carregando: boolean;
  aberto: boolean;
  aoAlternar: () => void;
  aoAdicionarConta?: () => void;
}

export default function AccountDropdown({
  contas,
  contaSelecionada,
  aoSelecionarConta,
  carregando,
  aberto,
  aoAlternar,
  aoAdicionarConta
}: AccountDropdownProps) {
  if (carregando) {
    return (
      <View className="mb-5">
        <View className="bg-white rounded-xl px-5 py-4 items-center">
          <Text className="text-base text-text-secondary" style={{ fontFamily: 'Rubik_400Regular' }}>
            Carregando contas...
          </Text>
        </View>
      </View>
    );
  }

  if (contas.length === 0) {
    return (
      <View className="mb-5">
        <View className="bg-white rounded-xl px-5 py-4 items-center">
          <Text className="text-base text-text-secondary text-center" style={{ fontFamily: 'Rubik_400Regular' }}>
            Nenhuma conta encontrada.{'\n'}Cadastre-se primeiro!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="mb-5">
      <TouchableOpacity
        onPress={aoAlternar}
        className="bg-white px-5 py-4 flex-row items-center justify-between shadow-sm"
        style={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          borderBottomLeftRadius: aberto ? 0 : 12,
          borderBottomRightRadius: aberto ? 0 : 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.02,
          shadowRadius: 8,
          elevation: 1
        }}
      >
        <View>
          <Text className="text-[20px] text-text-primary mb-1" style={{ fontFamily: 'Rubik_600SemiBold' }}>
            {contaSelecionada?.name}
          </Text>
          <Text className="text-[16px] text-text-secondary" style={{ fontFamily: 'Rubik_400Regular' }}>
            {contaSelecionada?.cpf}
          </Text>
        </View>
        <Ionicons 
          name={aberto ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color="#04BF7B" 
        />
      </TouchableOpacity>

      {aberto && (
        <View 
          className="bg-white rounded-b-xl overflow-visible border-t-[0.5px] border-[#F0F0F0]"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.02,
            shadowRadius: 8,
            elevation: 1
          }}
        >
          {contas
            .filter(account => account.id !== contaSelecionada?.id)
            .map((account) => (
              <TouchableOpacity
                key={account.id}
                onPress={() => {
                  aoSelecionarConta(account);
                  aoAlternar();
                }}
                className="px-5 py-4 border-b-[0.5px] border-[#F0F0F0]"
              >
                <Text className="text-[18px] text-text-primary mb-1" style={{ fontFamily: 'Rubik_600SemiBold' }}>
                  {account.name}
                </Text>
                <Text className="text-[16px] text-text-secondary" style={{ fontFamily: 'Rubik_400Regular' }}>
                  {account.cpf}
                </Text>
              </TouchableOpacity>
            ))
          }
          
          {aoAdicionarConta && (
            <TouchableOpacity
              onPress={aoAdicionarConta}
              className="px-5 py-4 items-end"
            >
              <Text className="text-[16px] text-primary" style={{ fontFamily: 'Rubik_500Medium' }}>
                Acessar outra conta
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

