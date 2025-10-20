/**
 * Theme Definitions
 *
 * Defines the complete theme structure using design tokens.
 * Each theme provides semantic color mappings and component-specific styles.
 */

import type { FontSizeScale } from './tokens';
import {
  borderRadius,
  colors,
  scaleFontSize,
  shadows,
  spacing,
  typography,
} from './tokens';

// Function to create typography with scaled font sizes
const createScaledTypography = (scale: FontSizeScale = 'default') => ({
  ...typography,
  fontSize: {
    xs: scaleFontSize(typography.fontSize.xs, scale),
    sm: scaleFontSize(typography.fontSize.sm, scale),
    base: scaleFontSize(typography.fontSize.base, scale),
    lg: scaleFontSize(typography.fontSize.lg, scale),
    xl: scaleFontSize(typography.fontSize.xl, scale),
    '2xl': scaleFontSize(typography.fontSize['2xl'], scale),
    '3xl': scaleFontSize(typography.fontSize['3xl'], scale),
    '4xl': scaleFontSize(typography.fontSize['4xl'], scale),
    '5xl': scaleFontSize(typography.fontSize['5xl'], scale),
    '6xl': scaleFontSize(typography.fontSize['6xl'], scale),
    '7xl': scaleFontSize(typography.fontSize['7xl'], scale),
    '8xl': scaleFontSize(typography.fontSize['8xl'], scale),
    '9xl': scaleFontSize(typography.fontSize['9xl'], scale),
  },
});

// Base theme structure that all themes extend
const createBaseTheme = (fontScale: FontSizeScale = 'default') => ({
  typography: createScaledTypography(fontScale),
  spacing,
  borderRadius,
  shadows,

  // Component-specific tokens
  components: {
    button: {
      height: {
        sm: 32,
        md: 40,
        lg: 48,
        xl: 56,
      },
      padding: {
        sm: { horizontal: spacing[3], vertical: spacing[2] },
        md: { horizontal: spacing[4], vertical: spacing[3] },
        lg: { horizontal: spacing[6], vertical: spacing[4] },
        xl: { horizontal: spacing[8], vertical: spacing[5] },
      },
    },
    input: {
      height: {
        sm: 32,
        md: 40,
        lg: 48,
      },
      padding: {
        horizontal: spacing[3],
        vertical: spacing[2],
      },
    },
    card: {
      padding: spacing[4],
      borderRadius: borderRadius.lg,
    },
  },
});

// Light theme factory
export const createLightTheme = (fontScale: FontSizeScale = 'default') =>
  ({
    ...createBaseTheme(fontScale),
    colors: {
      // Background colors
      background: {
        primary: colors.white,
        secondary: colors.gray[50],
        tertiary: colors.gray[100],
        elevated: colors.white,
        overlay: 'rgba(0, 0, 0, 0.5)',
      },

      // Surface colors
      surface: {
        primary: colors.white,
        secondary: colors.gray[50],
        tertiary: colors.gray[100],
        accent: colors.gray[200],
        error: colors.gray[200],
        warning: colors.gray[200],
        success: colors.gray[200],
        info: colors.gray[200],
      },

      // Text colors
      text: {
        primary: colors.black,
        secondary: colors.gray[600],
        tertiary: colors.gray[500],
        disabled: colors.gray[400],
        inverse: colors.white,
        accent: colors.gray[800],
        error: colors.gray[800],
        warning: colors.gray[800],
        success: colors.gray[800],
        info: colors.gray[800],
        white: colors.white,
        black: colors.black,
      },

      // Border colors
      border: {
        primary: colors.gray[200],
        secondary: colors.gray[300],
        accent: colors.gray[300],
        error: colors.gray[300],
        warning: colors.gray[300],
        success: colors.gray[300],
        info: colors.gray[300],
      },

      // Interactive colors
      interactive: {
        primary: {
          default: colors.black,
          hover: colors.gray[800],
          pressed: colors.gray[700],
          disabled: colors.gray[300],
        },
        secondary: {
          default: colors.gray[200],
          hover: colors.gray[300],
          pressed: colors.gray[400],
          disabled: colors.gray[200],
        },
        destructive: {
          default: colors.gray[800],
          hover: colors.gray[700],
          pressed: colors.gray[600],
          disabled: colors.gray[300],
        },
      },

      // Status colors
      status: {
        error: colors.gray[800],
        warning: colors.gray[700],
        success: colors.gray[600],
        info: colors.gray[500],
      },

      // Raw color tokens for direct access
      raw: colors,
    },
  }) as const;

// Dark theme factory
export const createDarkTheme = (fontScale: FontSizeScale = 'default') =>
  ({
    ...createBaseTheme(fontScale),
    colors: {
      // Background colors
      background: {
        primary: colors.black,
        secondary: colors.gray[950],
        tertiary: colors.gray[900],
        elevated: colors.gray[800],
        overlay: 'rgba(0, 0, 0, 0.7)',
      },

      // Surface colors
      surface: {
        primary: colors.gray[900],
        secondary: colors.gray[800],
        tertiary: colors.gray[700],
        accent: colors.gray[600],
        error: colors.gray[600],
        warning: colors.gray[600],
        success: colors.gray[600],
        info: colors.gray[600],
      },

      // Text colors
      text: {
        primary: colors.white,
        secondary: colors.gray[300],
        tertiary: colors.gray[400],
        disabled: colors.gray[500],
        inverse: colors.black,
        accent: colors.gray[200],
        error: colors.gray[200],
        warning: colors.gray[200],
        success: colors.gray[200],
        info: colors.gray[200],
        white: colors.white,
        black: colors.black,
      },

      // Border colors
      border: {
        primary: colors.gray[700],
        secondary: colors.gray[600],
        accent: colors.gray[500],
        error: colors.gray[500],
        warning: colors.gray[500],
        success: colors.gray[500],
        info: colors.gray[500],
      },

      // Interactive colors
      interactive: {
        primary: {
          default: colors.white,
          hover: colors.gray[200],
          pressed: colors.gray[300],
          disabled: colors.gray[600],
        },
        secondary: {
          default: colors.gray[700],
          hover: colors.gray[600],
          pressed: colors.gray[500],
          disabled: colors.gray[700],
        },
        destructive: {
          default: colors.gray[200],
          hover: colors.gray[300],
          pressed: colors.gray[400],
          disabled: colors.gray[600],
        },
      },

      // Status colors
      status: {
        error: colors.gray[200],
        warning: colors.gray[300],
        success: colors.gray[400],
        info: colors.gray[500],
      },

      // Raw color tokens for direct access
      raw: colors,
    },
  }) as const;
// Default themes (backward compatibility)
export const lightTheme = createLightTheme();
export const darkTheme = createDarkTheme();

// Export all themes with font scale support
export const createThemes = (fontScale: FontSizeScale = 'default') => ({
  light: createLightTheme(fontScale),
  dark: createDarkTheme(fontScale),
});

// Default themes object
export const themes = createThemes();

// Theme names type
export type ThemeName = keyof typeof themes;
