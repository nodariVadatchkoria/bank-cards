'use client';

interface FilterPillsProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  getLabel?: (option: string) => string;
}

export default function FilterPills({ 
  title, 
  options, 
  selected, 
  onChange,
  getLabel 
}: FilterPillsProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <h3 style={{ 
        fontSize: '0.875rem', 
        fontWeight: '500', 
        color: '#374151',
        margin: 0
      }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'colors 0.2s ease-in-out',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: isSelected ? '#2563eb' : '#f3f4f6',
                color: isSelected ? 'white' : '#374151',
                boxShadow: isSelected ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
              }}
              aria-pressed={isSelected}
              aria-label={`${isSelected ? 'Remove' : 'Add'} ${option} filter`}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = '2px solid #60a5fa';
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
                e.currentTarget.style.outlineOffset = '0';
              }}
                          >
              {getLabel ? getLabel(option) : option}
            </button>
          );
        })}
      </div>
    </div>
  );
}