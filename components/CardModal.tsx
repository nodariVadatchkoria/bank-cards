'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, Trash2, Edit } from 'lucide-react';
import { CardItem } from '@/lib/types';
import { useLanguage } from '@/lib/useLanguage';

interface CardModalProps {
  card: CardItem;
  isOpen: boolean;
  onClose: () => void;
  onDelete?: (card: CardItem) => void;
  onEdit?: (card: CardItem) => void;
}

export default function CardModal({ card, isOpen, onClose, onDelete, onEdit }: CardModalProps) {
  const { t } = useLanguage();
  
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <div
        className="modal-container"
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          maxWidth: '42rem',
          width: '100%',
          maxHeight: '85vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          margin: '0 auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Action buttons */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          display: 'flex',
          gap: '0.5rem',
          zIndex: 10
        }}>
          {onEdit && (
            <button
              onClick={() => onEdit(card)}
              style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#dbeafe';
                e.currentTarget.style.borderColor = '#93c5fd';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#eff6ff';
                e.currentTarget.style.borderColor = '#bfdbfe';
              }}
              aria-label="Edit card"
              title="Edit card"
            >
              <Edit style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb' }} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(card)}
              style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '50%',
                width: '2.5rem',
                height: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#fee2e2';
                e.currentTarget.style.borderColor = '#fca5a5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fef2f2';
                e.currentTarget.style.borderColor = '#fecaca';
              }}
              aria-label="Delete card"
              title="Delete card"
            >
              <Trash2 style={{ width: '1.25rem', height: '1.25rem', color: '#dc2626' }} />
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '50%',
              width: '2.5rem',
              height: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }}
            aria-label={t.close}
          >
            <X style={{ width: '1.25rem', height: '1.25rem', color: '#374151' }} />
          </button>
        </div>

        {/* Card Image */}
        <div className="card-image" style={{ 
          position: 'relative', 
          height: '24rem',
          borderTopLeftRadius: '1rem',
          borderTopRightRadius: '1rem',
          overflow: 'hidden',
          backgroundColor: '#f3f4f6'
        }}>
          <Image
            src={card.image}
            alt={`${card.name} bank card design`}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, 42rem"
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
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
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
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              {card.issuerNetwork}
            </span>
          </div>
        </div>

        {/* Card Details */}
        <div className="modal-content" style={{ padding: '2rem' }}>
          {/* Card Name */}
          <h2 className="modal-title" style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '0.75rem',
            margin: '0 0 0.75rem 0'
          }}>
            {card.name}
          </h2>

          {/* Description */}
          {card.description && (
            <p className="modal-description" style={{
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '1.5rem',
              lineHeight: '1.5'
            }}>
              {card.description}
            </p>
          )}

          {/* Card Information Grid */}
          <div className="modal-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            {/* Configuration Details */}
            <div>
              <h3 className="modal-section-title" style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
{t.configurationDetails}
              </h3>
              
              <div className="modal-info-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="modal-info-item">
                  <span style={{ fontWeight: '600', color: '#374151', fontSize: '0.95rem' }}>Configuration: </span>
                  <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>{card.printConfig.name}</span>
                </div>
                
                <div className="modal-info-item">
                  <span style={{ fontWeight: '600', color: '#374151', fontSize: '0.95rem' }}>DPI: </span>
                  <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>{card.printConfig.dpi}</span>
                </div>
                
                <div className="modal-info-item">
                  <span style={{ fontWeight: '600', color: '#374151', fontSize: '0.95rem' }}>Color Profile: </span>
                  <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>{card.printConfig.colorProfile}</span>
                </div>
                
                <div className="modal-info-item">
                  <span style={{ fontWeight: '600', color: '#374151', fontSize: '0.95rem' }}>Bleed: </span>
                  <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>{card.printConfig.bleedMm}mm</span>
                </div>
                
                {card.printConfig.finish && (
                  <div>
                    <span style={{ fontWeight: '600', color: '#374151' }}>Finish: </span>
                    <span style={{ color: '#6b7280' }}>{card.printConfig.finish}</span>
                  </div>
                )}
                
                {card.printConfig.safeMarginMm && (
                  <div>
                    <span style={{ fontWeight: '600', color: '#374151' }}>Safe Margin: </span>
                    <span style={{ color: '#6b7280' }}>{card.printConfig.safeMarginMm}mm</span>
                  </div>
                )}
              </div>
            </div>

            {/* Card Features */}
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1rem'
              }}>
{t.cardFeatures}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <span style={{ fontWeight: '600', color: '#374151' }}>Card Type: </span>
                  <span style={{ color: '#6b7280' }}>{card.cardType}</span>
                </div>
                
                <div>
                  <span style={{ fontWeight: '600', color: '#374151' }}>Network: </span>
                  <span style={{ color: '#6b7280' }}>{card.issuerNetwork}</span>
                </div>
                
                {card.features && card.features.length > 0 && (
                  <div>
                    <span style={{ fontWeight: '600', color: '#374151' }}>Key Features: </span>
                    <div style={{ marginTop: '0.5rem' }}>
                      {card.features.map((feature, index) => (
                        <div key={index} style={{
                          padding: '0.5rem 0.75rem',
                          backgroundColor: '#f9fafb',
                          borderRadius: '0.375rem',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          color: '#374151'
                        }}>
                          • {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Special Effects */}
          {card.printConfig.special && card.printConfig.special.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1rem'
              }}>
                Special Effects
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {card.printConfig.special.map((effect, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Fees Information */}
          {card.fees && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1rem'
              }}>
                Fee Information
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                {card.fees.annual && (
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
                      Annual Fee:
                    </div>
                    <div style={{ color: '#6b7280' }}>{card.fees.annual}</div>
                  </div>
                )}
                
                {card.fees.transaction && (
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
                      Transaction Fee:
                    </div>
                    <div style={{ color: '#6b7280' }}>{card.fees.transaction}</div>
                  </div>
                )}
                
                {card.fees.foreign && (
                  <div style={{
                    padding: '1rem',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
                      Foreign Transaction Fee:
                    </div>
                    <div style={{ color: '#6b7280' }}>{card.fees.foreign}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {card.tags && card.tags.length > 0 && (
            <div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1rem'
              }}>
                Tags
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {card.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      border: '1px solid #d1d5db'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
