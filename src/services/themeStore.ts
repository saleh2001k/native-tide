/**
 * Theme Store with NativeWind Integration
 *
 * Manages theme state using Zustand with MMKV persistence
 * Works seamlessly with NativeWind
 *
 * Supports three theme modes:
 * - 'light': Force light theme
 * - 'dark': Force dark theme
 * - 'system': Follow device's color scheme
 */

import { Appearance } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { storage, STORAGE_KEYS } from './storage';

// Theme types
export type ThemeName = 'light' | 'dark';
export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  // Current theme mode ('light', 'dark', or 'system')
  themeMode: ThemeMode;
  // Current theme name (light/dark) - computed from mode
  themeName: ThemeName;
  // Last manual theme selection (for when switching from system back to manual)
  lastManualTheme: ThemeMode;
  // Set theme mode (light/dark/system)
  setThemeMode: (mode: ThemeMode) => void;
  // Set theme name (deprecated - use setThemeMode instead)
  setThemeName: (themeName: ThemeName) => void;
  // Toggle between light and dark
  toggleTheme: () => void;
  // Get current theme name
  getCurrentTheme: () => ThemeName;
  // Get isDark boolean
  getIsDark: () => boolean;
  // Boolean to check if the theme is dark
  isDark: boolean;
  // Get device color scheme
  getDeviceColorScheme: () => 'light' | 'dark' | null;
}

// Helper function to get theme name based on mode
const getThemeName = (mode: ThemeMode): ThemeName => {
  if (mode === 'system') {
    // When in system mode, use device's color scheme
    const colorScheme = Appearance.getColorScheme();
    return colorScheme === 'dark' ? 'dark' : 'light';
  }
  return mode;
};

// Create the theme store with persistence
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      themeMode: 'system',
      themeName: 'light',
      isDark: false,
      lastManualTheme: 'light',

      setThemeMode: (mode: ThemeMode) => {
        const newThemeName = getThemeName(mode);
        const isDark = newThemeName === 'dark';

        // Update state
        set({
          themeMode: mode,
          themeName: newThemeName,
          isDark,
          lastManualTheme: mode === 'system' ? get().lastManualTheme : mode,
        });
      },

      setThemeName: (themeName: ThemeName) => {
        // This is now a wrapper for setThemeMode for backward compatibility
        get().setThemeMode(themeName);
      },

      toggleTheme: () => {
        const { themeMode } = get();

        if (themeMode === 'system') {
          // If currently in system mode, toggle to opposite of current system theme
          const currentBaseTheme = Appearance.getColorScheme() || 'light';
          const newMode = currentBaseTheme === 'light' ? 'dark' : 'light';
          get().setThemeMode(newMode);
        } else {
          // Toggle between light and dark
          const newMode = themeMode === 'light' ? 'dark' : 'light';
          get().setThemeMode(newMode);
        }
      },

      getCurrentTheme: () => {
        return get().themeName;
      },

      getIsDark: () => {
        return get().isDark;
      },

      getDeviceColorScheme: () => {
        return Appearance.getColorScheme() as 'light' | 'dark';
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
        isDark: state.isDark,
        lastManualTheme: state.lastManualTheme,
      }),
      // On rehydration, apply the stored theme mode
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Apply theme mode
          state.setThemeMode(state.themeMode);
        }
      },
    },
  ),
);

// Export default for backward compatibility
export default useThemeStore;
