'use client';

import { Header } from '@/components/storybook/Header';
import { Hero } from '@/components/storybook/Hero';
import { SearchBox } from '@/components/storybook/SearchBox';
import { Button } from '@/components/storybook/Button';
import { Card, CardContent } from '@/components/storybook/Card';
import { Badge } from '@/components/storybook/Badge';
import { Rating } from '@/components/storybook/Rating';
import { UserCard } from '@/components/storybook/UserCard';
import { WireframeFooter } from '@/components/storybook/WireframeFooter';
import { Accordion } from '@/components/storybook/Accordion';
import { CombinedSearch } from '@/components/storybook/CombinedSearch';
import { AnimatedTicker } from '@/components/storybook/AnimatedTicker';
import { Skeleton } from '@/components/storybook/Skeleton';
import React from 'react';

export default function BookingStartWireframe() {
  console.log('[DEBUG] BookingStartWireframe component loaded');
  const navigation = [
    { id: 'hemstadning', label: 'Hemstädning', href: '/hemstadning' },
    { id: 'fonsterputs', label: 'Fönsterputsning', href: '/fonsterputs' },
    { id: 'flyttstadning', label: 'Flyttstädning', href: '/flyttstadning' },
    { id: 'byggstadning', label: 'Byggstädning', href: '/byggstadning' },
    { id: 'how', label: 'Hur det fungerar', href: '#how' },
    { id: 'about', label: 'Om oss', href: '#about' },
  ];

  const searchSuggestions = [
    'Hemstädning Stockholm',
    'Kontorsstädning Göteborg', 
    'Flyttstädning Malmö',
    'Fönsterputsning Uppsala',
    'Storstädning villa',
    'Trappstädning',
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo={
          <span 
            style={{ cursor: 'pointer' }} 
            onClick={() => window.location.href = '/'}
          >
            Städkjakten
          </span>
        }
        navigation={navigation}
        showSearch={false}
        variant="default"
        skeleton={false}
      />
      
      <Hero
        variant="centered"
        title=""
        subtitle=""
        description=""
        badge="🧹 WIREFRAME"
        backgroundPattern={true}
        skeleton={true}
        primaryAction={{
          label: "Skeleton Button",
          onClick: () => {
            console.log('[DEBUG] Hero CTA button clicked');
            console.log('[DEBUG] Navigating to wizard page...');
            window.location.href = '/clients/stadkjakten/booking-flow/flows/wizard/step/1';
          }
        }}
      />

      {/* Enhanced Search Section */}
      <div style={{ 
        margin: '-4rem 2rem 2rem 2rem',
        position: 'relative',
        zIndex: 10
      }}>
        <CombinedSearch
          onSearch={(city, service) => {
            console.log('[DEBUG] CombinedSearch onSearch triggered:', { city, service });
            console.log('[DEBUG] Navigating to wizard page...');
            window.location.href = '/clients/stadkjakten/booking-flow/flows/wizard/step/1';
          }}
        />
      </div>

      {/* Statistics Section */}
      <Card 
        variant="elevated" 
        padding="lg" 
        style={{ 
          margin: '2rem', 
          textAlign: 'center',
          backgroundColor: 'white'
        }}
      >
        <CardContent>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            alignItems: 'center'
          }}>
            {[1, 2, 3, 4].map((_, index) => {
              const rotation = React.useMemo(() => Math.random() * 2 - 1, []);
              return (
                <div key={index} style={{ transform: `rotate(${rotation}deg)` }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <Skeleton variant="text" width="80%" height="2.5rem" style={{ margin: '0 auto' }} />
                  </div>
                  <Skeleton variant="text" width="100%" height="0.875rem" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card variant="default" padding="xl" style={{ margin: '2rem', borderBottom: '2px solid var(--border-color)' }}>
        <CardContent>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Badge variant="info" size="md" style={{ marginBottom: '1rem' }}>
              Populärast
            </Badge>
            {/* Using skeleton for title and subtitle */}
            <div style={{ marginBottom: '1rem' }}>
              <Skeleton variant="text" width="60%" height="3rem" style={{ margin: '0 auto 1rem' }} />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <Skeleton variant="text" width="80%" height="1.125rem" style={{ margin: '0 auto' }} />
            </div>
          </div>
          
          <SearchBox
            placeholder="Ange postnummer eller stad..."
            suggestions={searchSuggestions}
            onSearch={() => {
              console.log('[DEBUG] SearchBox onSearch triggered');
              console.log('[DEBUG] Navigating to wizard page...');
              window.location.href = '/clients/stadkjakten/booking-flow/flows/wizard/step/1';
            }}
          />

          <div style={{ 
            marginTop: '3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { 
                icon: '🏠', 
                label: 'Hemstädning', 
                desc: 'Regelbunden städning av hem och lägenheter',
                image: 'data:image/svg+xml,%3Csvg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%23e1f5fe" width="200" height="150"/%3E%3Crect fill="%234fc3f7" x="20" y="20" width="160" height="110" rx="8"/%3E%3Ctext x="100" y="80" text-anchor="middle" fill="%23fff" font-size="16"%3EHemstädning%3C/text%3E%3C/svg%3E'
              },
              { 
                icon: '🪟', 
                label: 'Fönsterputsning', 
                desc: 'Kristallklara fönster för bättre ljusinsläpp',
                image: 'data:image/svg+xml,%3Csvg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%23f3e5f5" width="200" height="150"/%3E%3Crect fill="%23ba68c8" x="20" y="20" width="160" height="110" rx="8"/%3E%3Ctext x="100" y="80" text-anchor="middle" fill="%23fff" font-size="14"%3EFönsterputsning%3C/text%3E%3C/svg%3E'
              },
              { 
                icon: '📦', 
                label: 'Flyttstädning', 
                desc: 'Grundlig städning vid flytt in eller ut',
                image: 'data:image/svg+xml,%3Csvg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%23fff3e0" width="200" height="150"/%3E%3Crect fill="%23ffb74d" x="20" y="20" width="160" height="110" rx="8"/%3E%3Ctext x="100" y="80" text-anchor="middle" fill="%23fff" font-size="16"%3EFlyttstädning%3C/text%3E%3C/svg%3E'
              },
              { 
                icon: '🏗️', 
                label: 'Byggstädning', 
                desc: 'Städning efter byggarbeten och renoveringar',
                image: 'data:image/svg+xml,%3Csvg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg"%3E%3Crect fill="%23e8f5e8" width="200" height="150"/%3E%3Crect fill="%2366bb6a" x="20" y="20" width="160" height="110" rx="8"/%3E%3Ctext x="100" y="80" text-anchor="middle" fill="%23fff" font-size="16"%3EByggstädning%3C/text%3E%3C/svg%3E'
              },
            ].map((service, index) => {
              const rotation = React.useMemo(() => Math.random() * 2 - 1, []);
              return (
                <Card
                  key={index}
                  variant="outlined"
                  padding="none"
                  clickable={true}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    backgroundImage: `url("${service.image}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '150px',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      fontSize: '2rem',
                      background: 'rgba(255,255,255,0.9)',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {service.icon}
                    </div>
                  </div>
                  <CardContent style={{ padding: '1.5rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <Skeleton variant="text" width="70%" height="1.25rem" />
                    </div>
                    <Skeleton variant="text" lines={2} />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Large Training Integration Section */}
      <Card 
        variant="elevated" 
        padding="none"
        style={{
          margin: '2rem',
          backgroundColor: '#FF5722',
          borderRadius: '20px',
          overflow: 'hidden',
          transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`,
        }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          minHeight: '400px'
        }}>
          <div style={{ padding: '3rem', color: 'white' }}>
            <div style={{ marginBottom: '1rem' }}>
              <Skeleton variant="text" width="90%" height="2.5rem" style={{ marginBottom: '0.5rem' }} />
              <Skeleton variant="text" width="85%" height="2.5rem" style={{ marginBottom: '0.5rem' }} />
              <Skeleton variant="text" width="80%" height="2.5rem" />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <Skeleton variant="text" lines={3} />
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Button variant="secondary" size="lg">
                Registrera dig
              </Button>
              <Button variant="ghost" size="lg">
                Läs mer
              </Button>
            </div>
          </div>
          <div style={{
            backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)',
            backgroundSize: '40px 40px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              transform: `rotate(${Math.random() * 3 - 1.5}deg)`,
            }}>
              <h3 style={{
                fontFamily: 'Kalam, cursive',
                fontSize: '1.25rem',
                marginBottom: '1rem',
                color: '#333'
              }}>
                Marknadsför ditt företag
              </h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: '#666', fontSize: '0.875rem' }}>Företagsnamn</label>
                <div style={{
                  backgroundColor: '#f5f5f5',
                  border: '2px solid #ddd',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  marginTop: '0.25rem'
                }}>
                  Städ & Service AB
                </div>
              </div>
              <Button variant="primary" size="md" style={{ width: '100%' }}>
                Kom igång direkt
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Card 
        variant="elevated" 
        padding="xl" 
        style={{
          margin: '2rem',
          backgroundColor: 'var(--surface-color, #fafafa)',
          borderBottom: '2px solid var(--border-color)',
          transform: `rotate(${Math.random() * 0.1 - 0.05}deg)`,
        }}
      >
        <CardContent>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Skeleton variant="text" width="50%" height="3rem" style={{ margin: '0 auto' }} />
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                step: '1',
                title: 'Beskriv ditt behov',
                desc: 'Ange vad som ska städas, när och var',
              },
              {
                step: '2',
                title: 'Få offerter',
                desc: 'Jämför priser från flera städfirmor',
              },
              {
                step: '3',
                title: 'Boka direkt',
                desc: 'Välj den städfirma som passar dig bäst',
              },
            ].map((item, index) => {
              const numberRotation = React.useMemo(() => Math.random() * 3 - 1.5, []);
              const titleRotation = React.useMemo(() => Math.random() * 0.5 - 0.25, []);
              return (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div 
                    style={{
                      margin: '0 auto 1rem auto',
                      display: 'flex',
                      height: '4rem',
                      width: '4rem',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 123, 255, 0.1)',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      color: 'var(--accent, #007bff)',
                      border: '2px solid var(--accent, #007bff)',
                      borderRadius: '50% 40% 55% 45%',
                      transform: `rotate(${numberRotation}deg)`,
                    }}
                  >
                    {item.step}
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <Skeleton variant="text" width="80%" height="1.25rem" style={{ margin: '0 auto' }} />
                  </div>
                  <Skeleton variant="text" lines={2} width="90%" style={{ margin: '0 auto' }} />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Testimonial Section */}
      <Card variant="default" padding="xl" style={{ 
        margin: '2rem',
        backgroundColor: '#f8f9fa'
      }}>
        <CardContent>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Skeleton variant="text" width="60%" height="2.5rem" style={{ margin: '0 auto' }} />
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                rating: 5,
                text: 'Fantastisk service! Hittade perfekt städfirma på 10 minuter.',
                author: 'Anna S.',
                date: '2024-03-15'
              },
              {
                rating: 5,
                text: 'Supersmidigt att jämföra priser och boka direkt online.',
                author: 'Lars M.',
                date: '2024-03-10'
              },
              {
                rating: 4,
                text: 'Bra utbud av städfirmor i mitt område. Mycket nöjd!',
                author: 'Maria K.',
                date: '2024-03-08'
              }
            ].map((review, index) => {
              const rotation = React.useMemo(() => Math.random() * 2 - 1, []);
              return (
                <UserCard
                  key={index}
                  name=""
                  subtitle=""
                  description=""
                  variant="testimonial"
                  skeleton={true}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Feature Combo Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '2rem',
        margin: '2rem',
        alignItems: 'start'
      }}>
        <Card variant="primary" padding="lg" style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          transform: `rotate(${Math.random() * 1 - 0.5}deg)`,
        }}>
          <CardContent>
            <div style={{ marginBottom: '1rem' }}>
              <Skeleton variant="text" width="70%" height="1.5rem" />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <Skeleton variant="text" lines={2} />
            </div>
            <Button variant="secondary" size="md">
              Läs mer
            </Button>
          </CardContent>
        </Card>
        
        <div style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h100v100H0z" fill="%23f0f0f0"/%3E%3Cpath d="M10 10h80v80H10z" fill="white" stroke="%23ddd" stroke-width="1"/%3E%3C/svg%3E")',
          minHeight: '300px',
          borderRadius: '15px',
          border: '2px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#999', fontSize: '1.125rem' }}>Video placeholder</span>
        </div>
      </div>

      {/* Gift Card Section */}
      <Card variant="elevated" padding="xl" style={{ 
        margin: '2rem',
        background: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)',
        color: 'white'
      }}>
        <CardContent>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 200px',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ marginBottom: '1rem' }}>
                <Skeleton variant="text" width="90%" height="2.5rem" />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <Skeleton variant="text" lines={2} width="85%" />
              </div>
              <Button variant="primary" size="lg">
                Köp presentkort →
              </Button>
            </div>
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              padding: '1.5rem',
              borderRadius: '15px',
              textAlign: 'center',
              transform: `rotate(${Math.random() * 3 - 1.5}deg)`,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎁</div>
              <h4 style={{ 
                color: '#2c3e50',
                fontFamily: 'Kalam, cursive',
                margin: 0
              }}>
                Presentkort
              </h4>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* YKB-utbildning Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: '2rem',
        margin: '2rem',
        alignItems: 'stretch'
      }}>
        <div style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h100v100H0z" fill="%2387CEEB"/%3E%3Cpath d="M20 20h60v60H20z" fill="white" stroke="%23ddd" stroke-width="1"/%3E%3Ctext x="50" y="55" text-anchor="middle" fill="%23333" font-size="8"%3ETruck Image%3C/text%3E%3C/svg%3E")',
          minHeight: '300px',
          borderRadius: '15px',
          border: '2px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#999', fontSize: '1.125rem' }}>Truck/Transport Image</span>
        </div>

        <Card variant="elevated" padding="lg" style={{ backgroundColor: 'white' }}>
          <CardContent>
            <div style={{ marginBottom: '1rem' }}>
              <Skeleton variant="text" width="60%" height="2rem" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Skeleton variant="text" lines={3} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <Accordion
                items={[]}
                variant="default"
                skeleton={true}
                skeletonItems={2}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card variant="default" padding="xl" style={{ 
        margin: '2rem',
        backgroundColor: '#f8f9fa'
      }}>
        <CardContent>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Skeleton variant="text" width="50%" height="2.5rem" style={{ margin: '0 auto' }} />
          </div>
          
          <Accordion
            items={[]}
            variant="simple"
            style={{ maxWidth: '800px', margin: '0 auto' }}
            skeleton={true}
            skeletonItems={5}
          />
        </CardContent>
      </Card>

      <Card variant="default" padding="xl" style={{ margin: '2rem' }}>
        <CardContent>
          <Card
            variant="primary"
            padding="xl"
            style={{
              textAlign: 'center',
              position: 'relative',
              backgroundColor: 'rgba(0, 123, 255, 0.05)',
              border: '3px solid var(--accent, #007bff)',
              borderRadius: '25px 15px 20px 12px',
              transform: `rotate(${Math.random() * 1 - 0.5}deg)`,
            }}
          >
            <CardContent>
              {/* Sketchy decoration lines */}
              <div 
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  left: '1rem',
                  width: '2rem',
                  height: '2px',
                  backgroundColor: 'var(--accent, #007bff)',
                  opacity: 0.6,
                  transform: `rotate(${Math.random() * 10 - 5}deg)`,
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  right: '1rem',
                  width: '1.5rem',
                  height: '2px',
                  backgroundColor: 'var(--accent, #007bff)',
                  opacity: 0.6,
                  transform: `rotate(${Math.random() * 10 - 5}deg)`,
                }}
              />
              
              <div style={{ marginBottom: '1rem' }}>
                <Skeleton variant="text" width="80%" height="3rem" style={{ margin: '0 auto' }} />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <Skeleton variant="text" width="70%" height="1.125rem" style={{ margin: '0 auto' }} />
              </div>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => console.log('Start comparing')}
              >
                Börja jämföra nu
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Footer */}
      <WireframeFooter
        companyName=""
        description=""
        links={[]}
        socialLinks={[]}
        skeleton={true}
      />
    </div>
  );
}