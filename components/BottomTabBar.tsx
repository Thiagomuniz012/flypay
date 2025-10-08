import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type TabName = 'home' | 'extract' | 'cashback' | 'profile';

interface Tab {
  name: TabName;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

interface BottomTabBarProps {
  abaAtiva: TabName;
  aoMudarAba: (tab: TabName) => void;
}

const tabs: Tab[] = [
  { name: 'home', icon: 'home', label: 'Início' },
  { name: 'extract', icon: 'receipt-outline', label: 'Extrato' },
  { name: 'cashback', icon: 'gift-outline', label: 'Cashback' },
  { name: 'profile', icon: 'person-outline', label: 'Meu perfil' },
];

export default function BottomTabBar({ abaAtiva, aoMudarAba }: BottomTabBarProps) {
  return (
    <View className="flex-row justify-around items-center py-4 px-6 bg-white border-t border-border-light">
      {tabs.map((tab) => {
        const isActive = abaAtiva === tab.name;
        
        return (
          <TouchableOpacity
            key={tab.name}
            className="items-center flex-1"
            onPress={() => aoMudarAba(tab.name)}
          >
            <Ionicons 
              name={tab.icon} 
              size={24} 
              color={isActive ? '#04BF7B' : '#B0B8C4'} 
            />
            <Text 
              className={`text-xs mt-1 ${isActive ? 'text-primary' : 'text-text-secondary'}`}
              style={{ fontFamily: isActive ? 'Rubik_500Medium' : 'Rubik_400Regular' }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

