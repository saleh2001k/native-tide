import * as Localization from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import type { Language } from '@/lib/store/languageStore';
import { useLanguageStore } from '@/lib/store/languageStore';

import ar from './locales/ar.json';
// Import translations
import en from './locales/en.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

// Get the best language match from device settings
const getDeviceLanguage = (): Language => {
  const deviceLocales = Localization.getLocales();
  const deviceLanguages = deviceLocales
    .map((locale) => locale.languageCode)
    .filter((code): code is string => code !== null);
  const supportedLanguages = Object.keys(resources);

  // Find the first supported language from device preferences
  const bestLanguage = deviceLanguages.find((lang) =>
    supportedLanguages.includes(lang),
  );

  // Default to English if no match
  return (bestLanguage as Language) || 'en';
};

// Get language from store or device
const getLanguage = (): Language => {
  const { language } = useLanguageStore.getState();
  return language || getDeviceLanguage();
};

// Initialize i18next
i18next.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: getLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes by default
  },
});

// Add language change listener
useLanguageStore.subscribe((state) => {
  if (state.language && i18next.language !== state.language) {
    i18next.changeLanguage(state.language);
  }
});

export default i18next;
