import type { ImageLoadEventData, ImageProps } from 'expo-image';
import { Image as NImage } from 'expo-image';
import { Skeleton } from 'moti/skeleton';
import React, { useCallback, useRef, useState } from 'react';
import type {
  DimensionValue,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { StyleSheet, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useTheme } from '@/providers/ThemeProvider';

export type ImgProps = ImageProps;

export const Image = NImage;

export const preloadImages = (sources: string[]) => {
  NImage.prefetch(sources);
};

export type ShimmerImageProps = ImgProps & {
  shimmerColor?: string;
  backgroundColor?: string;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export const ShimmerImage = ({
  onLoad,
  style,
  containerStyle,
  backgroundColor: customBgColor,
  ...props
}: ShimmerImageProps) => {
  const { styles } = useStyles(stylesheet);
  const { isDark } = useTheme();
  const isLoadedRef = useRef(false);
  const [shouldShowSkeleton, setShouldShowSkeleton] = useState(true);

  // Determine color mode based on app theme
  const colorMode = isDark ? 'dark' : 'light';

  const handleLoad = useCallback(
    (event: ImageLoadEventData) => {
      isLoadedRef.current = true;
      setShouldShowSkeleton(false);
      onLoad?.(event);
    },
    [onLoad],
  );

  // Default background color based on theme
  const defaultBgColor = isDark ? '#1F1F1F' : '#F5F5F5';
  const bgColor = customBgColor || defaultBgColor;

  return (
    <View style={[styles.container, containerStyle]}>
      <NImage
        style={[StyleSheet.absoluteFill, style]}
        onLoad={handleLoad}
        {...props}
      />

      {shouldShowSkeleton && (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: bgColor }]}>
          <Skeleton
            colorMode={colorMode}
            height="100%"
            width="100%"
            radius={0}
          />
        </View>
      )}
    </View>
  );
};

/**
 * Component for displaying circular images (avatars, etc.)
 */
export function CircleImage({
  size = 40,
  style,
  ...props
}: ShimmerImageProps & {
  size?: number;
}) {
  const circleStyle: ImageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <ShimmerImage
      style={[circleStyle, style]}
      containerStyle={{ width: size, height: size, borderRadius: size / 2 }}
      {...props}
    />
  );
}

/**
 * Component for displaying images with specific aspect ratio
 */
export function AspectRatioImage({
  width = '100%',
  aspectRatio = 1,
  style,
  ...props
}: ShimmerImageProps & {
  width?: DimensionValue;
  aspectRatio?: number;
}) {
  const calculatedStyle: ImageStyle = {
    width,
    aspectRatio,
  };

  return <ShimmerImage style={[calculatedStyle, style]} {...props} />;
}

// Define the stylesheet with proper typing
const stylesheet = createStyleSheet({
  container: {
    overflow: 'hidden',
    minWidth: 20,
    minHeight: 20,
  },
  shimmer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
