/**
 * This file does the setup for integration with Reactotron, which is a
 * free desktop app for inspecting and debugging your React Native app.
 * @see https://github.com/infinitered/reactotron
 */
import { router } from 'expo-router';
import { NativeModules, Platform } from 'react-native';
import type { MMKV } from 'react-native-mmkv';
import { ArgType } from 'reactotron-core-client';
import zustandPlugin from 'reactotron-plugin-zustand';
import type { ReactotronReactNative } from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';

import packageJson from '../../package.json';
import { storage } from '../services/storage';
import { useThemeStore } from '../services/themeStore';
import { Reactotron } from './ReactotronClient';

const reactotron = Reactotron.configure({
  name: packageJson.name,
  onConnect: () => {
    /** since this file gets hot reloaded, let's clear the past logs every time we connect */
    Reactotron.clear();
  },
});

// Use zustand plugin to monitor stores
reactotron.use(
  zustandPlugin({
    stores: [{ name: 'theme', store: useThemeStore }],
    omitFunctionKeys: false,
  }),
);

// Only use MMKV plugin on native platforms
if (Platform.OS !== 'web' && 'nativeInstance' in storage) {
  reactotron.use(
    mmkvPlugin<ReactotronReactNative>({ storage: storage as MMKV }),
  );
}

if (Platform.OS !== 'web') {
  reactotron.useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  });
}

/**
 * Reactotron allows you to define custom commands that you can run
 * from Reactotron itself, and they will run in your app.
 *
 * Define them in the section below with `onCustomCommand`. Use your
 * creativity -- this is great for development to quickly and easily
 * get your app into the state you want.
 *
 * NOTE: If you edit this file while running the app, you will need to do a full refresh
 * or else your custom commands won't be registered correctly.
 */
reactotron.onCustomCommand({
  title: 'Show Dev Menu',
  description: 'Opens the React Native dev menu',
  command: 'showDevMenu',
  handler: () => {
    Reactotron.log('Showing React Native dev menu');
    NativeModules.DevMenu.show();
  },
});

reactotron.onCustomCommand({
  title: 'Reset Root Store',
  description: 'Resets the MMKV store',
  command: 'resetStore',
  handler: () => {
    Reactotron.log('resetting store');
    if (Platform.OS !== 'web' && 'clearAll' in storage) {
      storage.clearAll();
    } else {
      Reactotron.log('Storage clear not available on this platform');
    }
  },
});

reactotron.onCustomCommand<[{ name: 'route'; type: ArgType.String }]>({
  command: 'navigateTo',
  handler: (args) => {
    const { route } = args ?? {};
    if (route) {
      Reactotron.log(`Navigating to: ${route}`);
      router.push(route as '/about' | '/');
    } else {
      Reactotron.log('Could not navigate. No route provided.');
    }
  },
  title: 'Navigate To Screen',
  description: 'Navigates to a screen by name.',
  args: [{ name: 'route', type: ArgType.String }],
});

reactotron.onCustomCommand({
  title: 'Go Back',
  description: 'Goes back',
  command: 'goBack',
  handler: () => {
    Reactotron.log('Going back');
    router.back();
  },
});

// Theme switching commands
reactotron.onCustomCommand({
  title: 'Switch to Light Theme',
  description: 'Switches to light theme',
  command: 'setLightTheme',
  handler: () => {
    Reactotron.log('Switching to light theme');
    useThemeStore.getState().setThemeMode('light');
  },
});

reactotron.onCustomCommand({
  title: 'Switch to Dark Theme',
  description: 'Switches to dark theme',
  command: 'setDarkTheme',
  handler: () => {
    Reactotron.log('Switching to dark theme');
    useThemeStore.getState().setThemeMode('dark');
  },
});

reactotron.onCustomCommand({
  title: 'Toggle Theme',
  description: 'Toggles between light and dark theme',
  command: 'toggleTheme',
  handler: () => {
    Reactotron.log('Toggling theme');
    useThemeStore.getState().toggleTheme();
  },
});

reactotron.onCustomCommand({
  title: 'Enable System Theme',
  description: 'Follow system theme setting',
  command: 'setSystemTheme',
  handler: () => {
    Reactotron.log('Enabling system theme');
    useThemeStore.getState().setThemeMode('system');
  },
});

// Language switching commands
reactotron.onCustomCommand({
  title: 'Switch to English',
  description: 'Changes language to English',
  command: 'setEnglish',
  handler: () => {
    Reactotron.log('Switching to English');
    // Note: This would need to be called from a component that has access to the language context
    Reactotron.log('Use the language switcher in the app to change language');
  },
});

reactotron.onCustomCommand({
  title: 'Switch to Arabic',
  description: 'Changes language to Arabic',
  command: 'setArabic',
  handler: () => {
    Reactotron.log('Switching to Arabic');
    // Note: This would need to be called from a component that has access to the language context
    Reactotron.log('Use the language switcher in the app to change language');
  },
});

/**
 * We're going to add `console.tron` to the Reactotron object.
 * Now, anywhere in our app in development, we can use Reactotron like so:
 *
 * ```
 * if (__DEV__) {
 *  console.tron.display({
 *    name: 'JOKE',
 *    preview: 'What's the best thing about Switzerland?',
 *    value: 'I don't know, but the flag is a big plus!',
 *    important: true
 *  })
 * }
 * ```
 *
 * Use this power responsibly! :)
 */
// eslint-disable-next-line no-console
console.tron = reactotron;

/**
 * We tell typescript about our dark magic
 *
 * You can also import Reactotron yourself from ./reactotronClient
 * and use it directly, like Reactotron.log('hello world')
 */
declare global {
  interface Console {
    /**
     * Reactotron client for logging, displaying, measuring performance, and more.
     * @see https://github.com/infinitered/reactotron
     * @example
     * if (__DEV__) {
     *  console.tron.display({
     *    name: 'JOKE',
     *    preview: 'What's the best thing about Switzerland?',
     *    value: 'I don't know, but the flag is a big plus!',
     *    important: true
     *  })
     * }
     */
    tron: typeof reactotron;
  }
}

/**
 * Now that we've setup all our Reactotron configuration, let's connect!
 */
if (Platform.OS !== 'web') {
  reactotron.connect();
}
