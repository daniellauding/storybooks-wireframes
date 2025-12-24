'use client';

import { Header } from '@/components/storybook/Header';
import { Hero } from '@/components/storybook/Hero';
import { Card, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Input } from '@/components/storybook/Input';
import { Badge } from '@/components/storybook/Badge';
import { Container } from '@/components/storybook/Container';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function WizardStepPage() {
  const params = useParams();
  const router = useRouter();
  const stepNumber = parseInt(params.step as string) || 1;
  
  console.log('[DEBUG] WizardStepPage loaded, step:', stepNumber);
  
  // State for all wizard data
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
    setRotations(Array(20).fill(0).map(() => Math.random() * 2 - 1));
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
    console.log('[DEBUG] handleNext called, current step:', stepNumber);
    
    if (stepNumber === 1 && selectedType) {
      // Save to localStorage for persistence
      localStorage.setItem('wizardData', JSON.stringify({ selectedType }));
      router.push('/clients/stadkjakten/booking-flow/flows/wizard/step/2');
    } else if (stepNumber === 2 && squareMeters) {
      const data = JSON.parse(localStorage.getItem('wizardData') || '{}');
      data.squareMeters = squareMeters;
      localStorage.setItem('wizardData', JSON.stringify(data));
      router.push('/clients/stadkjakten/booking-flow/flows/wizard/step/3');
    } else if (stepNumber === 3 && hasPets !== null) {
      const data = JSON.parse(localStorage.getItem('wizardData') || '{}');
      data.hasPets = hasPets;
      localStorage.setItem('wizardData', JSON.stringify(data));
      
      // Go to results with all data
      const searchParams = new URLSearchParams();
      searchParams.set('houseType', data.selectedType || '');
      searchParams.set('squareMeters', data.squareMeters || '');
      searchParams.set('pets', data.hasPets ? 'yes' : 'no');
      
      router.push(`/clients/stadkjakten/booking-flow/flows/results?${searchParams.toString()}`);
    }
  };

  const handleBack = () => {
    console.log('[DEBUG] handleBack called, current step:', stepNumber);
    
    if (stepNumber > 1) {
      router.push(`/clients/stadkjakten/booking-flow/flows/wizard/step/${stepNumber - 1}`);
    } else {
      router.push('/clients/stadkjakten/booking-flow/flows/booking-start');
    }
  };

  const canProceed = () => {
    if (stepNumber === 1) return selectedType !== '';
    if (stepNumber === 2) return squareMeters && parseInt(squareMeters) > 0;
    if (stepNumber === 3) return hasPets !== null;
    return false;
  };

  const getStepInfo = () => {
    switch (stepNumber) {
      case 1:
        return {
          title: 'Vilken typ av bostad ska städas?',
          description: 'Välj din bostadstyp så kan vi ge dig bästa möjliga pris'
        };
      case 2:
        return {
          title: 'Hur stor är din bostad?',
          description: 'Ange antal kvadratmeter för att få en korrekt prisuppskattning'
        };
      case 3:
        return {
          title: 'Har ni husdjur hemma?',
          description: 'Detta hjälper oss matcha dig med städfirmor som har rätt utrustning'
        };
      default:
        return { title: '', description: '' };
    }
  };

  const stepInfo = getStepInfo();
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
        title={stepInfo.title}
        subtitle={`Steg ${stepNumber} av 3`}
        description={stepInfo.description}
        badge={`🧹 STEG ${stepNumber}`}
        backgroundPattern={true}
      />

      <Container maxWidth="xl" style={{ padding: '1rem' }}>
        
        {/* STEP 1: House Type Selection - All 3 options visible */}
        {stepNumber === 1 && (
          <div style={{
            padding: '2rem 0'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {houseTypes.map((type, index) => {
                const isSelected = selectedType === type.id;

                return (
                  <Card
                    key={type.id}
                    variant={isSelected ? "primary" : "outlined"}
                    padding="lg"
                    clickable={true}
                    onClick={() => {
                      console.log('[DEBUG] House type selected:', type.id);
                      setSelectedType(type.id);
                    }}
                    style={{
                      transform: mounted ? `rotate(${getRotation(index)}deg)` : 'none',
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
                        gap: '1.5rem'
                      }}>
                        <div style={{
                          fontSize: '3rem',
                          transform: mounted ? `rotate(${getRotation(index + 10)}deg)` : 'none'
                        }}>
                          {type.icon}
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontFamily: 'Kalam, cursive',
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: 'var(--text-primary, #1a1a1a)',
                            margin: '0 0 0.5rem 0',
                            transform: mounted ? `rotate(${getRotation(index + 15) * 0.3}deg)` : 'none'
                          }}>
                            {type.title}
                          </h3>
                          
                          <p style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-secondary, #6b7280)',
                            margin: '0 0 1rem 0'
                          }}>
                            {type.description}
                          </p>

                          <div style={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '0.5rem'
                          }}>
                            {type.features.map((feature, fIndex) => (
                              <Badge 
                                key={fIndex}
                                variant="default" 
                                size="sm"
                                style={{
                                  transform: mounted ? `rotate(${getRotation(fIndex + 5) * 2}deg)` : 'none'
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
        )}

        {/* STEP 2: Square Meters - All options visible */}
        {stepNumber === 2 && (
          <div style={{
            padding: '2rem 0'
          }}>
            <div style={{
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {/* Quick selection ranges - All visible */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {sizeRanges.map((range, index) => {
                  const isSelected = selectedRange === range.id;

                  return (
                    <Card
                      key={range.id}
                      variant={isSelected ? "primary" : "outlined"}
                      padding="md"
                      clickable={true}
                      onClick={() => handleRangeSelect(range)}
                      style={{
                        transform: mounted ? `rotate(${getRotation(index) * 0.5}deg)` : 'none',
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
                          fontSize: '2rem',
                          transform: mounted ? `rotate(${getRotation(index + 10) * 2}deg)` : 'none'
                        }}>
                          {range.icon}
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontFamily: 'Kalam, cursive',
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            color: 'var(--text-primary, #1a1a1a)',
                            margin: '0 0 0.25rem 0'
                          }}>
                            {range.label}
                          </h3>
                          
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
                padding="lg"
                style={{ 
                  textAlign: 'center'
                }}
              >
                <CardContent>
                  <h3 style={{
                    fontFamily: 'Kalam, cursive',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: 'var(--text-primary, #1a1a1a)',
                    margin: '0 0 1rem 0',
                    transform: mounted ? `rotate(${getRotation(8) * 0.5}deg)` : 'none'
                  }}>
                    Eller ange exakt yta
                  </h3>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <Input
                      type="number"
                      placeholder="Antal kvadratmeter"
                      value={squareMeters}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        console.log('[DEBUG] Square meters input:', e.target.value);
                        setSquareMeters(e.target.value);
                        setSelectedRange('');
                      }}
                      style={{
                        width: '200px',
                        textAlign: 'center',
                        fontSize: '1.25rem'
                      }}
                    />
                    <span style={{
                      fontFamily: 'Kalam, cursive',
                      fontSize: '1.125rem',
                      color: 'var(--text-secondary, #6b7280)'
                    }}>
                      kvm
                    </span>
                  </div>

                  {squareMeters && parseInt(squareMeters) > 0 && (
                    <div style={{
                      padding: '1rem',
                      backgroundColor: 'rgba(0, 123, 255, 0.1)',
                      borderRadius: '8px',
                      border: '1px dashed var(--accent, #007bff)',
                      marginTop: '1rem'
                    }}>
                      <p style={{
                        fontSize: '0.875rem',
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
        )}

        {/* STEP 3: Pet Ownership - Both options visible */}
        {stepNumber === 3 && (
          <div style={{
            padding: '2rem 0'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {petOptions.map((option, index) => {
                const isSelected = hasPets === option.value;

                return (
                  <Card
                    key={option.id}
                    variant={isSelected ? "primary" : "outlined"}
                    padding="xl"
                    clickable={true}
                    onClick={() => {
                      console.log('[DEBUG] Pet option selected:', option.value);
                      setHasPets(option.value);
                    }}
                    style={{
                      transform: mounted ? `rotate(${getRotation(index)}deg)` : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: isSelected ? '3px solid var(--accent, #007bff)' : '2px solid var(--border-color, #e5e7eb)',
                      backgroundColor: isSelected ? 'rgba(0, 123, 255, 0.05)' : 'white',
                    }}
                  >
                    <CardContent>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{
                          fontSize: '4rem',
                          marginBottom: '1rem',
                          transform: mounted ? `rotate(${getRotation(index + 10) * 3}deg)` : 'none'
                        }}>
                          {option.icon}
                        </div>
                        
                        <h3 style={{
                          fontFamily: 'Kalam, cursive',
                          fontSize: '1.75rem',
                          fontWeight: '600',
                          color: 'var(--text-primary, #1a1a1a)',
                          margin: '0 0 0.5rem 0',
                          transform: mounted ? `rotate(${getRotation(index + 15) * 0.5}deg)` : 'none'
                        }}>
                          {option.title}
                        </h3>
                        
                        <p style={{
                          fontSize: '1rem',
                          color: 'var(--text-secondary, #6b7280)',
                          margin: '0 0 1.5rem 0'
                        }}>
                          {option.description}
                        </p>

                        <div style={{ 
                          display: 'flex', 
                          flexDirection: 'column',
                          gap: '0.5rem',
                          alignItems: 'center'
                        }}>
                          {option.details.map((detail, dIndex) => (
                            <Badge 
                              key={dIndex}
                              variant={option.value ? "warning" : "default"} 
                              size="sm"
                              style={{
                                transform: mounted ? `rotate(${getRotation(dIndex + 5) * 2}deg)` : 'none'
                              }}
                            >
                              {detail}
                            </Badge>
                          ))}
                        </div>

                        {isSelected && (
                          <div style={{
                            marginTop: '1.5rem',
                            padding: '1rem',
                            backgroundColor: 'var(--accent, #007bff)',
                            color: 'white',
                            borderRadius: '12px 8px 12px 8px',
                            fontFamily: 'Kalam, cursive',
                            fontWeight: '600',
                            fontSize: '1.125rem'
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

            {/* Additional info card */}
            {hasPets === true && (
              <Card 
                variant="default" 
                padding="lg"
                style={{ 
                  maxWidth: '600px', 
                  margin: '2rem auto 0',
                  backgroundColor: '#fff3cd',
                  border: '2px solid #ffc107'
                }}
              >
                <CardContent style={{ textAlign: 'center' }}>
                  <h4 style={{
                    fontFamily: 'Kalam, cursive',
                    fontSize: '1.25rem',
                    color: '#856404',
                    margin: '0 0 1rem 0'
                  }}>
                    💡 Bra att veta om husdjur
                  </h4>
                  <ul style={{
                    textAlign: 'left',
                    color: '#856404',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    paddingLeft: '1.5rem',
                    margin: 0
                  }}>
                    <li>Många städfirmor har specialutrustning för husdjurshår</li>
                    <li>Allergivänliga rengöringsprodukter används</li>
                    <li>Kan tillkomma en mindre kostnad (ca 50-100kr)</li>
                    <li>Husdjuren behöver inte vara borta under städningen</li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

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
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: stepNumber >= step ? 'var(--accent, #007bff)' : 'var(--border-color, #e5e7eb)'
                  }}
                />
              ))}
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary, #6b7280)',
              margin: 0
            }}>
              Steg {stepNumber} av 3
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
            {stepNumber === 3 ? 'Se resultat →' : 'Nästa →'}
          </Button>
        </div>
      </Container>
    </div>
  );
}