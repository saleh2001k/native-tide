import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Appearance } from 'react-native';

import type { ThemeMode, ThemeName } from '../services/themeStore';
import { useThemeStore } from '../services/themeStore';

interface UseThemeToggleReturn {
  currentTheme: ThemeName;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

/**
 * Hook for managing theme switching between light, dark, and system themes
 * Uses NativeWind's useColorScheme for theme management
 *
 * @returns Object containing theme state and control functions
 */
export const useThemeToggle = (): UseThemeToggleReturn => {
  const { setColorScheme } = useColorScheme();
  const {
    themeMode,
    themeName,
    isDark,
    setThemeMode: storeSetThemeMode,
    toggleTheme: storeToggleTheme,
  } = useThemeStore();

  // Set theme mode
  const setThemeMode = (mode: ThemeMode) => {
    storeSetThemeMode(mode);

    // Update NativeWind color scheme
    if (mode === 'system') {
      setColorScheme('system');
    } else {
      setColorScheme(mode);
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    storeToggleTheme();
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    setColorScheme(newTheme);
  };

  // Sync NativeWind color scheme with theme mode on mount and when theme mode changes
  useEffect(() => {
    if (themeMode === 'system') {
      setColorScheme('system');
    } else {
      setColorScheme(themeMode);
    }
  }, [themeMode, setColorScheme]);

  // Listen to system theme changes when in system mode
  useEffect(() => {
    if (themeMode !== 'system') return;

    const subscription = Appearance.addChangeListener(() => {
      // When system theme changes and we're in system mode, update the store
      storeSetThemeMode('system');
    });

    return () => subscription.remove();
  }, [themeMode, storeSetThemeMode]);

  return {
    currentTheme: themeName,
    themeMode,
    setThemeMode,
    isDark,
    toggleTheme,
  };
};

export type { ThemeMode };
