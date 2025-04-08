# Native Tide

<h1 align="center">
  <img alt="logo" src="./assets/icon.png" width="124px" style="border-radius:10px"/><br/>
Native Tide </h1>

A comprehensive React Native starter kit with dynamic multi-theme system, authentication setup, and best practices using `react-native-unistyles`.

## Development Status

> **Note:** Native Tide is currently in version 1.0 of its structure and is still in development mode. While it's functional and ready for use, we're continuously improving the codebase, adding features, and addressing feedback from the community. You might encounter some rough edges or areas that need refinement.
>
> **⚠️ UNDER CONSTRUCTION ⚠️** - This project is actively being developed. Some features may be incomplete or subject to change. We appreciate your patience and welcome contributions to help improve Native Tide.

## Features

- **Dynamic Theme System**: 8 beautiful themes to choose from
- **Type-Safe**: Fully typed theme definitions
- **Authentication Ready**: Pre-configured auth flows
- **Internationalization**: Multi-language support with i18n
- **Navigation**: Expo Router for file-based routing
- **State Management**: Zustand store setup
- **API Integration**: Axios setup with interceptors
- **Form Handling**: React Hook Form integration
- **Linting**: ESLint and Prettier setup

## Available Themes

| Theme Name | Description                               |
| ---------- | ----------------------------------------- |
| light      | Classic light theme with blue accents     |
| dark       | Dark theme with inverted colors           |
| sepia      | Warm, paper-like theme with amber accents |
| nightBlue  | Dark blue theme with bright accents       |
| forest     | Natural green theme with earth tones      |
| ocean      | Calming blue theme with teal accents      |
| midnight   | Dark theme with purple accents            |
| desert     | Warm, sandy theme with orange accents     |

## How to Use the Styling System

### Theme Configuration

The styling system is built on `react-native-unistyles` and provides a comprehensive theme system:

1. **Theme Structure**: All theme definitions are in the `src/theme` directory

   - `colors.ts` - Color palette and theme color definitions
   - `typography.ts` - Font families, sizes and styles
   - `spacing.ts` - Consistent spacing values
   - `timing.ts` - Animation timing presets

2. **Creating Stylesheets**:

```jsx
import { createStyleSheet, useStyles } from 'react-native-unistyles';

// In your component:
function MyComponent() {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Styled Text</Text>
    </View>
  );
}

// Define your stylesheet:
const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: 8,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.size.md,
    fontWeight: 'bold',
  },
}));
```

3. **Changing Themes**:

```jsx
import { UnistylesRuntime } from 'react-native-unistyles';

// Toggle between light and dark
const toggleTheme = () => {
  const newTheme = UnistylesRuntime.themeName === 'light' ? 'dark' : 'light';
  UnistylesRuntime.setTheme(newTheme);
};

// Set a specific theme
UnistylesRuntime.setTheme('ocean');

// Get current theme name
const currentTheme = UnistylesRuntime.themeName;
```

4. **Responsive Design**:

```jsx
// Access the current breakpoint
const breakpoint = UnistylesRuntime.breakpoint;

// Create responsive styles
const stylesheet = createStyleSheet((theme) => ({
  container: {
    // Base styles
    padding: theme.spacing.sm,

    // Breakpoint-specific styles
    '@md': {
      padding: theme.spacing.md,
    },
    '@lg': {
      padding: theme.spacing.lg,
      flexDirection: 'row',
    },
  },
}));
```

## Project Structure

```
src/
├── api/                   # API integration layer
│   ├── common/            # API configuration and clients
│   └── types/             # API request/response types
├── app/                   # Expo Router screens
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── _layout.tsx    # Tab navigation layout
│   │   ├── home.tsx       # Home tab screen
│   │   ├── profile.tsx    # Profile tab screen
│   │   └── theme.tsx      # Theme settings tab
│   ├── _layout.tsx        # Root navigation layout
│   └── index.tsx          # Entry point screen
├── components/            # Reusable UI components
│   ├── Toast/             # Toast notification components
│   └── ui/                # Core UI components (Button, Text, Image, etc.)
├── devtools/              # Development tools (Reactotron)
├── i18n/                  # Internationalization
│   └── locales/           # Language translations
├── lib/                   # Core utilities
│   ├── hooks/             # Custom React hooks
│   ├── services/          # Services (storage, toast, etc.)
│   ├── store/             # Zustand store setup
│   └── utils/             # Utility functions
├── providers/             # Context providers
├── theme/                 # Theme definitions
│   ├── colors.ts          # Color definitions
│   ├── spacing.ts         # Spacing constants
│   ├── typography.ts      # Typography definitions
│   └── timing.ts          # Animation timing
└── unistyles.ts           # Unistyles configuration
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- iOS: XCode and CocoaPods
- Android: Android Studio and JDK

### Installation

1. Clone this repository
2. Install dependencies:

```bash
cd native-tide
yarn
```

### Running the app

```bash
# Start the app
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android
```

## Learn More

- [Unistyles documentation](https://www.unistyl.es)
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
- [Zustand documentation](https://github.com/pmndrs/zustand)
- [React Native documentation](https://reactnative.dev/docs/getting-started)

## Inspiration

Native Tide shares ideas and best practices with other popular React Native starter kits in the community:

- [Obytes Starter](https://starter.obytes.com/) - A comprehensive React Native template that includes the latest Expo SDK, authentication flows, and best practices for React Native development.
- [Ignite CLI](https://docs.infinite.red/ignite-cli/) - The battle-tested React Native boilerplate by Infinite Red, which has been actively developed for over seven years and provides proven patterns for building React Native apps.

While inspired by these excellent projects, Native Tide combines their best ideas with our own approach to provide a modern, flexible, and feature-rich starting point for your next React Native project.
