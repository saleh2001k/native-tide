import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useRef } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';

import * as StorageService from '@/lib/services/storage';
import { isDark, useThemeStore } from '@/lib/store/themeStore';
import type { ThemeName } from '@/theme/colors';

// Theme context type
interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  isDark: boolean;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { currentTheme, setTheme } = useThemeStore();
  const appStateRef = useRef(AppState.currentState);
  const themeRef = useRef(currentTheme);

  // Update ref when theme changes
  useEffect(() => {
    themeRef.current = currentTheme;
  }, [currentTheme]);

  // Handle app state changes with more robust approach
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        // Only handle when coming back to active state from background or inactive
        if (
          (appStateRef.current === 'background' ||
            appStateRef.current === 'inactive') &&
          nextAppState === 'active'
        ) {
          // Get the latest saved theme directly from storage
          const savedTheme = StorageService.getItem<ThemeName>('app_theme');

          // Force theme application regardless of what the current theme might be
          if (savedTheme) {
            // Apply it to UnistylesRuntime
            UnistylesRuntime.setTheme(savedTheme);

            // If the store doesn't match storage, update it
            if (themeRef.current !== savedTheme) {
              setTheme(savedTheme);
            }
          } else if (themeRef.current) {
            // If no saved theme but we have a current theme, reapply it
            UnistylesRuntime.setTheme(themeRef.current);
          }
        }

        // Update the ref
        appStateRef.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [setTheme]);

  // Apply the theme on first mount
  useEffect(() => {
    UnistylesRuntime.setTheme(currentTheme);
  }, [currentTheme]);

  // Modified setTheme function that ensures persistence
  const handleSetTheme = (newTheme: ThemeName) => {
    // First save to storage
    StorageService.setItem('app_theme', newTheme);

    // Then update Unistyles
    UnistylesRuntime.setTheme(newTheme);

    // Finally update the store
    setTheme(newTheme);
  };

  // Context value
  const contextValue: ThemeContextType = {
    theme: currentTheme,
    setTheme: handleSetTheme,
    isDark: isDark(currentTheme),
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
