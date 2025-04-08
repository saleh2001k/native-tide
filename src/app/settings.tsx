import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import LanguageSelector from '@/components/LanguageSelector';
import { useLanguageStore } from '@/lib/store/languageStore';
import { useTheme } from '@/providers/ThemeProvider';
import type { ThemeName } from '@/theme/colors';
import { themeNames } from '@/theme/colors';

export default function Settings() {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { direction } = useLanguageStore();
  const { theme: currentTheme, setTheme } = useTheme();

  // Function to change theme
  const changeTheme = (newTheme: ThemeName) => {
    setTheme(newTheme);
  };

  return (
    <View style={[styles.container, { direction }]}>
      <Text style={styles.title}>{t('settings.title')}</Text>

      <View style={styles.settingCard}>
        <Text style={styles.settingLabel}>{t('settings.currentTheme')}</Text>
        <Text style={styles.settingValue}>{currentTheme}</Text>

        <Text style={styles.sectionTitle}>{t('settings.availableThemes')}</Text>
        <FlatList
          data={themeNames}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.themeList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.themeButton,
                item === currentTheme && styles.activeThemeButton,
              ]}
              onPress={() => changeTheme(item)}
            >
              <Text
                style={[
                  styles.themeButtonText,
                  item === currentTheme && styles.activeThemeButtonText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <LanguageSelector />

      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonOutlineText}>{t('common.back')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 20,
  },
  settingCard: {
    backgroundColor: theme.colors.border,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    color: theme.colors.textDim,
    marginBottom: 8,
  },
  settingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 15,
    textTransform: 'capitalize',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textDim,
    marginTop: 10,
    marginBottom: 10,
  },
  themeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  themeButton: {
    backgroundColor: theme.colors.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    minWidth: '48%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.separator,
  },
  activeThemeButton: {
    borderColor: theme.colors.tint,
    backgroundColor: theme.colors.tint,
  },
  themeButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  activeThemeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: theme.colors.tint,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: theme.colors.tint,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonOutlineText: {
    color: theme.colors.tint,
    fontSize: 16,
    fontWeight: 'bold',
  },
}));
