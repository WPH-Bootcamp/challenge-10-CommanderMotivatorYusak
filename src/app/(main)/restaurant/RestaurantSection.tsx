'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { CategoryFilter } from './CategoryFilter';
import { RestaurantGrid } from './RestaurantGrid';
import { useRestaurants } from '@/hooks/useRestaurants';

export function RestaurantSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ── Update URL search params (Next.js App Router pattern) ──
  // This is the correct way to handle filter state in App Router:
  // update the URL, which triggers useSearchParams to re-read,
  // which updates the queryKey in useRestaurants, which re-fetches.
  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const { data, isLoading, isError } = useRestaurants();

  const activeCategory = searchParams.get('category') ?? 'all';

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Category filter chips */}
      <CategoryFilter
        active={activeCategory}
        onChange={(cat) => setParam('category', cat)}
      />

      {/* Recommended section heading */}
      <div className="flex justify-between items-center mt-8 mb-4">
        <h2 className="font-semibold text-lg">Recommended</h2>
        <button
          className="text-red-600 text-sm"
          onClick={() => setParam('category', 'all')}
        >
          See All
        </button>
      </div>

      {/* Restaurant grid — handles loading/error/empty states */}
      <RestaurantGrid
        restaurants={data?.data ?? []}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  );
}