import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'NativeTide',
  slug: 'nativetide',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.nativetide.app',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#C7C6C5',
    },
    package: 'com.nativetide.app',
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
    output: 'static',
  },
  scheme: 'nativetide',
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#C7C6C5',
        image: './assets/splash-icon.png',
        imageWidth: 150,
      },
    ],
  ],
};

export default config;
