import { create } from 'zustand';
import { ThemeName, themes } from '@/theme/colors';
import * as StorageService from '@/lib/services/storage';

// Helper to check if a theme is dark
export const isDarkTheme = (themeName: ThemeName): boolean => {
  return ['dark', 'nightBlue', 'midnight'].includes(themeName);
};

// Export isDark helper that can be used without accessing the store
export const isDark = (themeName: ThemeName): boolean => isDarkTheme(themeName);

// Define the theme store state
interface ThemeState {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

// Get the saved theme or default to 'light'
const getSavedTheme = (): ThemeName => {
  const savedTheme = StorageService.getItem<ThemeName>('app_theme');
  return savedTheme || 'light';
};

// Create the theme store
export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: getSavedTheme(),
  setTheme: (theme: ThemeName) => set({ currentTheme: theme }),
})); 