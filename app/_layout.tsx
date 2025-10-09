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
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_600SemiBold,
    Rubik_700Bold,
  });
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    inicializarDB().then(() => setDbReady(true));
  }, []);

  useEffect(() => {
    if (fontsLoaded && dbReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, dbReady]);

  if (!fontsLoaded || !dbReady) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

