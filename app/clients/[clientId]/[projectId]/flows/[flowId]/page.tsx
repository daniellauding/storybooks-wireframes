'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFlow, getProject, getClient } from '@/lib/data';
import { Flow, Project, Client } from '@/types';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Header } from '@/components/storybook/Header';
import { Card, CardHeader, CardContent } from '@/components/storybook/Card';
import { Button } from '@/components/storybook/Button';
import { Badge } from '@/components/storybook/Badge';
import { Spinner } from '@/components/storybook/Spinner';

// Dynamic import for wireframe components
const BookingStartWireframe = dynamic(
  () => import('@/components/wireframes/BookingStartWireframe'),
  { ssr: false }
);

export default function FlowPage() {
  const params = useParams();
  const clientId = params.clientId as string;
  const projectId = params.projectId as string;
  const flowId = params.flowId as string;
  
  const [flow, setFlow] = useState<Flow | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFlow() {
      const flowData = await getFlow(flowId);
      setFlow(flowData);
      
      if (flowData) {
        const projectData = await getProject(flowData.projectId);
        setProject(projectData);
        
        if (projectData) {
          const clientData = await getClient(projectData.clientId);
          setClient(clientData);
        }
      }
      
      setIsLoading(false);
    }
    
    loadFlow();
  }, [flowId]);

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
              Loading flow...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!flow) {
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
              🚫 Flow Not Found
            </h2>
            <Link href={`/clients/${clientId}/${projectId}`}>
              <Button variant="secondary" size="md" style={{ marginRight: '0.5rem' }}>
                ← Back to Project
              </Button>
            </Link>
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

  // Render specific wireframe based on flow ID
  const renderWireframe = () => {
    switch (flowId) {
      case 'booking-start':
        return <BookingStartWireframe />;
      default:
        return (
          <Card variant="outlined" padding="lg" style={{ textAlign: 'center' }}>
            <CardContent>
              <p style={{ 
                color: 'var(--text-muted, #9ca3af)',
                fontFamily: 'Kalam, cursive',
                fontSize: '1.125rem',
                margin: '0 0 0.5rem 0'
              }}>
                🔨 Wireframe not implemented yet
              </p>
              <Badge variant="info" size="sm">
                Flow ID: {flowId}
              </Badge>
            </CardContent>
          </Card>
        );
    };
  };

  const navigation = [
    { id: 'home', label: 'Home', href: '/' },
    ...(client ? [{ id: 'client', label: client.name, href: `/clients/${clientId}` }] : []),
    ...(project ? [{ id: 'project', label: project.name, href: `/clients/${clientId}/${projectId}` }] : []),
    { id: 'flow', label: flow.name, href: `/clients/${clientId}/${projectId}/flows/${flowId}` },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color, #f0f0f0)' }}>
      {renderWireframe()}
    </div>
  );
}