import NetInfo from '@react-native-community/netinfo';

/**
 * Check if the device is connected to the internet
 * @returns Promise resolving to true if connected, false otherwise
 */
export const isConnected = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected || false;
  } catch (error) {
    console.error('Error checking network connection:', error);
    return false;
  }
};

/**
 * Check if the device has a wifi connection
 * @returns Promise resolving to true if connected to wifi, false otherwise
 */
export const isWifiConnected = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    return state.type === 'wifi';
  } catch (error) {
    console.error('Error checking wifi connection:', error);
    return false;
  }
};

/**
 * Check if the device has a cellular connection
 * @returns Promise resolving to true if connected to cellular, false otherwise
 */
export const isCellularConnected = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    return state.type === 'cellular';
  } catch (error) {
    console.error('Error checking cellular connection:', error);
    return false;
  }
};

/**
 * Add a network connectivity change listener
 * @param callback The callback function to execute when connectivity changes
 * @returns An unsubscribe function to remove the listener
 */
export const addNetworkListener = (
  callback: (isConnected: boolean) => void
): (() => void) => {
  return NetInfo.addEventListener(state => {
    callback(state.isConnected || false);
  });
};

/**
 * Get detailed network information
 * @returns Promise resolving to network details
 */
export const getNetworkDetails = async (): Promise<any> => {
  try {
    return await NetInfo.fetch();
  } catch (error) {
    console.error('Error getting network details:', error);
    return {
      type: 'unknown',
      isConnected: false,
      isInternetReachable: false,
      details: null,
    };
  }
};

/**
 * Check if the device is connected to a metered network (e.g., cellular)
 * @returns Promise resolving to true if on a metered connection, false otherwise
 */
export const isMeteredConnection = async (): Promise<boolean> => {
  try {
    const state = await NetInfo.fetch();
    return state.details?.isConnectionExpensive || false;
  } catch (error) {
    console.error('Error checking if connection is metered:', error);
    return false;
  }
};

/**
 * Retry a network request with exponential backoff
 * @param fn The function to retry (should return a Promise)
 * @param retries The maximum number of retries (default: 3)
 * @param delay The initial delay in milliseconds (default: 1000)
 * @param backoffFactor The factor to multiply the delay by after each retry (default: 2)
 * @returns Promise resolving to the result of the function
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000,
  backoffFactor = 2
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
    
    return retryWithBackoff(fn, retries - 1, delay * backoffFactor, backoffFactor);
  }
}; 