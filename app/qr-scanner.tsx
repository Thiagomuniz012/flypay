import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Camera, CameraView } from 'expo-camera';

export default function QRScannerScreen() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkCameraPermission = async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    checkCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    alert(`QR Code escaneado: ${data}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white px-8">
        <View className="pt-5 mb-8">
          <TouchableOpacity onPress={() => router.back()} className="mb-6">
            <Ionicons name="arrow-back-outline" size={28} color="#25384D" />
          </TouchableOpacity>
          <Text 
            className="text-text-primary text-[22px] mb-2"
            style={{ fontFamily: 'Rubik_700Bold' }}
          >
            Uso da Câmera
          </Text>
          <Text 
            className="text-text-muted text-lg mt-6"
            style={{ fontFamily: 'Rubik_400Regular' }}
          >
            Permita que o bankis acesse a câmera
          </Text>
        </View>

        <View className="flex-1 justify-between">
          <View className="flex-1 justify-center items-center">
            {hasPermission ? (
              <View className="bg-white rounded-3xl p-8 items-center relative overflow-hidden" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5, width: 380, height: 500 }}>
                <CameraView
                  style={{ width: '100%', height: '100%', borderRadius: 24 }}
                  facing="back"
                  onBarcodeScanned={handleBarCodeScanned}
                  barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                  }}
                />
                
                <View className="absolute inset-0 items-center justify-center">
                  <View className="w-64 h-64 border-4 border-primary rounded-2xl" />
                </View>
              </View>
            ) : (
              <View className="bg-white rounded-3xl p-8 items-center relative" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 }}>
                <Text 
                  className="text-text-primary text-3xl"
                  style={{ fontFamily: 'Rubik_700Bold' }}
                >
                  QR Code
                </Text>
                
                <Text 
                  className="text-[#7A869A] text-lg mb-6"
                  style={{ fontFamily: 'Rubik_400Regular' }}
                >
                  Faça a varredura para pagar
                </Text>

                <View className="bg-white p-8 rounded-2xl">
                  <View className="w-64 h-64 overflow-hidden">
                    <Image 
                      source={require('../assets/camera-qrcode.png')}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                </View>

                <View className="absolute top-[110px] left-6 w-10 h-10 border-l-[6px] border-t-[6px] border-gray-300 rounded-tl-2xl" />
                <View className="absolute top-[110px] right-6 w-10 h-10 border-r-[6px] border-t-[6px] border-gray-300 rounded-tr-2xl" />
                <View className="absolute bottom-6 left-6 w-10 h-10 border-l-[6px] border-b-[6px] border-gray-300 rounded-bl-2xl" />
                <View className="absolute bottom-6 right-6 w-10 h-10 border-r-[6px] border-b-[6px] border-gray-300 rounded-br-2xl" />
              </View>
            )}
          </View>

          {!hasPermission && (
            <View className="mb-8 px-8">
              <TouchableOpacity
                onPress={requestCameraPermission}
                className="bg-primary py-4 rounded-2xl items-center"
              >
                <Text 
                  className="text-white text-[16px]"
                  style={{ fontFamily: 'Rubik_500Medium' }}
                >
                  Permitir uso da Câmera
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
