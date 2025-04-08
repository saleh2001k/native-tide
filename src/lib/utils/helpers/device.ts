import { Platform, PermissionsAndroid, Linking } from 'react-native';
import { isIOS, isAndroid } from '../platform';

type Permission = keyof typeof PermissionsAndroid.PERMISSIONS;

/**
 * Check if the app has permission to access a specific feature on Android
 * @param permission The permission to check (from PermissionsAndroid.PERMISSIONS)
 * @returns Promise resolving to true if granted, false otherwise
 */
export const checkAndroidPermission = async (permission: Permission): Promise<boolean> => {
  if (!isAndroid) return true; // iOS handles permissions differently

  try {
    const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS[permission]);
    return result;
  } catch (error) {
    console.error('Error checking Android permission:', error);
    return false;
  }
};

/**
 * Request permission to access a specific feature on Android
 * @param permission The permission to request (from PermissionsAndroid.PERMISSIONS)
 * @param rationale The explanation to show to the user
 * @returns Promise resolving to true if granted, false otherwise
 */
export const requestAndroidPermission = async (
  permission: Permission,
  rationale: { title: string; message: string; buttonPositive: string }
): Promise<boolean> => {
  if (!isAndroid) return true; // iOS handles permissions differently

  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS[permission], rationale);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (error) {
    console.error('Error requesting Android permission:', error);
    return false;
  }
};

/**
 * Open device settings page
 * Useful when the user has denied a permission and you want to guide them to settings
 * @returns Promise that resolves when the settings page is opened
 */
export const openSettings = async (): Promise<void> => {
  try {
    if (isIOS) {
      await Linking.openURL('app-settings:');
    } else if (isAndroid) {
      await Linking.openSettings();
    }
  } catch (error) {
    console.error('Error opening settings:', error);
  }
};

/**
 * Check if the app can open a URL
 * @param url The URL to check
 * @returns Promise resolving to true if the URL can be opened, false otherwise
 */
export const canOpenURL = async (url: string): Promise<boolean> => {
  try {
    return await Linking.canOpenURL(url);
  } catch (error) {
    console.error('Error checking if URL can be opened:', error);
    return false;
  }
};

/**
 * Open a URL
 * @param url The URL to open
 * @returns Promise that resolves when the URL is opened
 */
export const openURL = async (url: string): Promise<void> => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn(`Unable to open URL: ${url}`);
    }
  } catch (error) {
    console.error('Error opening URL:', error);
  }
};

/**
 * Get the device's unique identifier
 * @returns A unique device identifier or null if not available
 */
export const getDeviceId = (): string | null => {
  // In a real app, you would use a library like react-native-device-info
  // This is just a placeholder implementation
  return Platform.OS + '-' + Math.random().toString(36).substr(2, 9);
};

/**
 * Get the device's current orientation
 * @returns 'portrait' or 'landscape'
 */
export const getDeviceOrientation = (): 'portrait' | 'landscape' => {
  // In a real app, you would use a library or the Dimensions API
  // This is just a placeholder implementation
  return 'portrait';
};

/**
 * Check if the device has a notch (iOS only)
 * @returns true if the device has a notch, false otherwise
 */
export const hasNotch = (): boolean => {
  if (!isIOS) return false;
  
  // In a real app, you would use a library like react-native-device-info
  // This is just a placeholder implementation
  return true;
}; 