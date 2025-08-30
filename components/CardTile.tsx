'use client';

import Image from 'next/image';
import { CardItem } from '@/lib/types';

interface CardTileProps {
  card: CardItem;
  onClick?: () => void;
}

export default function CardTile({ card, onClick }: CardTileProps) {
  return (
    <div 
      className="card-tile"
      style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        cursor: 'pointer',
        border: '1px solid #e5e7eb',
        transition: 'all 0.2s ease-in-out'
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      }}
      aria-label={`View details for ${card.name} ${card.cardType} card`}
    >
      <div style={{ 
        position: 'relative', 
        height: '12rem',
        overflow: 'hidden',
        borderTopLeftRadius: '0.75rem',
        borderTopRightRadius: '0.75rem'
      }}>
        <Image
          src={card.image}
          alt={`${card.name} bank card design`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        
        {/* Card type and network badges */}
        <div style={{ 
          position: 'absolute', 
          top: '0.5rem', 
          left: '0.5rem', 
          display: 'flex', 
          gap: '0.25rem' 
        }}>
          <span style={{
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: '500',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '0.375rem',
            color: '#374151'
          }}>
            {card.cardType}
          </span>
          <span style={{
            padding: '0.25rem 0.5rem',
            fontSize: '0.75rem',
            fontWeight: '500',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '0.375rem',
            color: '#374151'
          }}>
            {card.issuerNetwork}
          </span>
        </div>
      </div>
      
      <div style={{ 
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <div>
          <h3 style={{ 
            fontWeight: '700', 
            color: '#111827', 
            fontSize: '1.125rem',
            lineHeight: '1.25',
            margin: 0
          }}>
            {card.name}
          </h3>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#6b7280', 
            marginTop: '0.25rem',
            margin: '0.25rem 0 0 0'
          }}>
            {card.printConfig.name}
          </p>
        </div>
        
        {card.description && (
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#374151',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {card.description}
          </p>
        )}
        
        {card.features && card.features.length > 0 && (
          <div style={{ paddingTop: '0.5rem' }}>
            <p style={{ 
              fontSize: '0.75rem', 
              color: '#6b7280', 
              fontWeight: '500',
              margin: 0
            }}>
              Key Features:
            </p>
            <p style={{ 
              fontSize: '0.75rem', 
              color: '#374151', 
              marginTop: '0.25rem',
              margin: '0.25rem 0 0 0'
            }}>
              {card.features.slice(0, 2).join(' • ')}
              {card.features.length > 2 && '...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}