'use client';

import Link from 'next/link';
import { Header } from '@/components/storybook/Header';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Badge } from '@/components/storybook/Badge';

export default function ExperimentsPage() {
  const navigation = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'experiments', label: 'Experiments', href: '/experiments' },
  ];

  const experiments = [
    {
      name: 'Offer Selection Widget',
      description: 'Travel booking offer selection components',
      storybookUrl: 'http://localhost:6006/?path=/story/experiments-offerselection--default',
      path: '/wireframe-storybook/src/experiments/OfferSelection/',
      type: 'Widget',
    },
    {
      name: 'Storybook Components',
      description: 'Full component library with wireframe elements',
      storybookUrl: 'http://localhost:6006',
      path: '/wireframe-storybook/src/components/',
      type: 'Library',
    },
    {
      name: 'Templates',
      description: 'Complete page templates and flows',
      storybookUrl: 'http://localhost:6006/?path=/story/templates',
      path: '/wireframe-storybook/src/templates/',
      type: 'Templates',
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo="🧪 Experiments"
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
            <h1 style={{ 
              fontSize: '2.25rem', 
              fontWeight: 'bold', 
              color: 'var(--text-primary, #1a1a1a)',
              margin: 0,
              fontFamily: 'Kalam, cursive'
            }}>
              🧪 Storybook Experiments
            </h1>
          </CardHeader>
          <CardContent>
            <p style={{ 
              color: 'var(--text-secondary, #6b7280)',
              fontSize: '1.125rem',
              margin: 0
            }}>
              Explore wireframe components and experiments from the Storybook library
            </p>
          </CardContent>
        </Card>

        <div style={{ 
          display: 'grid', 
          gap: '1.5rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))'
        }}>
          {experiments.map((experiment, index) => (
            <Card 
              key={index}
              variant="elevated" 
              padding="lg"
              fullWidth={true}
            >
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    color: 'var(--text-primary, #1a1a1a)',
                    margin: 0,
                    fontFamily: 'Kalam, cursive'
                  }}>
                    📁 {experiment.name}
                  </h3>
                  <Badge variant="info" size="sm">
                    {experiment.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p style={{ 
                  color: 'var(--text-secondary, #6b7280)',
                  fontSize: '1rem',
                  margin: '0 0 1rem 0'
                }}>
                  {experiment.description}
                </p>
                <div style={{ 
                  fontSize: '0.875rem',
                  color: 'var(--text-muted, #9ca3af)',
                  fontFamily: 'monospace',
                  backgroundColor: 'var(--surface-color, #fafafa)',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border-color, #e5e7eb)',
                  margin: 0
                }}>
                  {experiment.path}
                </div>
              </CardContent>
              <CardFooter>
                <a
                  href={experiment.storybookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="sm">
                    📚 Open in Storybook →
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card variant="outlined" padding="lg" style={{ marginTop: '3rem' }}>
          <CardHeader>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: 'var(--text-primary, #1a1a1a)',
              margin: 0,
              fontFamily: 'Kalam, cursive'
            }}>
              🚀 How to view Storybook
            </h2>
          </CardHeader>
          <CardContent>
            <p style={{ 
              color: 'var(--text-secondary, #6b7280)',
              fontSize: '1rem',
              margin: '0 0 1rem 0'
            }}>
              To explore the full component library, run the Storybook development server:
            </p>
            <Card variant="default" padding="sm" style={{ 
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              margin: '0 0 1rem 0'
            }}>
              <CardContent>
                <div>cd wireframe-storybook</div>
                <div>npm run storybook</div>
              </CardContent>
            </Card>
            <p style={{ 
              color: 'var(--text-muted, #9ca3af)',
              fontSize: '0.875rem',
              margin: 0
            }}>
              Then open{' '}
              <a 
                href="http://localhost:6006" 
                style={{ 
                  color: 'var(--accent, #007bff)',
                  textDecoration: 'underline'
                }}
              >
                http://localhost:6006
              </a>
              {' '}in your browser
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}