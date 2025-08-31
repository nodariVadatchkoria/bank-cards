'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import FilterPills from '@/components/FilterPills';
import CardTile from '@/components/CardTile';
import CardModal from '@/components/CardModal';
import ScrollToTop from '@/components/ScrollToTop';
import LanguageProvider from '@/components/LanguageProvider';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { CardItem } from '@/lib/types';
import { useQueryState } from '@/lib/useQueryState';
import { useLanguage } from '@/lib/useLanguage';
import { filterCards, hasActiveFilters, countActiveFilters, createEmptyFilters } from '@/lib/filtering';
import cardsData from '@/data/cards.json';

function CardCatalogContent() {
  const { filters, updateFilters, setFilters } = useQueryState();
  const { t, mounted } = useLanguage();
  const [cards] = useState<CardItem[]>(cardsData as CardItem[]);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredCards = filterCards(cards, filters);
  const activeFiltersCount = countActiveFilters(filters);
  const hasFilters = hasActiveFilters(filters);

  // Use consistent values for filtering regardless of language
  const cardTypes = ['Debit', 'Credit'];
  const networks = ['Visa', 'MasterCard'];
  
  // Map display labels for UI
  const cardTypeLabels = { 'Debit': t.debit, 'Credit': t.credit };
  const getCardTypeLabel = (type: string) => cardTypeLabels[type as keyof typeof cardTypeLabels] || type;

  const clearAllFilters = () => {
    setFilters(createEmptyFilters());
  };

  const openCardModal = (card: CardItem) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeCardModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="main-container">
      {/* Header */}
      <header style={{ 
        backgroundColor: '#fbbf24', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
        borderBottom: '1px solid rgba(229, 231, 235, 0.5)' 
      }}>
        <div style={{ 
          maxWidth: '80rem', 
          margin: '0 auto', 
          padding: '1.5rem 1rem',
          textAlign: 'center'
        }}>
          {/* Language Switcher */}
          <div style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem',
            zIndex: 10
          }}>
            <LanguageSwitcher />
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ 
              fontSize: '1.875rem', 
              fontWeight: '700', 
              color: '#111827', 
              marginBottom: '0.5rem',
              margin: '0 0 0.5rem 0'
            }}>
              {t.title}
            </h1>
            <p style={{ 
              color: '#6b7280', 
              maxWidth: '28rem', 
              margin: '0 auto',
              fontSize: '0.95rem',
              lineHeight: '1.5',
              padding: '0 1rem'
            }}>
              {t.subtitle}
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="search-container" style={{ 
            maxWidth: '18rem', 
            width: '100%',
            margin: '0 auto 1.5rem',
            padding: '0 1rem'
          }}>
            <SearchBar
              value={filters.query}
              onChange={(query) => updateFilters({ query })}
              placeholder={t.searchPlaceholder}
            />
          </div>
          
          {/* Filters */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              maxWidth: '48rem',
              margin: '0 auto',
              padding: '0 0.5rem'
            }}>
              <FilterPills
                title={t.type}
                options={cardTypes}
                selected={filters.cardTypes}
                onChange={(cardTypes) => updateFilters({ cardTypes })}
                getLabel={getCardTypeLabel}
              />
              <FilterPills
                title={t.network}
                options={networks}
                selected={filters.networks}
                onChange={(networks) => updateFilters({ networks })}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ 
        maxWidth: '80rem', 
        margin: '0 auto', 
        padding: '2rem 1rem',
        textAlign: 'center'
      }}>
        {/* Results header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '1.5rem' 
        }}>
          <div style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            color: '#1f2937',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            {filteredCards.length === cards.length 
              ? `${t.showingAll} ${cards.length} ${t.cards}`
              : `${filteredCards.length} ${t.showingFiltered} ${cards.length} ${t.cards}`
            }
          </div>
          
          {hasFilters && (
            <button
              onClick={clearAllFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <X style={{ width: '1rem', height: '1rem' }} />
              {t.clearAllFilters}
            </button>
          )}
        </div>

        {/* Cards Grid */}
        {filteredCards.length > 0 ? (
          <div className="card-grid">
            {filteredCards.map((card) => (
              <CardTile
                key={card.id}
                card={card}
                onClick={() => openCardModal(card)}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{
                  margin: '0 auto',
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <X style={{ width: '2rem', height: '2rem', color: '#9ca3af' }} />
                </div>
              </div>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: '500', 
                color: '#111827', 
                marginBottom: '0.5rem' 
              }}>
                {t.noCardsMatch}
              </h3>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                {t.tryAdjusting}
              </p>
              {hasFilters && (
                <button
                  onClick={clearAllFilters}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    fontWeight: '500',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {t.clearAllFilters}
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Mobile Sticky Filter Bar */}
      {hasFilters && (
        <div className="mobile-filter-bar" style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTop: '1px solid #e5e7eb',
          padding: '0.75rem 1rem',
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {activeFiltersCount} {activeFiltersCount === 1 ? t.filter : t.filters} {t.filtersActive}
            </span>
            <button
              onClick={clearAllFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#2563eb',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X style={{ width: '1rem', height: '1rem' }} />
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Card Modal */}
      {selectedCard && (
        <CardModal
          card={selectedCard}
          isOpen={isModalOpen}
          onClose={closeCardModal}
        />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <CardCatalogContent />
    </LanguageProvider>
  );
}