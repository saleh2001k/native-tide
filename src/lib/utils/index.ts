/**
 * Utils index file
 * Export all utilities for easy importing
 */

// Platform utilities
export * from './platform';

// Dimension utilities
export * from './dimensions';

// Formatting utilities
export * from './formatting';

// Validation utilities
export * from './validation';

// Storage utilities
export * from './';

// Helper utilities
import * as deviceHelpers from './helpers/device';
export * from './helpers/network';

// Explicitly re-export device helpers except hasNotch
export const {
  checkAndroidPermission,
  requestAndroidPermission,
  openSettings,
  canOpenURL,
  openURL,
  getDeviceId,
  getDeviceOrientation,
  // hasNotch is already exported from platform
} = deviceHelpers;

// Create a convenient object for platform-specific utilities
import * as platform from './platform';
import * as dimensions from './dimensions';

export const Device = {
  ...platform,
  ...dimensions,
  // Add shorthand helpers
  isIOS: platform.isIOS,
  isAndroid: platform.isAndroid,
  isWeb: platform.isWeb,
  width: dimensions.screenWidth,
  height: dimensions.screenHeight,
}; 