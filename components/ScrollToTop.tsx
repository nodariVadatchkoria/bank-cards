'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="scroll-to-top"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '3rem',
        height: '3rem',
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#1d4ed8';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#2563eb';
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = '2px solid #60a5fa';
        e.currentTarget.style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = 'none';
        e.currentTarget.style.outlineOffset = '0';
      }}
      aria-label="Scroll to top"
    >
      <ChevronUp style={{ width: '1.5rem', height: '1.5rem' }} />
    </button>
  );
}
