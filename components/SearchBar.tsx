'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Search cards..." 
}: SearchBarProps) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        paddingLeft: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none'
      }}>
        <Search style={{ height: '1.25rem', width: '1.25rem', color: '#9ca3af' }} aria-hidden="true" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          display: 'block',
          width: '100%',
          paddingLeft: '2.5rem',
          paddingRight: '0.75rem',
          paddingTop: '0.75rem',
          paddingBottom: '0.75rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.75rem',
          backgroundColor: 'white',
          color: '#111827',
          fontSize: '1rem',
          lineHeight: '1.25rem'
        }}
        placeholder={placeholder}
        aria-label="Search bank cards"
        onFocus={(e) => {
          e.target.style.outline = 'none';
          e.target.style.borderColor = '#3b82f6';
          e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#d1d5db';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}