'use client';

import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/useLanguage';
import { Language } from '@/lib/translations';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Array<{ code: Language; name: string; nativeName: string }> = [
    { code: 'en', name: t.english, nativeName: 'English' },
    { code: 'ka', name: t.georgian, nativeName: 'ქართული' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: '0.375rem 0.5rem',
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          fontSize: '0.75rem',
          fontWeight: '500',
          color: '#374151',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
          e.currentTarget.style.borderColor = '#9ca3af';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'white';
          e.currentTarget.style.borderColor = '#d1d5db';
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid #60a5fa';
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
          e.currentTarget.style.outlineOffset = '0';
        }}
        aria-label={t.language}
      >
        <Globe style={{ width: '0.875rem', height: '0.875rem' }} />
        <span>{currentLanguage?.nativeName}</span>
        <ChevronDown 
          style={{ 
            width: '0.875rem', 
            height: '0.875rem',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease-in-out'
          }} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10
            }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '0.25rem',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              zIndex: 20,
              minWidth: '8rem',
              overflow: 'hidden'
            }}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  fontSize: '0.875rem',
                  color: language === lang.code ? '#1d4ed8' : '#374151',
                  backgroundColor: language === lang.code ? '#eff6ff' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  if (language !== lang.code) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (language !== lang.code) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ fontWeight: '500' }}>{lang.nativeName}</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.125rem' }}>
                  {lang.name}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
