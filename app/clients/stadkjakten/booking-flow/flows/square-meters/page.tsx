'use client';

import { useEffect } from 'react';

export default function SquareMetersRedirect() {
  useEffect(() => {
    console.log('[DEBUG] Redirecting from old square-meters page to combined wizard');
    window.location.href = '/clients/stadkjakten/booking-flow/flows/wizard';
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      gap: '1rem',
      fontFamily: 'Kalam, cursive'
    }}>
      <h1>🔄 Redirecting...</h1>
      <p>Taking you to the combined wizard page</p>
    </div>
  );
}