import React from 'react';
import type { StyleProp } from 'react-native';
import { Text as RNText, type TextProps, type TextStyle } from 'react-native';

import type { TxKeyPath } from '@/i18n';
import { useLanguageWithTranslation } from '@/i18n/LanguageContext';

interface Props extends TextProps {
  tx?: TxKeyPath;
  center?: boolean;
  style?: StyleProp<TextStyle>;
}

export const Text: React.FC<Props> = ({
  children,
  tx,
  center = false,
  style,
  ...props
}) => {
  const { t, isRTL } = useLanguageWithTranslation();
  return (
    <RNText
      style={[
        { textAlign: center ? 'center' : isRTL ? 'right' : 'left' },
        style,
      ]}
      {...props}
    >
      {tx ? t(tx) : children}
    </RNText>
  );
};
