'use client';

import { Header } from '@/components/storybook/Header';
import { Hero } from '@/components/storybook/Hero';
import { Card, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Input } from '@/components/storybook/Input';
import { Badge } from '@/components/storybook/Badge';
import { Container } from '@/components/storybook/Container';
import React, { useState, useEffect } from 'react';

export default function CombinedWizardPage() {
  console.log('[DEBUG] CombinedWizardPage component loaded - ALL 3 SECTIONS ON ONE PAGE');
  const [selectedType, setSelectedType] = useState<string>('');
  const [squareMeters, setSquareMeters] = useState<string>('');
  const [selectedRange, setSelectedRange] = useState<string>('');
  const [hasPets, setHasPets] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  const [preSelectedCompany, setPreSelectedCompany] = useState<string>('');
  const [preSelectedService, setPreSelectedService] = useState<string>('');

  useEffect(() => {
    // Handle pre-selected company and service from URL params
    const params = new URLSearchParams(window.location.search);
    const company = params.get('company');
    const service = params.get('service');
    
    if (company) {
      setPreSelectedCompany(company);
      console.log('[DEBUG] Pre-selected company:', company);
    }
    
    if (service) {
      setPreSelectedService(service);
      console.log('[DEBUG] Pre-selected service:', service);
    }
    
    setMounted(true);
  }, []);

  const navigation = [
    { id: 'hemstadning', label: 'Hemstädning', href: '/clients/stadkjakten/booking-flow/flows/wizard' },
    { id: 'fonsterputs', label: 'Fönsterputsning', href: '/clients/stadkjakten/booking-flow/services/fonsterputs' },
    { id: 'flyttstadning', label: 'Flyttstädning', href: '/clients/stadkjakten/booking-flow/flows/wizard' },
    { id: 'byggstadning', label: 'Byggstädning', href: '/clients/stadkjakten/booking-flow/flows/wizard' },
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
      features: ['1 våning', 'Mindre yta', 'Balkonig/terrass']
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
    console.log('[DEBUG] handleRangeSelect called with:', range);
    setSelectedRange(range.id);
    setSquareMeters(range.value);
  };

  const handleNext = () => {
    console.log('[DEBUG] handleNext called - going to results');
    console.log('[DEBUG] Form data:', { selectedType, squareMeters, hasPets, preSelectedCompany, preSelectedService });
    
    // Go to results
    const searchParams = new URLSearchParams();
    searchParams.set('houseType', selectedType);
    searchParams.set('squareMeters', squareMeters);
    searchParams.set('pets', hasPets ? 'yes' : 'no');
    
    // Add pre-selected company/service if available
    if (preSelectedCompany) {
      searchParams.set('preSelectedCompany', preSelectedCompany);
    }
    if (preSelectedService) {
      searchParams.set('preSelectedService', preSelectedService);
    }
    
    const resultsUrl = `/clients/stadkjakten/booking-flow/flows/results?${searchParams.toString()}`;
    console.log('[DEBUG] Navigating to results:', resultsUrl);
    window.location.href = resultsUrl;
  };

  const handleBack = () => {
    console.log('[DEBUG] Going back to previous page');
    window.history.back();
  };

  const isOfficeService = preSelectedService === 'kontorsstadning' || preSelectedService === 'byggstadning';
  const isResidentialService = !isOfficeService;

  const canProceed = () => {
    const baseRequirements = squareMeters && parseInt(squareMeters) > 0;
    
    if (isOfficeService) {
      // For office/business cleaning, only square meters required
      return baseRequirements;
    } else {
      // For residential cleaning, need house type and pets info
      return baseRequirements && selectedType !== '' && hasPets !== null;
    }
  };

  // Auto-select defaults for office services
  useEffect(() => {
    if (isOfficeService && mounted) {
      setSelectedType('office'); // Set a default for office
      setHasPets(false); // Offices typically don't have pets
    }
  }, [isOfficeService, mounted]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo="Städkjakten"
        navigation={navigation}
        showSearch={false}
        variant="default"
      />
      
      <div style={{
        backgroundColor: 'var(--surface-color, #fafafa)',
        padding: '1.5rem 0',
        borderBottom: '2px solid var(--border-color, #e5e7eb)',
        textAlign: 'center'
      }}>
        <Container maxWidth="xl">
          {/* Show pre-selected company/service if available */}
          {(preSelectedCompany || preSelectedService) && (
            <Card variant="primary" padding="sm" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              <CardContent>
                <div style={{ 
                  color: 'white', 
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>✓</span>
                  {preSelectedCompany && <span>Företag #{preSelectedCompany}</span>}
                  {preSelectedService && <span>• {preSelectedService}</span>}
                </div>
              </CardContent>
            </Card>
          )}
          
          <div style={{
            display: 'inline-block',
            backgroundColor: 'var(--accent, #007bff)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '1rem',
            transform: mounted ? `rotate(${Math.sin(1) * 2}deg)` : 'none'
          }}>
            🧹 KOMBINERAT FORMULÄR
          </div>
          
          <h1 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--text-primary, #1a1a1a)',
            margin: '0 0 0.5rem 0',
            transform: mounted ? `rotate(${Math.sin(2) * 0.5}deg)` : 'none'
          }}>
            Berätta om ditt hem
          </h1>
          
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary, #6b7280)',
            margin: 0,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Fyll i alla uppgifter nedan för att få en skräddarsydd offert
          </p>
        </Container>
      </div>

      <Container maxWidth="xl" style={{ padding: '2rem' }}>
        
        {/* SECTION 1: House Type - Only for residential services */}
        {isResidentialService && <div style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '2rem',
            color: 'var(--text-primary, #1a1a1a)',
            textAlign: 'center',
            marginBottom: '1rem',
            transform: `rotate(${0.3}deg)`
          }}>
            1. Vilken typ av bostad ska städas?
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary, #6b7280)',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Välj din bostadstyp så kan vi ge dig bästa möjliga pris
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {houseTypes.map((type, index) => {
              const rotation = mounted ? (Math.sin(index) * 2) : 0;
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
                    transform: `rotate(${rotation}deg)`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isSelected ? '3px solid var(--accent, #007bff)' : '2px solid var(--border-color, #e5e7eb)',
                    backgroundColor: isSelected ? 'rgba(0, 123, 255, 0.05)' : 'white'
                  }}
                >
                  <CardContent>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                      <div style={{
                        fontSize: '3rem',
                        marginBottom: '1rem',
                        transform: `rotate(${1.2}deg)`
                      }}>
                        {type.icon}
                      </div>
                      
                      <h3 style={{
                        fontFamily: 'Kalam, cursive',
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: 'var(--text-primary, #1a1a1a)',
                        margin: '0 0 0.5rem 0',
                        transform: `rotate(${0.3}deg)`
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
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem',
                      justifyContent: 'center'
                    }}>
                      {type.features.map((feature, index) => (
                        <Badge 
                          key={index}
                          variant="default" 
                          size="sm"
                          style={{
                            transform: `rotate(${0.9}deg)`
                          }}
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {isSelected && (
                      <div style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        backgroundColor: 'var(--accent, #007bff)',
                        color: 'white',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontFamily: 'Kalam, cursive',
                        fontWeight: '500'
                      }}>
                        ✓ Vald
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>}

        {/* SECTION 2: Square Meters */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '2rem',
            color: 'var(--text-primary, #1a1a1a)',
            textAlign: 'center',
            marginBottom: '1rem',
            transform: `rotate(${0.3}deg)`
          }}>
            {isOfficeService ? '1. Hur stor är lokalytan?' : '2. Hur stor är din bostad?'}
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary, #6b7280)',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Ange antal kvadratmeter för att få en korrekt prisuppskattning
          </p>
          
          <div>
            {/* Quick selection ranges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              marginBottom: '3rem'
            }}>
              {sizeRanges.map((range) => {
                const rotation = React.useMemo(() => 0.4, []);
                const isSelected = selectedRange === range.id;

                return (
                  <Card
                    key={range.id}
                    variant={isSelected ? "primary" : "outlined"}
                    padding="md"
                    clickable={true}
                    onClick={() => handleRangeSelect(range)}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: isSelected ? '3px solid var(--accent, #007bff)' : '2px solid var(--border-color, #e5e7eb)',
                      backgroundColor: isSelected ? 'rgba(0, 123, 255, 0.05)' : 'white'
                    }}
                  >
                    <CardContent style={{ textAlign: 'center' }}>
                      <div style={{
                        fontSize: '2rem',
                        marginBottom: '0.5rem',
                        transform: `rotate(${1.2}deg)`
                      }}>
                        {range.icon}
                      </div>
                      
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

                      {isSelected && (
                        <Badge 
                          variant="success" 
                          size="sm"
                          style={{ marginTop: '0.5rem' }}
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
              padding="xl"
              style={{ 
                maxWidth: '500px', 
                margin: '0 auto',
                textAlign: 'center'
              }}
            >
              <CardContent>
                <h3 style={{
                  fontFamily: 'Kalam, cursive',
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'var(--text-primary, #1a1a1a)',
                  margin: '0 0 1rem 0',
                  transform: `rotate(${0.3}deg)`
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
                      console.log('[DEBUG] Square meters input changed:', e.target.value);
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

        {/* SECTION 3: Pet Ownership - Only for residential services */}
        {isResidentialService && <div style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '2rem',
            color: 'var(--text-primary, #1a1a1a)',
            textAlign: 'center',
            marginBottom: '1rem',
            transform: `rotate(${0.3}deg)`
          }}>
            3. Har ni husdjur hemma?
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary, #6b7280)',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Detta hjälper oss matcha dig med städfirmor som har rätt utrustning
          </p>
          
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {petOptions.map((option) => {
                const rotation = React.useMemo(() => 0.8, []);
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
                      transform: `rotate(${rotation}deg)`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: isSelected ? '3px solid var(--accent, #007bff)' : '2px solid var(--border-color, #e5e7eb)',
                      backgroundColor: isSelected ? 'rgba(0, 123, 255, 0.05)' : 'white',
                      minHeight: '280px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <CardContent style={{ textAlign: 'center', width: '100%' }}>
                      <div style={{
                        fontSize: '4rem',
                        marginBottom: '1rem',
                        transform: `rotate(${2.1}deg)`
                      }}>
                        {option.icon}
                      </div>
                      
                      <h3 style={{
                        fontFamily: 'Kalam, cursive',
                        fontSize: '1.75rem',
                        fontWeight: '600',
                        color: 'var(--text-primary, #1a1a1a)',
                        margin: '0 0 0.5rem 0',
                        transform: `rotate(${0.3}deg)`
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
                        {option.details.map((detail, index) => (
                          <Badge 
                            key={index}
                            variant={option.value ? "warning" : "default"} 
                            size="sm"
                            style={{
                              transform: `rotate(${0.8}deg)`
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
        </div>}

        {/* Navigation buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '3rem',
          padding: '2rem 0'
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
              padding: '1rem',
              backgroundColor: canProceed() ? 'rgba(0, 123, 255, 0.1)' : 'rgba(108, 114, 128, 0.1)',
              borderRadius: '8px',
              border: `2px dashed ${canProceed() ? 'var(--accent, #007bff)' : 'var(--border-color, #e5e7eb)'}`
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: canProceed() ? 'var(--accent, #007bff)' : 'var(--text-secondary, #6b7280)',
                margin: 0,
                fontWeight: '500'
              }}>
                {canProceed() ? '✅ Alla fält ifyllda - redo att fortsätta!' : '⏳ Fyll i alla fält för att fortsätta'}
              </p>
            </div>
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