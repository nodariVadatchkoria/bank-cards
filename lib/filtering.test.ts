import { describe, it, expect } from 'vitest';
import { 
  filterCards, 
  parseFiltersFromQuery, 
  filtersToQuery, 
  hasActiveFilters, 
  countActiveFilters,
  createEmptyFilters 
} from './filtering';
import { CardItem, FilterState } from './types';

// Sample test data
const testCards: CardItem[] = [
  {
    id: 'test-1',
    name: 'Midnight Gradient',
    issuerNetwork: 'Visa',
    cardType: 'Debit',
    image: '/cards/test.svg',
    printConfig: {
      name: 'CMYK 300DPI w/ 3mm bleed',
      dpi: 300,
      colorProfile: 'CMYK',
      bleedMm: 3,
    },
    tags: ['dark', 'gradient'],
    description: 'A beautiful dark gradient card',
  },
  {
    id: 'test-2',
    name: 'Gold Premium',
    issuerNetwork: 'MasterCard',
    cardType: 'Credit',
    image: '/cards/test2.svg',
    printConfig: {
      name: 'CMYK 300DPI + Gold Foil',
      dpi: 300,
      colorProfile: 'CMYK',
      bleedMm: 3,
    },
    tags: ['luxury', 'gold'],
    description: 'Premium gold card with exclusive benefits',
  },
  {
    id: 'test-3',
    name: 'Blue Wave',
    issuerNetwork: 'Visa',
    cardType: 'Credit',
    image: '/cards/test3.svg',
    printConfig: {
      name: 'CMYK 300DPI',
      dpi: 300,
      colorProfile: 'CMYK',
      bleedMm: 3,
    },
    tags: ['blue', 'wave'],
    description: 'Ocean-inspired design',
  },
];

describe('filterCards', () => {
  it('should return all cards when no filters are applied', () => {
    const filters: FilterState = { query: '', cardTypes: [], networks: [] };
    const result = filterCards(testCards, filters);
    expect(result).toHaveLength(3);
    expect(result).toEqual(testCards);
  });

  it('should filter by search query in card name', () => {
    const filters: FilterState = { query: 'midnight', cardTypes: [], networks: [] };
    const result = filterCards(testCards, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Midnight Gradient');
  });

  it('should filter by search query in tags', () => {
    const filters: FilterState = { query: 'luxury', cardTypes: [], networks: [] };
    const result = filterCards(testCards, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Gold Premium');
  });

  it('should filter by search query in description', () => {
    const filters: FilterState = { query: 'ocean', cardTypes: [], networks: [] };
    const result = filterCards(testCards, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Blue Wave');
  });

  it('should filter by card type', () => {
    const filters: FilterState = { query: '', cardTypes: ['Debit'], networks: [] };
    const result = filterCards(testCards, filters);
    expect(result).toHaveLength(1);
    expect(result[0].cardType).toBe('Debit');
  });

  it('should filter by multiple card types', () => {
    const filters: FilterState = { query: '', cardTypes: ['Debit', 'Credit'], networks: [] };
    const result = filterCards(testCards, filters);
    expect(result).toHaveLength(3);
  });

  it('should filter by network', () => {
    const filters: FilterState = { query: '', cardTypes: [], networks: ['MasterCard'] };
    const result = filterCards(testCards, filters);
    expect(result).toHaveLength(1);
    expect(result[0].issuerNetwork).toBe('MasterCard');
  });

  it('should combine all filters (AND logic)', () => {
    const filters: FilterState = { 
      query: 'gold', 
      cardTypes: ['Credit'], 
      networks: ['MasterCard'] 
    };
    const result = filterCards(testCards, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Gold Premium');
  });

  it('should return empty array when no cards match filters', () => {
    const filters: FilterState = { 
      query: 'nonexistent', 
      cardTypes: [], 
      networks: [] 
    };
    const result = filterCards(testCards, filters);
    expect(result).toHaveLength(0);
  });

  it('should be case insensitive', () => {
    const filters: FilterState = { query: 'MIDNIGHT', cardTypes: [], networks: [] };
    const result = filterCards(testCards, filters);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Midnight Gradient');
  });
});

describe('parseFiltersFromQuery', () => {
  it('should parse empty URLSearchParams', () => {
    const params = new URLSearchParams();
    const result = parseFiltersFromQuery(params);
    expect(result).toEqual({ query: '', cardTypes: [], networks: [] });
  });

  it('should parse query parameter', () => {
    const params = new URLSearchParams('q=midnight');
    const result = parseFiltersFromQuery(params);
    expect(result.query).toBe('midnight');
  });

  it('should parse type parameter', () => {
    const params = new URLSearchParams('type=Debit,Credit');
    const result = parseFiltersFromQuery(params);
    expect(result.cardTypes).toEqual(['Debit', 'Credit']);
  });

  it('should parse network parameter', () => {
    const params = new URLSearchParams('network=Visa');
    const result = parseFiltersFromQuery(params);
    expect(result.networks).toEqual(['Visa']);
  });

  it('should parse all parameters', () => {
    const params = new URLSearchParams('q=gold&type=Credit&network=MasterCard');
    const result = parseFiltersFromQuery(params);
    expect(result).toEqual({
      query: 'gold',
      cardTypes: ['Credit'],
      networks: ['MasterCard'],
    });
  });
});

describe('filtersToQuery', () => {
  it('should create empty URLSearchParams for empty filters', () => {
    const filters: FilterState = { query: '', cardTypes: [], networks: [] };
    const result = filtersToQuery(filters);
    expect(result.toString()).toBe('');
  });

  it('should create URLSearchParams with query', () => {
    const filters: FilterState = { query: 'midnight', cardTypes: [], networks: [] };
    const result = filtersToQuery(filters);
    expect(result.get('q')).toBe('midnight');
  });

  it('should create URLSearchParams with types', () => {
    const filters: FilterState = { query: '', cardTypes: ['Debit', 'Credit'], networks: [] };
    const result = filtersToQuery(filters);
    expect(result.get('type')).toBe('Debit,Credit');
  });

  it('should create URLSearchParams with all filters', () => {
    const filters: FilterState = { 
      query: 'gold', 
      cardTypes: ['Credit'], 
      networks: ['MasterCard'] 
    };
    const result = filtersToQuery(filters);
    expect(result.get('q')).toBe('gold');
    expect(result.get('type')).toBe('Credit');
    expect(result.get('network')).toBe('MasterCard');
  });

  it('should trim whitespace from query', () => {
    const filters: FilterState = { query: '  gold  ', cardTypes: [], networks: [] };
    const result = filtersToQuery(filters);
    expect(result.get('q')).toBe('gold');
  });
});

describe('hasActiveFilters', () => {
  it('should return false for empty filters', () => {
    const filters: FilterState = { query: '', cardTypes: [], networks: [] };
    expect(hasActiveFilters(filters)).toBe(false);
  });

  it('should return true when query is set', () => {
    const filters: FilterState = { query: 'test', cardTypes: [], networks: [] };
    expect(hasActiveFilters(filters)).toBe(true);
  });

  it('should return true when card types are set', () => {
    const filters: FilterState = { query: '', cardTypes: ['Debit'], networks: [] };
    expect(hasActiveFilters(filters)).toBe(true);
  });

  it('should return true when networks are set', () => {
    const filters: FilterState = { query: '', cardTypes: [], networks: ['Visa'] };
    expect(hasActiveFilters(filters)).toBe(true);
  });

  it('should ignore whitespace-only query', () => {
    const filters: FilterState = { query: '   ', cardTypes: [], networks: [] };
    expect(hasActiveFilters(filters)).toBe(false);
  });
});

describe('countActiveFilters', () => {
  it('should return 0 for empty filters', () => {
    const filters: FilterState = { query: '', cardTypes: [], networks: [] };
    expect(countActiveFilters(filters)).toBe(0);
  });

  it('should count query as 1', () => {
    const filters: FilterState = { query: 'test', cardTypes: [], networks: [] };
    expect(countActiveFilters(filters)).toBe(1);
  });

  it('should count each filter group as 1', () => {
    const filters: FilterState = { 
      query: 'test', 
      cardTypes: ['Debit', 'Credit'], 
      networks: ['Visa', 'MasterCard'] 
    };
    expect(countActiveFilters(filters)).toBe(3);
  });
});

describe('createEmptyFilters', () => {
  it('should create empty filter state', () => {
    const result = createEmptyFilters();
    expect(result).toEqual({ query: '', cardTypes: [], networks: [] });
  });
});
