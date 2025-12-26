'use client';

import { Card, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Badge } from '@/components/storybook/Badge';
import { Rating } from '@/components/storybook/Rating';
import React, { useState, useEffect } from 'react';

export default function CompanyEmbedPage({ params }: { params: Promise<{ companyId: string }> }) {
  const [companyData, setCompanyData] = useState<any>(null);
  const [resolvedParams, setResolvedParams] = useState<{ companyId: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Resolve the params Promise first
    params.then(setResolvedParams);
    setMounted(true);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;
    
    // Same company data as main site but simplified for embed
    const companies = {
      '1': {
        id: 1,
        name: 'StadExpert Malmö',
        logo: '🧽',
        rating: 4.8,
        reviews: 127,
        tagline: 'Professionell hemstädning med 15 års erfarenhet',
        services: [
          {
            id: 'hemstadning',
            name: 'Hemstädning',
            description: 'Regelbunden städning av hem och lägenheter',
            basePrice: 450,
            icon: '🏠'
          },
          {
            id: 'flyttstadning',
            name: 'Flyttstädning', 
            description: 'Grundlig städning inför flytt',
            basePrice: 650,
            icon: '📦'
          },
          {
            id: 'kontorsstadning',
            name: 'Kontorsstädning',
            description: 'Professionell kontorsstädning',
            basePrice: 380,
            icon: '🏢'
          }
        ],
        availableSlots: [
          { id: 1, date: '2024-12-27', time: '09:00', available: true },
          { id: 2, date: '2024-12-27', time: '13:00', available: true },
          { id: 3, date: '2024-12-28', time: '10:00', available: true },
          { id: 4, date: '2024-12-29', time: '14:00', available: true }
        ],
        primaryColor: '#007bff'
      }
    };

    const company = companies[resolvedParams.companyId as keyof typeof companies];
    if (company) {
      setCompanyData(company);
    }
  }, [resolvedParams]);

  const handleServiceBooking = (service: any) => {
    // For embed version, open Stadkjakten booking in new window/tab
    const bookingUrl = `${window.location.origin}/clients/stadkjakten/booking-flow/flows/wizard?service=${service.id}&company=${companyData.id}&embed=true`;
    window.open(bookingUrl, '_blank', 'width=800,height=600');
  };

  const handleSlotBooking = (slot: any, service: any) => {
    // Direct slot booking opens in new window
    const checkoutParams = new URLSearchParams();
    checkoutParams.set('companyId', companyData.id.toString());
    checkoutParams.set('companyName', companyData.name);
    checkoutParams.set('serviceId', service.id);
    checkoutParams.set('serviceName', service.name);
    checkoutParams.set('slotDate', slot.date);
    checkoutParams.set('slotTime', slot.time);
    checkoutParams.set('originalPrice', (service.basePrice * 2).toString());
    checkoutParams.set('customerPrice', service.basePrice.toString());
    checkoutParams.set('embed', 'true');
    
    const checkoutUrl = `${window.location.origin}/clients/stadkjakten/booking-flow/flows/checkout?${checkoutParams.toString()}`;
    window.open(checkoutUrl, '_blank', 'width=900,height=700');
  };

  if (!companyData) {
    return (
      <div style={{ 
        minHeight: '400px', 
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Kalam, cursive'
      }}>
        <p>Laddar bokningsformulär...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      padding: '1rem',
      fontFamily: 'Kalam, cursive'
    }}>
      {/* Compact Header */}
      <Card variant="primary" padding="md" style={{ marginBottom: '1rem' }}>
        <CardContent>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: 'white'
          }}>
            <div style={{
              fontSize: '2rem',
              transform: mounted ? 'rotate(1.2deg)' : 'none'
            }}>
              {companyData.logo}
            </div>
            
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: '1.5rem',
                margin: '0 0 0.25rem 0',
                transform: mounted ? 'rotate(0.3deg)' : 'none'
              }}>
                {companyData.name}
              </h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Rating value={companyData.rating} readonly size="sm" />
                <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                  {companyData.rating} ({companyData.reviews} recensioner)
                </span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <Badge variant="secondary" size="sm">
                ✅ Stadjakten Verified
              </Badge>
            </div>
          </div>
          
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: '0.875rem', 
            margin: '0.75rem 0 0 0' 
          }}>
            {companyData.tagline}
          </p>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {companyData.services.map((service: any, index: number) => {
          const rotation = mounted ? (Math.sin(index) * 0.5) : 0;
          
          return (
            <Card
              key={service.id}
              variant="outlined"
              padding="md"
              clickable={true}
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: 'all 0.3s ease'
              }}
            >
              <CardContent>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{service.icon}</span>
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: 'var(--text-primary, #1a1a1a)',
                      margin: 0
                    }}>
                      {service.name}
                    </h3>
                  </div>
                  
                  <p style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary, #6b7280)',
                    margin: '0 0 0.5rem 0',
                    lineHeight: '1.4'
                  }}>
                    {service.description}
                  </p>
                  
                  <Badge variant="info" size="sm">
                    Från {service.basePrice} kr
                  </Badge>
                </div>
                
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleServiceBooking(service)}
                  style={{ width: '100%', fontSize: '0.875rem' }}
                >
                  Boka nu →
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Booking Slots */}
      <Card variant="default" padding="md">
        <CardContent>
          <h3 style={{
            fontSize: '1.25rem',
            color: 'var(--text-primary, #1a1a1a)',
            marginBottom: '1rem',
            textAlign: 'center',
            transform: mounted ? 'rotate(0.3deg)' : 'none'
          }}>
            🕐 Snabbbokning - Lediga tider
          </h3>
          
          <p style={{
            color: 'var(--text-secondary, #6b7280)',
            fontSize: '0.75rem',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Klicka för direkt bokning av hemstädning
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.75rem'
          }}>
            {companyData.availableSlots.slice(0, 4).map((slot: any, index: number) => {
              const date = new Date(slot.date);
              const dayName = date.toLocaleDateString('sv-SE', { weekday: 'short' });
              const dateStr = date.toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' });
              
              return (
                <div
                  key={slot.id}
                  style={{
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 123, 255, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: mounted ? `rotate(${Math.sin(index) * 0.5}deg)` : 'none'
                  }}
                  onClick={() => {
                    handleSlotBooking(slot, companyData.services[0]);
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 123, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      color: 'var(--text-primary, #1a1a1a)',
                      fontWeight: '600',
                      fontSize: '0.75rem'
                    }}>
                      {dayName} {dateStr}
                    </div>
                    <div style={{
                      color: 'var(--text-secondary, #6b7280)',
                      fontSize: '0.625rem',
                      marginTop: '0.25rem'
                    }}>
                      {slot.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Powered by footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: '8px'
      }}>
        <p style={{
          fontSize: '0.625rem',
          color: 'var(--text-secondary, #6b7280)',
          margin: 0
        }}>
          🚀 Powered by <strong>Städkjakten</strong> - Sveriges ledande städplattform
        </p>
      </div>
    </div>
  );
}