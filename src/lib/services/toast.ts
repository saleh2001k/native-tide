import React from 'react';
import { StyleSheet } from 'react-native';
import type { ToastType, ToastOptions } from 'react-native-toast-notifications';

// Define toast status types
export type ToastStatus = 'success' | 'error' | 'info' | 'warning' | 'custom';

// Extended toast options
export interface ExtendedToastOptions extends Partial<ToastOptions> {
  message: string;
  title?: string;
  status?: ToastStatus;
  duration?: number;
  position?: 'top' | 'bottom' | 'center';
}

// Default durations for different toast types
const TOAST_DURATIONS = {
  success: 3000,
  error: 5000,
  info: 4000,
  warning: 5000,
  custom: 4000,
};

// Map status to library's toast type
const statusToType: Record<ToastStatus, string> = {
  success: 'success',
  error: 'danger',
  info: 'normal',
  warning: 'warning',
  custom: 'custom',
};

// Global instance to store the toast reference
let toastInstance: ToastType | null = null;

// Function to set the toast instance
export const setToastInstance = (instance: ToastType | null) => {
  toastInstance = instance;
};

// Toast service
export const ToastService = {
  // Show a toast with options
  show: (options: ExtendedToastOptions): string | undefined => {
    const {
      message,
      title,
      status = 'info',
      duration = TOAST_DURATIONS[status],
      position = 'top',
      ...rest
    } = options;

    if (!toastInstance) {
      // eslint-disable-next-line no-console
      console.warn('Toast instance not set. Make sure ToastProvider is rendered.');
      return undefined;
    }

    return toastInstance.show(message, {
      type: statusToType[status],
      placement: position,
      duration,
      data: {
        title,
        status,
        ...options.data,
      },
      ...rest,
    });
  },

  // Hide a toast
  hide: (id?: string): void => {
    if (toastInstance) {
      if (id) {
        toastInstance.hide(id);
      } else {
        toastInstance.hideAll();
      }
    }
  },

  // Hide all toasts
  hideAll: (): void => {
    if (toastInstance && toastInstance.hideAll) {
      toastInstance.hideAll();
    }
  },

  // Success toast
  success: (
    message: string,
    options?: Omit<ExtendedToastOptions, 'message' | 'status'>,
  ): string | undefined => {
    return ToastService.show({ message, status: 'success', ...options });
  },

  // Error toast
  error: (
    message: string,
    options?: Omit<ExtendedToastOptions, 'message' | 'status'>,
  ): string | undefined => {
    return ToastService.show({ message, status: 'error', ...options });
  },

  // Info toast
  info: (
    message: string,
    options?: Omit<ExtendedToastOptions, 'message' | 'status'>,
  ): string | undefined => {
    return ToastService.show({ message, status: 'info', ...options });
  },

  // Warning toast
  warning: (
    message: string,
    options?: Omit<ExtendedToastOptions, 'message' | 'status'>,
  ): string | undefined => {
    return ToastService.show({ message, status: 'warning', ...options });
  },

  // Custom toast
  custom: (options: ExtendedToastOptions): string | undefined => {
    return ToastService.show({ ...options, status: 'custom' });
  },

  // Update a toast
  update: (id: string, options: Partial<ExtendedToastOptions>): void => {
    if (!toastInstance || !id) return;

    const { message, status, ...rest } = options;

    if (message && toastInstance.update) {
      toastInstance.update(id, message, {
        type: status ? statusToType[status as ToastStatus] : undefined,
        ...rest,
      });
    }
  },
};

// Define colors as variables to avoid linter warnings
const colors = {
  shadow: '#000000',
  custom: {
    bg: '#F5F5F5',
    border: '#9E9E9E',
  },
  error: {
    bg: '#FDEDED',
    border: '#E53935',
  },
  info: {
    bg: '#EDF4FF',
    border: '#2196F3',
  },
  success: {
    bg: '#E7F6EA',
    border: '#43A047',
  },
  warning: {
    bg: '#FFF8E5',
    border: '#FFB300',
  },
  closeIcon: '#757575',
};

// Styles for custom toasts
export const toastStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  custom: {
    backgroundColor: colors.custom.bg,
    borderLeftColor: colors.custom.border,
    borderLeftWidth: 4,
  },
  error: {
    backgroundColor: colors.error.bg,
    borderLeftColor: colors.error.border,
    borderLeftWidth: 4,
  },
  info: {
    backgroundColor: colors.info.bg,
    borderLeftColor: colors.info.border,
    borderLeftWidth: 4,
  },
  message: {
    fontSize: 13,
  },
  success: {
    backgroundColor: colors.success.bg,
    borderLeftColor: colors.success.border,
    borderLeftWidth: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  warning: {
    backgroundColor: colors.warning.bg,
    borderLeftColor: colors.warning.border,
    borderLeftWidth: 4,
  },
}); 