import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import * as restaurantApi from '@/lib/api/restaurant.api';

// Query key factory — ensures correct cache invalidation
export const restaurantKeys = {
  all: ['restaurants'] as const,
  list: (params: Record<string, string>) =>
    [...restaurantKeys.all, 'list', params] as const,
  detail: (id: string) => [...restaurantKeys.all, 'detail', id] as const,
};

export const useRestaurants = () => {
  const searchParams = useSearchParams();

  // Read filter state from URL search params
  // (Next.js best practice: URL = source of truth for page-level state)
  const search = searchParams.get('search') ?? '';
  const category = searchParams.get('category') ?? 'all';

  const queryParams = { search, category };

  return useQuery({
    // queryKey array — when any value changes, React Query re-fetches
    queryKey: restaurantKeys.list(queryParams),

    queryFn: () => restaurantApi.getRestaurants(queryParams),

    // Keep previous data visible while new data loads (no flicker)
    placeholderData: (prev) => prev,
  });
};