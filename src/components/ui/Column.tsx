import React from 'react';
import type { ViewProps } from 'react-native';
import { View } from 'react-native';

interface ColumnProps extends ViewProps {
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

export const Column: React.FC<ColumnProps> = ({
  children,
  gap,
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  reverse = false,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'column',
          justifyContent,
          alignItems,
          gap,
        },
        reverse && { flexDirection: 'column-reverse' },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
