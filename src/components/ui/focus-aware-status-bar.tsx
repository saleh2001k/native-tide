import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { Platform } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';

import { useTheme } from '@/providers/ThemeProvider';

type Props = { hidden?: boolean };
export const FocusAwareStatusBar = ({ hidden = false }: Props) => {
  const isFocused = useIsFocused();
  const { isDark } = useTheme();

  if (Platform.OS === 'web') return null;

  return isFocused ? (
    <SystemBars style={isDark ? 'dark' : 'light'} hidden={hidden} />
  ) : null;
};
