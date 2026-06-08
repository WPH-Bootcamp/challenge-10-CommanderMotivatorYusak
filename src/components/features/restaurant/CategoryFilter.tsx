'use client';
 
// ── Icons use emoji for now; swap to lucide-react if preferred ──
 
interface Category {
  id: string;
  label: string;
  icon: string; // emoji icon
}
 
// ── Category definitions matching Figma design ───────────────
// These match the chips shown in the Home page mockup:
// All Restaurant · Nearby · Discount · Best Seller · Delivery · Lunch
const CATEGORIES: Category[] = [
  { id: 'all',        label: 'All Restaurant', icon: '🍽️' },
  { id: 'nearby',     label: 'Nearby',         icon: '📍' },
  { id: 'discount',   label: 'Discount',       icon: '🏷️' },
  { id: 'best-seller',label: 'Best Seller',    icon: '🏆' },
  { id: 'delivery',   label: 'Delivery',       icon: '🛵' },
  { id: 'lunch',      label: 'Lunch',          icon: '🥗' },
];
 
interface CategoryFilterProps {
  active: string;
  onChange: (categoryId: string) => void;
}
 
export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    // Outer: horizontally scrollable on mobile, no scrollbar shown
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-3 w-max pb-2">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.id;
 
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              // Active state: red filled · Inactive: white bordered
              className={`
                flex flex-col items-center gap-1.5
                px-4 py-2.5 rounded-xl
                text-xs font-medium
                transition-all duration-150
                whitespace-nowrap select-none
                ${isActive
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300 hover:text-red-600'
                }
              `}
              aria-pressed={isActive}
              aria-label={`Filter by ${cat.label}`}
            >
              {/* Icon */}
              <span className="text-xl leading-none" aria-hidden="true">
                {cat.icon}
              </span>
              {/* Label */}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}