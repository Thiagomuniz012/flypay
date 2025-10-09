import { Stack, useRouter, useSegments } from 'expo-router';
import { useFonts, Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold } from '@expo-google-fonts/rubik';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { inicializarDB } from '../services/storage';
import '../global.css';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    
    const currentRoute = segments[0];
    
    if (user && (!currentRoute || currentRoute === 'onboarding')) {
      router.replace('/login-with-session');
    } else if (!user && (currentRoute === 'login-with-session' || currentRoute === '(tabs)')) {
      router.replace('/onboarding');
    }
  }, [user, loading, segments]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="login-not-found" />
      <Stack.Screen name="login-with-session" />
      <Stack.Screen name="connect-account" />
      <Stack.Screen name="enter-account" />
      <Stack.Screen name="create-account" />
      <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
      <Stack.Screen name="qr-scanner" />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
  });
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        console.log('Iniciando DB...');
        await inicializarDB();
        console.log('DB inicializado com sucesso');
      } catch (error) {
        console.error('Erro ao inicializar DB:', error);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    console.log('Status:', { fontsLoaded, fontError, appReady });
    if ((fontsLoaded || fontError) && appReady) {
      console.log('Escondendo splash screen...');
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, appReady]);

  if (!appReady || (!fontsLoaded && !fontError)) {
    console.log('Aguardando:', { appReady, fontsLoaded, fontError });
    return null;
  }

  console.log('Renderizando app...');
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

