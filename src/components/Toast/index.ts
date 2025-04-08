import { ToastService } from '@/lib/services/toast';

import { ToastProvider } from './ToastProvider';

// Export the ToastProvider for React components
export { ToastProvider };

// Export a direct API that can be used outside of React components (in plain JS/TS functions)
export const Toast = {
  /**
   * Show a success toast notification
   * @param message The message to display
   * @param options Additional options for the toast
   */
  success: ToastService.success,

  /**
   * Show an error toast notification
   * @param message The message to display
   * @param options Additional options for the toast
   */
  error: ToastService.error,

  /**
   * Show an info toast notification
   * @param message The message to display
   * @param options Additional options for the toast
   */
  info: ToastService.info,

  /**
   * Show a warning toast notification
   * @param message The message to display
   * @param options Additional options for the toast
   */
  warning: ToastService.warning,

  /**
   * Show a custom toast notification
   * @param options Toast options including message, title, status, etc.
   */
  custom: ToastService.custom,

  /**
   * Hide a specific toast or all toasts
   * @param id Optional toast ID to hide. If not provided, all toasts will be hidden.
   */
  hide: ToastService.hide,

  /**
   * Hide all toasts
   */
  hideAll: ToastService.hideAll,

  /**
   * Update an existing toast
   * @param id The ID of the toast to update
   * @param options New options for the toast
   */
  update: ToastService.update,

  /**
   * Show a toast with custom options
   * @param options Toast options
   */
  show: ToastService.show,
};
