import { useCallback } from 'react';
import { ToastService, ExtendedToastOptions } from '@/lib/services/toast';

/**
 * Hook for using toast notifications
 * @returns Toast notification functions
 */
export const useToast = () => {
  // Show a toast with the given options
  const show = useCallback((options: ExtendedToastOptions) => {
    return ToastService.show(options) || '';
  }, []);

  // Show a success toast
  const success = useCallback(
    (message: string, options?: Omit<ExtendedToastOptions, 'message' | 'status'>) => {
      return ToastService.success(message, options) || '';
    },
    [],
  );

  // Show an error toast
  const error = useCallback(
    (message: string, options?: Omit<ExtendedToastOptions, 'message' | 'status'>) => {
      return ToastService.error(message, options) || '';
    },
    [],
  );

  // Show an info toast
  const info = useCallback(
    (message: string, options?: Omit<ExtendedToastOptions, 'message' | 'status'>) => {
      return ToastService.info(message, options) || '';
    },
    [],
  );

  // Show a warning toast
  const warning = useCallback(
    (message: string, options?: Omit<ExtendedToastOptions, 'message' | 'status'>) => {
      return ToastService.warning(message, options) || '';
    },
    [],
  );

  // Show a custom toast
  const custom = useCallback((options: ExtendedToastOptions) => {
    return ToastService.custom(options) || '';
  }, []);

  // Hide a specific toast by ID or all toasts if no ID is provided
  const hide = useCallback((id?: string) => {
    ToastService.hide(id);
  }, []);

  // Hide all toasts
  const hideAll = useCallback(() => {
    ToastService.hideAll();
  }, []);

  // Update an existing toast
  const update = useCallback((id: string, options: Partial<ExtendedToastOptions>) => {
    ToastService.update(id, options);
  }, []);

  return {
    show,
    success,
    error,
    info,
    warning,
    custom,
    hide,
    hideAll,
    update,
  };
}; 