import React, { useEffect } from 'react';
import {
  ToastProvider as RNToastProvider,
  useToast,
} from 'react-native-toast-notifications';

import { setToastInstance } from '@/lib/services/toast';

import { CustomToast } from './CustomToast';

// Internal component to get the toast instance and set it in our service
function ToastInstanceManager() {
  const toast = useToast();

  useEffect(() => {
    // Set toast instance on mount
    setToastInstance(toast);

    // Clean up on unmount
    return () => setToastInstance(null);
  }, [toast]);

  return null;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

// Main toast provider that wraps the app
export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <RNToastProvider
      placement="top"
      duration={4000}
      animationType="slide-in"
      animationDuration={250}
      offsetTop={40}
      offsetBottom={40}
      swipeEnabled={true}
      // Use our CustomToast for all toast types
      renderToast={(toast) => <CustomToast {...toast} />}
    >
      <ToastInstanceManager />
      {children}
    </RNToastProvider>
  );
}
