'use client';

import { Header } from '@/components/storybook/Header';
import { Card, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Badge } from '@/components/storybook/Badge';
import { Rating } from '@/components/storybook/Rating';
import { Container } from '@/components/storybook/Container';
import React, { useEffect, useState } from 'react';

export default function ResultsPage() {
  const [searchParams, setSearchParams] = useState<any>({});

  useEffect(() => {
    // Get search parameters from URL
    const params = new URLSearchParams(window.location.search);
    setSearchParams({
      houseType: params.get('houseType') || 'villa',
      squareMeters: params.get('squareMeters') || '100',
      pets: params.get('pets') || 'no'
    });
  }, []);

  const navigation = [
    { id: 'hemstadning', label: 'Hemstädning', href: '/hemstadning' },
    { id: 'fonsterputs', label: 'Fönsterputsning', href: '/fonsterputs' },
    { id: 'flyttstadning', label: 'Flyttstädning', href: '/flyttstadning' },
    { id: 'byggstadning', label: 'Byggstädning', href: '/byggstadning' },
  ];

  const cleaningCompanies = [
    {
      id: 1,
      name: 'StadExpert Malmö',
      logo: '🧽',
      address: 'Stora Nygatan 15, Malmö',
      rating: 4.8,
      reviews: 127,
      originalPrice: 1800,
      customerPrice: 900,
      distance: '2.3 km',
      certifications: ['Miljöcertifierad', 'Top Partner', 'Kollektivavtal'],
      specialties: ['Husdjursvänlig', 'Allergiutbildad'],
      description: 'Professionell hemstädning med 15 års erfarenhet. Vi använder miljövänliga produkter.',
      availability: 'Ledig idag'
    },
    {
      id: 2,
      name: 'Rena Hem Service',
      logo: '✨',
      address: 'Västra Hamngatan 8, Malmö',
      rating: 4.6,
      reviews: 89,
      originalPrice: 1650,
      customerPrice: 825,
      distance: '1.8 km',
      certifications: ['Miljöcertifierad', 'Kollektivavtal'],
      specialties: ['Husdjur OK', 'Snabbstädning'],
      description: 'Flexibel städservice med fokus på kundnöjdhet. Garanterar alltid bra resultat.',
      availability: 'Ledig imorgon'
    },
    {
      id: 3,
      name: 'Premium Clean Skåne',
      logo: '🌟',
      address: 'Regementsgatan 12, Malmö',
      rating: 4.9,
      reviews: 203,
      originalPrice: 2100,
      customerPrice: 1050,
      distance: '3.1 km',
      certifications: ['Miljöcertifierad', 'Top Partner', 'ISO-certifierad'],
      specialties: ['Luksustädning', 'Detaljerad'],
      description: 'Premiumstädning för kräsna kunder. Högsta kvalitet med 100% nöjdhetsgaranti.',
      availability: 'Ledig på måndag',
      extra: 'Kilometerersättning efter 20km: 15kr/km'
    },
    {
      id: 4,
      name: 'Snabbstäd Malmö',
      logo: '⚡',
      address: 'Möllevångsgatan 22, Malmö',
      rating: 4.4,
      reviews: 156,
      originalPrice: 1450,
      customerPrice: 725,
      distance: '2.7 km',
      certifications: ['Kollektivavtal'],
      specialties: ['Express', 'Helger OK'],
      description: 'Snabb och effektiv städning när det passar dig. Specialister på akuta städbehov.',
      availability: 'Ledig samma dag'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo="Städkjakten"
        navigation={navigation}
        showSearch={false}
        variant="default"
      />

      {/* Summary header */}
      <div style={{
        backgroundColor: 'var(--accent, #007bff)',
        color: 'white',
        padding: '2rem 0'
      }}>
        <Container maxWidth="xl">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{
                fontFamily: 'Kalam, cursive',
                fontSize: '2rem',
                margin: '0 0 0.5rem 0',
                transform: `rotate(${Math.random() * 1 - 0.5}deg)`
              }}>
                {cleaningCompanies.length} städfirmor i Malmö
              </h1>
              <p style={{ 
                margin: 0, 
                fontSize: '1rem',
                opacity: 0.9
              }}>
                {searchParams.houseType} • {searchParams.squareMeters} kvm • {searchParams.pets === 'yes' ? 'Husdjur' : 'Inga husdjur'}
              </p>
            </div>
            <Button
              variant="secondary"
              size="md"
              onClick={() => window.history.back()}
            >
              ← Ändra sökning
            </Button>
          </div>
        </Container>
      </div>

      <Container maxWidth="xl" style={{ padding: '2rem' }}>
        {/* Filter info */}
        <Card variant="default" padding="md" style={{ marginBottom: '2rem' }}>
          <CardContent>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <span style={{
                fontFamily: 'Kalam, cursive',
                fontWeight: '600',
                color: 'var(--text-primary, #1a1a1a)'
              }}>
                Sorterat efter: Bäst betyg
              </span>
              <Badge variant="info" size="sm">📍 Inom 5km</Badge>
              <Badge variant="success" size="sm">🏆 ROT-avdrag inkluderat</Badge>
              {searchParams.pets === 'yes' && (
                <Badge variant="warning" size="sm">🐕 Husdjursvänlig</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Company cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '1.5rem'
        }}>
          {cleaningCompanies.map((company) => {
            const rotation = React.useMemo(() => Math.random() * 1 - 0.5, []);
            const savings = company.originalPrice - company.customerPrice;

            return (
              <Card
                key={company.id}
                variant="elevated"
                padding="lg"
                clickable={true}
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: 'all 0.3s ease',
                  backgroundColor: 'white'
                }}
              >
                <CardContent>
                  {/* Header with logo and basic info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      transform: `rotate(${Math.random() * 5 - 2.5}deg)`
                    }}>
                      {company.logo}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontFamily: 'Kalam, cursive',
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: 'var(--text-primary, #1a1a1a)',
                        margin: '0 0 0.25rem 0'
                      }}>
                        {company.name}
                      </h3>
                      
                      <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary, #6b7280)',
                        margin: '0 0 0.5rem 0'
                      }}>
                        📍 {company.address} • {company.distance}
                      </p>

                      {/* Rating */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <Rating value={company.rating} readonly size="sm" />
                        <span style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: 'var(--text-primary, #1a1a1a)'
                        }}>
                          {company.rating}
                        </span>
                        <span style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary, #6b7280)'
                        }}>
                          ({company.reviews} recensioner)
                        </span>
                      </div>
                    </div>

                    {/* Availability badge */}
                    <Badge 
                      variant={company.availability.includes('idag') ? 'success' : 'default'} 
                      size="sm"
                      style={{
                        transform: `rotate(${Math.random() * 3 - 1.5}deg)`
                      }}
                    >
                      {company.availability}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary, #6b7280)',
                    lineHeight: '1.5',
                    margin: '0 0 1rem 0'
                  }}>
                    {company.description}
                  </p>

                  {/* Certifications */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {company.certifications.map((cert, index) => (
                      <Badge 
                        key={index}
                        variant="success" 
                        size="sm"
                        style={{
                          transform: `rotate(${Math.random() * 2 - 1}deg)`
                        }}
                      >
                        ✓ {cert}
                      </Badge>
                    ))}
                    {company.specialties.map((specialty, index) => (
                      <Badge 
                        key={index}
                        variant="info" 
                        size="sm"
                        style={{
                          transform: `rotate(${Math.random() * 2 - 1}deg)`
                        }}
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div style={{
                    backgroundColor: 'rgba(0, 123, 255, 0.05)',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px dashed var(--accent, #007bff)',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary, #6b7280)'
                      }}>
                        Ordinarie pris:
                      </span>
                      <span style={{
                        textDecoration: 'line-through',
                        color: 'var(--text-secondary, #6b7280)',
                        fontSize: '0.875rem'
                      }}>
                        {company.originalPrice} kr
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: 'var(--text-primary, #1a1a1a)'
                      }}>
                        Du betalar:
                      </span>
                      <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--accent, #007bff)',
                        fontFamily: 'Kalam, cursive'
                      }}>
                        {company.customerPrice} kr
                      </span>
                    </div>
                    
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--success, #28a745)',
                      fontWeight: '500'
                    }}>
                      💰 Du sparar {savings} kr med ROT-avdrag (50%)
                    </div>
                  </div>

                  {/* Extra info */}
                  {company.extra && (
                    <p style={{
                      fontSize: '0.75rem',
                      color: 'var(--warning, #ffc107)',
                      fontStyle: 'italic',
                      marginBottom: '1rem'
                    }}>
                      ⚠️ {company.extra}
                    </p>
                  )}

                  {/* Action buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem'
                  }}>
                    <Button
                      variant="primary"
                      size="md"
                      style={{ flex: 1 }}
                      onClick={() => console.log(`Booking ${company.name}`)}
                    >
                      Boka nu
                    </Button>
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={() => console.log(`Viewing ${company.name} on maps`)}
                    >
                      🗺️ Karta
                    </Button>
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={() => console.log(`Contacting ${company.name}`)}
                    >
                      📞 Ring
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load more */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Button variant="secondary" size="lg">
            Visa fler städfirmor
          </Button>
        </div>
      </Container>
    </div>
  );
}