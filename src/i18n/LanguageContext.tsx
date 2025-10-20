import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import i18n, { isRTL } from './index';

interface LanguageContextType {
  currentLanguage: string;
  isRTL: boolean;
  changeLanguage: (language: string) => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Custom hook that combines useTranslation with language context
export const useLanguageWithTranslation = () => {
  const { t, i18n: i18nInstance } = useTranslation();
  const { currentLanguage, isRTL, changeLanguage } = useLanguage();

  return {
    t,
    currentLanguage,
    isRTL,
    changeLanguage,
    i18n: i18nInstance,
  };
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isRTLMode, setIsRTLMode] = useState(isRTL(i18n.language));

  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
      setCurrentLanguage(language);
      setIsRTLMode(isRTL(language));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error changing language:', error);
    }
  };

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
      setIsRTLMode(isRTL(lng));
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        isRTL: isRTLMode,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
