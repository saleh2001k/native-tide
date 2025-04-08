import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import type { Language } from '@/lib/store/languageStore';
import { useLanguageStore } from '@/lib/store/languageStore';

const LanguageSelector = () => {
  const { t } = useTranslation();
  const { styles } = useStyles(stylesheet);
  const { language, setLanguage } = useLanguageStore();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, language === 'en' && styles.activeButton]}
          onPress={() => handleLanguageChange('en')}
        >
          <Text
            style={[
              styles.buttonText,
              language === 'en' && styles.activeButtonText,
            ]}
          >
            {t('settings.english')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, language === 'ar' && styles.activeButton]}
          onPress={() => handleLanguageChange('ar')}
        >
          <Text
            style={[
              styles.buttonText,
              language === 'ar' && styles.activeButtonText,
            ]}
          >
            {t('settings.arabic')}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>{t('settings.direction')}</Text>
      <View style={styles.buttonRow} />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.border,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textDim,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    backgroundColor: theme.colors.background,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.separator,
  },
  activeButton: {
    borderColor: theme.colors.tint,
    backgroundColor: theme.colors.tint,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  activeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
}));

export default LanguageSelector;
