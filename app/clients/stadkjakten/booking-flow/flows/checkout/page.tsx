'use client';

import { Header } from '@/components/storybook/Header';
import { Card, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Input } from '@/components/storybook/Input';
import { Badge } from '@/components/storybook/Badge';
import { Container } from '@/components/storybook/Container';
import React, { useState, useEffect } from 'react';

export default function CheckoutPage() {
  const [bookingData, setBookingData] = useState<any>({});
  const [mounted, setMounted] = useState(false);
  const [titleRotation, setTitleRotation] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    socialSecurityNumber: '',
    phone: '',
    email: '',
    address: '',
    portCode: '',
    keyAccess: '',
    parking: null as boolean | null,
    specialRequests: '',
    discountCode: ''
  });

  useEffect(() => {
    // Get booking parameters from URL
    const params = new URLSearchParams(window.location.search);
    setBookingData({
      companyId: params.get('companyId') || '1',
      companyName: params.get('companyName') || 'StadExpert Malmö',
      houseType: params.get('houseType') || 'villa',
      squareMeters: params.get('squareMeters') || '75',
      pets: params.get('pets') || 'no',
      slotTime: params.get('slotTime') || 'preferred',
      selectedDate: params.get('date') || '',
      selectedTime: params.get('time') || '',
      originalPrice: parseInt(params.get('originalPrice') || '1800'),
      customerPrice: parseInt(params.get('customerPrice') || '900')
    });
    // Set client-side values to avoid hydration errors
    setMounted(true);
    setTitleRotation(Math.random() * 1 - 0.5);
  }, []);

  const navigation = [
    { id: 'hemstadning', label: 'Hemstädning', href: '/hemstadning' },
    { id: 'fonsterputs', label: 'Fönsterputsning', href: '/fonsterputs' },
    { id: 'flyttstadning', label: 'Flyttstädning', href: '/flyttstadning' },
    { id: 'byggstadning', label: 'Byggstädning', href: '/byggstadning' },
  ];

  // Additional charges
  const cleaningSupplies = 150;
  const mileageFee = bookingData.squareMeters > 100 ? 75 : 0; // Calculated based on distance
  const petFee = bookingData.pets === 'yes' ? 100 : 0;
  const windowCleaning = 0; // Will be added if upsell is selected

  const totalExtras = cleaningSupplies + mileageFee + petFee + windowCleaning;
  const totalAmount = bookingData.customerPrice + totalExtras;
  const rotSavings = bookingData.originalPrice - bookingData.customerPrice;

  const isFormValid = () => {
    return (
      customerInfo.firstName.trim() !== '' &&
      customerInfo.lastName.trim() !== '' &&
      customerInfo.socialSecurityNumber.trim() !== '' &&
      customerInfo.phone.trim() !== '' &&
      customerInfo.email.trim() !== '' &&
      customerInfo.address.trim() !== '' &&
      customerInfo.keyAccess.trim() !== '' &&
      customerInfo.parking !== null
    );
  };

  const handleInputChange = (field: string, value: string | boolean | null) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = () => {
    console.log('Processing checkout with:', { bookingData, customerInfo });
    alert('Betalning genomförs... (Demo)');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo="Städkjakten"
        navigation={navigation}
        showSearch={false}
        variant="default"
      />

      {/* Progress indicator */}
      <div style={{
        backgroundColor: 'var(--surface-color, #fafafa)',
        borderBottom: '2px solid var(--border-color, #e5e7eb)',
        padding: '1rem 0'
      }}>
        <Container maxWidth="xl">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <Badge variant="success" size="md">✓ Företag valt</Badge>
            <div style={{ width: '2rem', height: '2px', backgroundColor: 'var(--border-color, #e5e7eb)' }} />
            <Badge variant="success" size="md">✓ Tid vald</Badge>
            <div style={{ width: '2rem', height: '2px', backgroundColor: 'var(--border-color, #e5e7eb)' }} />
            <Badge variant="primary" size="md">📝 Betalning</Badge>
          </div>
        </Container>
      </div>

      <Container maxWidth="lg" style={{ padding: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem'
        }}>
          
          {/* Left column - Customer form */}
          <div>
            <h1 style={{
              fontFamily: 'Kalam, cursive',
              fontSize: '2rem',
              color: 'var(--text-primary, #1a1a1a)',
              marginBottom: '1.5rem',
              transform: mounted ? `rotate(${titleRotation}deg)` : 'none'
            }}>
              Slutför din bokning
            </h1>

            {/* Customer Information */}
            <Card variant="default" padding="xl" style={{ marginBottom: '2rem' }}>
              <CardContent>
                <h2 style={{
                  fontFamily: 'Kalam, cursive',
                  fontSize: '1.5rem',
                  color: 'var(--text-primary, #1a1a1a)',
                  marginBottom: '1.5rem'
                }}>
                  👤 Dina uppgifter
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <Input
                    placeholder="Förnamn *"
                    value={customerInfo.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('firstName', e.target.value)}
                  />
                  <Input
                    placeholder="Efternamn *"
                    value={customerInfo.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('lastName', e.target.value)}
                  />
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <Input
                    placeholder="Personnummer (YYYYMMDD-XXXX) *"
                    value={customerInfo.socialSecurityNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('socialSecurityNumber', e.target.value)}
                  />
                  <Input
                    placeholder="Telefon *"
                    value={customerInfo.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                  />
                </div>

                <Input
                  placeholder="E-post *"
                  value={customerInfo.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
                  style={{ marginBottom: '1rem' }}
                />
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card variant="default" padding="xl" style={{ marginBottom: '2rem' }}>
              <CardContent>
                <h2 style={{
                  fontFamily: 'Kalam, cursive',
                  fontSize: '1.5rem',
                  color: 'var(--text-primary, #1a1a1a)',
                  marginBottom: '1.5rem'
                }}>
                  🏠 Adress & tillträde
                </h2>

                <Input
                  placeholder="Adress (med Google autocomplete) *"
                  value={customerInfo.address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('address', e.target.value)}
                  style={{ marginBottom: '1rem' }}
                />

                <Input
                  placeholder="Portkod *"
                  value={customerInfo.portCode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('portCode', e.target.value)}
                  style={{ marginBottom: '1rem' }}
                />

                <Input
                  placeholder="Nyckel/tillträde (t.ex. under mattan, brevlåda, etc.) *"
                  value={customerInfo.keyAccess}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('keyAccess', e.target.value)}
                  style={{ marginBottom: '1.5rem' }}
                />

                {/* Parking */}
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'var(--text-primary, #1a1a1a)',
                    marginBottom: '0.5rem'
                  }}>
                    Finns parkering tillgänglig? *
                  </p>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button
                      variant={customerInfo.parking === true ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => handleInputChange('parking', true)}
                    >
                      🅿️ Ja, parkering finns
                    </Button>
                    <Button
                      variant={customerInfo.parking === false ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => handleInputChange('parking', false)}
                    >
                      🚫 Nej, ingen parkering
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Special requests */}
            <Card variant="default" padding="xl" style={{ marginBottom: '2rem' }}>
              <CardContent>
                <h2 style={{
                  fontFamily: 'Kalam, cursive',
                  fontSize: '1.5rem',
                  color: 'var(--text-primary, #1a1a1a)',
                  marginBottom: '1rem'
                }}>
                  💬 Specialönskemål
                </h2>
                <textarea
                  placeholder="Skriv eventuella specialönskemål eller kommentarer här..."
                  value={customerInfo.specialRequests}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('specialRequests', e.target.value)}
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '1rem',
                    border: '2px solid var(--border-color, #e5e7eb)',
                    borderRadius: '12px 8px 12px 8px',
                    fontFamily: 'Kalam, cursive',
                    fontSize: '1rem',
                    resize: 'vertical',
                    backgroundColor: 'white'
                  }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right column - Order summary & payment */}
          <div>
            {/* Booking summary */}
            <Card variant="primary" padding="lg" style={{ marginBottom: '1rem', position: 'sticky', top: '1rem' }}>
              <CardContent>
                <h2 style={{
                  fontFamily: 'Kalam, cursive',
                  fontSize: '1.25rem',
                  color: 'white',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  📋 Din bokning
                </h2>

                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <p style={{ color: 'white', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>
                    <strong>{bookingData.companyName}</strong>
                  </p>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem', margin: 0 }}>
                    {bookingData.houseType} • {bookingData.squareMeters} kvm • {bookingData.pets === 'yes' ? 'Husdjur' : 'Inga husdjur'}
                  </p>
                  {bookingData.selectedDate && (
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>
                      📅 {bookingData.selectedDate} {bookingData.selectedTime}
                    </p>
                  )}
                </div>

                {/* Price breakdown */}
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '1rem',
                  borderRadius: '8px',
                  color: 'var(--text-primary, #1a1a1a)'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem'
                  }}>
                    💰 Prisuppdelning
                  </h3>

                  <div style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span>Grundstädning:</span>
                      <span>{bookingData.customerPrice} kr</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span>Städmaterial:</span>
                      <span>{cleaningSupplies} kr</span>
                    </div>
                    {mileageFee > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Kilometerersättning:</span>
                        <span>{mileageFee} kr</span>
                      </div>
                    )}
                    {petFee > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span>Husdjurstillägg:</span>
                        <span>{petFee} kr</span>
                      </div>
                    )}
                    <hr style={{ margin: '0.5rem 0', border: '1px solid var(--border-color, #e5e7eb)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1rem' }}>
                      <span>Totalt att betala:</span>
                      <span>{totalAmount} kr</span>
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--success, #28a745)',
                      marginTop: '0.25rem',
                      textAlign: 'center'
                    }}>
                      💚 Du sparar {rotSavings} kr med ROT-avdrag
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Discount code */}
            <Card variant="default" padding="md" style={{ marginBottom: '1rem' }}>
              <CardContent>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Input
                    placeholder="Rabattkod / presentkort"
                    value={customerInfo.discountCode}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('discountCode', e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <Button variant="ghost" size="sm">
                    Lägg till
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upselling - Window cleaning */}
            <Card variant="default" padding="md" style={{ marginBottom: '2rem' }}>
              <CardContent>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary, #1a1a1a)'
                }}>
                  ✨ Lägg till fönsterputsning?
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary, #6b7280)',
                  marginBottom: '0.75rem'
                }}>
                  Få kristallklara fönster för bara 299 kr extra
                </p>
                <Button variant="secondary" size="sm" style={{ width: '100%' }}>
                  + Lägg till fönsterputsning (299 kr)
                </Button>
              </CardContent>
            </Card>

            {/* Pay button */}
            <Button
              variant="primary"
              size="lg"
              onClick={handleCheckout}
              style={{
                width: '100%',
                fontSize: '1.125rem',
                padding: '1rem',
                position: 'sticky',
                bottom: '1rem',
                zIndex: 10
              }}
            >
              💳 Betala {totalAmount} kr
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}