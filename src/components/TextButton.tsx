import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface TextButtonProps extends TouchableOpacityProps {
  texto: string;
  cor?: 'primary' | 'cyan' | 'dark';
  tamanho?: 'sm' | 'md' | 'lg';
}

export default function TextButton({ 
  texto, 
  cor = 'primary',
  tamanho = 'lg',
  ...props 
}: TextButtonProps) {
  const getColorClass = () => {
    switch (cor) {
      case 'primary':
        return 'text-primary';
      case 'cyan':
        return 'text-primary-cyan';
      case 'dark':
        return 'text-text-primary';
      default:
        return 'text-primary';
    }
  };

  const getSizeClass = () => {
    switch (tamanho) {
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      default:
        return 'text-lg';
    }
  };

  return (
    <TouchableOpacity className="items-center py-2" {...props}>
      <Text className={`${getColorClass()} ${getSizeClass()}`} style={{ fontFamily: 'Rubik_500Medium' }}>
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

