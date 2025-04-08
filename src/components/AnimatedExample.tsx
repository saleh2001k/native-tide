import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { useReduceMotion } from '@/lib/hooks/useReduceMotion';

export const AnimatedExample = () => {
  const { isReduceMotionEnabled, shouldReduceMotion } = useReduceMotion();

  // Example with Reanimated
  const offset = useSharedValue(0);

  // Animate on mount
  React.useEffect(() => {
    // Choose animation based on reduce motion preferences
    if (shouldReduceMotion()) {
      // Simple timing animation with shorter duration when reduce motion is enabled
      offset.value = withTiming(100, {
        duration: 100,
        easing: Easing.linear,
      });
    } else {
      // Spring animation with bounce when reduce motion is off
      offset.value = withSpring(100, {
        damping: 10,
        stiffness: 100,
      });
    }
  }, [offset, shouldReduceMotion]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Reduce Motion is: {isReduceMotionEnabled ? 'Enabled' : 'Disabled'}
      </Text>

      <Text style={styles.subtitle}>Moti Animation Example:</Text>
      {isReduceMotionEnabled ? (
        // Simplified animation when reduce motion is enabled
        <MotiView
          style={styles.box}
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'timing',
            duration: 100,
          }}
        >
          <Text style={styles.text}>Moti</Text>
        </MotiView>
      ) : (
        // Full animation when reduce motion is disabled
        <MotiView
          style={styles.box}
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            scale: {
              type: 'spring',
              damping: 10,
              mass: 1,
              stiffness: 100,
            },
          }}
        >
          <Text style={styles.text}>Moti</Text>
        </MotiView>
      )}

      <Text style={styles.subtitle}>Reanimated Example:</Text>
      <Animated.View style={[styles.box, animatedStyle]}>
        <Text style={styles.text}>Reanimated</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
