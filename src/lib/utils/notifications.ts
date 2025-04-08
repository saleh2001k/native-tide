/* eslint-disable no-undef */
import { Toast } from '@/components/Toast';

/**
 * Utility functions for showing notifications from anywhere in your application
 * These functions don't require React hooks or components
 */

/**
 * Show a notification for successful API response
 * @param message Success message to display
 */
export function notifySuccess(message: string): void {
  Toast.success(message, {
    title: 'Success',
    duration: 3000,
  });
}

/**
 * Show a notification for API errors
 * @param error Error message or object
 */
export function notifyError(error: Error | string): void {
  const message = typeof error === 'string' ? error : error.message;

  Toast.error(message, {
    title: 'Error',
    duration: 5000,
  });
}

/**
 * Show a notification for a network error
 */
export function notifyNetworkError(): void {
  Toast.error('Network connection error. Please check your internet connection.', {
    title: 'Connection Error',
    duration: 5000,
  });
}

/**
 * Show a notification for an authentication error
 */
export function notifyAuthError(): void {
  Toast.warning('Your session has expired. Please log in again.', {
    title: 'Authentication',
    duration: 5000,
  });
}

/**
 * Show an information notification
 * @param message Information message to display
 */
export function notifyInfo(message: string): void {
  Toast.info(message, {
    title: 'Information',
    duration: 4000,
  });
}

/**
 * Example of how to use the Toast API in an API service
 */
export class ApiService {
  static async fetchData(): Promise<{ success: boolean }> {
    try {
      // Show loading toast
      const toastId = Toast.info('Loading data...', {
        title: 'Please wait',
        duration: 10000, // Long duration since we'll manually hide it
      });

      if (!toastId) {
        throw new Error('Failed to create toast notification');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful response
      const data = { success: true };

      // Update toast to show success
      Toast.update(toastId, {
        message: 'Data loaded successfully!',
        title: 'Complete',
        status: 'success',
        duration: 3000,
      });

      return data;
    } catch (error) {
      // Show error toast
      notifyError(error as Error);
      throw error;
    }
  }
}
