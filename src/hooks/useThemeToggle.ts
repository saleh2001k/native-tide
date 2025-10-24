import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';

import { getItem, setItem, STORAGE_KEYS } from '../services/storage';
import { useThemeStore } from '../store/themeStore';
import type { ThemeName } from '../theme';

export type ThemeMode = 'light' | 'dark' | 'system';

interface UseThemeToggleReturn {
  currentTheme: ThemeName;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

/**
 * Hook for managing theme switching between light, dark, and system themes
 *
 * @returns Object containing theme state and control functions
 */
export const useThemeToggle = (): UseThemeToggleReturn => {
  const { currentTheme, setTheme } = useThemeStore();
  const systemColorScheme = useColorScheme();

  // Get the current theme mode from storage or default to 'light'
  const getThemeMode = (): ThemeMode => {
    const savedMode = getItem<ThemeMode>(STORAGE_KEYS.THEME_MODE);
    return savedMode || 'light';
  };

  // Set theme mode in storage
  const setThemeMode = async (mode: ThemeMode) => {
    await setItem(STORAGE_KEYS.THEME_MODE, mode);

    // Update the actual theme based on the mode
    if (mode === 'system') {
      // Enable adaptive themes in Unistyles
      UnistylesRuntime.setAdaptiveThemes(true);
      // Don't set a specific theme when using system mode
      // Unistyles will handle it automatically
    } else {
      // Disable adaptive themes first, then set specific theme
      UnistylesRuntime.setAdaptiveThemes(false);
      // Small delay to ensure adaptive themes are disabled
      UnistylesRuntime.setTheme(mode as ThemeName);
      setTheme(mode);
    }
  };

  // Get the current theme mode
  const themeMode = getThemeMode();

  // Update theme when system color scheme changes (only if mode is 'system')
  useEffect(() => {
    if (themeMode === 'system') {
      UnistylesRuntime.setAdaptiveThemes(true);
      // Don't manually set theme when using system mode
      // Unistyles will handle it automatically
    }
  }, [systemColorScheme, themeMode]);

  // Toggle between light and dark (ignores system mode)
  const toggleTheme = async () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    // Disable adaptive themes first, then set specific theme
    UnistylesRuntime.setAdaptiveThemes(false);
    UnistylesRuntime.setTheme(newTheme as ThemeName);
    setTheme(newTheme);
    // Update the mode to the specific theme (not system)
    await setItem(STORAGE_KEYS.THEME_MODE, newTheme);
  };

  // Determine if current theme is dark
  const isDark = currentTheme === 'dark';

  return {
    currentTheme,
    themeMode,
    setThemeMode,
    isDark,
    toggleTheme,
  };
};
