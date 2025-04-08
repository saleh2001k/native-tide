import type { ComponentType } from 'react';
import React, { Fragment } from 'react';
import type {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { ActivityIndicator, Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Text } from './Text';

type Presets = 'default' | 'filled' | 'reversed';

export interface ButtonAccessoryProps {
  style: StyleProp<ViewStyle>;
  pressableState: PressableStateCallbackType;
  disabled?: boolean;
}

export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string;
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: object;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>;
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>;
  /**
   * An optional style override for the button text when in the "disabled" state.
   */
  disabledTextStyle?: StyleProp<TextStyle>;
  /**
   * One of the different types of button presets.
   */
  preset?: Presets;
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /**
   * disabled prop, accessed directly for declarative styling reasons.
   */
  disabled?: boolean;
  /**
   * An optional style override for the disabled state
   */
  disabledStyle?: StyleProp<ViewStyle>;
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 */
export function Button(props: ButtonProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    disabledTextStyle: $disabledTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    loading,
    disabledStyle: $disabledViewStyleOverride,
    ...rest
  } = props;

  const { styles, theme } = useStyles(stylesheet);
  const preset: Presets = props.preset ?? 'default';

  function $viewStyle({
    pressed,
  }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      styles.base,
      styles[preset],
      $viewStyleOverride,
      pressed && styles[`${preset}Pressed`],
      pressed && $pressedViewStyleOverride,
      (disabled || loading) && styles.disabled,
      (disabled || loading) && $disabledViewStyleOverride,
    ];
  }

  function $textStyle({
    pressed,
  }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      styles.text,
      styles[`${preset}Text`],
      $textStyleOverride,
      pressed && styles[`${preset}TextPressed`],
      pressed && $pressedTextStyleOverride,
      (disabled || loading) && $disabledTextStyleOverride,
    ];
  }

  return (
    <Pressable
      style={$viewStyle}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!(disabled || loading) }}
      {...rest}
      disabled={disabled || loading}
    >
      {(state) => (
        <Fragment>
          {!!LeftAccessory && (
            <LeftAccessory
              style={styles.leftAccessory}
              pressableState={state}
              disabled={disabled}
            />
          )}

          {loading ? (
            <ActivityIndicator
              color={theme.colors.text}
              style={styles.spinner}
            />
          ) : (
            <Text
              tx={tx}
              text={text}
              txOptions={txOptions}
              style={$textStyle(state)}
            >
              {children}
            </Text>
          )}

          {!!RightAccessory && (
            <RightAccessory
              style={styles.rightAccessory}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </Fragment>
      )}
    </Pressable>
  );
}

// Stylesheet with theme support
const stylesheet = createStyleSheet((theme) => ({
  base: {
    flexDirection: 'row',
    minHeight: 56,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },

  // Button presets
  default: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  defaultPressed: {
    backgroundColor: theme.colors.border,
  },
  defaultText: {
    color: theme.colors.text,
  },
  defaultTextPressed: {
    opacity: 0.9,
  },

  filled: {
    backgroundColor: theme.colors.tint,
  },
  filledPressed: {
    backgroundColor: theme.colors.tintInactive,
  },
  filledText: {
    color: '#FFFFFF',
  },
  filledTextPressed: {
    opacity: 0.9,
  },

  reversed: {
    backgroundColor: theme.colors.text,
  },
  reversedPressed: {
    opacity: 0.8,
  },
  reversedText: {
    color: theme.colors.background,
  },
  reversedTextPressed: {
    opacity: 0.9,
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
  },

  // Text base style
  text: {
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    flexShrink: 1,
    flexGrow: 0,
    zIndex: 2,
  },

  // Accessory styles
  leftAccessory: {
    marginRight: 8,
    zIndex: 1,
  },
  rightAccessory: {
    marginLeft: 8,
    zIndex: 1,
  },

  // Loading spinner
  spinner: {
    minHeight: 20,
  },
}));
