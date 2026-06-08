"use client";

import Link from 'next/link';

export default function HomePage() {
  // A mock restaurant ID to let you easily click through and test your dynamic pages
  const sampleRestaurantId = "1"; 

  return (
    <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
      <h1 style={{ color: '#e11d48', fontSize: '2.5rem', marginBottom: '1rem' }}>🍕 Foody App Home</h1>
      <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem' }}>
        Your global routing system is fully operational!
      </p>
      
      <Link 
        href={`/restaurant/${sampleRestaurantId}`}
        style={{ display: 'inline-block', background: '#e11d48', color: '#fff', padding: '0.75rem 2rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}
      >
        Go to Restaurant View (ID: 1) →
      </Link>
    </div>
  );
}