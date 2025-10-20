import { Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';

import logger from './loggingService';

// Create storage instances
const mmkvStorage = new MMKV();

// Web storage interface
interface WebStorage {
  getString: (key: string) => string | null;
  set: (key: string, value: string) => void;
  delete: (key: string) => void;
}

// Web storage implementation
const webStorage: WebStorage = {
  getString(key: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  },
  set(key: string, value: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  },
  delete(key: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  },
};

// Export the appropriate storage
export const storage = Platform.OS === 'web' ? webStorage : mmkvStorage;

export function getItem<T>(key: string): T | null {
  try {
    const value = storage.getString(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    logger.error('Error getting item from storage:', error);
    return null;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    logger.error('Error setting item in storage:', error);
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    storage.delete(key);
  } catch (error) {
    logger.error('Error removing item from storage:', error);
  }
}
