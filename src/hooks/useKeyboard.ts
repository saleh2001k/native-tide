import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react-native';
import { Keyboard, Platform } from 'react-native';

interface KeyboardState {
  keyboardShown: boolean;
  keyboardHeight: number;
  keyboardAnimationDuration: number;
}

/**
 * Custom hook to manage keyboard state in React Native
 * @returns Keyboard state information
 */
export const useKeyboard = (): KeyboardState => {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    keyboardShown: false,
    keyboardHeight: 0,
    keyboardAnimationDuration: 250,
  });

  useEffect(() => {
    const showListener =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';

    const hideListener =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    // Handle keyboard show event
    function handleKeyboardShow(event: KeyboardEvent) {
      const { height, duration } = extractKeyboardData(event);

      setKeyboardState({
        keyboardShown: true,
        keyboardHeight: height,
        keyboardAnimationDuration: duration,
      });
    }

    // Handle keyboard hide event
    function handleKeyboardHide(event: KeyboardEvent) {
      const { duration } = extractKeyboardData(event);

      setKeyboardState({
        keyboardShown: false,
        keyboardHeight: 0,
        keyboardAnimationDuration: duration,
      });
    }

    // Add keyboard event listeners
    const showSubscription = Keyboard.addListener(
      showListener,
      handleKeyboardShow,
    );

    const hideSubscription = Keyboard.addListener(
      hideListener,
      handleKeyboardHide,
    );

    // Clean up event listeners on unmount
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardState;
};

/**
 * Extract keyboard data from keyboard event
 * @param event Keyboard event
 * @returns Keyboard height and animation duration
 */
const extractKeyboardData = (event: KeyboardEvent) => {
  // Get keyboard height
  let height = 0;
  if (Platform.OS === 'ios') {
    height = event.endCoordinates.height;
  } else {
    // On Android, the height is in the event object
    height = event.endCoordinates.height;
  }

  // Get animation duration
  let duration = 250; // Default animation duration
  if (Platform.OS === 'ios') {
    // iOS provides the duration in seconds, convert to ms
    duration = event.duration ? event.duration * 1000 : 250;
  }

  return { height, duration };
};
