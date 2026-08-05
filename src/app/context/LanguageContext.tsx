'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { dictionary, Language } from '@/app/data/dictionary';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof dictionary.es;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isEnPath = pathname ? pathname === '/en' || pathname.startsWith('/en/') : false;
  const initialLang: Language = isEnPath ? 'en' : 'es';

  const [language, setLanguageState] = useState<Language>(initialLang);

  useEffect(() => {
    setLanguageState(initialLang);
  }, [initialLang]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio_lang', lang);

    if (!pathname) return;

    if (lang === 'en') {
      if (!pathname.startsWith('/en')) {
        const targetPath = pathname === '/' ? '/en' : `/en${pathname}`;
        router.push(targetPath);
      }
    } else {
      if (pathname.startsWith('/en')) {
        const targetPath = pathname === '/en' ? '/' : pathname.replace(/^\/en/, '');
        router.push(targetPath || '/');
      }
    }
  };

  const t = dictionary[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
