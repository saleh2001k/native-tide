import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Column, Row } from '@/components/ui';
import { useLanguageWithTranslation } from '@/i18n/LanguageContext';

export default function HomeScreen() {
  const { t, isRTL } = useLanguageWithTranslation();

  const handleGetStarted = () => {
    router.push('/about');
  };

  const handleLearnMore = () => {
    router.push('/about');
  };

  return (
    <View style={styles.container}>
      <Row style={styles.header} justifyContent="flex-end">
        <LanguageSwitcher />
      </Row>

      <Column style={styles.content} alignItems="center" gap={48}>
        <Column alignItems="center" gap={16}>
          <Text style={[styles.title, isRTL && styles.textRTL]}>
            {t('welcome.title')}
          </Text>
          <Text style={[styles.subtitle, isRTL && styles.textRTL]}>
            {t('welcome.subtitle')}
          </Text>
        </Column>

        <Column gap={16}>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>{t('buttons.getStarted')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleLearnMore}
          >
            <Text style={styles.secondaryButtonText}>
              {t('buttons.learnMore')}
            </Text>
          </TouchableOpacity>
        </Column>
      </Column>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[4],
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing[6],
  },
  title: {
    fontSize: theme.typography.fontSize['4xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing[4],
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing[12],
    lineHeight: theme.typography.lineHeight.relaxed,
  },
  buttonContainer: {
    width: '100%',
    gap: theme.spacing[4],
  },
  button: {
    backgroundColor: theme.colors.interactive.primary.default,
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[8],
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  secondaryButton: {
    backgroundColor: theme.colors.interactive.secondary.default,
    paddingVertical: theme.spacing[4],
    paddingHorizontal: theme.spacing[8],
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
  },
  secondaryButtonText: {
    color: theme.colors.text.primary,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.medium,
  },
  textRTL: {
    textAlign: 'right',
  },
}));
