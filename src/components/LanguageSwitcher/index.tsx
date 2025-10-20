import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { useLanguageWithTranslation } from '../../i18n/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage, isRTL } =
    useLanguageWithTranslation();

  const onLanguageChange = (language: string) => {
    changeLanguage(language);
  };

  const changeToEnglish = () => {
    onLanguageChange('en');
  };

  const changeToArabic = () => {
    onLanguageChange('ar');
  };

  return (
    <View style={[styles.container, isRTL && styles.containerRTL]}>
      <TouchableOpacity
        style={[styles.button, currentLanguage === 'en' && styles.activeButton]}
        onPress={changeToEnglish}
      >
        <Text
          style={[
            styles.buttonText,
            currentLanguage === 'en' && styles.activeButtonText,
          ]}
        >
          EN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, currentLanguage === 'ar' && styles.activeButton]}
        onPress={changeToArabic}
      >
        <Text
          style={[
            styles.buttonText,
            currentLanguage === 'ar' && styles.activeButtonText,
          ]}
        >
          عربي
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface.secondary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing[1],
    gap: theme.spacing[1],
  },
  containerRTL: {
    flexDirection: 'row-reverse',
  },
  button: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    borderRadius: theme.borderRadius.md,
    minWidth: 50,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: theme.colors.interactive.primary.default,
  },
  buttonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
  },
  activeButtonText: {
    color: theme.colors.text.inverse,
  },
}));
