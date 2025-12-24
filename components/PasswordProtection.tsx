'use client';

import { useState } from 'react';
import { authenticate } from '@/lib/auth';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Input } from '@/components/storybook/Input';
import { Badge } from '@/components/storybook/Badge';

interface PasswordProtectionProps {
  resourceId: string;
  resourceName: string;
  onAuthenticated: () => void;
}

export default function PasswordProtection({ 
  resourceId, 
  resourceName, 
  onAuthenticated 
}: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const isValid = await authenticate(resourceId, password);
      
      if (isValid) {
        onAuthenticated();
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-color, #f0f0f0)',
      padding: '1rem'
    }}>
      <Card variant="elevated" padding="lg" style={{ width: '100%', maxWidth: '400px' }}>
        <CardHeader>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '3rem',
              margin: '0 0 1rem 0'
            }}>
              🔐
            </div>
            <h2 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: 'var(--text-primary, #1a1a1a)',
              fontFamily: 'Kalam, cursive',
              margin: '0 0 0.5rem 0'
            }}>
              Password Protected
            </h2>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary, #6b7280)',
              margin: 0
            }}>
              Enter the password to access {resourceName}
            </p>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent>
            <div style={{ marginBottom: '1rem' }}>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="Enter password..."
                fullWidth={true}
                size="md"
                error={!!error}
                label="Password"
              />
            </div>

            {error && (
              <Card variant="outlined" padding="sm" style={{ 
                marginBottom: '1rem',
                borderColor: 'var(--error, #dc3545)',
                backgroundColor: 'rgba(220, 53, 69, 0.05)'
              }}>
                <CardContent>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--error, #dc3545)',
                    margin: 0,
                    fontFamily: 'Kalam, cursive'
                  }}>
                    ❌ {error}
                  </p>
                </CardContent>
              </Card>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
              size="md"
              fullWidth={true}
              style={{ marginBottom: '1rem' }}
            >
              {isLoading ? '🔍 Checking...' : '🔓 Unlock'}
            </Button>

            <div style={{ textAlign: 'center' }}>
              <Badge variant="info" size="sm">
                Demo passwords available
              </Badge>
            </div>
          </CardContent>
        </form>
        
        <CardFooter>
          <div style={{ 
            width: '100%', 
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted, #9ca3af)',
            fontFamily: 'monospace'
          }}>
            client-2: "demo123" • project-3: "admin456"
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}