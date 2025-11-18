import { router } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Column } from '../components/ui';
import { type ThemeMode, useThemeToggle } from '../hooks/useThemeToggle';
import { useLanguageWithTranslation } from '../i18n/LanguageContext';

export default function AboutScreen() {
  const { t, isRTL } = useLanguageWithTranslation();
  const { themeMode, setThemeMode } = useThemeToggle();

  const handleGoBack = () => {
    router.back();
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <Column className="flex-1 px-6" gap={32}>
        <Column gap={24}>
          <Text
            className={`text-3xl font-bold text-black dark:text-white mb-6 ${isRTL ? 'text-right' : ''}`}
          >
            {t('about.title')}
          </Text>
          <Text
            className={`text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8 ${isRTL ? 'text-right' : ''}`}
          >
            {t('about.description')}
          </Text>
        </Column>

        <Column gap={16}>
          <Text
            className={`text-lg font-semibold text-black dark:text-white ${isRTL ? 'text-right' : ''}`}
          >
            {t('about.features.title')}
          </Text>
          <Column gap={8}>
            <Text
              className={`text-base text-gray-600 dark:text-gray-300 ${isRTL ? 'text-right' : ''}`}
            >
              • {t('about.features.systemFonts')}
            </Text>
            <Text
              className={`text-base text-gray-600 dark:text-gray-300 ${isRTL ? 'text-right' : ''}`}
            >
              • {t('about.features.minimalColors')}
            </Text>
            <Text
              className={`text-base text-gray-600 dark:text-gray-300 ${isRTL ? 'text-right' : ''}`}
            >
              • {t('about.features.cleanTypography')}
            </Text>
            <Text
              className={`text-base text-gray-600 dark:text-gray-300 ${isRTL ? 'text-right' : ''}`}
            >
              • {t('about.features.responsiveDesign')}
            </Text>
          </Column>
        </Column>

        <Column gap={16}>
          <Text
            className={`text-lg font-semibold text-black dark:text-white ${isRTL ? 'text-right' : ''}`}
          >
            Theme Settings
          </Text>
          <Column gap={12}>
            <TouchableOpacity
              className={`flex-row justify-between items-center py-3 px-4 rounded-lg border ${
                themeMode === 'light'
                  ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
              }`}
              onPress={() => handleThemeChange('light')}
            >
              <Text
                className={`text-base text-black dark:text-white font-medium ${isRTL ? 'text-right' : ''}`}
              >
                ☀️ Light Theme
              </Text>
              {themeMode === 'light' && (
                <Text className="text-lg text-black dark:text-white font-bold">
                  ✓
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row justify-between items-center py-3 px-4 rounded-lg border ${
                themeMode === 'dark'
                  ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
              }`}
              onPress={() => handleThemeChange('dark')}
            >
              <Text
                className={`text-base text-black dark:text-white font-medium ${isRTL ? 'text-right' : ''}`}
              >
                🌙 Dark Theme
              </Text>
              {themeMode === 'dark' && (
                <Text className="text-lg text-black dark:text-white font-bold">
                  ✓
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-row justify-between items-center py-3 px-4 rounded-lg border ${
                themeMode === 'system'
                  ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
              }`}
              onPress={() => handleThemeChange('system')}
            >
              <Text
                className={`text-base text-black dark:text-white font-medium ${isRTL ? 'text-right' : ''}`}
              >
                🔄 System Theme
              </Text>
              {themeMode === 'system' && (
                <Text className="text-lg text-black dark:text-white font-bold">
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          </Column>
        </Column>

        <TouchableOpacity
          className="bg-black dark:bg-white py-4 px-8 rounded-lg items-center self-start"
          onPress={handleGoBack}
        >
          <Text className="text-white dark:text-black text-base font-semibold">
            {t('buttons.goBack')}
          </Text>
        </TouchableOpacity>
      </Column>
    </SafeAreaView>
  );
}
