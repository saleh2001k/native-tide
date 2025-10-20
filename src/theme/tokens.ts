/**
 * Design System Tokens
 *
 * This file contains the core design tokens that form the foundation
 * of our design system. These tokens are used across all themes.
 */

// Font size scale types
export type FontSizeScale = 'default' | 'lg' | 'xl' | '2xl';

// Font size scaling factors
export const fontSizeScales = {
  default: 1,
  lg: 1.125, // 12.5% larger
  xl: 1.25, // 25% larger
  '2xl': 1.5, // 50% larger
} as const;

// Helper function to scale font sizes
export const scaleFontSize = (
  baseSize: number,
  scale: FontSizeScale,
): number => {
  return Math.round(baseSize * fontSizeScales[scale]);
};

// Minimal color palette
export const colors = {
  // Base colors
  black: '#000000',
  white: '#FFFFFF',

  // Gray scale
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
} as const;

// Typography tokens
export const typography = {
  fontFamily: {
    primary:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
  },

  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
    '8xl': 96,
    '9xl': 128,
  },

  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },

  lineHeight: {
    none: 10,
    tight: 12,
    snug: 14,
    normal: 16,
    relaxed: 18,
    loose: 20,
  },

  letterSpacing: {
    tighter: -0.05,
    tight: -0.025,
    normal: 0,
    wide: 0.025,
    wider: 0.05,
    widest: 0.1,
  },
} as const;

// Spacing tokens
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
} as const;

// Border radius tokens
export const borderRadius = {
  none: 0,
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
} as const;

// Border width tokens
export const borderWidth = {
  0: 0,
  1: 1,
  2: 2,
  4: 4,
  8: 8,
} as const;

// Shadow tokens
export const shadows = {
  sm: {
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
  },
  base: {
    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.1)',
  },
  md: {
    boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  lg: {
    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  xl: {
    boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  '2xl': {
    boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.15)',
  },
} as const;

// Z-index tokens
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Opacity tokens
export const opacity = {
  0: 0,
  5: 0.05,
  10: 0.1,
  20: 0.2,
  25: 0.25,
  30: 0.3,
  40: 0.4,
  50: 0.5,
  60: 0.6,
  70: 0.7,
  75: 0.75,
  80: 0.8,
  90: 0.9,
  95: 0.95,
  100: 1,
} as const;

// Animation durations
export const duration = {
  75: 75,
  100: 100,
  150: 150,
  200: 200,
  300: 300,
  500: 500,
  700: 700,
  1000: 1000,
} as const;

// Easing curves
export const easing = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
} as const;
