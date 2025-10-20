/**
 * Theme Types
 *
 * Type definitions for the theme system
 */

import type { UnistylesThemes } from 'react-native-unistyles';

export type Theme = UnistylesThemes[keyof UnistylesThemes];

export type ThemeColors = {
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
    overlay: string;
  };
  surface: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
    blue: string;
    green: string;
    red: string;
    yellow: string;
    accent: string;
    error: string;
    warning: string;
    success: string;
    info: string;
    white: string;
    black: string;
  };
  border: {
    primary: string;
    secondary: string;
    accent: string;
    blue: string;
    green: string;
    red: string;
    yellow: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  interactive: {
    primary: {
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
    };
    secondary: {
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
    };
    destructive: {
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
    };
  };
  status: {
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  raw: Record<string, string | Record<string, string>>;
};
