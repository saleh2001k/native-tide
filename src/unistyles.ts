/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 * Unistyles Configuration
 *
 * This file configures Unistyles with themes, breakpoints, and settings.
 * Import this file in your App.tsx to initialize the styling system.
 */

import { StyleSheet } from 'react-native-unistyles';

import { storage, STORAGE_KEYS } from './services';
import { breakpoints, createThemes } from './theme';

// Create themes with default font scale initially
const themes = createThemes('default');

// Declare the Unistyles module types
type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof themes;

// Get stored theme preference from MMKV
const getStoredThemeMode = (): 'light' | 'dark' | 'system' => {
  try {
    const storedData = storage.getString(STORAGE_KEYS.THEME);
    if (storedData) {
      const parsed = JSON.parse(storedData);
      return parsed?.state?.themeMode || 'system';
    }
  } catch {
    // Silently fall back to default
  }
  return 'system'; // Default to system theme
};

const storedThemeMode = getStoredThemeMode();

// Configure Unistyles with themes and breakpoints
StyleSheet.configure({
  themes,
  breakpoints,
  settings: {
    // If stored mode is 'system', enable adaptive themes
    // Otherwise, set the specific initial theme
    ...(storedThemeMode === 'system'
      ? { adaptiveThemes: true }
      : { initialTheme: storedThemeMode }),
  },
});

// Augment the Unistyles types with our custom themes and breakpoints
declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}
