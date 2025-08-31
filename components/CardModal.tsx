'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { CardItem } from '@/lib/types';
import { useLanguage } from '@/lib/useLanguage';

interface CardModalProps {
  card: CardItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function CardModal({ card, isOpen, onClose }: CardModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="modal-container"
        style={{
                  backgroundColor: 'white',
        borderRadius: '1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '42rem',
        maxHeight: '95vh',
        overflow: 'auto',
        position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            padding: '0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = '2px solid #60a5fa';
            e.currentTarget.style.outlineOffset = '2px';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.outlineOffset = '0';
          }}
          aria-label={t.close}
        >
          <X style={{ width: '1.5rem', height: '1.5rem', color: '#374151' }} />
        </button>

        {/* Card image */}
        <div 
          className="card-image"
          style={{ 
            position: 'relative', 
            height: '24rem',
            overflow: 'hidden',
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem'
          }}
        >
          <Image
            src={card.image}
            alt={`${card.name} bank card design`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 42rem"
            priority
          />
          
          {/* Card type and network badges */}
          <div style={{ 
            position: 'absolute', 
            top: '1rem', 
            left: '1rem', 
            display: 'flex', 
            gap: '0.5rem' 
          }}>
            <span style={{
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '0.5rem',
              color: '#374151',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              {card.cardType}
            </span>
            <span style={{
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '0.5rem',
              color: '#374151',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              {card.issuerNetwork}
            </span>
          </div>
        </div>

        {/* Card content */}
        <div className="modal-content" style={{ padding: '2rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 
              className="modal-title"
              style={{ 
                fontSize: '1.875rem', 
                fontWeight: '700', 
                color: '#111827', 
                marginBottom: '0.75rem',
                margin: '0 0 0.75rem 0'
              }}
            >
              {card.name}
            </h2>
            {card.description && (
              <p 
                className="modal-description"
                style={{ 
                  fontSize: '1.125rem', 
                  color: '#6b7280', 
                  lineHeight: '1.75',
                  margin: 0
                }}
              >
                {card.description}
              </p>
            )}
          </div>

          {/* Details grid */}
          <div 
            className="modal-grid"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem',
              marginBottom: '2rem'
            }}
          >
            {/* Features */}
            {card.features && card.features.length > 0 && (
              <div>
                <h3 
                  className="modal-section-title"
                  style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600', 
                    color: '#111827', 
                    marginBottom: '0.75rem',
                    margin: '0 0 0.75rem 0'
                  }}
                >
                  {t.features}
                </h3>
                <ul 
                  className="modal-info-list"
                  style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}
                >
                  {card.features.map((feature, index) => (
                    <li 
                      key={index}
                      className="modal-info-item"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        padding: '0.5rem 0'
                      }}
                    >
                      <div style={{
                        width: '0.375rem',
                        height: '0.375rem',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                      <span style={{ fontSize: '1rem', color: '#374151' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Print Configuration */}
            <div>
              <h3 
                className="modal-section-title"
                style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  color: '#111827', 
                  marginBottom: '0.75rem',
                  margin: '0 0 0.75rem 0'
                }}
              >
                {t.printConfig}
              </h3>
              <div 
                className="modal-info-list"
                style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div className="modal-info-item">
                  <span style={{ fontSize: '1rem', color: '#374151', fontWeight: '500' }}>
                    {card.printConfig.name}
                  </span>
                </div>
                <div className="modal-info-item">
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {card.printConfig.dpi} DPI • {card.printConfig.colorProfile} • {card.printConfig.bleedMm}mm bleed
                  </span>
                </div>
                {card.printConfig.finish && (
                  <div className="modal-info-item">
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Finish: {card.printConfig.finish}
                    </span>
                  </div>
                )}
                {card.printConfig.special && card.printConfig.special.length > 0 && (
                  <div className="modal-info-item">
                    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      Special: {card.printConfig.special.join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Fees */}
            {card.fees && (
              <div>
                <h3 
                  className="modal-section-title"
                  style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600', 
                    color: '#111827', 
                    marginBottom: '0.75rem',
                    margin: '0 0 0.75rem 0'
                  }}
                >
                  {t.fees}
                </h3>
                <div 
                  className="modal-info-list"
                  style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  {card.fees.annual && (
                    <div className="modal-info-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>{t.annualFee}:</span>
                      <span style={{ fontSize: '0.875rem', color: '#111827', fontWeight: '500' }}>
                        {card.fees.annual}
                      </span>
                    </div>
                  )}
                  {card.fees.transaction && (
                    <div className="modal-info-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>{t.transactionFee}:</span>
                      <span style={{ fontSize: '0.875rem', color: '#111827', fontWeight: '500' }}>
                        {card.fees.transaction}
                      </span>
                    </div>
                  )}
                  {card.fees.foreign && (
                    <div className="modal-info-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.25rem' }}>
                      <span style={{ fontSize: '0.875rem', color: '#374151' }}>{t.foreignFee}:</span>
                      <span style={{ fontSize: '0.875rem', color: '#111827', fontWeight: '500' }}>
                        {card.fees.foreign}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            {card.tags && card.tags.length > 0 && (
              <div>
                <h3 
                  className="modal-section-title"
                  style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: '600', 
                    color: '#111827', 
                    marginBottom: '0.75rem',
                    margin: '0 0 0.75rem 0'
                  }}
                >
                  {t.tags}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {card.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.875rem',
                        backgroundColor: '#f3f4f6',
                        color: '#374151',
                        borderRadius: '9999px',
                        border: '1px solid #e5e7eb'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
