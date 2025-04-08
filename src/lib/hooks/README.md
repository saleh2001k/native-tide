# Accessibility Hooks

## useReduceMotion Hook

This hook helps detect and respond to the "Reduce Motion" accessibility setting on both iOS and Android devices. This allows your application to provide a more accessible experience for users who have motion sensitivity or vestibular disorders.

### Usage

```tsx
import { useReduceMotion } from '@/lib/hooks/useReduceMotion';

function MyComponent() {
  const { 
    isReduceMotionEnabled, 
    shouldReduceMotion, 
    getAnimationDuration, 
    getAnimationType 
  } = useReduceMotion();

  // Use in conditionals
  if (isReduceMotionEnabled) {
    // Provide alternative non-animated UI
  }

  // Use in Reanimated animations
  useEffect(() => {
    if (shouldReduceMotion()) {
      // Use a simple timing animation or none at all
      myAnimatedValue.value = withTiming(100, { duration: 100 });
    } else {
      // Use spring animation with bounce effects
      myAnimatedValue.value = withSpring(100, { damping: 10 });
    }
  }, [myAnimatedValue, shouldReduceMotion]);

  // Helper for animation durations
  const duration = getAnimationDuration(
    normalDuration: 1000,  // Duration when reduce motion is off
    reducedDuration: 100   // Duration when reduce motion is on
  );

  return (
    // Component JSX
  );
}
```

### With Moti

```tsx
import { useReduceMotion } from '@/lib/hooks/useReduceMotion';
import { MotiView } from 'moti';

function MyComponent() {
  const { isReduceMotionEnabled } = useReduceMotion();

  return (
    {isReduceMotionEnabled ? (
      // Simplified animation when reduce motion is enabled
      <MotiView 
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'timing',
          duration: 100,
        }}
      >
        <Text>Content</Text>
      </MotiView>
    ) : (
      // Full animation when reduce motion is disabled
      <MotiView 
        from={{ opacity: 0, scale: 0.8, translateY: 20 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          scale: {
            type: 'spring',
            damping: 10,
            mass: 1,
            stiffness: 100,
          }
        }}
      >
        <Text>Content</Text>
      </MotiView>
    )}
  );
}
```

### Hook API

- `isReduceMotionEnabled`: Boolean indicating if reduce motion is currently enabled in the device settings
- `shouldReduceMotion(forceEnable?: boolean)`: Function that returns true if animations should be reduced
- `getAnimationDuration(normalDuration: number, reducedDuration: number = 0)`: Returns the appropriate animation duration based on settings
- `getAnimationType(normalType: string, reducedType: string = 'timing')`: Returns the appropriate animation type based on settings

### Platform Support

- **iOS:** Uses the "Reduce Motion" setting from Accessibility settings
- **Android:** Uses the "Remove animations" setting from Accessibility settings or "Transition Animation Scale" in Developer options 