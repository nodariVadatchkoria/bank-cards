'use client';

import { useEffect, useState } from 'react';
import { X, Upload, Plus, Save } from 'lucide-react';
import Image from 'next/image';
import { CardItem } from '@/lib/types';

interface EditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (card: CardItem) => void;
  card?: CardItem | null; // If provided, we're editing; if null, we're creating
}

interface FormData {
  name: string;
  issuerNetwork: 'Visa' | 'MasterCard';
  cardType: 'Debit' | 'Credit';
  description: string;
  tags: string;
  features: string;
  annualFee: string;
  transactionFee: string;
  foreignFee: string;
  configName: string;
  dpi: string;
  colorProfile: 'CMYK' | 'RGB';
  bleedMm: string;
  finish: 'Matte' | 'Glossy' | 'Satin';
  special: string;
  image: File | null;
}

export default function EditCardModal({ isOpen, onClose, onSave, card }: EditCardModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    issuerNetwork: 'Visa',
    cardType: 'Debit',
    description: '',
    tags: '',
    features: '',
    annualFee: '',
    transactionFee: '',
    foreignFee: '',
    configName: '',
    dpi: '300',
    colorProfile: 'CMYK',
    bleedMm: '3',
    finish: 'Matte',
    special: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditing = !!card;

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

  // Populate form when editing or reset when creating
  useEffect(() => {
    if (isOpen) {
      if (card) {
        // Editing existing card
        setFormData({
          name: card.name || '',
          issuerNetwork: card.issuerNetwork || 'Visa',
          cardType: card.cardType || 'Debit',
          description: card.description || '',
          tags: card.tags ? card.tags.join(', ') : '',
          features: card.features ? card.features.join(', ') : '',
          annualFee: card.fees?.annual || '',
          transactionFee: card.fees?.transaction || '',
          foreignFee: card.fees?.foreign || '',
          configName: card.printConfig?.name || '',
          dpi: card.printConfig?.dpi?.toString() || '300',
          colorProfile: card.printConfig?.colorProfile || 'CMYK',
          bleedMm: card.printConfig?.bleedMm?.toString() || '3',
          finish: card.printConfig?.finish || 'Matte',
          special: card.printConfig?.special ? card.printConfig.special.join(', ') : '',
          image: null,
        });
        setImagePreview(card.image || null);
      } else {
        // Creating new card
        setFormData({
          name: '',
          issuerNetwork: 'Visa',
          cardType: 'Debit',
          description: '',
          tags: '',
          features: '',
          annualFee: '',
          transactionFee: '',
          foreignFee: '',
          configName: '',
          dpi: '300',
          colorProfile: 'CMYK',
          bleedMm: '3',
          finish: 'Matte',
          special: '',
          image: null,
        });
        setImagePreview(null);
      }
    }
  }, [isOpen, card]);

  const handleInputChange = (field: keyof FormData, value: string | File) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCardId = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate unique ID for new cards
      const id = isEditing ? card!.id : generateCardId(formData.name);
      
      // Create image URL (in a real app, you'd upload to a server)
      const imageUrl = imagePreview || '/cards/default-card.svg';
      
      // Parse tags and features
      const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const features = formData.features.split(',').map(feature => feature.trim()).filter(feature => feature);
      const special = formData.special.split(',').map(s => s.trim()).filter(s => s);

      // Create/update card
      const cardData: CardItem = {
        id,
        name: formData.name,
        issuerNetwork: formData.issuerNetwork,
        cardType: formData.cardType,
        image: imageUrl,
        printConfig: {
          name: formData.configName || `CMYK ${formData.dpi}DPI w/ ${formData.bleedMm}mm bleed`,
          dpi: parseInt(formData.dpi),
          colorProfile: formData.colorProfile,
          bleedMm: parseInt(formData.bleedMm),
          finish: formData.finish,
          special: special.length > 0 ? special : undefined,
        },
        tags: tags.length > 0 ? tags : undefined,
        description: formData.description || undefined,
        features: features.length > 0 ? features : undefined,
        fees: {
          annual: formData.annualFee || undefined,
          transaction: formData.transactionFee || undefined,
          foreign: formData.foreignFee || undefined,
        },
      };

      onSave(cardData);
      onClose();
    } catch (error) {
      console.error('Error saving card:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .modal-container {
            margin: 0.5rem !important;
            max-height: 95vh !important;
            border-radius: 0.75rem !important;
          }
          .form-section {
            gap: 1rem !important;
          }
          .form-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
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
        onClick={onClose}
      >
        <div
          className="modal-container"
          style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            maxWidth: '48rem',
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

          {/* Header */}
          <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#111827',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {isEditing ? <Save style={{ width: '1.5rem', height: '1.5rem' }} /> : <Plus style={{ width: '1.5rem', height: '1.5rem' }} />}
              {isEditing ? 'Edit Card' : 'Add New Card'}
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
            <div className="form-section" style={{ display: 'grid', gap: '1.5rem' }}>
              {/* Basic Information */}
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>
                  Basic Information
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      Card Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        boxSizing: 'border-box'
                      }}
                      placeholder="e.g., Midnight Gradient"
                    />
                  </div>

                  <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                        Network *
                      </label>
                      <select
                        value={formData.issuerNetwork}
                        onChange={(e) => handleInputChange('issuerNetwork', e.target.value as 'Visa' | 'MasterCard')}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                        Card Type *
                      </label>
                      <select
                        value={formData.cardType}
                        onChange={(e) => handleInputChange('cardType', e.target.value as 'Debit' | 'Credit')}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Debit">Debit</option>
                        <option value="Credit">Credit</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Brief description of the card design..."
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>
                  Card Image
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      Upload Card Image
                    </label>
                    <div style={{
                      border: '2px dashed #d1d5db',
                      borderRadius: '0.5rem',
                      padding: '1.5rem',
                      textAlign: 'center',
                      backgroundColor: '#f9fafb',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#9ca3af';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                    }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'block' }}>
                        <Upload style={{ width: '1.5rem', height: '1.5rem', color: '#6b7280', margin: '0 auto 0.5rem' }} />
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          Click to upload or drag and drop
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
                          PNG, JPG, SVG up to 10MB
                        </div>
                      </label>
                    </div>
                  </div>

                  {imagePreview && (
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                        Preview
                      </label>
                      <div style={{
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        backgroundColor: '#f9fafb',
                        textAlign: 'center'
                      }}>
                        <Image
                          src={imagePreview}
                          alt="Card preview"
                          width={300}
                          height={200}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '200px',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Print Configuration */}
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>
                  Print Configuration
                </h3>
                
                <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      DPI
                    </label>
                    <input
                      type="number"
                      value={formData.dpi}
                      onChange={(e) => handleInputChange('dpi', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      Color Profile
                    </label>
                    <select
                      value={formData.colorProfile}
                      onChange={(e) => handleInputChange('colorProfile', e.target.value as 'CMYK' | 'RGB')}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="CMYK">CMYK</option>
                      <option value="RGB">RGB</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      Bleed (mm)
                    </label>
                    <input
                      type="number"
                      value={formData.bleedMm}
                      onChange={(e) => handleInputChange('bleedMm', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      Finish
                    </label>
                    <select
                      value={formData.finish}
                      onChange={(e) => handleInputChange('finish', e.target.value as 'Matte' | 'Glossy' | 'Satin')}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="Matte">Matte</option>
                      <option value="Glossy">Glossy</option>
                      <option value="Satin">Satin</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Special Effects (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.special}
                    onChange={(e) => handleInputChange('special', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      boxSizing: 'border-box'
                    }}
                    placeholder="e.g., Embossing, Foil Silver, Spot UV"
                  />
                </div>
              </div>

              {/* Features and Fees */}
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>
                  Features and Fees
                </h3>
                
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                      Key Features (comma-separated)
                    </label>
                    <textarea
                      value={formData.features}
                      onChange={(e) => handleInputChange('features', e.target.value)}
                      rows={2}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        resize: 'vertical',
                        boxSizing: 'border-box'
                      }}
                      placeholder="e.g., No foreign transaction fees, Chip & PIN security, Contactless payments"
                    />
                  </div>

                  <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                        Annual Fee
                      </label>
                      <input
                        type="text"
                        value={formData.annualFee}
                        onChange={(e) => handleInputChange('annualFee', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          boxSizing: 'border-box'
                        }}
                        placeholder="e.g., Free, $95"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                        Transaction Fee
                      </label>
                      <input
                        type="text"
                        value={formData.transactionFee}
                        onChange={(e) => handleInputChange('transactionFee', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          boxSizing: 'border-box'
                        }}
                        placeholder="e.g., Free, $1.50 international"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                        Foreign Transaction Fee
                      </label>
                      <input
                        type="text"
                        value={formData.foreignFee}
                        onChange={(e) => handleInputChange('foreignFee', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          boxSizing: 'border-box'
                        }}
                        placeholder="e.g., Free, 2.7%"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '1rem'
                }}>
                  Tags
                </h3>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      boxSizing: 'border-box'
                    }}
                    placeholder="e.g., dark, gradient, minimal, premium"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end',
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  backgroundColor: 'white',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.name}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: isSubmitting || !formData.name ? '#9ca3af' : '#2563eb',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: isSubmitting || !formData.name ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {isSubmitting ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Card')}
                {!isSubmitting && (isEditing ? <Save style={{ width: '1rem', height: '1rem' }} /> : <Plus style={{ width: '1rem', height: '1rem' }} />)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
