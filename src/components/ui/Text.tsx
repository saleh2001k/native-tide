import type { ForwardedRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type {
  StyleProp,
  TextProps as RNTextProps,
  TextStyle,
} from 'react-native';
import { Text as RNText } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { isRTL } from '@/lib/store/languageStore';

// Font sizes with line heights
const $sizeStyles = {
  xxl: { fontSize: 36, lineHeight: 44 },
  xl: { fontSize: 24, lineHeight: 34 },
  lg: { fontSize: 20, lineHeight: 32 },
  md: { fontSize: 18, lineHeight: 26 },
  sm: { fontSize: 16, lineHeight: 24 },
  xs: { fontSize: 14, lineHeight: 21 },
  xxs: { fontSize: 12, lineHeight: 18 },
};

// Font weights
const $fontWeightStyles: Record<
  string,
  { fontWeight: TextStyle['fontWeight'] }
> = {
  normal: { fontWeight: 'normal' },
  semibold: { fontWeight: '500' },
  bold: { fontWeight: 'bold' },
};

type Sizes = keyof typeof $sizeStyles;
type Weights = keyof typeof $fontWeightStyles;
type Presets =
  | 'default'
  | 'bold'
  | 'heading'
  | 'subheading'
  | 'formLabel'
  | 'formHelper';

export interface TextProps extends RNTextProps {
  /**
   * The text to display
   */
  text?: string;
  /**
   * i18n key for translation
   */
  tx?: string;
  /**
   * Optional options to pass to i18n
   */
  txOptions?: Record<string, unknown>;
  /**
   * An optional style override
   */
  style?: StyleProp<TextStyle>;
  /**
   * One of the different types of text presets.
   */
  preset?: Presets;
  /**
   * Text weight modifier.
   */
  weight?: Weights;
  /**
   * Text size modifier.
   */
  size?: Sizes;
  /**
   * Children components.
   */
  children?: ReactNode;
  /**
   * Whether the text is centered.
   */
  textCenter?: boolean;
}

/**
 * Text component that supports styling and i18n translation
 */
export const Text = forwardRef(function Text(
  props: TextProps,
  ref: ForwardedRef<RNText>,
) {
  const {
    weight = 'normal',
    textCenter,
    size = 'sm',
    tx,
    txOptions,
    text,
    children,
    style: $styleOverride,
    ...rest
  } = props;

  const { t } = useTranslation();
  const { styles } = useStyles(stylesheet);

  const preset: Presets = props.preset ?? 'default';

  // Determine content - translated text, direct text, or children
  const content = tx ? t(tx, txOptions) : text || children;

  // Define inline styles as TextStyle objects
  const centerStyle: TextStyle = { textAlign: 'center' };
  const rtlStyle: TextStyle = { writingDirection: 'rtl' };

  return (
    <RNText
      {...rest}
      style={[
        styles.base,
        size && $sizeStyles[size],
        weight && $fontWeightStyles[weight],
        preset === 'bold' && styles.bold,
        preset === 'heading' && styles.heading,
        preset === 'subheading' && styles.subheading,
        preset === 'formLabel' && styles.formLabel,
        preset === 'formHelper' && styles.formHelper,
        textCenter && centerStyle,
        isRTL() && rtlStyle,
        $styleOverride,
      ]}
      ref={ref}
    >
      {content}
    </RNText>
  );
});

// Stylesheet with theme support
const stylesheet = createStyleSheet((theme) => ({
  base: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500',
  },
  formLabel: {
    fontWeight: '500',
  },
  formHelper: {
    fontSize: 14,
    lineHeight: 20,
  },
}));
