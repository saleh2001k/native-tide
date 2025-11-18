import './global.css';
// Import i18n configuration
import './src/i18n';

// Point to the app directory in src
declare const global: {
  process?: {
    env: {
      EXPO_ROUTER_APP_ROOT?: string;
      [key: string]: string | undefined;
    };
  };
};

global.process = global.process || { env: {} };
global.process.env.EXPO_ROUTER_APP_ROOT = './src/app';

// Import expo-router entry after setting the app root
import 'expo-router/entry';
