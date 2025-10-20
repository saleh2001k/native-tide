/* eslint-disable @typescript-eslint/no-explicit-any */
// ./components/CustomStack.tsx
import type { StackNavigationOptions } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { withLayoutContext } from 'expo-router';

// Creates a stack navigator that can be used within Expo Router's layout system.
const { Navigator } = createStackNavigator();

export const CustomStack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator,
  any,
  any
>(Navigator);
