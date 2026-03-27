'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language, translations } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // 1. Check Cookie
    const savedLang = document.cookie
      .split('; ')
      .find(row => row.startsWith('language='))
      ?.split('=')[1] as Language;

    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
      return;
    }

    // 2. Check Browser Language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'fr' || browserLang === 'es') {
      const detectedLang = browserLang as Language;
      setLanguageState(detectedLang);
      document.cookie = `language=${detectedLang}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.cookie = `language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t: translations[language] as typeof translations['en']
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}