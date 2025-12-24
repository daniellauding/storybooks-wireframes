'use client';

import { getClients } from '@/lib/data';
import ClientCard from '@/components/ClientCard';
import Link from 'next/link';
import { Header } from '@/components/storybook/Header';
import { Card, CardHeader, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { useState, useEffect } from 'react';
import { Client } from '@/types';

export default function Home() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      try {
        const clientData = await getClients();
        setClients(clientData);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchClients();
  }, []);
  const recentProjects = clients
    .flatMap(c => c.projects)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  const navigation = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'clients', label: 'All Clients', href: '/clients' },
    { id: 'experiments', label: 'Experiments', href: '/experiments' },
  ];

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'Kalam, cursive'
      }}>
        Loading wireframes...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo="🧩 Wireframe Storybook"
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
            <h2 style={{ 
              fontSize: '1.875rem', 
              fontWeight: 'bold', 
              color: 'var(--text-primary, #1a1a1a)',
              margin: 0,
              fontFamily: 'Kalam, cursive'
            }}>
              🎨 Wireframe Clients
            </h2>
          </CardHeader>
          <CardContent>
            <p style={{ 
              color: 'var(--text-secondary, #6b7280)',
              fontSize: '1rem',
              margin: 0
            }}>
              Explore wireframes organized by client and project
            </p>
          </CardContent>
        </Card>

        <div style={{ 
          display: 'grid', 
          gap: '1.5rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
        }}>
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>

        {recentProjects.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <Card variant="outlined" padding="lg" style={{ marginBottom: '1.5rem' }}>
              <CardHeader>
                <h2 style={{ 
                  fontSize: '1.875rem', 
                  fontWeight: 'bold', 
                  color: 'var(--text-primary, #1a1a1a)',
                  margin: 0,
                  fontFamily: 'Kalam, cursive'
                }}>
                  🕒 Recent Projects
                </h2>
              </CardHeader>
              <CardContent>
                <p style={{ 
                  color: 'var(--text-secondary, #6b7280)',
                  fontSize: '1rem',
                  margin: 0
                }}>
                  Latest updates across all clients
                </p>
              </CardContent>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recentProjects.map((project) => {
                const client = clients.find(c => c.id === project.clientId);
                return (
                  <Link key={project.id} href={`/${client?.id}/${project.id}`}>
                    <Card 
                      variant="default" 
                      padding="md" 
                      clickable={true}
                      style={{ width: '100%' }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between' 
                      }}>
                        <div>
                          <h3 style={{ 
                            fontWeight: 'bold', 
                            color: 'var(--text-primary, #1a1a1a)',
                            margin: '0 0 0.25rem 0',
                            fontFamily: 'Kalam, cursive'
                          }}>
                            {project.name}
                          </h3>
                          <p style={{ 
                            fontSize: '0.875rem', 
                            color: 'var(--text-secondary, #6b7280)',
                            margin: 0
                          }}>
                            {client?.name} • {project.description}
                          </p>
                        </div>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          color: 'var(--text-muted, #9ca3af)' 
                        }}>
                          {new Date(project.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
