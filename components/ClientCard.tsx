'use client';

import Link from 'next/link';
import { Client } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/storybook/Card';
import { Badge } from '@/components/storybook/Badge';

interface ClientCardProps {
  client: Client;
}

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <Link href={`/clients/${client.id}`}>
      <Card 
        variant="elevated" 
        padding="lg" 
        clickable={true}
        fullWidth={true}
      >
        <CardContent>
          <div style={{ position: 'relative' }}>
            {client.passwordProtected && (
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
              📁 {client.name}
            </h3>
            
            {client.description && (
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'var(--text-secondary, #6b7280)',
                margin: '0 0 1rem 0',
                lineHeight: '1.4'
              }}>
                {client.description}
              </p>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            width: '100%'
          }}>
            <span style={{ 
              fontSize: '0.75rem', 
              color: 'var(--text-muted, #9ca3af)' 
            }}>
              📊 {client.projects.length} project{client.projects.length !== 1 ? 's' : ''}
            </span>
            <span style={{ 
              fontSize: '0.75rem', 
              color: 'var(--text-muted, #9ca3af)' 
            }}>
              🕒 {new Date(client.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}