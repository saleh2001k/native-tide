import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
    <View
      className={`flex-row bg-gray-50 dark:bg-gray-800 rounded-lg p-1 gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}
    >
      <TouchableOpacity
        className={`px-4 py-2 rounded-md min-w-[50px] items-center ${
          currentLanguage === 'en' ? 'bg-black dark:bg-white' : ''
        }`}
        onPress={changeToEnglish}
      >
        <Text
          className={`text-sm font-medium ${
            currentLanguage === 'en'
              ? 'text-white dark:text-black'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          EN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`px-4 py-2 rounded-md min-w-[50px] items-center ${
          currentLanguage === 'ar' ? 'bg-black dark:bg-white' : ''
        }`}
        onPress={changeToArabic}
      >
        <Text
          className={`text-sm font-medium ${
            currentLanguage === 'ar'
              ? 'text-white dark:text-black'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          عربي
        </Text>
      </TouchableOpacity>
    </View>
  );
};
