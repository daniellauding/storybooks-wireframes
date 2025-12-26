'use client';

import { Header } from '@/components/storybook/Header';
import { Card, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Input } from '@/components/storybook/Input';
import { Badge } from '@/components/storybook/Badge';
import { Container } from '@/components/storybook/Container';
import React, { useState, useEffect } from 'react';

export default function WindowCleaningServicePage() {
  const [mounted, setMounted] = useState(false);
  const [windowType, setWindowType] = useState<string>('');
  const [windowQuantity, setWindowQuantity] = useState<string>('');
  const [cleaningSides, setCleaningSides] = useState<string>('');
  const [ladderRequired, setLadderRequired] = useState<boolean | null>(null);
  const [openingDirection, setOpeningDirection] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { id: 'hemstadning', label: 'Hemstädning', href: '/clients/stadkjakten/booking-flow/services/hemstadning' },
    { id: 'fonsterputs', label: 'Fönsterputsning', href: '/clients/stadkjakten/booking-flow/services/fonsterputs' },
    { id: 'flyttstadning', label: 'Flyttstädning', href: '/clients/stadkjakten/booking-flow/services/flyttstadning' },
    { id: 'byggstadning', label: 'Byggstädning', href: '/clients/stadkjakten/booking-flow/services/byggstadning' },
  ];

  const windowTypes = [
    {
      id: 'standard',
      title: 'Standardfönster',
      description: 'Vanliga fönster utan spröjs',
      icon: '🪟',
      priceMultiplier: 1.0
    },
    {
      id: 'sprojsade',
      title: 'Spröjsade fönster',
      description: 'Fönster med glasrutor (kräver mer tid)',
      icon: '🏛️',
      priceMultiplier: 1.4
    }
  ];

  const sideOptions = [
    {
      id: 'inside',
      title: 'Insidan endast',
      description: 'Putsar bara fönstrets insida',
      icon: '🏠',
      priceMultiplier: 0.6
    },
    {
      id: 'outside',
      title: 'Utsidan endast',
      description: 'Putsar bara fönstrets utsida',
      icon: '🌤️',
      priceMultiplier: 0.7
    },
    {
      id: 'both',
      title: 'Båda sidorna',
      description: 'Putsar både in- och utsida',
      icon: '✨',
      priceMultiplier: 1.0
    }
  ];

  const calculateEstimatedPrice = () => {
    if (!windowQuantity || !windowType || !cleaningSides) return null;
    
    const basePrice = 45; // Base price per window
    const quantity = parseInt(windowQuantity);
    const typeMultiplier = windowTypes.find(t => t.id === windowType)?.priceMultiplier || 1;
    const sideMultiplier = sideOptions.find(s => s.id === cleaningSides)?.priceMultiplier || 1;
    const ladderFee = ladderRequired ? 150 : 0;
    
    const totalPrice = (basePrice * quantity * typeMultiplier * sideMultiplier) + ladderFee;
    
    return {
      basePrice: basePrice * quantity,
      adjustments: {
        typeMultiplier: Math.round((typeMultiplier - 1) * basePrice * quantity),
        sideMultiplier: Math.round((sideMultiplier - 1) * basePrice * quantity),
        ladderFee
      },
      totalPrice: Math.round(totalPrice)
    };
  };

  const handleNext = () => {
    const searchParams = new URLSearchParams();
    searchParams.set('service', 'fonsterputs');
    searchParams.set('windowType', windowType);
    searchParams.set('windowQuantity', windowQuantity);
    searchParams.set('cleaningSides', cleaningSides);
    searchParams.set('ladderRequired', ladderRequired ? 'yes' : 'no');
    searchParams.set('openingDirection', openingDirection);
    
    const price = calculateEstimatedPrice();
    if (price) {
      searchParams.set('estimatedPrice', price.totalPrice.toString());
    }
    
    const resultsUrl = `/clients/stadkjakten/booking-flow/flows/results?${searchParams.toString()}`;
    console.log('[DEBUG] Navigating to results for window cleaning:', resultsUrl);
    window.location.href = resultsUrl;
  };

  const canProceed = () => {
    return windowType !== '' && windowQuantity && parseInt(windowQuantity) > 0 && cleaningSides !== '';
  };

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
          <div style={{
            display: 'inline-block',
            backgroundColor: '#17a2b8',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '1rem',
            transform: mounted ? 'rotate(0.8deg)' : 'none'
          }}>
            🪟 FÖNSTERPUTSNING
          </div>
          
          <h1 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--text-primary, #1a1a1a)',
            margin: '0 0 0.5rem 0',
            transform: mounted ? 'rotate(0.3deg)' : 'none'
          }}>
            Fönsterputsning - Berätta om dina fönster
          </h1>
          
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary, #6b7280)',
            margin: 0,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Få kristallklara fönster med vår professionella fönsterputsning
          </p>
        </Container>
      </div>

      <Container maxWidth="xl" style={{ padding: '2rem' }}>
        
        {/* Window Type Selection */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '2rem',
            color: 'var(--text-primary, #1a1a1a)',
            textAlign: 'center',
            marginBottom: '1rem',
            transform: mounted ? 'rotate(0.3deg)' : 'none'
          }}>
            1. Vilken typ av fönster?
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary, #6b7280)',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Spröjsade fönster kräver mer tid och påverkar priset
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {windowTypes.map((type, index) => {
              const rotation = mounted ? (Math.sin(index) * 1.5) : 0;
              const isSelected = windowType === type.id;

              return (
                <Card
                  key={type.id}
                  variant={isSelected ? "primary" : "outlined"}
                  padding="lg"
                  clickable={true}
                  onClick={() => setWindowType(type.id)}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isSelected ? '3px solid #17a2b8' : '2px solid var(--border-color, #e5e7eb)',
                    backgroundColor: isSelected ? 'rgba(23, 162, 184, 0.05)' : 'white'
                  }}
                >
                  <CardContent>
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                      <div style={{
                        fontSize: '3rem',
                        marginBottom: '1rem',
                        transform: mounted ? `rotate(${1.2}deg)` : 'none'
                      }}>
                        {type.icon}
                      </div>
                      
                      <h3 style={{
                        fontFamily: 'Kalam, cursive',
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: 'var(--text-primary, #1a1a1a)',
                        margin: '0 0 0.5rem 0',
                        transform: mounted ? 'rotate(0.3deg)' : 'none'
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
                      
                      <Badge variant="info" size="sm">
                        {type.priceMultiplier === 1 ? 'Normalpris' : `+${Math.round((type.priceMultiplier - 1) * 100)}% tilläggsavgift`}
                      </Badge>
                    </div>

                    {isSelected && (
                      <div style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        backgroundColor: '#17a2b8',
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
        </div>

        {/* Window Quantity */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '2rem',
            color: 'var(--text-primary, #1a1a1a)',
            textAlign: 'center',
            marginBottom: '1rem',
            transform: mounted ? 'rotate(0.3deg)' : 'none'
          }}>
            2. Hur många fönster?
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary, #6b7280)',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Ange totalt antal fönster som ska putsas
          </p>
          
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
                transform: mounted ? 'rotate(0.3deg)' : 'none'
              }}>
                Antal fönster
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
                  placeholder="Antal fönster"
                  value={windowQuantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setWindowQuantity(e.target.value);
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
                  fönster
                </span>
              </div>

              {windowQuantity && parseInt(windowQuantity) > 0 && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(23, 162, 184, 0.1)',
                  borderRadius: '8px',
                  border: '1px dashed #17a2b8',
                  marginTop: '1rem'
                }}>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#17a2b8',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    🕐 Uppskattad tid: {Math.ceil(parseInt(windowQuantity) * 0.25)} timmar
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Cleaning Sides */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '2rem',
            color: 'var(--text-primary, #1a1a1a)',
            textAlign: 'center',
            marginBottom: '1rem',
            transform: mounted ? 'rotate(0.3deg)' : 'none'
          }}>
            3. Vilka sidor ska putsas?
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary, #6b7280)',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Välj om du vill putsa insidan, utsidan eller både och
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {sideOptions.map((option, index) => {
              const rotation = mounted ? (Math.sin(index) * 1) : 0;
              const isSelected = cleaningSides === option.id;

              return (
                <Card
                  key={option.id}
                  variant={isSelected ? "primary" : "outlined"}
                  padding="lg"
                  clickable={true}
                  onClick={() => setCleaningSides(option.id)}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: isSelected ? '3px solid #17a2b8' : '2px solid var(--border-color, #e5e7eb)',
                    backgroundColor: isSelected ? 'rgba(23, 162, 184, 0.05)' : 'white'
                  }}
                >
                  <CardContent style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '2.5rem',
                      marginBottom: '1rem',
                      transform: mounted ? `rotate(${1.2}deg)` : 'none'
                    }}>
                      {option.icon}
                    </div>
                    
                    <h3 style={{
                      fontFamily: 'Kalam, cursive',
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: 'var(--text-primary, #1a1a1a)',
                      margin: '0 0 0.5rem 0'
                    }}>
                      {option.title}
                    </h3>
                    
                    <p style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary, #6b7280)',
                      margin: '0 0 1rem 0'
                    }}>
                      {option.description}
                    </p>

                    <Badge variant={option.id === 'both' ? 'success' : 'info'} size="sm">
                      {option.priceMultiplier === 1 ? 'Bästa värde' : `${Math.round(option.priceMultiplier * 100)}% av grundpris`}
                    </Badge>

                    {isSelected && (
                      <div style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        backgroundColor: '#17a2b8',
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
        </div>

        {/* Additional Options */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '2rem',
            color: 'var(--text-primary, #1a1a1a)',
            textAlign: 'center',
            marginBottom: '1rem',
            transform: mounted ? 'rotate(0.3deg)' : 'none'
          }}>
            4. Ytterligare information
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {/* Ladder requirement */}
            <Card variant="default" padding="lg">
              <CardContent>
                <h3 style={{
                  fontFamily: 'Kalam, cursive',
                  fontSize: '1.25rem',
                  color: 'var(--text-primary, #1a1a1a)',
                  marginBottom: '1rem'
                }}>
                  🪜 Krävs stege för att nå fönstren?
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary, #6b7280)',
                  marginBottom: '1rem'
                }}>
                  Detta påverkar priset med 150 kr
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button
                    variant={ladderRequired === true ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setLadderRequired(true)}
                  >
                    Ja, stege behövs
                  </Button>
                  <Button
                    variant={ladderRequired === false ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => setLadderRequired(false)}
                  >
                    Nej, når från marken
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Opening direction */}
            <Card variant="default" padding="lg">
              <CardContent>
                <h3 style={{
                  fontFamily: 'Kalam, cursive',
                  fontSize: '1.25rem',
                  color: 'var(--text-primary, #1a1a1a)',
                  marginBottom: '1rem'
                }}>
                  🚪 Öppningsriktning (påverkar ej pris)
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary, #6b7280)',
                  marginBottom: '1rem'
                }}>
                  Hjälper oss förbereda rätt utrustning
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button
                    variant={openingDirection === 'inward' ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setOpeningDirection('inward')}
                  >
                    Inåt
                  </Button>
                  <Button
                    variant={openingDirection === 'outward' ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setOpeningDirection('outward')}
                  >
                    Utåt
                  </Button>
                  <Button
                    variant={openingDirection === 'mixed' ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setOpeningDirection('mixed')}
                  >
                    Blandat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Price Estimate */}
        {canProceed() && (
          <Card variant="primary" padding="lg" style={{ marginBottom: '2rem' }}>
            <CardContent>
              <h3 style={{
                fontFamily: 'Kalam, cursive',
                fontSize: '1.5rem',
                color: 'white',
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                💰 Prisuppskattning
              </h3>
              
              {(() => {
                const estimate = calculateEstimatedPrice();
                if (!estimate) return null;
                
                return (
                  <div style={{ color: 'white' }}>
                    <div style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      padding: '1rem',
                      borderRadius: '8px',
                      marginBottom: '1rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span>Grundpris ({windowQuantity} fönster):</span>
                        <span>{estimate.basePrice} kr</span>
                      </div>
                      {estimate.adjustments.typeMultiplier !== 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span>Spröjsade fönster tillägg:</span>
                          <span>+{estimate.adjustments.typeMultiplier} kr</span>
                        </div>
                      )}
                      {estimate.adjustments.ladderFee > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span>Stegavgift:</span>
                          <span>+{estimate.adjustments.ladderFee} kr</span>
                        </div>
                      )}
                      <hr style={{ margin: '0.5rem 0', border: '1px solid rgba(255, 255, 255, 0.2)' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.125rem' }}>
                        <span>Total uppskattning:</span>
                        <span>{estimate.totalPrice} kr</span>
                      </div>
                    </div>
                    <p style={{ 
                      textAlign: 'center', 
                      fontSize: '0.875rem', 
                      opacity: 0.8,
                      margin: 0 
                    }}>
                      ✨ Slutgiltigt pris bestäms av valt företag
                    </p>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        )}

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
            onClick={() => window.history.back()}
          >
            ← Tillbaka
          </Button>

          <div style={{ textAlign: 'center' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: canProceed() ? 'rgba(23, 162, 184, 0.1)' : 'rgba(108, 114, 128, 0.1)',
              borderRadius: '8px',
              border: `2px dashed ${canProceed() ? '#17a2b8' : 'var(--border-color, #e5e7eb)'}`
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: canProceed() ? '#17a2b8' : 'var(--text-secondary, #6b7280)',
                margin: 0,
                fontWeight: '500'
              }}>
                {canProceed() ? '✅ Redo att hitta företag!' : '⏳ Fyll i obligatoriska fält'}
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
            Hitta företag →
          </Button>
        </div>
      </Container>
    </div>
  );
}