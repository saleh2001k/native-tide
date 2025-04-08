/* eslint-disable no-console */
import { Toast } from '@/components/Toast';
import { signOut } from './auth';

/**
 * Auth-related notification utilities
 * These functions integrate our Toast system with auth actions
 */

/**
 * Show a notification for successful login
 */
export function notifySuccessfulLogin(): void {
  Toast.success('You have been signed in successfully', {
    title: 'Welcome',
    duration: 3000,
  });
}

/**
 * Show a notification for successful registration
 */
export function notifySuccessfulRegistration(): void {
  Toast.success('Your account has been created successfully', {
    title: 'Registration Complete',
    duration: 5000,
  });
}

/**
 * Show a notification for failed login attempts
 * @param error Error message or error object
 */
export function notifyLoginError(error?: Error | string): void {
  const message =
    typeof error === 'string' ? error : error?.message || 'Invalid credentials. Please try again.';

  Toast.error(message, {
    title: 'Login Failed',
    duration: 5000,
  });
}

/**
 * Show a notification for session expiration and sign the user out
 */
export function notifySessionExpired(): void {
  // Sign out the user
  signOut();

  // Show the notification
  Toast.warning('Your session has expired. Please sign in again.', {
    title: 'Authentication',
    duration: 5000,
  });
}

/**
 * Show a notification for network errors during authentication
 */
export function notifyAuthNetworkError(): void {
  Toast.error(
    'Unable to connect to the authentication server. Please check your internet connection.',
    {
      title: 'Connection Error',
      duration: 5000,
    },
  );
}

/**
 * Show a notification for password reset requests
 * @param email The email address for the password reset
 */
export function notifyPasswordResetSent(email: string): void {
  Toast.info(`Password reset instructions have been sent to ${email}. Please check your inbox.`, {
    title: 'Password Reset',
    duration: 7000,
  });
}

/**
 * Show a notification for successful password changes
 */
export function notifyPasswordChanged(): void {
  Toast.success('Your password has been updated successfully.', {
    title: 'Password Updated',
    duration: 5000,
  });
}

/**
 * Show a notification for successful logout
 */
export function notifyLoggedOut(): void {
  Toast.info('You have been signed out successfully.', {
    title: 'Signed Out',
    duration: 3000,
  });
}
