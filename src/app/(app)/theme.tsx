import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

export default function ThemeTab() {
  const { styles } = useStyles(stylesheet);

  // Get current theme name as string
  const themeName = UnistylesRuntime.themeName;

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    UnistylesRuntime.setTheme(newTheme);
  };

  // Color palette based on current theme
  const themeColors =
    UnistylesRuntime.themeName === 'light'
      ? {
          background: '#FFFFFF',
          text: '#000000',
          primary: '#3498db',
          secondary: '#e74c3c',
          tertiary: '#2ecc71',
          neutral: '#95a5a6',
        }
      : {
          background: '#121212',
          text: '#FFFFFF',
          primary: '#2980b9',
          secondary: '#c0392b',
          tertiary: '#27ae60',
          neutral: '#7f8c8d',
        };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Theme Settings</Text>

      <View style={styles.themeSelector}>
        <Text style={styles.sectionTitle}>Current Theme</Text>
        <View style={styles.themeRow}>
          <View
            style={[
              styles.themeOption,
              themeName === 'light' && styles.selectedTheme,
            ]}
          >
            <View style={[styles.themePreview, styles.lightThemePreview]} />
            <Text style={styles.themeLabel}>Light</Text>
          </View>
          <View
            style={[
              styles.themeOption,
              themeName === 'dark' && styles.selectedTheme,
            ]}
          >
            <View style={[styles.themePreview, styles.darkThemePreview]} />
            <Text style={styles.themeLabel}>Dark</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
          <Text style={styles.buttonText}>Toggle Theme</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.colorPalette}>
        <Text style={styles.sectionTitle}>Color Palette</Text>

        {Object.entries(themeColors).map(([colorName, colorValue]) => (
          <View key={colorName} style={styles.colorRow}>
            <View
              style={[styles.colorSwatch, { backgroundColor: colorValue }]}
            />
            <View style={styles.colorInfo}>
              <Text style={styles.colorName}>{colorName}</Text>
              <Text style={styles.colorValue}>{colorValue}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
  },
  themeSelector: {
    marginBottom: 30,
    backgroundColor: theme.colors.primary,
    padding: 20,
    borderRadius: 10,
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  themeOption: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  selectedTheme: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  themePreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
  lightThemePreview: {
    backgroundColor: '#FFFFFF',
  },
  darkThemePreview: {
    backgroundColor: '#121212',
  },
  themeLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorPalette: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    padding: 20,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,0.3)',
  },
  colorInfo: {
    flex: 1,
  },
  colorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    textTransform: 'capitalize',
  },
  colorValue: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
  },
}));
