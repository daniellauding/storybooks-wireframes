'use client';

import { useEffect } from 'react';

export default function HemstadningRedirect() {
  useEffect(() => {
    // Redirect to service page
    window.location.href = '/clients/stadkjakten/booking-flow/services/hemstadning';
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Kalam, cursive'
    }}>
      <p>Omdirigerar till hemstädning...</p>
    </div>
  );
}