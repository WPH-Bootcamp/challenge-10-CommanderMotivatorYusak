'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from '@/components/features/cart/CartItem';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  // Group cart items by restaurant for display
  const grouped = items.reduce<Record<string, typeof items>>(
    (acc, item) => {
      if (!acc[item.restaurantId]) acc[item.restaurantId] = [];
      acc[item.restaurantId].push(item);
      return acc;
    },
    {}
  );

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Browse restaurants and add items to your cart"
        actionLabel="Browse Restaurants"
        actionHref="/"
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-xl font-semibold mb-6">My Cart</h1>

      {/* Grouped by restaurant */}
      {Object.entries(grouped).map(([restaurantId, restaurantItems]) => (
        <div key={restaurantId} className="mb-6">
          <h2 className="font-medium text-sm text-gray-500 mb-3">
            {restaurantItems[0].restaurantName}
          </h2>

          <div className="space-y-3">
            {restaurantItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Subtotal per restaurant group */}
          <div className="flex justify-between mt-3 pt-3 border-t text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-medium">
              {formatPrice(
                restaurantItems.reduce(
                  (sum, i) => sum + i.price * i.quantity,
                  0
                )
              )}
            </span>
          </div>

          {/* Pay button per restaurant group */}
          <Link
            href="/checkout"
            className="mt-3 block w-full text-center py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Pay
          </Link>
        </div>
      ))}
    </div>
  );
}