import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import arCommon from './locales/ar/common.json';
import enCommon from './locales/en/common.json';

// RTL languages
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

// Check if language is RTL
export const isRTL = (language: string): boolean => {
  return RTL_LANGUAGES.includes(language.split('-')[0]);
};

// Get device language
const getDeviceLanguage = (): string => {
  const locale = Localization.getLocales()[0]?.languageCode || 'en';

  // Return supported language or default to English
  if (['en', 'ar'].includes(locale)) {
    return locale;
  }

  return 'en'; // Default to English
};

// Initialize i18n
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  debug: false,

  resources: {
    en: {
      common: enCommon,
    },
    ar: {
      common: arCommon,
    },
  },

  defaultNS: 'common',
  ns: ['common'],

  interpolation: {
    escapeValue: false, // React already does escaping
  },

  react: {
    useSuspense: false, // Disable suspense for React Native
  },
});

export default i18n;
