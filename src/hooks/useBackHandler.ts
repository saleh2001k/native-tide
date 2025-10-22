import { useEffect } from 'react';
import { BackHandler } from 'react-native';

/**
 * Custom hook to handle Android hardware back button press
 * @param callback The function to execute when the back button is pressed
 * @param dependencies Optional array of dependencies that should trigger resubscription
 */
export const useBackHandler = (
  callback: () => boolean | null | undefined,
): void => {
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return callback() || false;
      },
    );

    // Clean up subscription on unmount
    return () => subscription.remove();
  }, [callback]);
};

/**
 * Custom hook to disable the Android hardware back button
 */
export const useDisableBackButton = (): void => {
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    // Clean up subscription on unmount
    return () => subscription.remove();
  }, []);
};

/**
 * Custom hook to handle Android hardware back button press with confirmation dialog
 * @param options Configuration options for the confirmation
 * @param dependencies Optional array of dependencies that should trigger resubscription
 */
export const useBackHandlerWithConfirmation = (options: {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}): void => {
  useEffect(() => {
    const handleBackPress = () => {
      try {
        // In a real app, you would show a confirmation dialog here
        // This is a simplified version that just calls onConfirm
        // You'd typically use Alert.alert here
        options.onConfirm();
        return true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error handling back button with confirmation:', error);
        return false;
      }
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    // Clean up subscription on unmount
    return () => subscription.remove();
  }, [options]);
};
