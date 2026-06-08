'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRestaurantDetail } from '@/hooks/useRestaurantDetail';
import { useCartStore } from '@/store/cartStore';
import { ImageGallery } from '@/components/features/restaurant/ImageGallery';
import { MenuItemCard } from '@/components/features/restaurant/MenuItemCard';
import { CheckoutBar } from '@/components/features/cart/CheckoutBar';
import { Spinner } from '@/components/ui/Spinner';
import { ErrorState } from '@/components/ui/ErrorState';
import type { MenuItem } from '@/types/restaurant.types';

// Menu tab options matching Figma design
const MENU_TABS = ['All Menu', 'Food', 'Drink'] as const;
type MenuTab = (typeof MENU_TABS)[number];

export default function RestaurantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<MenuTab>('All Menu');

  const { restaurant, menu, isLoading, isError } = useRestaurantDetail(id);

  // Cart actions from Zustand (client state)
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const totalItems = useCartStore((state) => state.totalItems);

  if (isLoading) return <Spinner className="my-20 mx-auto" />;
  if (isError || !restaurant) return <ErrorState message="Restaurant not found" />;

  // ── Client-side menu filtering by tab ───────────────────────
  // Filter runs on the already-fetched menu array — no API call needed
  const filteredMenu: MenuItem[] =
    activeTab === 'All Menu'
      ? menu
      : menu.filter(
          (item) => item.category === activeTab.toLowerCase()
        );

  // ── Add to cart handler ──────────────────────────────────────
  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-28">
      {/* Image gallery: 1 large + 4 thumbnails */}
      <ImageGallery images={restaurant.images} />

      {/* Restaurant info row */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <img
            src={restaurant.logo}
            alt={restaurant.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h1 className="font-semibold text-lg">{restaurant.name}</h1>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="text-yellow-500">★</span>
              <span>{restaurant.rating.toFixed(1)}</span>
              <span>·</span>
              <span>{restaurant.address}</span>
              <span>·</span>
              <span>{restaurant.distance}</span>
            </div>
          </div>
        </div>
        <button className="text-sm text-gray-500 flex items-center gap-1">
          Share
        </button>
      </div>

      {/* Menu section */}
      <h2 className="font-semibold text-lg mt-6 mb-3">Menu</h2>

      {/* Tab bar */}
      <div className="flex gap-2 mb-4">
        {MENU_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Menu grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMenu.map((item) => {
          // Check if this item is already in cart for qty display
          const cartItem = cartItems.find((c) => c.id === item.id);
          return (
            <MenuItemCard
              key={item.id}
              item={item}
              cartQuantity={cartItem?.quantity ?? 0}
              onAdd={() => handleAddToCart(item)}
              onUpdateQty={(qty) =>
                useCartStore.getState().updateQuantity(item.id, qty)
              }
            />
          );
        })}
      </div>

      {/* Sticky bottom bar — only visible when cart has items */}
      <CheckoutBar totalItems={totalItems} totalPrice={totalPrice} />
    </div>
  );
}