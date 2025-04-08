import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Custom hook to track app state (active, background, inactive)
 * @returns Current app state and previous app state
 */
export const useAppState = () => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  const [previousAppState, setPreviousAppState] = useState<AppStateStatus | null>(null);

  useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      setPreviousAppState(appState);
      setAppState(nextAppState);
    }

    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Clean up subscription on unmount
    return () => {
      subscription.remove();
    };
  }, [appState]);

  return {
    appState,
    previousAppState,
    isActive: appState === 'active',
    isBackground: appState === 'background',
    isInactive: appState === 'inactive',
    wasActive: previousAppState === 'active',
    wasBackground: previousAppState === 'background',
    wasInactive: previousAppState === 'inactive',
    changed: previousAppState !== null && previousAppState !== appState,
    becameActive: previousAppState !== null && previousAppState !== 'active' && appState === 'active',
    becameInactive: previousAppState !== null && previousAppState === 'active' && appState !== 'active',
  };
}; 