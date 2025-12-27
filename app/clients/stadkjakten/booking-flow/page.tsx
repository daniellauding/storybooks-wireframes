'use client';

import { Header } from '@/components/storybook/Header';
import { Card, CardContent, CardHeader } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Badge } from '@/components/storybook/Badge';
import { Container } from '@/components/storybook/Container';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function BookingFlowPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'client', label: 'Städkjakten', href: '/clients/stadkjakten' },
    { id: 'flows', label: 'Booking Flow', href: '/clients/stadkjakten/booking-flow' },
  ];

  const flows = [
    {
      id: 'booking-start',
      name: 'Booking Start',
      description: 'Main booking wireframe with search',
      icon: '🏠',
      href: '/clients/stadkjakten/booking-flow/flows/booking-start'
    },
    {
      id: 'wizard',
      name: 'Booking Wizard',
      description: 'Step-by-step booking process',
      icon: '🔮',
      href: '/clients/stadkjakten/booking-flow/flows/wizard'
    },
    {
      id: 'results',
      name: 'Search Results',
      description: 'Company listings and selection',
      icon: '🔍',
      href: '/clients/stadkjakten/booking-flow/flows/results'
    },
    {
      id: 'checkout',
      name: 'Checkout',
      description: 'Payment and confirmation',
      icon: '💳',
      href: '/clients/stadkjakten/booking-flow/flows/checkout'
    },
    {
      id: 'iframe-demo',
      name: 'Iframe Showcase',
      description: 'Embed widget demonstration',
      icon: '🖼️',
      href: '/showcase/stadexpert'
    },
    {
      id: 'company-embed',
      name: 'Company Widget',
      description: 'Embeddable booking widget',
      icon: '📱',
      href: '/embed/company/1'
    }
  ];

  const services = [
    {
      id: 'hemstadning',
      name: 'Hemstädning',
      icon: '🏠',
      href: '/clients/stadkjakten/booking-flow/services/hemstadning'
    },
    {
      id: 'fonsterputs',
      name: 'Fönsterputsning',
      icon: '🪟',
      href: '/clients/stadkjakten/booking-flow/services/fonsterputs'
    },
    {
      id: 'flyttstadning',
      name: 'Flyttstädning',
      icon: '📦',
      href: '/clients/stadkjakten/booking-flow/services/flyttstadning'
    },
    {
      id: 'byggstadning',
      name: 'Byggstädning',
      icon: '🔨',
      href: '/clients/stadkjakten/booking-flow/services/byggstadning'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo="Städkjakten"
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
          <Badge variant="info" size="lg" style={{ 
            marginBottom: '1rem',
            transform: mounted ? `rotate(${Math.random() * 2 - 1}deg)` : 'none'
          }}>
            🧹 BOOKING FLOW
          </Badge>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'var(--text-primary, #1a1a1a)',
            fontFamily: 'Kalam, cursive',
            margin: '0 0 1rem 0',
            transform: mounted ? `rotate(${Math.random() * 0.5 - 0.25}deg)` : 'none'
          }}>
            Städkjakten Wireframes
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary, #6b7280)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Swedish cleaning service booking platform wireframes
          </p>
        </Container>
      </div>
      
      <Container maxWidth="xl" style={{ padding: '3rem 1rem' }}>
        {/* Flows Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '2rem',
            color: 'var(--text-primary, #1a1a1a)',
            marginBottom: '1.5rem',
            transform: mounted ? `rotate(${Math.random() * 0.3 - 0.15}deg)` : 'none'
          }}>
            📋 Available Flows
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {flows.map((flow, index) => {
              const rotation = mounted ? (Math.sin(index) * 1.5) : 0;
              const isIframe = flow.id === 'iframe-demo' || flow.id === 'company-embed';
              
              return (
                <Link 
                  key={flow.id} 
                  href={flow.href}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Card 
                    variant={isIframe ? "primary" : "elevated"}
                    padding="lg"
                    clickable={true}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: 'all 0.3s ease',
                      height: '100%'
                    }}
                  >
                    <CardContent>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '0.5rem'
                      }}>
                        <span style={{
                          fontSize: '2rem',
                          transform: `rotate(${Math.random() * 10 - 5}deg)`
                        }}>
                          {flow.icon}
                        </span>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: isIframe ? 'white' : 'var(--text-primary, #1a1a1a)',
                          fontFamily: 'Kalam, cursive',
                          margin: 0
                        }}>
                          {flow.name}
                        </h3>
                      </div>
                      <p style={{
                        fontSize: '0.875rem',
                        color: isIframe ? 'rgba(255,255,255,0.9)' : 'var(--text-secondary, #6b7280)',
                        margin: 0
                      }}>
                        {flow.description}
                      </p>
                      {isIframe && (
                        <Badge 
                          variant="warning" 
                          size="sm" 
                          style={{ marginTop: '0.5rem' }}
                        >
                          ✨ Iframe Example
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h2 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '2rem',
            color: 'var(--text-primary, #1a1a1a)',
            marginBottom: '1.5rem',
            transform: mounted ? `rotate(${Math.random() * 0.3 - 0.15}deg)` : 'none'
          }}>
            🛠️ Service Pages
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {services.map((service, index) => {
              const rotation = mounted ? (Math.sin(index) * 1) : 0;
              
              return (
                <Link 
                  key={service.id} 
                  href={service.href}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Card 
                    variant="outlined"
                    padding="md"
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
                        gap: '0.75rem'
                      }}>
                        <span style={{ fontSize: '1.5rem' }}>
                          {service.icon}
                        </span>
                        <span style={{
                          fontSize: '1rem',
                          fontWeight: '500',
                          color: 'var(--text-primary, #1a1a1a)',
                          fontFamily: 'Kalam, cursive'
                        }}>
                          {service.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}