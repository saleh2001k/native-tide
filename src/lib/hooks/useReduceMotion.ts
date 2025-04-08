import { useState, useEffect } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

/**
 * Custom hook to track the reduce motion accessibility setting.
 * This is useful for disabling or modifying animations when the user
 * has "Reduce Motion" enabled in their device settings.
 * 
 * @returns An object containing:
 * - isReduceMotionEnabled: boolean indicating if reduce motion is enabled
 * - shouldReduceMotion: function that returns true if animations should be reduced
 * - getAnimationDuration: function that adjusts animation duration based on settings
 */
export function useReduceMotion() {
  const [isReduceMotionEnabled, setIsReduceMotionEnabled] = useState(false);

  useEffect(() => {
    // Check the initial value
    AccessibilityInfo.isReduceMotionEnabled().then(
      (reducedMotionEnabled) => {
        setIsReduceMotionEnabled(reducedMotionEnabled);
      }
    );

    // Set up a listener for changes to the reduce motion setting
    const reduceMotionChangedSubscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      (reducedMotionEnabled) => {
        setIsReduceMotionEnabled(reducedMotionEnabled);
      }
    );

    // Clean up the subscription when the component unmounts
    return () => {
      reduceMotionChangedSubscription.remove();
    };
  }, []);

  /**
   * Helper function that determines if animations should be reduced
   * @param forceEnable Optional param to override the system setting
   * @returns Boolean indicating if animations should be reduced
   */
  const shouldReduceMotion = (forceEnable?: boolean) => {
    if (forceEnable !== undefined) {
      return forceEnable;
    }
    return isReduceMotionEnabled;
  };

  /**
   * Adjust animation duration based on reduce motion settings
   * @param normalDuration Duration to use when reduce motion is off
   * @param reducedDuration Duration to use when reduce motion is on
   * @returns Appropriate duration based on accessibility settings
   */
  const getAnimationDuration = (normalDuration: number, reducedDuration: number = 0) => {
    return isReduceMotionEnabled ? reducedDuration : normalDuration;
  };

  /**
   * Get appropriate animation type based on reduce motion settings
   * For Moti/Reanimated animations
   * @param normalType Animation type to use normally
   * @param reducedType Animation type when reduce motion is enabled
   * @returns The appropriate animation type
   */
  const getAnimationType = (normalType: string, reducedType: string = 'timing') => {
    return isReduceMotionEnabled ? reducedType : normalType;
  };

  return {
    isReduceMotionEnabled,
    shouldReduceMotion,
    getAnimationDuration,
    getAnimationType,
  };
} 