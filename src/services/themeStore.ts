/**
 * Theme Store with Unistyles 3 Integration
 *
 * Manages theme state using Zustand with MMKV persistence
 * Works seamlessly with React Native Unistyles 3
 *
 * Supports three theme modes:
 * - 'light': Force light theme
 * - 'dark': Force dark theme
 * - 'system': Follow device's color scheme (adaptive themes)
 */

import type { UnistylesThemes } from 'react-native-unistyles';
import { UnistylesRuntime } from 'react-native-unistyles';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storage, STORAGE_KEYS } from './storage';

// Theme types
export type ThemeName =
  | 'light'
  | 'dark'
  | 'lightHighContrast'
  | 'darkHighContrast';
export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  // Current theme mode ('light', 'dark', or 'system')
  themeMode: ThemeMode;
  // Current theme name (light/dark/lightHighContrast/darkHighContrast) - computed from mode
  themeName: ThemeName;
  // High contrast mode enabled
  isHighContrast: boolean;
  // Last manual theme selection (for when switching from system back to manual)
  lastManualTheme: ThemeMode;
  // Set theme mode (light/dark/system)
  setThemeMode: (mode: ThemeMode) => void;
  // Set high contrast mode
  setHighContrast: (enabled: boolean) => void;
  // Set theme name (deprecated - use setThemeMode instead)
  setThemeName: (themeName: ThemeName) => void;
  // Toggle between light and dark
  toggleTheme: () => void;
  // Get current theme name for Unistyles
  getCurrentTheme: () => ThemeName;
  // Get current theme from UnistylesRuntime
  getCurrentThemeFromUnistyles: () => ThemeName;
  // Get isDark boolean
  getIsDark: () => boolean;
  // Boolean to check if the theme is dark
  isDark: boolean;
  // Get device color scheme
  getDeviceColorScheme: () => 'light' | 'dark' | 'unspecified';
}

// Helper function to get theme name based on mode and high contrast
const getThemeName = (mode: ThemeMode, isHighContrast: boolean): ThemeName => {
  let baseTheme: 'light' | 'dark';

  if (mode === 'system') {
    // When in system mode, use device's color scheme
    const colorScheme = UnistylesRuntime.colorScheme;
    baseTheme = colorScheme === 'dark' ? 'dark' : 'light';
  } else {
    baseTheme = mode;
  }

  // Apply high contrast if enabled
  if (isHighContrast) {
    return baseTheme === 'dark' ? 'darkHighContrast' : 'lightHighContrast';
  }

  return baseTheme;
};

// Create the theme store with persistence
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      themeMode: 'system',
      themeName: 'light',
      isHighContrast: false,
      isDark: false,
      lastManualTheme: 'light',

      setThemeMode: (mode: ThemeMode) => {
        const { isHighContrast } = get();
        const newThemeName = getThemeName(mode, isHighContrast);
        const isDark = newThemeName.includes('dark');

        if (mode === 'system') {
          if (isHighContrast) {
            // When high contrast is enabled, we can't use adaptive themes
            // because Unistyles only knows 'light' and 'dark', not our high contrast variants
            // So we manually set the theme based on device color scheme
            UnistylesRuntime.setAdaptiveThemes(false);
            UnistylesRuntime.setTheme(newThemeName as keyof UnistylesThemes);
          } else {
            // Standard system mode - use adaptive themes
            UnistylesRuntime.setAdaptiveThemes(true);
          }

          // Update state
          set({
            themeMode: mode,
            themeName: newThemeName,
            isDark,
          });
        } else {
          // Disable adaptive themes
          UnistylesRuntime.setAdaptiveThemes(false);

          // Set specific theme
          UnistylesRuntime.setTheme(newThemeName as keyof UnistylesThemes);

          // Update state - track manual theme selection
          set({
            themeMode: mode,
            themeName: newThemeName,
            isDark,
            lastManualTheme: mode, // Track the manual selection
          });
        }
      },

      setHighContrast: (enabled: boolean) => {
        const { themeMode } = get();
        const newThemeName = getThemeName(themeMode, enabled);
        const isDark = newThemeName.includes('dark');

        // Handle theme update based on mode
        if (themeMode === 'system') {
          if (enabled) {
            // Disable adaptive themes and manually set high contrast theme
            UnistylesRuntime.setAdaptiveThemes(false);
            UnistylesRuntime.setTheme(newThemeName as keyof UnistylesThemes);
          } else {
            // Re-enable adaptive themes for standard system mode
            UnistylesRuntime.setAdaptiveThemes(true);
          }
        } else {
          // Manual mode - just set the theme
          UnistylesRuntime.setTheme(newThemeName as keyof UnistylesThemes);
        }

        // Update state
        set({
          isHighContrast: enabled,
          themeName: newThemeName,
          isDark,
        });
      },

      setThemeName: (themeName: ThemeName) => {
        // This is now a wrapper for setThemeMode for backward compatibility
        // Extract base theme mode from theme name
        const baseMode: ThemeMode = themeName.includes('dark')
          ? 'dark'
          : 'light';
        get().setThemeMode(baseMode);
      },

      toggleTheme: () => {
        const { themeMode } = get();

        if (themeMode === 'system') {
          // If currently in system mode, toggle to opposite of current system theme
          const currentBaseTheme =
            UnistylesRuntime.colorScheme === 'dark' ? 'dark' : 'light';
          const newMode = currentBaseTheme === 'light' ? 'dark' : 'light';
          get().setThemeMode(newMode);
        } else {
          // Toggle between light and dark (preserving high contrast)
          const newMode = themeMode === 'light' ? 'dark' : 'light';
          get().setThemeMode(newMode);
        }
      },

      getCurrentTheme: () => {
        return get().themeName;
      },

      getCurrentThemeFromUnistyles: () => {
        return UnistylesRuntime.themeName as ThemeName;
      },

      getIsDark: () => {
        return get().isDark;
      },

      getDeviceColorScheme: () => {
        return UnistylesRuntime.colorScheme;
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
      storage: createJSONStorage(() => ({
        getItem: (name: string) => {
          const value = storage.getString(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name: string, value: unknown) => {
          storage.set(name, JSON.stringify(value));
        },
        removeItem: (name: string) => {
          storage.delete(name);
        },
      })),
      // Only persist theme preferences, not functions
      partialize: (state) => ({
        themeMode: state.themeMode,
        themeName: state.themeName,
        isHighContrast: state.isHighContrast,
        isDark: state.isDark,
        lastManualTheme: state.lastManualTheme,
      }),
      // On rehydration, apply the stored theme mode and high contrast
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme mode with high contrast consideration
          // This will correctly handle system mode + high contrast
          state.setThemeMode(state.themeMode);
        }
      },
    },
  ),
);

// Export default for backward compatibility
export default useThemeStore;
