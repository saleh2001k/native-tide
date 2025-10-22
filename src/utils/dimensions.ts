import { Dimensions, PixelRatio, StatusBar } from 'react-native';

import { isIOS } from './platform';

/**
 * Get screen width
 */
export const screenWidth = Dimensions.get('window').width;

/**
 * Get screen height
 */
export const screenHeight = Dimensions.get('window').height;

/**
 * Get the status bar height
 * For iOS, it's a fixed value based on the device model (20 or 44)
 * For Android, it's the value from StatusBar.currentHeight
 */
export const statusBarHeight = isIOS
  ? 44 // This is an approximation; iOS X+ has a larger status bar
  : StatusBar.currentHeight || 0;

/**
 * Responsive font size calculation based on screen width
 * @param size The base font size
 * @returns The responsive font size
 */
export const responsiveFontSize = (size: number): number => {
  const scale = screenWidth / 320; // based on standard 320 width
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Calculate responsive width percentage
 * @param widthPercent The width percentage (as a string, e.g., '50%')
 * @returns The width in pixels
 */
export const widthPercentageToDP = (widthPercent: string): number => {
  const percentage = parseFloat(widthPercent);
  return (screenWidth * percentage) / 100;
};

/**
 * Calculate responsive height percentage
 * @param heightPercent The height percentage (as a string, e.g., '50%')
 * @returns The height in pixels
 */
export const heightPercentageToDP = (heightPercent: string): number => {
  const percentage = parseFloat(heightPercent);
  return (screenHeight * percentage) / 100;
};

/**
 * Responsive width calculation based on a fixed design width
 * @param width The width from the design
 * @param designWidth The design width (default: 375 for iPhone X)
 * @returns The responsive width
 */
export const responsiveWidth = (width: number, designWidth = 375): number => {
  return (width * screenWidth) / designWidth;
};

/**
 * Responsive height calculation based on a fixed design height
 * @param height The height from the design
 * @param designHeight The design height (default: 812 for iPhone X)
 * @returns The responsive height
 */
export const responsiveHeight = (
  height: number,
  designHeight = 812,
): number => {
  return (height * screenHeight) / designHeight;
};

/**
 * Responsive vertical padding that accounts for the status bar height
 * @param padding The padding value
 * @returns The responsive padding
 */
export const safeTopPadding = (padding = 0): number => {
  return statusBarHeight + padding;
};

/**
 * Create a listener for dimension changes
 * @param callback The callback function to execute when dimensions change
 * @returns The event subscription which can be used to remove the listener
 */
export const addDimensionsListener = (
  callback: (dimensions: {
    window: { width: number; height: number };
    screen: { width: number; height: number };
  }) => void,
) => {
  return Dimensions.addEventListener('change', ({ window, screen }) => {
    callback({ window, screen });
  });
};
