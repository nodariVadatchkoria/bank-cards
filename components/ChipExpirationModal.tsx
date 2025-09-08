'use client';

import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { CardItem } from '@/lib/types';

interface ChipExpirationModalProps {
  isOpen: boolean;
  onClose: () => void;
  expiringCards: CardItem[];
}

export default function ChipExpirationModal({ isOpen, onClose, expiringCards }: ChipExpirationModalProps) {
  // Handle escape key press
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Add event listener when modal opens
  if (typeof window !== 'undefined') {
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
  }

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    }
    onClose();
  };

  const hasExpiringCards = expiringCards.length > 0;

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
        padding: '1rem'
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          maxWidth: '32rem',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          margin: '0 auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: '#f3f4f6',
            border: 'none',
            borderRadius: '50%',
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e5e7eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f3f4f6';
          }}
          aria-label="Close"
        >
          <X style={{ width: '1.25rem', height: '1.25rem', color: '#374151' }} />
        </button>

        {/* Header */}
        <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '0.5rem'
          }}>
            {hasExpiringCards ? (
              <AlertTriangle style={{ width: '1.5rem', height: '1.5rem', color: '#f59e0b' }} />
            ) : (
              <CheckCircle style={{ width: '1.5rem', height: '1.5rem', color: '#10b981' }} />
            )}
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              margin: 0
            }}>
              Chip Expiration Check
            </h2>
          </div>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0
          }}>
            {hasExpiringCards 
              ? `Found ${expiringCards.length} card${expiringCards.length === 1 ? '' : 's'} with chips expiring within 2 years`
              : 'All card chips are valid for more than 2 years'
            }
          </p>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          {hasExpiringCards ? (
            <div>
              <div style={{
                backgroundColor: '#fef3c7',
                border: '1px solid #f59e0b',
                borderRadius: '0.5rem',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem'
                }}>
                  <AlertTriangle style={{ width: '1rem', height: '1rem', color: '#f59e0b' }} />
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#92400e'
                  }}>
                    Action Required
                  </span>
                </div>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#92400e',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  The following cards have chips that will expire within the next 2 years. 
                  Consider contacting the card manufacturer for replacement or renewal.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {expiringCards.map((card) => (
                  <div
                    key={card.id}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      backgroundColor: '#f9fafb'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.5rem'
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: '#111827',
                          margin: '0 0 0.25rem 0'
                        }}>
                          {card.name}
                        </h3>
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          margin: 0
                        }}>
                          {card.issuerNetwork} • {card.cardType}
                        </p>
                      </div>
                      <div style={{
                        backgroundColor: '#fef3c7',
                        border: '1px solid #f59e0b',
                        borderRadius: '0.375rem',
                        padding: '0.25rem 0.5rem'
                      }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: '#92400e'
                        }}>
                          Expires: {card.chipValidityPeriod}
                        </span>
                      </div>
                    </div>
                    {card.description && (
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        margin: 0,
                        lineHeight: '1.4'
                      }}>
                        {card.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '2rem 1rem'
            }}>
              <div style={{
                backgroundColor: '#d1fae5',
                border: '1px solid #10b981',
                borderRadius: '50%',
                width: '4rem',
                height: '4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <CheckCircle style={{ width: '2rem', height: '2rem', color: '#10b981' }} />
              </div>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 0.5rem 0'
              }}>
                All Chips Valid
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Great news! All card chips in your catalog are valid for more than 2 years. 
                No immediate action is required.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem 1.5rem 1.5rem',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleClose}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'white',
              backgroundColor: '#2563eb',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#2563eb';
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
