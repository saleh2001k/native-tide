# Lib Directory

This directory contains a collection of utilities, hooks, services, and stores for your React Native application.

## Structure

```
lib/
├── hooks/        # Custom React hooks
├── services/     # Service classes for API and other integrations
├── store/        # State management stores
└── utils/        # Utility functions and helpers
    ├── helpers/  # Specialized helper functions
    └── ...       # Other utility files
```

## Utilities

The `utils` directory contains various utility functions for common tasks in React Native development:

- **Platform utilities**: Functions to detect platform (iOS, Android, Web)
- **Dimension utilities**: Functions for responsive design and screen dimensions
- **Formatting utilities**: Functions for formatting text, numbers, dates, etc.
- **Validation utilities**: Functions for validating inputs such as email, phone, etc.
- **Storage utilities**: Functions for working with AsyncStorage
- **Device utilities**: Functions for device-specific features
- **Network utilities**: Functions for network connectivity and requests

## Custom Hooks

The `hooks` directory contains custom React hooks for common tasks:

- **useKeyboard**: Hook for keyboard events and dimensions
- **useAppState**: Hook for app state changes (active, background, inactive)
- **useBackHandler**: Hook for handling Android back button

## State Management

The `store` directory contains Zustand stores for state management, with utilities for creating stores with selectors and persistence.

## Services

The `services` directory contains service classes for API integration, authentication, analytics, etc.

## Usage

Import utilities and hooks directly from the `lib` directory:

```javascript
// Import specific utilities
import { isIOS, isAndroid, formatCurrency } from '@/lib/utils';

// Or use the Device object for platform utilities
import { Device } from '@/lib/utils';

// Import hooks
import { useKeyboard, useAppState } from '@/lib/hooks';
```

## Examples

### Platform Detection

```javascript
import { isIOS, isAndroid, isWeb } from '@/lib/utils';

function MyComponent() {
  return (
    <View>
      {isIOS && <Text>This is iOS-specific content</Text>}
      {isAndroid && <Text>This is Android-specific content</Text>}
      {isWeb && <Text>This is Web-specific content</Text>}
    </View>
  );
}
```

### Responsive Dimensions

```javascript
import { responsiveWidth, responsiveHeight } from '@/lib/utils';

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(300),
    height: responsiveHeight(200),
  },
});
```

### Keyboard Hook

```javascript
import { useKeyboard } from '@/lib/hooks';

function KeyboardAwareComponent() {
  const { keyboardShown, keyboardHeight } = useKeyboard();
  
  return (
    <View style={{ paddingBottom: keyboardShown ? keyboardHeight : 0 }}>
      {/* Component content */}
    </View>
  );
}
``` 