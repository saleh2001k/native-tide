import React from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';

import { useLanguage } from '../../i18n/LanguageContext';

interface RowProps extends ViewProps {
  children: React.ReactNode;
  gap?: number;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  reverse?: boolean;
}

export const Row: React.FC<RowProps> = ({
  children,
  gap,
  justifyContent = 'flex-start',
  alignItems = 'center',
  reverse = false,
  style,
  ...props
}) => {
  const { isRTL } = useLanguage();

  return (
    <View
      style={[
        {
          flexDirection: isRTL ? 'row-reverse' : 'row',
          justifyContent,
          alignItems,
          gap,
        },
        reverse && { flexDirection: isRTL ? 'row' : 'row-reverse' },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
