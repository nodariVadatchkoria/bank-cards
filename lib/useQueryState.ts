'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterState } from './types';
import { parseFiltersFromQuery, filtersToQuery } from './filtering';

/**
 * Hook to sync filter state with URL query parameters
 */
export function useQueryState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL
  const [filters, setFilters] = useState<FilterState>(() => 
    parseFiltersFromQuery(searchParams)
  );

  // Update URL when filters change
  useEffect(() => {
    const newParams = filtersToQuery(filters);
    const newUrl = newParams.toString() 
      ? `${window.location.pathname}?${newParams.toString()}`
      : window.location.pathname;
    
    // Only update if URL actually changed
    if (newUrl !== window.location.pathname + window.location.search) {
      router.push(newUrl, { scroll: false });
    }
  }, [filters, router]);

  // Update state when URL changes (e.g., browser back/forward)
  useEffect(() => {
    const newFilters = parseFiltersFromQuery(searchParams);
    setFilters(newFilters);
  }, [searchParams]);

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  return {
    filters,
    updateFilters,
    setFilters,
  };
}
