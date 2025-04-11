import { Link } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

import { useLanguageStore } from '@/lib/store/languageStore';

export default function HomeTab() {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { direction } = useLanguageStore();

  // Get current theme name as string
  const themeName = UnistylesRuntime.themeName;
  // Get current breakpoint for responsive display
  const breakpoint = UnistylesRuntime.breakpoint || 'xs';

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, { direction }]}>
        <Text style={styles.title}>{t('home.title')}</Text>
        {/* <ToastExample /> */}
        {/* <AnimatedExample /> */}
        <View style={styles.card}>
          <Text style={styles.cardText}>
            {t('home.description')} {t('home.currentTheme')}: {themeName}
          </Text>
        </View>

        <View style={styles.breakpointDemo}>
          <Text style={styles.breakpointText}>
            {t('home.currentScreenSize')}: {t(`screenSizes.${breakpoint}`)}
          </Text>
        </View>

        <Link href="/settings" asChild>
          <TouchableOpacity style={styles.navigationButton}>
            <Text style={styles.navigationButtonText}>
              {t('home.goToSettings')}
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  card: {
    backgroundColor: theme.colors.tint,
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  cardText: {
    color: theme.colors.background,
    fontSize: 16,
  },
  breakpointDemo: {
    padding: 15,
    borderWidth: 1,
    borderColor: theme.colors.tint,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  breakpointText: {
    color: theme.colors.text,
  },
  navigationButton: {
    backgroundColor: theme.colors.tint,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  navigationButtonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
}));
