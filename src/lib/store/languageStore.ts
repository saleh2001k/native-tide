import { create } from 'zustand';
import * as StorageService from '@/lib/services/storage';
import RNRestart from 'react-native-restart';
import { I18nManager } from 'react-native';

// Supported languages
export type Language = 'en' | 'ar';

// Define the language store state
interface LanguageState {
  language: Language | null;
  setLanguage: (language: Language) => void;
  direction: 'ltr' | 'rtl';
}

// Get the saved language or default to null (will use device language)
const getSavedLanguage = (): Language | null => {
  return StorageService.getItem<Language>('app_language');
};

// Get text direction based on language
const getDirection = (language: Language | null): 'ltr' | 'rtl' => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

// Helper function to get current language as string
export const getLanguage = (): string => {
  const { language } = useLanguageStore.getState();
  return language || 'en';
};

export const isRTL = (): boolean => {
  const { language } = useLanguageStore.getState();
  return language === 'ar';
};

// Create the language store
export const useLanguageStore = create<LanguageState>((set) => ({
  language: getSavedLanguage() || null,
  direction: getDirection(getSavedLanguage()),
  setLanguage: (language: Language) => {
    // Save to storage
    StorageService.setItem('app_language', language);
    
    // Set RTL for Arabic language
    const isRTL = language === 'ar';
    
    // Only force restart if RTL setting changes
    if (I18nManager.isRTL !== isRTL) {
      // Force RTL/LTR
      I18nManager.forceRTL(isRTL);
      
      // Update state before restart
      set({ 
        language,
        direction: getDirection(language)
      });
      
      // Restart app to apply RTL/LTR changes
      setTimeout(() => {
        RNRestart.restart();
      }, 100);
    } else {
      // Just update state without restart
      set({ 
        language,
        direction: getDirection(language)
      });
    }
  },
})); 