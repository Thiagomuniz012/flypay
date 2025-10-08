import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';

interface CarouselCardProps {
  imagemOrigem: ImageSourcePropType;
  largura?: number;
  altura?: number;
}

export default function CarouselCard({ 
  imagemOrigem, 
  largura = 280, 
  altura = 130 
}: CarouselCardProps) {
  return (
    <View className="rounded-2xl overflow-hidden mr-3" style={{ width: largura, height: altura }}>
      <Image 
        source={imagemOrigem}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
}

