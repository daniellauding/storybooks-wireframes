'use client';

import { Header } from '@/components/storybook/Header';
import { Card, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Badge } from '@/components/storybook/Badge';
import { Rating } from '@/components/storybook/Rating';
import { Container } from '@/components/storybook/Container';
import React, { useState, useEffect } from 'react';

export default function CompanyPage({ params }: { params: Promise<{ companyId: string }> }) {
  const [companyData, setCompanyData] = useState<any>(null);
  const [resolvedParams, setResolvedParams] = useState<{ companyId: string } | null>(null);

  useEffect(() => {
    // Resolve the params Promise first
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;
    // Mock company data - in real app this would be fetched from API
    const companies = {
      '1': {
        id: 1,
        name: 'StadExpert Malmö',
        logo: '🧽',
        address: 'Stora Nygatan 15, Malmö',
        phone: '+46 40 123 456',
        email: 'info@stadexpert.se',
        website: 'www.stadexpert.se',
        rating: 4.8,
        reviews: 127,
        description: 'Professionell hemstädning med 15 års erfarenhet. Vi använder miljövänliga produkter och har specialiserat oss på att leverera högkvalitativ städservice till hem och kontor i Malmöregionen.',
        certifications: ['Miljöcertifierad', 'Top Partner', 'Kollektivavtal'],
        specialties: ['Husdjursvänlig', 'Allergiutbildad'],
        services: [
          {
            id: 'hemstadning',
            name: 'Hemstädning',
            description: 'Regelbunden eller engångsstädning av hem och lägenheter',
            basePrice: 450,
            icon: '🏠'
          },
          {
            id: 'flyttstadning',
            name: 'Flyttstädning', 
            description: 'Grundlig städning inför inflyttning eller utflyttning',
            basePrice: 650,
            icon: '📦'
          },
          {
            id: 'kontorsstadning',
            name: 'Kontorsstädning',
            description: 'Professionell städning av kontor och arbetsplatser',
            basePrice: 380,
            icon: '🏢'
          },
          {
            id: 'byggstadning',
            name: 'Byggstädning',
            description: 'Städning efter renovering eller byggarbeten',
            basePrice: 580,
            icon: '🔨'
          }
        ],
        availableSlots: [
          { id: 1, date: '2024-12-27', time: '09:00', available: true },
          { id: 2, date: '2024-12-27', time: '13:00', available: true },
          { id: 3, date: '2024-12-28', time: '10:00', available: true },
          { id: 4, date: '2024-12-29', time: '14:00', available: true },
          { id: 5, date: '2024-12-30', time: '08:00', available: true },
          { id: 6, date: '2024-12-30', time: '16:00', available: true }
        ],
        gallery: ['🖼️', '📸', '🎨', '🌟'],
        workingHours: 'Mån-Fre: 07:00-18:00, Lör: 08:00-16:00'
      },
      // Add more companies as needed
      '2': {
        id: 2,
        name: 'Rena Hem Service',
        logo: '✨',
        address: 'Västra Hamngatan 8, Malmö',
        phone: '+46 40 987 654',
        email: 'kontakt@renahem.se',
        website: 'www.renahem.se',
        rating: 4.6,
        reviews: 89,
        description: 'Flexibel städservice med fokus på kundnöjdhet. Vi garanterar alltid bra resultat och anpassar oss efter dina behov och önskemål.',
        certifications: ['Miljöcertifierad', 'Kollektivavtal'],
        specialties: ['Husdjur OK', 'Snabbstädning'],
        services: [
          {
            id: 'hemstadning',
            name: 'Hemstädning',
            description: 'Regelbunden eller engångsstädning',
            basePrice: 420,
            icon: '🏠'
          },
          {
            id: 'flyttstadning',
            name: 'Flyttstädning',
            description: 'Grundlig städning för flyttning',
            basePrice: 600,
            icon: '📦'
          }
        ],
        availableSlots: [
          { id: 1, date: '2024-12-28', time: '09:30', available: true },
          { id: 2, date: '2024-12-28', time: '14:30', available: true },
          { id: 3, date: '2024-12-29', time: '11:00', available: true }
        ],
        gallery: ['✨', '🌟', '💫', '⭐'],
        workingHours: 'Mån-Fre: 08:00-17:00, Lör: 09:00-15:00'
      },
      '3': {
        id: 3,
        name: 'Premium Clean Skåne',
        logo: '🌟',
        address: 'Regementsgatan 12, Malmö',
        phone: '+46 40 555 777',
        email: 'premium@cleanskane.se',
        website: 'www.premiumcleanskane.se',
        rating: 4.9,
        reviews: 203,
        description: 'Premiumstädning för kräsna kunder. Vi levererar högsta kvalitet med 100% nöjdhetsgaranti och använder enbart premiumutrustning och miljöcertifierade produkter.',
        certifications: ['Miljöcertifierad', 'Top Partner', 'ISO-certifierad'],
        specialties: ['Luksustädning', 'Detaljerad'],
        services: [
          {
            id: 'hemstadning',
            name: 'Premium Hemstädning',
            description: 'Luksus hemstädning med högsta kvalitet',
            basePrice: 520,
            icon: '🏠'
          },
          {
            id: 'flyttstadning',
            name: 'Premium Flyttstädning',
            description: 'Grundlig flyttstädning med garanterat godkänt resultat',
            basePrice: 750,
            icon: '📦'
          },
          {
            id: 'kontorsstadning',
            name: 'Kontorsstädning',
            description: 'Professionell kontorsstädning',
            basePrice: 450,
            icon: '🏢'
          }
        ],
        availableSlots: [
          { id: 1, date: '2024-12-30', time: '10:00', available: true },
          { id: 2, date: '2024-12-31', time: '14:00', available: true },
          { id: 3, date: '2025-01-02', time: '09:00', available: true },
          { id: 4, date: '2025-01-03', time: '15:00', available: true }
        ],
        gallery: ['🌟', '💎', '✨', '🏆'],
        workingHours: 'Mån-Fre: 07:00-19:00, Lör: 08:00-16:00'
      },
      '4': {
        id: 4,
        name: 'Snabbstäd Malmö',
        logo: '⚡',
        address: 'Möllevångsgatan 22, Malmö',
        phone: '+46 40 333 999',
        email: 'info@snabbstad.se',
        website: 'www.snabbstadmalmo.se',
        rating: 4.4,
        reviews: 156,
        description: 'Snabb och effektiv städning när det passar dig. Vi är specialister på akuta städbehov och kan oftast vara hos dig inom några timmar. Perfekt för sista-minuten städning.',
        certifications: ['Kollektivavtal'],
        specialties: ['Express', 'Helger OK'],
        services: [
          {
            id: 'hemstadning',
            name: 'Express Hemstädning',
            description: 'Snabb hemstädning samma dag',
            basePrice: 380,
            icon: '🏠'
          },
          {
            id: 'akutstadning',
            name: 'Akutstädning',
            description: 'Akut städning inom 2-4 timmar',
            basePrice: 480,
            icon: '🚨'
          },
          {
            id: 'helgstadning',
            name: 'Helgstädning',
            description: 'Städning på helger och kvällar',
            basePrice: 420,
            icon: '🌙'
          }
        ],
        availableSlots: [
          { id: 1, date: '2024-12-26', time: '15:00', available: true },
          { id: 2, date: '2024-12-27', time: '12:00', available: true },
          { id: 3, date: '2024-12-27', time: '16:00', available: true },
          { id: 4, date: '2024-12-28', time: '18:00', available: true },
          { id: 5, date: '2024-12-29', time: '19:00', available: true }
        ],
        gallery: ['⚡', '🚀', '⏰', '💨'],
        workingHours: '7 dagar i veckan: 06:00-22:00'
      }
    };

    const company = companies[resolvedParams.companyId as keyof typeof companies];
    if (company) {
      setCompanyData(company);
    }
  }, [resolvedParams]);

  const navigation = [
    { id: 'hemstadning', label: 'Hemstädning', href: '/hemstadning' },
    { id: 'fonsterputs', label: 'Fönsterputsning', href: '/fonsterputs' },
    { id: 'flyttstadning', label: 'Flyttstädning', href: '/flyttstadning' },
    { id: 'byggstadning', label: 'Byggstädning', href: '/byggstadning' },
  ];

  const handleServiceBooking = (service: any) => {
    // Navigate to booking flow with service pre-selected
    const bookingUrl = `/clients/stadkjakten/booking-flow/flows/wizard?service=${service.id}&company=${companyData.id}`;
    console.log(`[DEBUG] Starting booking for ${service.name} with ${companyData.name}`);
    window.location.href = bookingUrl;
  };

  const handleSlotBooking = (slot: any, service: any) => {
    // Navigate directly to checkout with pre-selected slot
    const checkoutParams = new URLSearchParams();
    checkoutParams.set('companyId', companyData.id.toString());
    checkoutParams.set('companyName', companyData.name);
    checkoutParams.set('serviceId', service.id);
    checkoutParams.set('serviceName', service.name);
    checkoutParams.set('slotDate', slot.date);
    checkoutParams.set('slotTime', slot.time);
    checkoutParams.set('originalPrice', (service.basePrice * 2).toString()); // Estimate for villa
    checkoutParams.set('customerPrice', service.basePrice.toString());
    
    const checkoutUrl = `/clients/stadkjakten/booking-flow/flows/checkout?${checkoutParams.toString()}`;
    console.log('[DEBUG] Direct booking with slot:', checkoutUrl);
    window.location.href = checkoutUrl;
  };

  if (!companyData) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
        <Header logo="Städkjakten" navigation={navigation} />
        <Container maxWidth="xl" style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Företag hittades inte</h1>
          <Button variant="primary" onClick={() => window.history.back()}>
            ← Tillbaka
          </Button>
        </Container>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo="Städkjakten"
        navigation={navigation}
        showSearch={false}
        variant="default"
      />

      {/* Company header */}
      <div style={{
        backgroundColor: 'var(--accent, #007bff)',
        color: 'white',
        padding: '3rem 0'
      }}>
        <Container maxWidth="xl">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              fontSize: '4rem',
              transform: `rotate(${Math.random() * 5 - 2.5}deg)`
            }}>
              {companyData.logo}
            </div>
            
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontFamily: 'Kalam, cursive',
                fontSize: '3rem',
                margin: '0 0 0.5rem 0',
                transform: `rotate(${Math.random() * 1 - 0.5}deg)`
              }}>
                {companyData.name}
              </h1>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <Rating value={companyData.rating} readonly size="md" />
                <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                  {companyData.rating}
                </span>
                <span style={{ fontSize: '1rem', opacity: 0.8 }}>
                  ({companyData.reviews} recensioner)
                </span>
              </div>
              
              <p style={{ fontSize: '1rem', opacity: 0.9, margin: 0 }}>
                📍 {companyData.address} • 📞 {companyData.phone}
              </p>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <Button
                variant="secondary"
                size="md"
                onClick={() => window.history.back()}
                style={{ marginBottom: '0.5rem' }}
              >
                ← Tillbaka till sök
              </Button>
              <br />
              <Badge variant="success" size="md">{companyData.workingHours}</Badge>
            </div>
          </div>
        </Container>
      </div>

      <Container maxWidth="xl" style={{ padding: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem',
          '@media (max-width: 1024px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          
          {/* Left column - Services and info */}
          <div>
            {/* About company */}
            <Card variant="default" padding="xl" style={{ marginBottom: '2rem' }}>
              <CardContent>
                <h2 style={{
                  fontFamily: 'Kalam, cursive',
                  fontSize: '1.75rem',
                  color: 'var(--text-primary, #1a1a1a)',
                  marginBottom: '1rem'
                }}>
                  Om {companyData.name}
                </h2>
                
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary, #6b7280)',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {companyData.description}
                </p>

                {/* Certifications */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {companyData.certifications.map((cert: string, index: number) => (
                    <Badge key={index} variant="success" size="sm">
                      ✓ {cert}
                    </Badge>
                  ))}
                  {companyData.specialties.map((specialty: string, index: number) => (
                    <Badge key={index} variant="info" size="sm">
                      {specialty}
                    </Badge>
                  ))}
                </div>

                {/* Contact info */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <Button variant="ghost" size="sm" onClick={() => window.open(`tel:${companyData.phone}`)}>
                    📞 {companyData.phone}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => window.open(`mailto:${companyData.email}`)}>
                    ✉️ {companyData.email}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => window.open(`https://${companyData.website}`, '_blank')}>
                    🌐 {companyData.website}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card variant="default" padding="xl">
              <CardContent>
                <h2 style={{
                  fontFamily: 'Kalam, cursive',
                  fontSize: '1.75rem',
                  color: 'var(--text-primary, #1a1a1a)',
                  marginBottom: '1.5rem'
                }}>
                  🛠️ Våra tjänster
                </h2>

                <div style={{
                  display: 'grid',
                  gap: '1rem'
                }}>
                  {companyData.services.map((service: any) => {
                    const rotation = React.useMemo(() => Math.random() * 1 - 0.5, []);
                    
                    return (
                      <Card
                        key={service.id}
                        variant="outlined"
                        padding="lg"
                        clickable={true}
                        style={{
                          transform: `rotate(${rotation}deg)`,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <CardContent>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1rem'
                          }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '1.5rem' }}>{service.icon}</span>
                                <h3 style={{
                                  fontSize: '1.25rem',
                                  fontWeight: '600',
                                  color: 'var(--text-primary, #1a1a1a)',
                                  margin: 0
                                }}>
                                  {service.name}
                                </h3>
                              </div>
                              
                              <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary, #6b7280)',
                                margin: '0 0 0.75rem 0'
                              }}>
                                {service.description}
                              </p>
                              
                              <Badge variant="info" size="sm">
                                Från {service.basePrice} kr/tillfälle
                              </Badge>
                            </div>
                            
                            <Button
                              variant="primary"
                              size="md"
                              onClick={() => handleServiceBooking(service)}
                            >
                              Boka nu
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Available slots */}
          <div>
            <Card variant="primary" padding="lg" style={{ position: 'sticky', top: '1rem' }}>
              <CardContent>
                <h2 style={{
                  fontFamily: 'Kalam, cursive',
                  fontSize: '1.5rem',
                  color: 'white',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  🕐 Lediga tider
                </h2>
                
                <p style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.875rem',
                  textAlign: 'center',
                  marginBottom: '1.5rem'
                }}>
                  Boka direkt en av våra lediga tider
                </p>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {companyData.availableSlots.slice(0, 6).map((slot: any) => {
                    const date = new Date(slot.date);
                    const dayName = date.toLocaleDateString('sv-SE', { weekday: 'short' });
                    const dateStr = date.toLocaleDateString('sv-SE', { month: 'short', day: 'numeric' });
                    
                    return (
                      <div
                        key={slot.id}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => {
                          // For demo, just use first service for slot booking
                          handleSlotBooking(slot, companyData.services[0]);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div>
                            <div style={{
                              color: 'white',
                              fontWeight: '600',
                              fontSize: '0.875rem'
                            }}>
                              {dayName} {dateStr}
                            </div>
                            <div style={{
                              color: 'rgba(255, 255, 255, 0.8)',
                              fontSize: '0.75rem'
                            }}>
                              Kl {slot.time}
                            </div>
                          </div>
                          <Badge variant="success" size="sm">
                            Ledig
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleServiceBooking(companyData.services[0])}
                  >
                    Se alla tider
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}