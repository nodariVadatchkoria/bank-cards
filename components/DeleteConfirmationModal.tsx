'use client';

import { useEffect } from 'react';
import { X, AlertTriangle, Trash2 } from 'lucide-react';
import { CardItem } from '@/lib/types';

interface DeleteConfirmationModalProps {
  card: CardItem;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationModal({ 
  card, 
  isOpen, 
  onClose, 
  onConfirm 
}: DeleteConfirmationModalProps) {
  
  // Handle escape key press
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1001, // Higher than other modals
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          maxWidth: '28rem',
          width: '100%',
          position: 'relative',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          margin: '0 auto'
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

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          {/* Warning Icon */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '1.5rem' 
          }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              backgroundColor: '#fef2f2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #fecaca'
            }}>
              <AlertTriangle style={{ 
                width: '2rem', 
                height: '2rem', 
                color: '#dc2626' 
              }} />
            </div>
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#111827',
            textAlign: 'center',
            marginBottom: '1rem',
            margin: '0 0 1rem 0'
          }}>
            Delete Card
          </h2>

          {/* Warning Message */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              marginBottom: '1rem',
              lineHeight: '1.5'
            }}>
              Are you sure you want to delete the card <strong>&ldquo;{card.name}&rdquo;</strong>?
            </p>
            <p style={{
              fontSize: '0.875rem',
              color: '#9ca3af',
              lineHeight: '1.5'
            }}>
              This action cannot be undone. The card will be permanently removed from your catalog.
            </p>
          </div>

          {/* Card Preview */}
          <div style={{
            backgroundColor: '#f9fafb',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginBottom: '2rem',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem' 
            }}>
              <div style={{
                width: '3rem',
                height: '2rem',
                backgroundColor: '#e5e7eb',
                borderRadius: '0.375rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                color: '#6b7280',
                fontWeight: '500'
              }}>
                {card.issuerNetwork}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.25rem'
                }}>
                  {card.name}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  {card.cardType} • {card.issuerNetwork}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center'
          }}>
            <button
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.borderColor = '#9ca3af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'white',
                backgroundColor: '#dc2626',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b91c1c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
              }}
            >
              <Trash2 style={{ width: '1rem', height: '1rem' }} />
              Delete Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
