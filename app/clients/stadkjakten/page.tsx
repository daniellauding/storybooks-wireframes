'use client';

import { Header } from '@/components/storybook/Header';
import { Card, CardContent, CardHeader } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Badge } from '@/components/storybook/Badge';
import { Container } from '@/components/storybook/Container';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function StadkjaktenPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'client', label: 'Städkjakten', href: '/clients/stadkjakten' },
  ];

  const projects = [
    {
      id: 'booking-flow',
      name: 'Booking Flow',
      description: 'Complete booking system wireframes',
      icon: '🔮',
      href: '/clients/stadkjakten/booking-flow',
      features: ['Search', 'Wizard', 'Results', 'Checkout', 'Iframe Examples']
    },
    {
      id: 'iframe-showcase',
      name: 'Iframe Showcase',
      description: 'See how the booking widget works embedded in a company website',
      icon: '🖼️',
      href: '/showcase/stadexpert',
      features: ['Live Demo', 'Responsive', 'Embeddable']
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo="🧹 Städkjakten"
        navigation={navigation}
        variant="default"
      />
      
      <div style={{
        padding: '3rem 0',
        textAlign: 'center',
        borderBottom: '2px solid var(--border-color, #e5e7eb)',
        backgroundColor: 'var(--surface-color, #fafafa)'
      }}>
        <Container maxWidth="xl">
          <Badge variant="success" size="lg" style={{ 
            marginBottom: '1rem',
            transform: mounted ? `rotate(${Math.random() * 2 - 1}deg)` : 'none'
          }}>
            🇸🇪 SWEDISH CLEANING SERVICE
          </Badge>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'var(--text-primary, #1a1a1a)',
            fontFamily: 'Kalam, cursive',
            margin: '0 0 1rem 0',
            transform: mounted ? `rotate(${Math.random() * 0.5 - 0.25}deg)` : 'none'
          }}>
            Städkjakten
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary, #6b7280)',
            maxWidth: '600px',
            margin: '0 auto 1.5rem'
          }}>
            Platform for booking cleaning services with ROT tax deduction (50% off) in Sweden
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <Badge variant="info" size="sm">ROT-avdrag</Badge>
            <Badge variant="info" size="sm">Hemstädning</Badge>
            <Badge variant="info" size="sm">Flyttstädning</Badge>
            <Badge variant="info" size="sm">Fönsterputsning</Badge>
            <Badge variant="info" size="sm">Byggstädning</Badge>
          </div>
        </Container>
      </div>
      
      <Container maxWidth="xl" style={{ padding: '3rem 1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {projects.map((project, index) => {
            const rotation = mounted ? (Math.sin(index) * 2) : 0;
            const isIframe = project.id === 'iframe-showcase';
            
            return (
              <Link 
                key={project.id} 
                href={project.href}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card 
                  variant={isIframe ? "primary" : "elevated"}
                  padding="xl"
                  clickable={true}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: 'all 0.3s ease',
                    height: '100%'
                  }}
                >
                  <CardHeader>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{
                        fontSize: '3rem',
                        transform: `rotate(${Math.random() * 10 - 5}deg)`
                      }}>
                        {project.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: isIframe ? 'white' : 'var(--text-primary, #1a1a1a)',
                          fontFamily: 'Kalam, cursive',
                          margin: 0
                        }}>
                          {project.name}
                        </h3>
                        <p style={{
                          fontSize: '0.875rem',
                          color: isIframe ? 'rgba(255,255,255,0.9)' : 'var(--text-secondary, #6b7280)',
                          margin: '0.25rem 0 0 0'
                        }}>
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginTop: '1rem'
                    }}>
                      {project.features.map((feature, idx) => (
                        <Badge 
                          key={idx}
                          variant={isIframe ? "warning" : "default"}
                          size="sm"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    {isIframe && (
                      <div style={{
                        marginTop: '1rem',
                        padding: '0.75rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        border: '1px dashed rgba(255, 255, 255, 0.3)'
                      }}>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'white',
                          margin: 0,
                          textAlign: 'center'
                        }}>
                          🖼️ Live iframe demonstration
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Links */}
        <Card variant="outlined" padding="lg" style={{ marginTop: '3rem' }}>
          <CardContent>
            <h2 style={{
              fontFamily: 'Kalam, cursive',
              fontSize: '1.5rem',
              color: 'var(--text-primary, #1a1a1a)',
              marginBottom: '1rem'
            }}>
              ⚡ Quick Links
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <Link href="/clients/stadkjakten/booking-flow/flows/booking-start">
                <Button variant="ghost" fullWidth>
                  🏠 Booking Start
                </Button>
              </Link>
              <Link href="/showcase/stadexpert">
                <Button variant="ghost" fullWidth>
                  🖼️ Iframe Demo
                </Button>
              </Link>
              <Link href="/embed/company/1">
                <Button variant="ghost" fullWidth>
                  📱 Embed Widget
                </Button>
              </Link>
              <Link href="/clients/stadkjakten/booking-flow/flows/wizard">
                <Button variant="ghost" fullWidth>
                  🔮 Wizard Flow
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}