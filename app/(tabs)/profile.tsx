import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import UserAvatar from '../../components/UserAvatar';
import CustomAlert from '../../components/CustomAlert';
import { useCustomAlert } from '../../hooks/useCustomAlert';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { alert, showAlert, hideAlert } = useCustomAlert();

  const handleLogout = () => {
    showAlert(
      'Sair',
      'Tem certeza que deseja sair da sua conta?',
      'info',
      async () => {
        hideAlert();
        await logout();
        router.replace('/onboarding');
      },
      'Sim',
      true,
      'Não'
    );
  };

  const MenuItem = ({ 
    icon, 
    title, 
    onPress, 
    showArrow = true,
    danger = false 
  }: { 
    icon: keyof typeof Ionicons.glyphMap; 
    title: string; 
    onPress?: () => void;
    showArrow?: boolean;
    danger?: boolean;
  }) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center justify-between py-4 px-5 bg-white rounded-xl mb-3"
    >
      <View className="flex-row items-center flex-1">
        <View 
          className="w-10 h-10 rounded-full items-center justify-center mr-4"
          style={{ backgroundColor: danger ? '#FEE2E2' : '#E8F5F0' }}
        >
          <Ionicons 
            name={icon} 
            size={20} 
            color={danger ? '#E14242' : '#04BF7B'} 
          />
        </View>
        <Text 
          className={`text-base ${danger ? 'text-danger' : 'text-text-primary'}`}
          style={{ fontFamily: 'Rubik_500Medium' }}
        >
          {title}
        </Text>
      </View>
      {showArrow && (
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color="#B0B8C4" 
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-bg-white">
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-8 pt-5 pb-6">
          <Text className="text-text-primary text-2xl mb-1" style={{ fontFamily: 'Rubik_700Bold' }}>
            Meu Perfil
          </Text>
          <Text className="text-text-secondary text-base" style={{ fontFamily: 'Rubik_400Regular' }}>
            Gerencie suas informações
          </Text>
        </View>

        <View className="mx-8 mb-6 bg-white rounded-2xl p-6">
          <View className="items-center">
            <UserAvatar tamanho="lg" comBorda />
            
            <Text className="text-text-primary text-xl mt-4 mb-1" style={{ fontFamily: 'Rubik_600SemiBold' }}>
              {user?.nomeCompleto || 'Usuário'}
            </Text>
            
            <Text className="text-text-secondary text-sm mb-4" style={{ fontFamily: 'Rubik_400Regular' }}>
              {user?.email || 'email@exemplo.com'}
            </Text>

            <View className="w-full mt-2 pt-4 border-t border-border-light">
              <View className="flex-row justify-between mb-3">
                <Text className="text-text-secondary text-sm" style={{ fontFamily: 'Rubik_400Regular' }}>
                  CPF
                </Text>
                <Text className="text-text-primary text-sm" style={{ fontFamily: 'Rubik_500Medium' }}>
                  {user?.cpf ? user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '---'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-8">
          <Text className="text-text-secondary text-xs uppercase mb-3 ml-1" style={{ fontFamily: 'Rubik_500Medium' }}>
            Conta
          </Text>

          <MenuItem
            icon="log-out-outline"
            title="Sair da Conta"
            onPress={handleLogout}
            showArrow={false}
            danger
          />
        </View>

        <View className="items-center mt-8 mb-4">
          <Text className="text-text-light text-xs" style={{ fontFamily: 'Rubik_400Regular' }}>
            Versão 1.0.0
          </Text>
        </View>
      </ScrollView>

      <CustomAlert
        visible={alert.visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={hideAlert}
        onConfirm={alert.onConfirm}
        confirmText={alert.confirmText}
        showCancel={alert.showCancel}
        cancelText={alert.cancelText}
      />
    </SafeAreaView>
  );
}

