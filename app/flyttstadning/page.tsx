'use client';

import { useEffect } from 'react';

export default function FlyttstadningRedirect() {
  useEffect(() => {
    // Redirect to service page
    window.location.href = '/clients/stadkjakten/booking-flow/services/flyttstadning';
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Kalam, cursive'
    }}>
      <p>Omdirigerar till flyttstädning...</p>
    </div>
  );
}