/**
 * Font Configuration
 *
 * This file maps font weights to the actual Acumin Pro font files
 * that are available in the assets/fonts directory.
 */

export const fonts = {
  // Regular weights
  light: 'AcuminPro-Light',
  normal: 'AcuminPro-Book',
  medium: 'AcuminPro-Medium',
  semibold: 'AcuminPro-Semibold',
  bold: 'AcuminPro-Bold',
  black: 'AcuminPro-Black',

  // Italic weights
  lightItalic: 'AcuminPro-LightItalic',
  normalItalic: 'AcuminPro-BookItalic',
  mediumItalic: 'AcuminPro-MediumItalic',
  semiboldItalic: 'AcuminPro-SemiboldItalic',
  boldItalic: 'AcuminPro-BoldItalic',
  blackItalic: 'AcuminPro-BlackItalic',
} as const;

export type FontWeight = keyof typeof fonts;
