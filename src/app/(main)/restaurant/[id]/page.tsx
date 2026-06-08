"use client";

import { useParams } from 'next/navigation';
import { useRestaurantDetail } from '@/hooks/useRestaurantDetail';
import { ImageGallery } from '@/components/features/restaurant/ImageGallery';
import { MenuItemCard } from '@/components/features/restaurant/MenuItemCard';
import { CheckoutBar } from '@/components/features/restaurant/CheckoutBar';

export default function RestaurantDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  // Fetch details using your custom hook
  const { data: restaurant, isLoading } = useRestaurantDetail(id);

  if (isLoading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading restaurant workspace...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      {/* Passes data safely downstream to your crash-proof image display */}
      <ImageGallery restaurant={restaurant} />
      
      <h1 style={{ margin: '1rem 0' }}>{restaurant?.name || "Premium Restaurant"}</h1>
      <p style={{ color: '#64748b' }}>{restaurant?.description || "Welcome to our quality menu selections."}</p>
      
      <MenuItemCard />
      <CheckoutBar />
    </div>
  );
}