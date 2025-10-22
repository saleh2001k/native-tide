import { Dimensions, PixelRatio, Platform } from 'react-native';

/**
 * Detect if the app is running on iOS
 */
export const isIOS = Platform.OS === 'ios';

/**
 * Detect if the app is running on Android
 */
export const isAndroid = Platform.OS === 'android';

/**
 * Detect if the app is running on Web
 */
export const isWeb = Platform.OS === 'web';

/**
 * Get the current platform (ios, android, web)
 */
export const currentPlatform = Platform.OS;

/**
 * Check if the app is running on a tablet
 * This is a simple check based on screen dimensions
 */
export const isTablet = (): boolean => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  return aspectRatio <= 1.6 && Math.max(width, height) >= 900;
};

/**
 * Check if the app is running in landscape mode
 */
export const isLandscape = (): boolean => {
  const { width, height } = Dimensions.get('window');
  return width > height;
};

/**
 * Get platform-specific value
 * @param ios The value to return on iOS
 * @param android The value to return on Android
 * @param web The value to return on Web
 * @returns The value for the current platform
 */
export function getPlatformValue<T>(ios: T, android: T, web: T = android): T {
  if (isIOS) return ios;
  if (isAndroid) return android;
  return web;
}

/**
 * Convert device independent pixels to pixels
 * @param dp The dp to convert to pixels
 * @returns The pixel value
 */
export const dpToPixel = (dp: number): number =>
  PixelRatio.getPixelSizeForLayoutSize(dp);

/**
 * Convert pixels to device independent pixels
 * @param px The pixels to convert to dp
 * @returns The dp value
 */
export const pixelToDp = (px: number): number =>
  PixelRatio.roundToNearestPixel(px);

/**
 * Get platform specific version
 * @returns The platform version as a number
 */
export const getPlatformVersion = (): number => {
  const version = Platform.Version;
  if (isIOS) {
    return parseInt(version as string, 10);
  }
  return version as number;
};

/**
 * Check if the device has notch (iOS only)
 * This is a simple check based on iOS model identifiers
 */
export const hasNotch = (): boolean => {
  if (!isIOS) return false;
  const { height, width } = Dimensions.get('window');
  return (
    (Platform.OS === 'ios' &&
      !Platform.isPad &&
      !Platform.isTV &&
      height >= 812) ||
    width >= 812
  );
};
