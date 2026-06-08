interface RestaurantGridProps {
  restaurants: Restaurant[];
  isLoading: boolean;
  isError: boolean;
}
 
export function RestaurantGrid({
  restaurants,
  isLoading,
  isError,
}: RestaurantGridProps) {
  return (
    // Responsive grid: 2 cols mobile → 3 cols tablet → 4 cols desktop
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
 
      {/* ── STATE 1: Loading → show 8 skeleton cards ─────────── */}
      {isLoading &&
        Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
      }
 
      {/* ── STATE 2: Error ────────────────────────────────────── */}
      {!isLoading && isError && <ErrorState />}
 
      {/* ── STATE 3: Empty (no results) ───────────────────────── */}
      {!isLoading && !isError && restaurants.length === 0 && <EmptyState />}
 
      {/* ── STATE 4: Success → render cards ──────────────────── */}
      {!isLoading &&
        !isError &&
        restaurants.map((r) => <RestaurantCard key={r.id} restaurant={r} />)
      }
 
    </div>
  );
}