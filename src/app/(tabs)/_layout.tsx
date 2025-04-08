import { Ionicons } from '@expo/vector-icons';
import { SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';

export default function TabsLayout() {
  const themeName = UnistylesRuntime.themeName;
  const isDarkTheme = themeName === 'dark';

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      hideSplash();
    }, 1000);
  }, [hideSplash]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkTheme ? '#2980b9' : '#3498db',
        tabBarInactiveTintColor: isDarkTheme ? '#555555' : '#888888',
        tabBarStyle: {
          backgroundColor: isDarkTheme ? '#121212' : '#ffffff',
        },
        headerStyle: {
          backgroundColor: isDarkTheme ? '#121212' : '#ffffff',
        },
        headerTintColor: isDarkTheme ? '#ffffff' : '#000000',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="theme"
        options={{
          title: 'Theme',
          tabBarIcon: ({ color }: { color: string }) => (
            <Ionicons name="color-palette" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
