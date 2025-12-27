'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/storybook/Header';
import { Card, CardHeader, CardContent } from '@/components/storybook/Card';
import { Badge } from '@/components/storybook/Badge';
import { Button } from '@/components/storybook/Button';
import { Input } from '@/components/storybook/Input';
import { Container } from '@/components/storybook/Container';
import { Toggle } from '@/components/storybook/Toggle';
import { loginWithEmailPassword, onAuthChange, logoutUser } from '@/lib/firebase';

// Simple password check for non-Firebase mode
const SIMPLE_PASSWORD = 'wireframe123';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [useFirebase, setUseFirebase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check simple auth from localStorage (persists across sessions)
    const simpleAuth = localStorage.getItem('wireframe_auth');
    if (simpleAuth === 'true') {
      setIsAuthenticated(true);
    }

    // Set up Firebase auth listener if Firebase is configured
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem('wireframe_auth', 'true');
      }
    });

    setMounted(true);
    return () => unsubscribe();
  }, []);

  const handleSimpleLogin = () => {
    if (password === SIMPLE_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('wireframe_auth', 'true');
      setShowError(false);
    } else {
      setShowError(true);
      setErrorMessage('Incorrect password');
    }
  };

  const handleFirebaseLogin = async () => {
    if (!email || !password) {
      setShowError(true);
      setErrorMessage('Please enter email and password');
      return;
    }

    setIsLoading(true);
    const result = await loginWithEmailPassword(email, password);
    
    if (result.success) {
      setIsAuthenticated(true);
      localStorage.setItem('wireframe_auth', 'true');
      setShowError(false);
    } else {
      setShowError(true);
      setErrorMessage(result.error || 'Login failed');
    }
    setIsLoading(false);
  };

  const handleLogin = () => {
    if (useFirebase) {
      handleFirebaseLogin();
    } else {
      handleSimpleLogin();
    }
  };

  const handleLogout = async () => {
    if (useFirebase) {
      await logoutUser();
    }
    localStorage.removeItem('wireframe_auth');
    setIsAuthenticated(false);
    setPassword('');
    setEmail('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const navigation = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'clients', label: 'Clients', href: '#clients' },
  ];

  // Password login screen
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
        <Container maxWidth="sm" style={{ 
          paddingTop: '8rem',
          paddingBottom: '4rem'
        }}>
          <Card 
            variant="elevated" 
            padding="xl"
            style={{
              transform: mounted ? `rotate(${Math.random() * 0.5 - 0.25}deg)` : 'none',
              transition: 'transform 0.3s ease'
            }}
          >
            <CardContent>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  transform: mounted ? `rotate(${Math.random() * 5 - 2.5}deg)` : 'none'
                }}>
                  🔐
                </div>
                
                <h1 style={{
                  fontFamily: 'Kalam, cursive',
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'var(--text-primary, #1a1a1a)',
                  margin: '0 0 0.5rem 0',
                  transform: mounted ? `rotate(${Math.random() * 0.5 - 0.25}deg)` : 'none'
                }}>
                  Wireframe Storybook
                </h1>
                
                <p style={{
                  fontSize: '1rem',
                  color: 'var(--text-secondary, #6b7280)',
                  marginBottom: '2rem'
                }}>
                  Enter credentials to access wireframe library
                </p>

                {/* Auth mode toggle */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginBottom: '2rem',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(0, 123, 255, 0.05)',
                  borderRadius: '8px',
                  border: '1px dashed var(--accent, #007bff)'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary, #6b7280)',
                    fontFamily: 'Kalam, cursive'
                  }}>
                    Simple Password
                  </span>
                  <Toggle
                    checked={useFirebase}
                    onChange={setUseFirebase}
                    size="sm"
                  />
                  <span style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary, #6b7280)',
                    fontFamily: 'Kalam, cursive'
                  }}>
                    Firebase Auth
                  </span>
                </div>

                {/* Login form */}
                <div style={{ marginBottom: '1rem' }}>
                  {useFirebase && (
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      fullWidth
                      error={showError}
                      style={{ marginBottom: '0.75rem' }}
                    />
                  )}
                  
                  <Input
                    type="password"
                    placeholder={useFirebase ? "Password" : "Enter password (wireframe123)"}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    fullWidth
                    error={showError}
                  />
                  
                  {showError && (
                    <p style={{
                      color: 'var(--error, #dc3545)',
                      fontSize: '0.875rem',
                      marginTop: '0.5rem',
                      fontFamily: 'Kalam, cursive'
                    }}>
                      ❌ {errorMessage}
                    </p>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? '⏳ Loading...' : '🔓 Unlock'}
                </Button>

                {/* Info boxes */}
                <div style={{
                  marginTop: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div style={{
                    padding: '0.75rem',
                    backgroundColor: 'rgba(0, 123, 255, 0.05)',
                    borderRadius: '8px',
                    border: '1px dashed var(--accent, #007bff)',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary, #6b7280)'
                  }}>
                    💡 Direct links to projects bypass password protection
                  </div>
                  
                  {useFirebase && (
                    <div style={{
                      padding: '0.75rem',
                      backgroundColor: 'rgba(255, 193, 7, 0.05)',
                      borderRadius: '8px',
                      border: '1px dashed var(--warning, #ffc107)',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary, #6b7280)'
                    }}>
                      🔥 Firebase: Configure in .env.local (see .env.local.example)
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }

  // Main clients listing (after authentication)
  const clients = [
    {
      id: 'stadkjakten',
      name: 'Städkjakten',
      description: 'Swedish cleaning service platform',
      projectCount: 1,
      lastUpdated: '12/26/2024',
      icon: '🧹',
      locked: false
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo="🧩 Wireframe Storybook"
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
            🎨 WIREFRAME LIBRARY
          </Badge>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'var(--text-primary, #1a1a1a)',
            fontFamily: 'Kalam, cursive',
            margin: '0 0 1rem 0',
            transform: mounted ? `rotate(${Math.random() * 0.5 - 0.25}deg)` : 'none'
          }}>
            Client Projects
          </h1>
          
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary, #6b7280)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Select a client to view their wireframe projects
          </p>

          <div style={{ 
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              🔒 Lock Session
            </Button>
          </div>
        </Container>
      </div>
      
      <Container maxWidth="xl" style={{ padding: '3rem 1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {clients.map((client, index) => {
            const rotation = mounted ? (Math.sin(index) * 2) : 0;
            return (
              <Link 
                key={client.id} 
                href={`/clients/${client.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card 
                  variant="elevated"
                  padding="lg"
                  clickable={!client.locked}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: 'all 0.3s ease',
                    height: '100%',
                    opacity: client.locked ? 0.6 : 1,
                    cursor: client.locked ? 'not-allowed' : 'pointer'
                  }}
                >
                  <CardHeader>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{
                        fontSize: '2.5rem',
                        transform: `rotate(${Math.random() * 10 - 5}deg)`
                      }}>
                        {client.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: '600',
                          color: 'var(--text-primary, #1a1a1a)',
                          fontFamily: 'Kalam, cursive',
                          margin: 0
                        }}>
                          {client.name}
                        </h3>
                        <p style={{
                          fontSize: '0.875rem',
                          color: 'var(--text-secondary, #6b7280)',
                          margin: '0.25rem 0 0 0'
                        }}>
                          {client.description}
                        </p>
                      </div>
                      {client.locked && (
                        <span style={{ fontSize: '1.5rem' }}>🔒</span>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px dashed var(--border-color, #e5e7eb)'
                    }}>
                      <Badge variant="default" size="sm">
                        📊 {client.projectCount} project{client.projectCount !== 1 ? 's' : ''}
                      </Badge>
                      <Badge variant="info" size="sm">
                        🕒 {client.lastUpdated}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        
        {clients.length === 0 && (
          <Card variant="default" padding="xl" style={{ textAlign: 'center' }}>
            <CardContent>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                opacity: 0.5
              }}>
                📁
              </div>
              <p style={{
                fontSize: '1.125rem',
                color: 'var(--text-muted, #9ca3af)',
                fontFamily: 'Kalam, cursive'
              }}>
                No clients available
              </p>
            </CardContent>
          </Card>
        )}
      </Container>
    </div>
  );
}