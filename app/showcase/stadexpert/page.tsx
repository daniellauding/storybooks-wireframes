'use client';

import { Card, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Badge } from '@/components/storybook/Badge';
import React, { useState } from 'react';

export default function StadExpertShowcase() {
  const [showBookingWidget, setShowBookingWidget] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Company Header */}
      <header style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '2rem 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧽</div>
          <h1 style={{
            fontFamily: 'Kalam, cursive',
            fontSize: '3rem',
            margin: '0 0 0.5rem 0'
          }}>
            StadExpert Malmö
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
            Professionell hemstädning med 15 års erfarenhet
          </p>
          
          <div style={{ marginTop: '2rem' }}>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowBookingWidget(!showBookingWidget)}
            >
              {showBookingWidget ? 'Dölj bokningsformulär' : '📅 Boka städning direkt'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: showBookingWidget ? '1fr 1fr' : '1fr',
          gap: '2rem'
        }}>
          
          {/* Company Information */}
          <div>
            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'Kalam, cursive',
                fontSize: '2rem',
                color: '#007bff',
                marginBottom: '1rem'
              }}>
                Om oss
              </h2>
              <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>
                StadExpert Malmö har varit Malmös ledande städföretag sedan 2009. 
                Vi specialiserar oss på hemstädning, kontorsstädning och flyttstädning 
                med högsta kvalité och miljövänliga produkter.
              </p>
              <p style={{ lineHeight: '1.6' }}>
                Vårt team av erfarna städare använder endast certifierade 
                rengöringsprodukter och modern utrustning för att garantera 
                bästa möjliga resultat.
              </p>
            </section>

            <section style={{ marginBottom: '3rem' }}>
              <h2 style={{
                fontFamily: 'Kalam, cursive',
                fontSize: '2rem',
                color: '#007bff',
                marginBottom: '1rem'
              }}>
                Våra tjänster
              </h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                <Card variant="outlined" padding="lg">
                  <CardContent>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏠</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Hemstädning</h3>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                      Regelbunden eller engångsstädning av hem och lägenheter
                    </p>
                    <Badge variant="info" size="sm">Från 450 kr</Badge>
                  </CardContent>
                </Card>

                <Card variant="outlined" padding="lg">
                  <CardContent>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏢</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Kontorsstädning</h3>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                      Professionell städning av kontor och arbetsplatser
                    </p>
                    <Badge variant="info" size="sm">Från 380 kr</Badge>
                  </CardContent>
                </Card>

                <Card variant="outlined" padding="lg">
                  <CardContent>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📦</div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Flyttstädning</h3>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                      Grundlig städning inför inflyttning eller utflyttning
                    </p>
                    <Badge variant="info" size="sm">Från 650 kr</Badge>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 style={{
                fontFamily: 'Kalam, cursive',
                fontSize: '2rem',
                color: '#007bff',
                marginBottom: '1rem'
              }}>
                Kontakta oss
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                <div>
                  <p><strong>📍 Adress:</strong><br />Stora Nygatan 15, Malmö</p>
                </div>
                <div>
                  <p><strong>📞 Telefon:</strong><br />+46 40 123 456</p>
                </div>
                <div>
                  <p><strong>✉️ E-post:</strong><br />info@stadexpert.se</p>
                </div>
                <div>
                  <p><strong>🕐 Öppettider:</strong><br />Mån-Fre: 07:00-18:00<br />Lör: 08:00-16:00</p>
                </div>
              </div>
            </section>
          </div>

          {/* Embedded Booking Widget */}
          {showBookingWidget && (
            <div>
              <Card variant="default" padding="md">
                <CardContent>
                  <h3 style={{
                    fontFamily: 'Kalam, cursive',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    color: '#007bff'
                  }}>
                    💼 Boka städning
                  </h3>
                  
                  <p style={{
                    fontSize: '0.875rem',
                    textAlign: 'center',
                    color: '#6b7280',
                    marginBottom: '1.5rem'
                  }}>
                    Powered by Städkjakten - Trygg och säker bokning
                  </p>

                  {/* Iframe Embed */}
                  <div style={{
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa'
                  }}>
                    <iframe
                      src={`${window.location.origin}/embed/company/1`}
                      style={{
                        width: '100%',
                        height: '600px',
                        border: 'none',
                        display: 'block'
                      }}
                      title="StadExpert Bokningsformulär"
                    />
                  </div>
                  
                  <div style={{
                    textAlign: 'center',
                    marginTop: '1rem'
                  }}>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#6b7280'
                    }}>
                      🔒 SSL-säker betalning via Städkjakten
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#f8f9fa',
        padding: '2rem 0',
        textAlign: 'center',
        marginTop: '4rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <p style={{ color: '#6b7280', margin: 0 }}>
            © 2024 StadExpert Malmö - Auktoriserat städföretag
          </p>
          <p style={{ color: '#6b7280', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
            Bokningssystem tillhandahållet av <strong>Städkjakten</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}