import type { Theme } from './index';
import { spacing } from './spacing';
import { timing } from './timing';
import { typography } from './typography';

// Palette type definition to enforce consistency
type ColorPalette = {
  neutral100: string;
  neutral200: string;
  neutral300: string;
  neutral400: string;
  neutral500: string;
  neutral600: string;
  neutral700: string;
  neutral800: string;
  neutral900: string;

  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;

  secondary100: string;
  secondary200: string;
  secondary300: string;
  secondary400: string;
  secondary500: string;

  accent100: string;
  accent200: string;
  accent300: string;
  accent400: string;
  accent500: string;

  angry100: string;
  angry500: string;

  overlay20: string;
  overlay50: string;
};

// Light theme palette
const lightPalette: ColorPalette = {
  neutral100: '#FFFFFF',
  neutral200: '#F4F2F1',
  neutral300: '#E6E6E6',
  neutral400: '#D1D1D1',
  neutral500: '#ABABAB',
  neutral600: '#858585',
  neutral700: '#5F5F5F',
  neutral800: '#3A3A3A',
  neutral900: '#121212',

  primary100: '#D1E9FF',
  primary200: '#A3D3FF',
  primary300: '#75BDFF',
  primary400: '#47A7FF',
  primary500: '#1991FF',
  primary600: '#0070CC',

  secondary100: '#E8F5F8',
  secondary200: '#D1EBF2',
  secondary300: '#A3D7E5',
  secondary400: '#75C3D9',
  secondary500: '#47AFCC',

  accent100: '#FFF3D1',
  accent200: '#FFE7A3',
  accent300: '#FFDB75',
  accent400: '#FFCF47',
  accent500: '#FFC319',

  angry100: '#FFF1F0',
  angry500: '#E63E2F',

  overlay20: 'rgba(58, 58, 58, 0.2)',
  overlay50: 'rgba(58, 58, 58, 0.5)',
};

// Dark theme palette
const darkPalette: ColorPalette = {
  neutral100: '#121212',
  neutral200: '#1E1E1E',
  neutral300: '#2C2C2C',
  neutral400: '#3A3A3A',
  neutral500: '#5F5F5F',
  neutral600: '#858585',
  neutral700: '#ABABAB',
  neutral800: '#D1D1D1',
  neutral900: '#F4F2F1',

  primary100: '#0070CC',
  primary200: '#1991FF',
  primary300: '#47A7FF',
  primary400: '#75BDFF',
  primary500: '#A3D3FF',
  primary600: '#D1E9FF',

  secondary100: '#47AFCC',
  secondary200: '#75C3D9',
  secondary300: '#A3D7E5',
  secondary400: '#D1EBF2',
  secondary500: '#E8F5F8',

  accent100: '#FFC319',
  accent200: '#FFCF47',
  accent300: '#FFDB75',
  accent400: '#FFE7A3',
  accent500: '#FFF3D1',

  angry100: '#4D1814',
  angry500: '#E63E2F',

  overlay20: 'rgba(18, 18, 18, 0.2)',
  overlay50: 'rgba(18, 18, 18, 0.5)',
};

// Sepia theme palette
const sepiaPalette: ColorPalette = {
  neutral100: '#FFF7E6',
  neutral200: '#F4E8D1',
  neutral300: '#E6D5B8',
  neutral400: '#C4B59B',
  neutral500: '#A69780',
  neutral600: '#847661',
  neutral700: '#635744',
  neutral800: '#423A2F',
  neutral900: '#211D17',

  primary100: '#FFE0B2',
  primary200: '#FFCC80',
  primary300: '#FFB74D',
  primary400: '#FFA726',
  primary500: '#FF9800',
  primary600: '#FB8C00',

  secondary100: '#D7CCC8',
  secondary200: '#BCAAA4',
  secondary300: '#A1887F',
  secondary400: '#8D6E63',
  secondary500: '#795548',

  accent100: '#FFECB3',
  accent200: '#FFE082',
  accent300: '#FFD54F',
  accent400: '#FFCA28',
  accent500: '#FFC107',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  overlay20: 'rgba(66, 58, 47, 0.2)',
  overlay50: 'rgba(66, 58, 47, 0.5)',
};

// Night Blue theme palette
const nightBluePalette: ColorPalette = {
  neutral100: '#121417',
  neutral200: '#1F2933',
  neutral300: '#52606D',
  neutral400: '#616E7C',
  neutral500: '#7B8794',
  neutral600: '#9AA5B1',
  neutral700: '#CBD2D9',
  neutral800: '#E4E7EB',
  neutral900: '#F5F7FA',

  primary100: '#1E88E5',
  primary200: '#42A5F5',
  primary300: '#64B5F6',
  primary400: '#90CAF9',
  primary500: '#BBDEFB',
  primary600: '#E3F2FD',

  secondary100: '#3F51B5',
  secondary200: '#7986CB',
  secondary300: '#9FA8DA',
  secondary400: '#C5CAE9',
  secondary500: '#E8EAF6',

  accent100: '#29B6F6',
  accent200: '#4FC3F7',
  accent300: '#81D4FA',
  accent400: '#B3E5FC',
  accent500: '#E1F5FE',

  angry100: '#FFEBEE',
  angry500: '#F44336',

  overlay20: 'rgba(31, 41, 51, 0.2)',
  overlay50: 'rgba(31, 41, 51, 0.5)',
};

// Forest theme palette
const forestPalette: ColorPalette = {
  neutral100: '#F5F7F2',
  neutral200: '#E8EBE4',
  neutral300: '#D1D6CC',
  neutral400: '#B3BAA9',
  neutral500: '#939B87',
  neutral600: '#727A67',
  neutral700: '#535A49',
  neutral800: '#363D2E',
  neutral900: '#1E231A',

  primary100: '#D4E4D0',
  primary200: '#B5D1AE',
  primary300: '#94BD8B',
  primary400: '#73A968',
  primary500: '#528945',
  primary600: '#3D6933',

  secondary100: '#E6DFD4',
  secondary200: '#D4C5B3',
  secondary300: '#C1AA91',
  secondary400: '#AD8F6E',
  secondary500: '#8B6B47',

  accent100: '#FCF0DD',
  accent200: '#F8E0B6',
  accent300: '#F4D08E',
  accent400: '#F0C067',
  accent500: '#ECB040',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  overlay20: 'rgba(54, 61, 46, 0.2)',
  overlay50: 'rgba(54, 61, 46, 0.5)',
};

// Ocean theme palette
const oceanPalette: ColorPalette = {
  neutral100: '#F0F7F9',
  neutral200: '#E1EEF2',
  neutral300: '#C3DEE6',
  neutral400: '#A4CDD9',
  neutral500: '#85BBCC',
  neutral600: '#669AB0',
  neutral700: '#487994',
  neutral800: '#2B5978',
  neutral900: '#0E3A5C',

  primary100: '#D4E9F7',
  primary200: '#A9D3EF',
  primary300: '#7EBDE7',
  primary400: '#53A7DF',
  primary500: '#2891D7',
  primary600: '#1E74AC',

  secondary100: '#E1F2F4',
  secondary200: '#C3E5E9',
  secondary300: '#A5D8DE',
  secondary400: '#87CBD3',
  secondary500: '#69BEC8',

  accent100: '#E0F4F1',
  accent200: '#C2E9E3',
  accent300: '#A3DED5',
  accent400: '#85D3C7',
  accent500: '#66C8B9',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  overlay20: 'rgba(14, 58, 92, 0.2)',
  overlay50: 'rgba(14, 58, 92, 0.5)',
};

// Midnight theme palette
const midnightPalette: ColorPalette = {
  neutral100: '#0A0A0F',
  neutral200: '#13131F',
  neutral300: '#1C1C2E',
  neutral400: '#25253D',
  neutral500: '#2E2E4C',
  neutral600: '#45456E',
  neutral700: '#5C5C90',
  neutral800: '#8282B4',
  neutral900: '#A8A8D8',

  primary100: '#2B2640',
  primary200: '#3C3459',
  primary300: '#4D4273',
  primary400: '#5E508C',
  primary500: '#6F5EA6',
  primary600: '#8878B7',

  secondary100: '#1F2B40',
  secondary200: '#2C3D59',
  secondary300: '#394F73',
  secondary400: '#46618C',
  secondary500: '#5373A6',

  accent100: '#402B3D',
  accent200: '#593C56',
  accent300: '#734D6F',
  accent400: '#8C5E88',
  accent500: '#A66FA1',

  angry100: '#40262B',
  angry500: '#A6394A',

  overlay20: 'rgba(10, 10, 15, 0.2)',
  overlay50: 'rgba(10, 10, 15, 0.5)',
};

// Desert theme palette
const desertPalette: ColorPalette = {
  neutral100: '#FAF6F0',
  neutral200: '#F2EBE1',
  neutral300: '#E6D9C7',
  neutral400: '#D9C7AD',
  neutral500: '#CCB593',
  neutral600: '#B39C73',
  neutral700: '#997F53',
  neutral800: '#806633',
  neutral900: '#664D13',

  primary100: '#F7E6D4',
  primary200: '#EFCDA9',
  primary300: '#E7B47E',
  primary400: '#DF9B53',
  primary500: '#D78228',
  primary600: '#AC681E',

  secondary100: '#F4E1D7',
  secondary200: '#E9C3AF',
  secondary300: '#DEA587',
  secondary400: '#D3875F',
  secondary500: '#C86937',

  accent100: '#F1F4D7',
  accent200: '#E3E9AF',
  accent300: '#D5DE87',
  accent400: '#C7D35F',
  accent500: '#B9C837',

  angry100: '#F2D6CD',
  angry500: '#C03403',

  overlay20: 'rgba(102, 77, 19, 0.2)',
  overlay50: 'rgba(102, 77, 19, 0.5)',
};

// Function to generate theme from palette
const createThemeFromPalette = (
  palette: ColorPalette,
  isDark: boolean,
  primary = palette.primary500,
  text = isDark ? palette.neutral900 : palette.neutral800,
  background = isDark ? palette.neutral200 : palette.neutral100,
): Theme => ({
  colors: {
    palette,
    transparent: 'rgba(0, 0, 0, 0)',
    text,
    textDim: isDark ? palette.neutral700 : palette.neutral600,
    background,
    border: palette.neutral400,
    tint: primary,
    tintInactive: palette.neutral300,
    separator: palette.neutral300,
    error: palette.angry500,
    errorBackground: palette.angry100,
  },
  spacing,
  typography,
  timing,
  isDark,
});

// Create all themes using the function
export const lightTheme = createThemeFromPalette(lightPalette, false);
export const darkTheme = createThemeFromPalette(darkPalette, true);
export const sepiaTheme = createThemeFromPalette(sepiaPalette, false);
export const nightBlueTheme = createThemeFromPalette(nightBluePalette, true);
export const forestTheme = createThemeFromPalette(forestPalette, false);
export const oceanTheme = createThemeFromPalette(oceanPalette, false);
export const midnightTheme = createThemeFromPalette(midnightPalette, true);
export const desertTheme = createThemeFromPalette(desertPalette, false);

// Export all palettes for potential custom use
export const palettes = {
  light: lightPalette,
  dark: darkPalette,
  sepia: sepiaPalette,
  nightBlue: nightBluePalette,
  forest: forestPalette,
  ocean: oceanPalette,
  midnight: midnightPalette,
  desert: desertPalette,
};

// Helper to get all theme names
export const themeNames = [
  'light',
  'dark',
  'sepia',
  'nightBlue',
  'forest',
  'ocean',
  'midnight',
  'desert',
] as const;

// Theme name type
export type ThemeName = (typeof themeNames)[number];

// Map theme names to actual theme objects
export const themes: Record<ThemeName, Theme> = {
  light: lightTheme,
  dark: darkTheme,
  sepia: sepiaTheme,
  nightBlue: nightBlueTheme,
  forest: forestTheme,
  ocean: oceanTheme,
  midnight: midnightTheme,
  desert: desertTheme,
};

export const globalColors = {
  success: '#43A047',
  error: '#E53935',
  info: '#2196F3',
  warning: '#FFB300',
  gray: '#9E9E9E',
};
