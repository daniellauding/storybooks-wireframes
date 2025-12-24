'use client';

import { Header } from '@/components/storybook/Header';
import { Hero } from '@/components/storybook/Hero';
import { Card, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Input } from '@/components/storybook/Input';
import { Badge } from '@/components/storybook/Badge';
import { Container } from '@/components/storybook/Container';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function WizardStep1Page() {
  const router = useRouter();
  
  console.log('[DEBUG] WizardStep1Page loaded - ALL 3 sections on one page');
  
  // State for all wizard data ON ONE PAGE
  const [selectedType, setSelectedType] = useState<string>('');
  const [squareMeters, setSquareMeters] = useState<string>('');
  const [selectedRange, setSelectedRange] = useState<string>('');
  const [hasPets, setHasPets] = useState<boolean | null>(null);
  
  // State for stable random rotations (client-side only)
  const [mounted, setMounted] = useState(false);
  const [rotations, setRotations] = useState<number[]>([]);
  
  useEffect(() => {
    setMounted(true);
    // Generate stable rotations once on mount
    setRotations(Array(50).fill(0).map(() => Math.random() * 2 - 1));
  }, []);

  const navigation = [
    { id: 'hemstadning', label: 'Hemstädning', href: '/hemstadning' },
    { id: 'fonsterputs', label: 'Fönsterputsning', href: '/fonsterputs' },
    { id: 'flyttstadning', label: 'Flyttstädning', href: '/flyttstadning' },
    { id: 'byggstadning', label: 'Byggstädning', href: '/byggstadning' },
  ];

  const houseTypes = [
    {
      id: 'villa',
      title: 'Villa',
      description: 'Fristående hus med egen tomt',
      icon: '🏠',
      features: ['Flera våningar', 'Stor yta', 'Trädgård']
    },
    {
      id: 'townhouse',
      title: 'Radhus',
      description: 'Radhus eller kedjehus',
      icon: '🏘️',
      features: ['1-2 våningar', 'Medelstor yta', 'Liten trädgård']
    },
    {
      id: 'apartment',
      title: 'Lägenhet',
      description: 'Bostadsrätt eller hyresrätt',
      icon: '🏢',
      features: ['1 våning', 'Mindre yta', 'Balkong/terrass']
    }
  ];

  const sizeRanges = [
    { id: 'small', label: '< 50 kvm', description: 'Liten lägenhet', value: '45', icon: '🏠' },
    { id: 'medium', label: '50-100 kvm', description: 'Mellanstor bostad', value: '75', icon: '🏡' },
    { id: 'large', label: '100-150 kvm', description: 'Stor bostad', value: '125', icon: '🏘️' },
    { id: 'xlarge', label: '> 150 kvm', description: 'Mycket stor bostad', value: '200', icon: '🏰' }
  ];

  const petOptions = [
    {
      id: 'no',
      value: false,
      title: 'Inga husdjur',
      description: 'Vi har inga husdjur hemma',
      icon: '🚫',
      details: ['Standard städning', 'Inga extra åtgärder', 'Normalpris']
    },
    {
      id: 'yes',
      value: true,
      title: 'Vi har husdjur',
      description: 'Vi har katt, hund eller andra husdjur',
      icon: '🐕',
      details: ['Extra dammsugning', 'Allergivänliga produkter', 'Kan påverka pris']
    }
  ];

  const handleRangeSelect = (range: any) => {
    console.log('[DEBUG] Range selected:', range);
    setSelectedRange(range.id);
    setSquareMeters(range.value);
  };

  const handleNext = () => {
    console.log('[DEBUG] Going to results with data:', { selectedType, squareMeters, hasPets });
    
    // Go directly to results (step 2)
    const searchParams = new URLSearchParams();
    searchParams.set('houseType', selectedType);
    searchParams.set('squareMeters', squareMeters);
    searchParams.set('pets', hasPets ? 'yes' : 'no');
    
    router.push(`/clients/stadkjakten/booking-flow/flows/results?${searchParams.toString()}`);
  };

  const handleBack = () => {
    console.log('[DEBUG] Going back to booking start');
    router.push('/clients/stadkjakten/booking-flow/flows/booking-start');
  };

  const canProceed = () => {
    return selectedType !== '' && squareMeters && parseInt(squareMeters) > 0 && hasPets !== null;
  };

  const getRotation = (index: number) => mounted ? (rotations[index] || 0) : 0;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo="Städkjakten"
        navigation={navigation}
        showSearch={false}
        variant="default"
      />
      
      <Hero
        variant="centered"
        title="Berätta om din bostad"
        subtitle="Steg 1 av 2"
        description="Fyll i uppgifterna så kan vi ge dig bästa möjliga pris"
        badge="🧹 STEG 1"
        backgroundPattern={true}
      />

      <Container maxWidth="xl" style={{ padding: '1rem' }}>
        
        {/* SECTION 1: House Type Selection */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '1.75rem',
            fontWeight: '600',
            color: 'var(--text-primary, #1a1a1a)',
            margin: '0 0 1.5rem 0',
            textAlign: 'center',
            transform: mounted ? `rotate(${getRotation(0) * 0.3}deg)` : 'none'
          }}>
            1. Vilken typ av bostad ska städas?
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {houseTypes.map((type, index) => {
              const isSelected = selectedType === type.id;

              return (
                <Card
                  key={type.id}
                  variant={isSelected ? "primary" : "outlined"}
                  padding="md"
                  clickable={true}
                  onClick={() => {
                    console.log('[DEBUG] House type selected:', type.id);
                    setSelectedType(type.id);
                  }}
                  style={{
                    transform: mounted ? `rotate(${getRotation(index + 1) * 0.5}deg)` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isSelected ? '3px solid var(--accent, #007bff)' : '2px solid var(--border-color, #e5e7eb)',
                    backgroundColor: isSelected ? 'rgba(0, 123, 255, 0.05)' : 'white'
                  }}
                >
                  <CardContent>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{
                        fontSize: '2.5rem',
                        transform: mounted ? `rotate(${getRotation(index + 10) * 2}deg)` : 'none'
                      }}>
                        {type.icon}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontFamily: 'Kalam, cursive',
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: 'var(--text-primary, #1a1a1a)',
                          margin: '0 0 0.25rem 0'
                        }}>
                          {type.title}
                        </h3>
                        
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary, #6b7280)',
                          margin: '0 0 0.5rem 0'
                        }}>
                          {type.description}
                        </p>

                        <div style={{ 
                          display: 'flex', 
                          flexWrap: 'wrap', 
                          gap: '0.25rem'
                        }}>
                          {type.features.map((feature, fIndex) => (
                            <Badge 
                              key={fIndex}
                              variant="default" 
                              size="sm"
                              style={{
                                transform: mounted ? `rotate(${getRotation(fIndex + 15) * 1.5}deg)` : 'none'
                              }}
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {isSelected && (
                        <div style={{
                          padding: '0.5rem',
                          backgroundColor: 'var(--accent, #007bff)',
                          color: 'white',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'Kalam, cursive',
                          fontWeight: '700',
                          fontSize: '1.25rem'
                        }}>
                          ✓
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Square Meters */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '1.75rem',
            fontWeight: '600',
            color: 'var(--text-primary, #1a1a1a)',
            margin: '0 0 1.5rem 0',
            textAlign: 'center',
            transform: mounted ? `rotate(${getRotation(5) * 0.3}deg)` : 'none'
          }}>
            2. Hur stor är din bostad?
          </h2>
          
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {/* Quick selection ranges */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              {sizeRanges.map((range, index) => {
                const isSelected = selectedRange === range.id;

                return (
                  <Card
                    key={range.id}
                    variant={isSelected ? "primary" : "outlined"}
                    padding="sm"
                    clickable={true}
                    onClick={() => handleRangeSelect(range)}
                    style={{
                      transform: mounted ? `rotate(${getRotation(index + 20) * 0.3}deg)` : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: isSelected ? '3px solid var(--accent, #007bff)' : '2px solid var(--border-color, #e5e7eb)',
                      backgroundColor: isSelected ? 'rgba(0, 123, 255, 0.05)' : 'white'
                    }}
                  >
                    <CardContent style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{
                        fontSize: '1.5rem',
                        transform: mounted ? `rotate(${getRotation(index + 25) * 2}deg)` : 'none'
                      }}>
                        {range.icon}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontFamily: 'Kalam, cursive',
                          fontSize: '1rem',
                          fontWeight: '600',
                          color: 'var(--text-primary, #1a1a1a)',
                          margin: '0 0 0.25rem 0'
                        }}>
                          {range.label}
                        </h4>
                        
                        <p style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary, #6b7280)',
                          margin: 0
                        }}>
                          {range.description}
                        </p>
                      </div>

                      {isSelected && (
                        <Badge 
                          variant="success" 
                          size="sm"
                        >
                          ✓ Vald
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Custom input */}
            <Card 
              variant="default" 
              padding="md"
              style={{ 
                textAlign: 'center'
              }}
            >
              <CardContent>
                <h4 style={{
                  fontFamily: 'Kalam, cursive',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--text-primary, #1a1a1a)',
                  margin: '0 0 1rem 0',
                  transform: mounted ? `rotate(${getRotation(30) * 0.5}deg)` : 'none'
                }}>
                  Eller ange exakt yta
                </h4>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  justifyContent: 'center'
                }}>
                  <Input
                    type="number"
                    placeholder="Yta"
                    value={squareMeters}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      console.log('[DEBUG] Square meters input:', e.target.value);
                      setSquareMeters(e.target.value);
                      setSelectedRange('');
                    }}
                    style={{
                      width: '100px',
                      textAlign: 'center',
                      fontSize: '1rem'
                    }}
                  />
                  <span style={{
                    fontFamily: 'Kalam, cursive',
                    fontSize: '1rem',
                    color: 'var(--text-secondary, #6b7280)'
                  }}>
                    kvm
                  </span>
                </div>

                {squareMeters && parseInt(squareMeters) > 0 && (
                  <div style={{
                    padding: '0.5rem',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    borderRadius: '8px',
                    border: '1px dashed var(--accent, #007bff)',
                    marginTop: '0.75rem',
                    fontSize: '0.75rem'
                  }}>
                    <p style={{
                      color: 'var(--accent, #007bff)',
                      margin: 0,
                      fontWeight: '500'
                    }}>
                      📏 Uppskattad städtid: {Math.ceil(parseInt(squareMeters) / 25)} - {Math.ceil(parseInt(squareMeters) / 20)} timmar
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SECTION 3: Pet Ownership */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '1.75rem',
            fontWeight: '600',
            color: 'var(--text-primary, #1a1a1a)',
            margin: '0 0 1.5rem 0',
            textAlign: 'center',
            transform: mounted ? `rotate(${getRotation(35) * 0.3}deg)` : 'none'
          }}>
            3. Har ni husdjur hemma?
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {petOptions.map((option, index) => {
              const isSelected = hasPets === option.value;

              return (
                <Card
                  key={option.id}
                  variant={isSelected ? "primary" : "outlined"}
                  padding="lg"
                  clickable={true}
                  onClick={() => {
                    console.log('[DEBUG] Pet option selected:', option.value);
                    setHasPets(option.value);
                  }}
                  style={{
                    transform: mounted ? `rotate(${getRotation(index + 40) * 0.5}deg)` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isSelected ? '3px solid var(--accent, #007bff)' : '2px solid var(--border-color, #e5e7eb)',
                    backgroundColor: isSelected ? 'rgba(0, 123, 255, 0.05)' : 'white',
                  }}
                >
                  <CardContent>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.5rem'
                    }}>
                      <div style={{
                        fontSize: '3rem',
                        transform: mounted ? `rotate(${getRotation(index + 45) * 3}deg)` : 'none'
                      }}>
                        {option.icon}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontFamily: 'Kalam, cursive',
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: 'var(--text-primary, #1a1a1a)',
                          margin: '0 0 0.5rem 0'
                        }}>
                          {option.title}
                        </h3>
                        
                        <p style={{
                          fontSize: '1rem',
                          color: 'var(--text-secondary, #6b7280)',
                          margin: '0 0 1rem 0'
                        }}>
                          {option.description}
                        </p>

                        <div style={{ 
                          display: 'flex', 
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}>
                          {option.details.map((detail, dIndex) => (
                            <Badge 
                              key={dIndex}
                              variant={option.value ? "warning" : "default"} 
                              size="sm"
                              style={{
                                transform: mounted ? `rotate(${getRotation(dIndex + 48) * 2}deg)` : 'none'
                              }}
                            >
                              {detail}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {isSelected && (
                        <div style={{
                          padding: '0.75rem',
                          backgroundColor: 'var(--accent, #007bff)',
                          color: 'white',
                          borderRadius: '12px 8px 12px 8px',
                          fontFamily: 'Kalam, cursive',
                          fontWeight: '600',
                          fontSize: '1.125rem',
                          minWidth: '60px',
                          textAlign: 'center'
                        }}>
                          ✓ Valt
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2rem 0',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <Button
            variant="ghost"
            size="lg"
            onClick={handleBack}
          >
            ← Tillbaka
          </Button>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent, #007bff)'
                }}
              />
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--border-color, #e5e7eb)'
                }}
              />
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary, #6b7280)',
              margin: 0
            }}>
              Steg 1 av 2
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleNext}
            disabled={!canProceed()}
            style={{
              opacity: canProceed() ? 1 : 0.5,
              cursor: canProceed() ? 'pointer' : 'not-allowed'
            }}
          >
            Se resultat →
          </Button>
        </div>
      </Container>
    </div>
  );
}