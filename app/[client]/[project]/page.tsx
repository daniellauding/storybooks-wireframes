'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProject, getClient } from '@/lib/data';
import { checkAuthCookie } from '@/lib/auth';
import { Project, Client } from '@/types';
import PasswordProtection from '@/components/PasswordProtection';
import Link from 'next/link';
import { Header } from '@/components/storybook/Header';
import { Card, CardHeader, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Badge } from '@/components/storybook/Badge';
import { Spinner } from '@/components/storybook/Spinner';

export default function ProjectPage() {
  const params = useParams();
  const clientId = params.client as string;
  const projectId = params.project as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      const projectData = await getProject(projectId);
      setProject(projectData);
      
      if (projectData) {
        const clientData = await getClient(projectData.clientId);
        setClient(clientData);
        
        if (projectData.passwordProtected) {
          setIsAuthenticated(checkAuthCookie(projectId));
        } else {
          setIsAuthenticated(true);
        }
      }
      
      setIsLoading(false);
    }
    
    loadProject();
  }, [projectId]);

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
              Loading project...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!project) {
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
              🚫 Project Not Found
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

  if (project.passwordProtected && !isAuthenticated) {
    return (
      <PasswordProtection
        resourceId={projectId}
        resourceName={project.name}
        onAuthenticated={() => setIsAuthenticated(true)}
      />
    );
  }

  const navigation = [
    { id: 'home', label: 'Home', href: '/' },
    ...(client ? [{ id: 'client', label: client.name, href: `/${client.id}` }] : []),
    { id: 'project', label: project.name, href: `/${clientId}/${projectId}` },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      <Header 
        logo={`🏗️ ${project.name}`}
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
                🏗️ {project.name}
              </h1>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {project.passwordProtected && (
                  <Badge variant="warning" size="sm">
                    🔒 Protected
                  </Badge>
                )}
                <Badge variant="info" size="sm">
                  {client?.name}
                </Badge>
              </div>
            </div>
          </CardHeader>
          {project.description && (
            <CardContent>
              <p style={{ 
                color: 'var(--text-secondary, #6b7280)',
                fontSize: '1.125rem',
                margin: 0
              }}>
                {project.description}
              </p>
            </CardContent>
          )}
        </Card>

        <div style={{ 
          display: 'grid', 
          gap: '2rem', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
        }}>
          <div>
            <Card variant="outlined" padding="lg" style={{ marginBottom: '1rem' }}>
              <CardHeader>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: 'var(--text-primary, #1a1a1a)',
                  margin: 0,
                  fontFamily: 'Kalam, cursive'
                }}>
                  🌊 Flows ({project.flows.length})
                </h2>
              </CardHeader>
            </Card>
            
            {project.flows.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {project.flows.map((flow) => (
                  <Link key={flow.id} href={`/${clientId}/${projectId}/flows/${flow.id}`}>
                    <Card 
                      variant="elevated" 
                      padding="md" 
                      clickable={true}
                      fullWidth={true}
                    >
                      <CardContent>
                        <h3 style={{ 
                          fontWeight: 'bold', 
                          color: 'var(--text-primary, #1a1a1a)',
                          margin: '0 0 0.25rem 0',
                          fontFamily: 'Kalam, cursive'
                        }}>
                          🔄 {flow.name}
                        </h3>
                        {flow.description && (
                          <p style={{ 
                            fontSize: '0.875rem', 
                            color: 'var(--text-secondary, #6b7280)',
                            margin: 0
                          }}>
                            {flow.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
                <CardContent>
                  <p style={{ 
                    color: 'var(--text-muted, #9ca3af)',
                    fontFamily: 'Kalam, cursive',
                    margin: 0
                  }}>
                    📭 No flows defined yet
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card variant="outlined" padding="lg" style={{ marginBottom: '1rem' }}>
              <CardHeader>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: 'var(--text-primary, #1a1a1a)',
                  margin: 0,
                  fontFamily: 'Kalam, cursive'
                }}>
                  📄 Wireframes ({project.wireframes.length})
                </h2>
              </CardHeader>
            </Card>
            
            {project.wireframes.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {project.wireframes.map((wireframe) => (
                  <Card 
                    key={wireframe.id}
                    variant="default" 
                    padding="md"
                    fullWidth={true}
                  >
                    <CardContent>
                      <h3 style={{ 
                        fontWeight: 'bold', 
                        color: 'var(--text-primary, #1a1a1a)',
                        margin: '0 0 0.25rem 0',
                        fontFamily: 'Kalam, cursive'
                      }}>
                        🎨 {wireframe.name}
                      </h3>
                      {wireframe.description && (
                        <p style={{ 
                          fontSize: '0.875rem', 
                          color: 'var(--text-secondary, #6b7280)',
                          margin: '0 0 0.5rem 0'
                        }}>
                          {wireframe.description}
                        </p>
                      )}
                      {wireframe.variant && (
                        <Badge variant="info" size="sm">
                          Variant: {wireframe.variant}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
                <CardContent>
                  <p style={{ 
                    color: 'var(--text-muted, #9ca3af)',
                    fontFamily: 'Kalam, cursive',
                    margin: 0
                  }}>
                    📭 No wireframes yet
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}