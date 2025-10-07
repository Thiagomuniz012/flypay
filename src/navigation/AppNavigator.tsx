import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import LoginWithSessionScreen from '../screens/LoginWithSessionScreen';
import ConnectAccountScreen from '../screens/ConnectAccountScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="LoginWithSession" component={LoginWithSessionScreen} />
        <Stack.Screen name="ConnectAccount" component={ConnectAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

