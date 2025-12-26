'use client';

import { useEffect } from 'react';

export default function HemstadningService() {
  useEffect(() => {
    // Redirect to general wizard with service pre-selected
    window.location.href = '/clients/stadkjakten/booking-flow/flows/wizard?service=hemstadning';
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