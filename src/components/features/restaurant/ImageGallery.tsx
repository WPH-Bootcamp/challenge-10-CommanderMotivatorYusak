"use client";

interface ImageGalleryProps {
  restaurant?: {
    img_url?: string;
    name?: string;
  };
}

export function ImageGallery({ restaurant }: ImageGalleryProps) {
  // 🛡️ Safety Guard: If restaurant data hasn't arrived yet, show a clean loading state instead of crashing!
  if (!restaurant || !restaurant.img_url) {
    return (
      <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ color: '#64748b' }}>⌛ Loading images...</p>
      </div>
    );
  }

  return (
    <div style={{ margin: '1rem 0', borderRadius: '12px', overflow: 'hidden' }}>
      <img 
        src={restaurant.img_url} 
        alt={restaurant.name || "Restaurant Image"} 
        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
      />
    </div>
  );
}