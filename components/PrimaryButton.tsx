import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
  texto: string;
  carregando?: boolean;
  variant?: 'primary' | 'secondary' | 'dark';
  larguraCompleta?: boolean;
}

export default function PrimaryButton({ 
  texto, 
  carregando = false, 
  variant = 'primary',
  larguraCompleta = false,
  disabled,
  ...props 
}: PrimaryButtonProps) {
  const getBackgroundColor = () => {
    if (disabled || carregando) return '#7A869A';
    
    switch (variant) {
      case 'primary':
        return '#04BF7B';
      case 'dark':
        return '#25384D';
      case 'secondary':
        return 'transparent';
      default:
        return '#04BF7B';
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled || carregando}
      className={`items-center justify-center rounded-2xl h-[45px] ${larguraCompleta ? 'w-full' : 'w-[290px]'}`}
      style={{ 
        backgroundColor: getBackgroundColor(),
        opacity: (disabled || carregando) ? 0.7 : 1
      }}
      {...props}
    >
      <Text className="text-white text-lg" style={{ fontFamily: 'Rubik_500Medium' }}>
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

