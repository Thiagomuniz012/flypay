import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UserAvatarProps {
  tamanho?: 'sm' | 'md' | 'lg';
  comBorda?: boolean;
  corDeFundo?: string;
}

export default function UserAvatar({ 
  tamanho = 'md', 
  comBorda = false,
  corDeFundo = '#F5F7FA'
}: UserAvatarProps) {
  const getSizeClasses = () => {
    switch (tamanho) {
      case 'sm':
        return 'w-12 h-12';
      case 'md':
        return 'w-16 h-16';
      case 'lg':
        return 'w-20 h-20';
      default:
        return 'w-16 h-16';
    }
  };

  const getIconSize = () => {
    switch (tamanho) {
      case 'sm':
        return 24;
      case 'md':
        return 32;
      case 'lg':
        return 40;
      default:
        return 32;
    }
  };

  return (
    <View 
      className={`${getSizeClasses()} rounded-full ${comBorda ? 'border-[3px] border-primary' : ''} items-center justify-center`}
      style={{ backgroundColor: corDeFundo }}
    >
      <Ionicons name="person" size={getIconSize()} color="#04BF7B" />
    </View>
  );
}

