/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
 * Unistyles Configuration
 *
 * This file configures Unistyles with themes, breakpoints, and settings.
 * Import this file in your App.tsx to initialize the styling system.
 */

import { StyleSheet } from 'react-native-unistyles';

import { breakpoints, createThemes } from './theme';

// Create themes with default font scale initially
const themes = createThemes('default');

// Declare the Unistyles module types
type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof themes;

// Configure Unistyles with themes and breakpoints
StyleSheet.configure({
  themes,
  breakpoints,
  settings: {
    // Note: if adaptiveThemes is true, there is no need to set the initialTheme, it will crash the app if both are set
    initialTheme: 'light', // 👈 Set your default theme here!
    // adaptiveThemes: true, // (optional) enables system theme detectionr
  },
});

// Augment the Unistyles types with our custom themes and breakpoints
declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}
