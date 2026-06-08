import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '@/types/order.types';

interface CartState {
  items: CartItem[];

  // Derived (computed) values
  totalItems: number;
  totalPrice: number;

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

// Helper: recompute derived totals from items array
const computeTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
  totalPrice: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
});

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (newItem) => {
        const existing = get().items.find((i) => i.id === newItem.id);
        let updated: CartItem[];
        if (existing) {
          // Item already in cart → increment quantity
          updated = get().items.map((i) =>
            i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          // New item → add with quantity 1
          updated = [...get().items, { ...newItem, quantity: 1 }];
        }
        set({ items: updated, ...computeTotals(updated) });
      },

      removeItem: (itemId) => {
        const updated = get().items.filter((i) => i.id !== itemId);
        set({ items: updated, ...computeTotals(updated) });
      },

      updateQuantity: (itemId, quantity) => {
        // If quantity hits 0, remove the item entirely
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        const updated = get().items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        );
        set({ items: updated, ...computeTotals(updated) });
      },

      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    {
      name: 'foody-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);