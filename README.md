# Native Tide

<h1 align="center">
  <img alt="logo" src="./assets/icon.png" width="124px" style="border-radius:10px"/><br/>
Native Tide </h1>

A comprehensive React Native starter kit with dynamic multi-theme system, authentication setup, and best practices using `nativewind`.

## Development Status

> **Note:** Native Tide is currently in version 1.0 of its structure and is still in development mode. While it's functional and ready for use, we're continuously improving the codebase, adding features, and addressing feedback from the community. You might encounter some rough edges or areas that need refinement.
>
> **⚠️ UNDER CONSTRUCTION ⚠️** - This project is actively being developed. Some features may be incomplete or subject to change. We appreciate your patience and welcome contributions to help improve Native Tide.

## Features

- **Dynamic Theme System**: Light and dark themes with system preference support
- **Type-Safe**: Fully typed theme definitions
- **NativeWind**: Tailwind CSS for React Native
- **Authentication Ready**: Pre-configured auth flows
- **Internationalization**: Multi-language support with i18n
- **Navigation**: Expo Router for file-based routing
- **State Management**: Zustand store setup
- **API Integration**: Axios setup with interceptors
- **Form Handling**: React Hook Form integration
- **Linting**: ESLint and Prettier setup

## Available Themes

| Theme Name | Description                      |
| ---------- | -------------------------------- |
| light      | Classic light theme              |
| dark       | Dark theme with inverted colors  |
| system     | Follows device system preference |

## How to Use the Styling System

### Theme Configuration

The styling system is built on `nativewind` and provides Tailwind CSS utility classes for React Native:

1. **Theme Structure**: All theme definitions are in the `src/theme` directory
   - `themes.ts` - Theme color definitions
   - `tokens.ts` - Design tokens (typography, spacing, etc.)
   - `types.ts` - Type definitions

2. **Using Tailwind Classes**:

```jsx
import { View, Text } from 'react-native';

// In your component:
function MyComponent() {
  return (
    <View className="bg-white dark:bg-black p-4 rounded-lg">
      <Text className="text-black dark:text-white text-base font-bold">
        Styled Text
      </Text>
    </View>
  );
}
```

3. **Changing Themes**:

```jsx
import { useThemeToggle } from '../hooks/useThemeToggle';

// In your component:
function ThemeSettings() {
  const { themeMode, setThemeMode } = useThemeToggle();

  // Toggle between light and dark
  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };

  // Set a specific theme
  setThemeMode('dark');

  // Set to follow system preference
  setThemeMode('system');
}
```

4. **Responsive Design**:

```jsx
// Use Tailwind's responsive prefixes
<View className="p-2 md:p-4 lg:p-6 flex-col lg:flex-row">
  <Text className="text-sm md:text-base lg:text-lg">Responsive Text</Text>
</View>
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
└── theme/                 # Theme definitions
    ├── themes.ts          # Theme color definitions
    ├── tokens.ts          # Design tokens
    ├── types.ts           # Type definitions
    └── breakpoints.ts     # Responsive breakpoints
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

- [NativeWind documentation](https://www.nativewind.dev/)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
- [Zustand documentation](https://github.com/pmndrs/zustand)
- [React Native documentation](https://reactnative.dev/docs/getting-started)

## Inspiration

Native Tide shares ideas and best practices with other popular React Native starter kits in the community:

- [Obytes Starter](https://starter.obytes.com/) - A comprehensive React Native template that includes the latest Expo SDK, authentication flows, and best practices for React Native development.
- [Ignite CLI](https://docs.infinite.red/ignite-cli/) - The battle-tested React Native boilerplate by Infinite Red, which has been actively developed for over seven years and provides proven patterns for building React Native apps.

While inspired by these excellent projects, Native Tide combines their best ideas with our own approach to provide a modern, flexible, and feature-rich starting point for your next React Native project.
