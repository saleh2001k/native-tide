# Internationalization (i18n) Setup

This directory contains the internationalization setup for the app with support for English and Arabic languages, including RTL (Right-to-Left) support.

## Structure

```
src/i18n/
├── index.ts                 # i18n configuration
├── LanguageContext.tsx     # Language context and provider
├── locales/
│   ├── en/
│   │   └── common.json     # English translations
│   └── ar/
│       └── common.json     # Arabic translations
└── README.md               # This file
```

## Features

- ✅ **Multi-language support**: English and Arabic
- ✅ **RTL support**: Automatic RTL layout for Arabic
- ✅ **Device language detection**: Automatically detects device language
- ✅ **Language switching**: Dynamic language switching without app restart
- ✅ **Type-safe translations**: TypeScript support for translation keys

## Usage

### Using translations in components

```tsx
import { useLanguage } from '../i18n/LanguageContext';

export default function MyComponent() {
  const { t, isRTL } = useLanguage();

  return (
    <View>
      <Text style={isRTL && styles.textRTL}>{t('welcome.title')}</Text>
    </View>
  );
}
```

### Language switching

```tsx
import { useLanguage } from '../i18n/LanguageContext';

export default function LanguageSwitcher() {
  const { changeLanguage } = useLanguage();

  return (
    <TouchableOpacity onPress={() => changeLanguage('ar')}>
      <Text>Switch to Arabic</Text>
    </TouchableOpacity>
  );
}
```

## Adding new translations

1. Add the translation key to both language files:

   - `src/i18n/locales/en/common.json`
   - `src/i18n/locales/ar/common.json`

2. Use the translation in your component:
   ```tsx
   <Text>{t('new.key')}</Text>
   ```

## RTL Support

The app automatically handles RTL layout for Arabic:

- Text alignment changes to right
- Layout direction reverses
- Icons and UI elements flip appropriately

## Supported Languages

- **English (en)**: Default language
- **Arabic (ar)**: RTL language with full RTL support

## Dependencies

- `react-i18next`: React integration for i18next
- `i18next`: Core internationalization framework
- `expo-localization`: Device locale detection
