'use client';

import { ReactNode } from 'react';
import { LanguageContext, useLanguageProvider } from '@/lib/useLanguage';

interface LanguageProviderProps {
  children: ReactNode;
}

export default function LanguageProvider({ children }: LanguageProviderProps) {
  const languageState = useLanguageProvider();

  return (
    <LanguageContext.Provider value={languageState}>
      {children}
    </LanguageContext.Provider>
  );
}
