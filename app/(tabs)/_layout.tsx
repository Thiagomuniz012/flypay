import React, { useState } from 'react';
import { View } from 'react-native';
import { Tabs, usePathname, useRouter } from 'expo-router';
import BottomTabBar, { TabName } from '../../components/BottomTabBar';

export default function TabsLayout() {
  const pathname = usePathname();
  const router = useRouter();
  
  const getActiveTab = (): TabName => {
    if (pathname.includes('extract')) return 'extract';
    if (pathname.includes('cashback')) return 'cashback';
    if (pathname.includes('profile')) return 'profile';
    return 'home';
  };

  const handleTabChange = (tab: TabName) => {
    if (tab === 'home') {
      router.replace('/(tabs)/home');
    } else if (tab === 'extract') {
      router.replace('/(tabs)/extract');
    } else if (tab === 'cashback') {
      router.replace('/(tabs)/cashback');
    } else if (tab === 'profile') {
      router.replace('/(tabs)/profile');
    }
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
        tabBar={() => null}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="extract" />
        <Tabs.Screen name="cashback" />
        <Tabs.Screen name="profile" />
      </Tabs>
      
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomTabBar abaAtiva={getActiveTab()} aoMudarAba={handleTabChange} />
      </View>
    </>
  );
}

