'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getClient } from '@/lib/data';
import { checkAuthCookie } from '@/lib/auth';
import { Client } from '@/types';
import PasswordProtection from '@/components/PasswordProtection';
import Link from 'next/link';
import { Header } from '@/components/storybook/Header';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Badge } from '@/components/storybook/Badge';
import { Spinner } from '@/components/storybook/Spinner';

export default function ClientPage() {
  const params = useParams();
  const clientId = params.clientId as string;
  
  const [client, setClient] = useState<Client | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadClient() {
      const clientData = await getClient(clientId);
      setClient(clientData);
      
      if (clientData?.passwordProtected) {
        setIsAuthenticated(checkAuthCookie(clientId));
      } else {
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    }
    
    loadClient();
  }, [clientId]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'var(--bg-color, #f0f0f0)'
      }}>
        <Card variant="elevated" padding="lg">
          <CardContent>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              fontFamily: 'Kalam, cursive'
            }}>
              <Spinner size="md" />
              Loading client...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!client) {
    return (
      <div style={{ 
        display: 'flex', 
        minHeight: '100vh', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'var(--bg-color, #f0f0f0)'
      }}>
        <Card variant="elevated" padding="lg" style={{ textAlign: 'center' }}>
          <CardContent>
            <h2 style={{ 
              fontSize: '1.875rem', 
              fontWeight: 'bold', 
              color: 'var(--text-primary, #1a1a1a)',
              fontFamily: 'Kalam, cursive',
              margin: '0 0 1rem 0'
            }}>
              🚫 Client Not Found
            </h2>
            <Link href="/">
              <Button variant="primary" size="md">
                🏠 Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (client.passwordProtected && !isAuthenticated) {
    return (
      <PasswordProtection
        resourceId={clientId}
        resourceName={client.name}
        onAuthenticated={() => setIsAuthenticated(true)}
      />
    );
  }

  const navigation = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'client', label: client.name, href: `/clients/${clientId}` },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo={`📁 ${client.name}`}
        navigation={navigation}
        showSearch={false}
        variant="default"
      />

      <main style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '2rem 1rem'
      }}>
        <Card variant="elevated" padding="lg" style={{ marginBottom: '2rem' }}>
          <CardHeader>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h1 style={{ 
                fontSize: '2.25rem', 
                fontWeight: 'bold', 
                color: 'var(--text-primary, #1a1a1a)',
                margin: 0,
                fontFamily: 'Kalam, cursive'
              }}>
                🎨 {client.name}
              </h1>
              {client.passwordProtected && (
                <Badge variant="warning" size="sm">
                  🔒 Protected
                </Badge>
              )}
            </div>
          </CardHeader>
          {client.description && (
            <CardContent>
              <p style={{ 
                color: 'var(--text-secondary, #6b7280)',
                fontSize: '1.125rem',
                margin: 0
              }}>
                {client.description}
              </p>
            </CardContent>
          )}
        </Card>

        <Card variant="outlined" padding="lg" style={{ marginBottom: '1.5rem' }}>
          <CardHeader>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: 'var(--text-primary, #1a1a1a)',
              margin: 0,
              fontFamily: 'Kalam, cursive'
            }}>
              📂 Projects ({client.projects.length})
            </h2>
          </CardHeader>
        </Card>

        {client.projects.length > 0 ? (
          <div style={{ 
            display: 'grid', 
            gap: '1.5rem', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
          }}>
            {client.projects.map((project) => (
              <Link key={project.id} href={`/clients/${clientId}/${project.id}`}>
                <Card 
                  variant="elevated" 
                  padding="lg" 
                  clickable={true}
                  fullWidth={true}
                >
                  <CardContent>
                    <div style={{ position: 'relative' }}>
                      {project.passwordProtected && (
                        <div style={{ 
                          position: 'absolute', 
                          top: '-1rem', 
                          right: '-1rem',
                          fontSize: '1.25rem'
                        }}>
                          🔒
                        </div>
                      )}
                      
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 'bold', 
                        color: 'var(--text-primary, #1a1a1a)',
                        margin: '0 0 0.5rem 0',
                        fontFamily: 'Kalam, cursive'
                      }}>
                        🏗️ {project.name}
                      </h3>
                      
                      {project.description && (
                        <p style={{ 
                          fontSize: '0.875rem', 
                          color: 'var(--text-secondary, #6b7280)',
                          margin: '0 0 1rem 0',
                          lineHeight: '1.4'
                        }}>
                          {project.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      width: '100%',
                      gap: '1rem'
                    }}>
                      <Badge variant="info" size="sm">
                        🌊 {project.flows?.length || 0} flows
                      </Badge>
                      <Badge variant="success" size="sm">
                        📄 {project.wireframes?.length || 0} wireframes
                      </Badge>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
            <CardContent>
              <p style={{ 
                fontSize: '1.125rem',
                color: 'var(--text-muted, #9ca3af)',
                fontFamily: 'Kalam, cursive',
                margin: 0
              }}>
                📭 No projects yet for this client
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}