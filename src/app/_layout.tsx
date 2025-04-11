import '@/i18n'; // Initialize i18n

import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReactScan } from 'react-scan/native';

import { AppProviders } from '@/providers/AppProviders';

if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require('src/devtools/ReactotronConfig.ts');
}

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
});

export const unstable_settings = {
  initialRouteName: '(app)',
};

function RootLayoutContent() {
  return (
    <SafeAreaProvider>
      <ReactScan
        options={{
          enabled: true,
          log: true,
          animationWhenFlashing: false,
        }}
      >
        <Stack
          screenOptions={{
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false,
          }}
        >
          <Stack.Screen name="(app)" />
        </Stack>
      </ReactScan>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootLayoutContent />
    </AppProviders>
  );
}
