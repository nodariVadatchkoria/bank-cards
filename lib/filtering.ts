import { CardItem, FilterState } from './types';

/**
 * Filters cards based on search query and filter criteria
 */
export function filterCards(cards: CardItem[], filters: FilterState): CardItem[] {
  return cards.filter((card) => {
    // Search query filter - searches in name, tags, and description
    if (filters.query.trim()) {
      const query = filters.query.toLowerCase();
      const searchableText = [
        card.name,
        ...(card.tags || []),
        card.description || '',
        card.printConfig.name,
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Card type filter
    if (filters.cardTypes.length > 0 && !filters.cardTypes.includes(card.cardType)) {
      return false;
    }

    // Network filter
    if (filters.networks.length > 0 && !filters.networks.includes(card.issuerNetwork)) {
      return false;
    }

    return true;
  });
}

/**
 * Parses URL search params into filter state
 */
export function parseFiltersFromQuery(searchParams: URLSearchParams): FilterState {
  return {
    query: searchParams.get('q') || '',
    cardTypes: searchParams.get('type')?.split(',').filter(Boolean) || [],
    networks: searchParams.get('network')?.split(',').filter(Boolean) || [],
  };
}

/**
 * Converts filter state to URL search params
 */
export function filtersToQuery(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  
  if (filters.query.trim()) {
    params.set('q', filters.query.trim());
  }
  
  if (filters.cardTypes.length > 0) {
    params.set('type', filters.cardTypes.join(','));
  }
  
  if (filters.networks.length > 0) {
    params.set('network', filters.networks.join(','));
  }
  
  return params;
}

/**
 * Checks if any filters are active
 */
export function hasActiveFilters(filters: FilterState): boolean {
  return !!(
    filters.query.trim() ||
    filters.cardTypes.length > 0 ||
    filters.networks.length > 0
  );
}

/**
 * Counts active filters
 */
export function countActiveFilters(filters: FilterState): number {
  let count = 0;
  if (filters.query.trim()) count++;
  if (filters.cardTypes.length > 0) count++;
  if (filters.networks.length > 0) count++;
  return count;
}

/**
 * Creates an empty filter state
 */
export function createEmptyFilters(): FilterState {
  return {
    query: '',
    cardTypes: [],
    networks: [],
  };
}
