import { UnistylesRegistry } from 'react-native-unistyles';

import { getItem } from '@/lib/services/storage';
import type { Theme } from '@/theme';
import type { ThemeName } from '@/theme/colors';
import {
  darkTheme,
  desertTheme,
  forestTheme,
  lightTheme,
  midnightTheme,
  nightBlueTheme,
  oceanTheme,
  sepiaTheme,
} from '@/theme/colors';

type AppBreakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

type AppThemes = {
  light: Theme;
  dark: Theme;
  sepia: Theme;
  nightBlue: Theme;
  forest: Theme;
  ocean: Theme;
  midnight: Theme;
  desert: Theme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

// Get initial theme from storage or default to light
const getInitialTheme = (): ThemeName => {
  const storedTheme = getItem<ThemeName>('app_theme');
  return storedTheme || 'light';
};

// Register themes and breakpoints
UnistylesRegistry.addBreakpoints({
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
});

UnistylesRegistry.addThemes({
  light: lightTheme,
  dark: darkTheme,
  sepia: sepiaTheme,
  nightBlue: nightBlueTheme,
  forest: forestTheme,
  ocean: oceanTheme,
  midnight: midnightTheme,
  desert: desertTheme,
});

// Always get the fresh theme from storage on startup
// This ensures perfect sync between app state and theme
const initialTheme = getInitialTheme();

// Set the initial theme from storage or use default
UnistylesRegistry.addConfig({
  initialTheme,
  adaptiveThemes: false, // Turn off adaptive themes to prevent auto switching
});
