import { router } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';

import { Column } from '../components/ui';
import { useLanguageWithTranslation } from '../i18n/LanguageContext';

export default function AboutScreen() {
  const { t, isRTL } = useLanguageWithTranslation();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Column style={styles.content} gap={32}>
        <Column gap={24}>
          <Text style={[styles.title, isRTL && styles.textRTL]}>
            {t('about.title')}
          </Text>
          <Text style={[styles.description, isRTL && styles.textRTL]}>
            {t('about.description')}
          </Text>
        </Column>

        <Column gap={16}>
          <Text style={[styles.featureTitle, isRTL && styles.textRTL]}>
            {t('about.features.title')}
          </Text>
          <Column gap={8}>
            <Text style={[styles.feature, isRTL && styles.textRTL]}>
              • {t('about.features.systemFonts')}
            </Text>
            <Text style={[styles.feature, isRTL && styles.textRTL]}>
              • {t('about.features.minimalColors')}
            </Text>
            <Text style={[styles.feature, isRTL && styles.textRTL]}>
              • {t('about.features.cleanTypography')}
            </Text>
            <Text style={[styles.feature, isRTL && styles.textRTL]}>
              • {t('about.features.responsiveDesign')}
            </Text>
          </Column>
        </Column>

        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <Text style={styles.buttonText}>{t('buttons.goBack')}</Text>
        </TouchableOpacity>
      </Column>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[8],
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[6],
  },
  description: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
    lineHeight: theme.typography.lineHeight.relaxed,
    marginBottom: theme.spacing[8],
  },
  featureTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  feature: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.secondary,
  },
  button: {
    backgroundColor: theme.colors.interactive.primary.default,
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[8],
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  textRTL: {
    textAlign: 'left',
  },
}));
