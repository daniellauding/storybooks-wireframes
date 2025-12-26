'use client';

import { Header } from '@/components/storybook/Header';
import { Card, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Badge } from '@/components/storybook/Badge';
import { Container } from '@/components/storybook/Container';
import React, { useState, useEffect } from 'react';

export default function ConfirmationPage() {
  const [bookingData, setBookingData] = useState<any>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get booking data from URL params or localStorage
    const params = new URLSearchParams(window.location.search);
    setBookingData({
      companyName: params.get('company') || 'StadExpert Malmö',
      service: params.get('service') || 'Hemstädning',
      date: params.get('date') || new Date().toLocaleDateString('sv-SE'),
      time: params.get('time') || '10:00',
      price: params.get('price') || '600',
      bookingNumber: `STJ-${Date.now().toString().slice(-6)}`
    });
    setMounted(true);
  }, []);

  const navigation = [
    { id: 'hemstadning', label: 'Hemstädning', href: '/hemstadning' },
    { id: 'fonsterputs', label: 'Fönsterputsning', href: '/fonsterputs' },
    { id: 'flyttstadning', label: 'Flyttstädning', href: '/flyttstadning' },
    { id: 'byggstadning', label: 'Byggstädning', href: '/byggstadning' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo={
          <span 
            style={{ cursor: 'pointer' }} 
            onClick={() => window.location.href = '/clients/stadkjakten'}
          >
            Städkjakten
          </span>
        }
        navigation={navigation}
        showSearch={false}
        variant="default"
      />

      <Container maxWidth="lg" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            transform: mounted ? 'rotate(1.2deg)' : 'none'
          }}>
            ✅
          </div>
          
          <h1 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '2.5rem',
            color: 'var(--success, #28a745)',
            marginBottom: '1rem',
            transform: mounted ? 'rotate(0.5deg)' : 'none'
          }}>
            Bokning bekräftad!
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary, #6b7280)'
          }}>
            Tack för din bokning. Du får en bekräftelse via e-post inom kort.
          </p>
        </div>

        <Card variant="primary" padding="xl" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          <CardContent>
            <h2 style={{
              fontFamily: 'Kalam, cursive',
              fontSize: '1.75rem',
              color: 'white',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              📋 Bokningsdetaljer
            </h2>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '1.5rem',
              borderRadius: '12px',
              color: 'white'
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <Badge variant="success" size="md" style={{ marginBottom: '0.5rem' }}>
                  Bokningsnummer: {bookingData.bookingNumber}
                </Badge>
              </div>

              <div style={{ display: 'grid', gap: '0.75rem', fontSize: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.9 }}>Företag:</span>
                  <span style={{ fontWeight: '600' }}>{bookingData.companyName}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.9 }}>Tjänst:</span>
                  <span style={{ fontWeight: '600' }}>{bookingData.service}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.9 }}>Datum:</span>
                  <span style={{ fontWeight: '600' }}>{bookingData.date}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ opacity: 0.9 }}>Tid:</span>
                  <span style={{ fontWeight: '600' }}>{bookingData.time}</span>
                </div>
                
                <hr style={{ margin: '0.5rem 0', border: '1px solid rgba(255, 255, 255, 0.2)' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem' }}>
                  <span style={{ fontWeight: '600' }}>Totalt:</span>
                  <span style={{ fontWeight: '600' }}>{bookingData.price} kr</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <Card variant="default" padding="lg">
            <CardContent>
              <h3 style={{
                fontFamily: 'Kalam, cursive',
                fontSize: '1.25rem',
                marginBottom: '1rem',
                color: 'var(--text-primary, #1a1a1a)'
              }}>
                📧 Vad händer nu?
              </h3>
              <ul style={{ 
                paddingLeft: '1.5rem', 
                color: 'var(--text-secondary, #6b7280)',
                lineHeight: '1.6' 
              }}>
                <li>Du får en bekräftelse via e-post</li>
                <li>Företaget kontaktar dig inom 24 timmar</li>
                <li>Eventuella justeringar av tid diskuteras</li>
                <li>Betalning sker efter utförd städning</li>
              </ul>
            </CardContent>
          </Card>

          <Card variant="default" padding="lg">
            <CardContent>
              <h3 style={{
                fontFamily: 'Kalam, cursive',
                fontSize: '1.25rem',
                marginBottom: '1rem',
                color: 'var(--text-primary, #1a1a1a)'
              }}>
                🔄 Behöver du ändra?
              </h3>
              <p style={{ 
                color: 'var(--text-secondary, #6b7280)',
                lineHeight: '1.6',
                marginBottom: '1rem'
              }}>
                Kontakta företaget direkt eller Städkjakten support för ändringar.
              </p>
              <Button variant="secondary" size="sm" style={{ width: '100%' }}>
                📞 Kontakta support
              </Button>
            </CardContent>
          </Card>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/clients/stadkjakten'}
            style={{ marginRight: '1rem' }}
          >
            ← Tillbaka till start
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            onClick={() => window.location.href = '/clients/stadkjakten/booking-flow/flows/wizard'}
          >
            🔄 Gör ny bokning
          </Button>
        </div>
      </Container>
    </div>
  );
}