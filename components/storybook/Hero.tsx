import React from 'react';
import { tokens } from '@/lib/tokens';
import { Container } from './Container';
import { Button } from './Button';
import { Skeleton } from './Skeleton';

export interface HeroProps {
  variant?: 'default' | 'centered' | 'split' | 'minimal' | 'product';
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  image?: string;
  showChart?: boolean;
  backgroundPattern?: boolean;
  skeleton?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  variant = 'default',
  title,
  subtitle,
  description,
  badge,
  primaryAction,
  secondaryAction,
  image,
  showChart = false,
  backgroundPattern = false,
  skeleton = false,
}) => {
  // Generate random rotations for sketchy effect
  const containerRotation = React.useMemo(() => (Math.random() - 0.5) * 0.2, []);
  const titleRotation = React.useMemo(() => (Math.random() - 0.5) * 1, []);
  const subtitleRotation = React.useMemo(() => (Math.random() - 0.5) * 0.5, []);
  const badgeRotation = React.useMemo(() => (Math.random() - 0.5) * 2, []);

  const getContainerStyles = () => ({
    minHeight: variant === 'minimal' ? '300px' : '500px',
    background: 'var(--surface-color, #fafafa)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    borderBottom: '2px solid var(--border-color, #e5e7eb)',
    transform: `rotate(${containerRotation}deg)`,
  });

  const getContentStyles = () => {
    const baseStyles = {
      position: 'relative' as const,
      zIndex: 2,
      display: 'flex' as const,
      alignItems: 'center' as const,
      minHeight: 'inherit' as const,
      padding: `${tokens.spacing['3xl']} 0`,
    };

    if (variant === 'centered') {
      return {
        ...baseStyles,
        textAlign: 'center' as const,
        justifyContent: 'center' as const,
      };
    }
    if (variant === 'split') {
      return {
        ...baseStyles,
        display: 'grid' as const,
        gridTemplateColumns: '1fr 1fr',
        gap: tokens.spacing['2xl'],
        alignItems: 'center' as const,
      };
    }
    return {
      ...baseStyles,
      maxWidth: '800px',
    };
  };

  const getTitleStyles = () => {
    const baseSize = variant === 'minimal' 
      ? tokens.typography.fontSize['2xl'] 
      : tokens.typography.fontSize['4xl'];
    
    return {
      fontFamily: tokens.typography.fontFamily.sketch,
      color: 'var(--text-primary, #1a1a1a)',
      margin: `0 0 ${tokens.spacing.md} 0`,
      lineHeight: tokens.typography.lineHeight.tight,
      transform: `rotate(${titleRotation}deg)`,
      fontSize: baseSize,
      fontWeight: tokens.typography.fontWeight.bold,
    };
  };

  const getSubtitleStyles = () => ({
    fontFamily: tokens.typography.fontFamily.sketch,
    fontSize: tokens.typography.fontSize.xl,
    color: 'var(--accent, #007bff)',
    margin: `0 0 ${tokens.spacing.sm} 0`,
    fontWeight: tokens.typography.fontWeight.medium,
    transform: `rotate(${subtitleRotation}deg)`,
  });

  const getDescriptionStyles = () => ({
    fontSize: tokens.typography.fontSize.lg,
    color: 'var(--text-secondary, #6b7280)',
    margin: `0 0 ${tokens.spacing.xl} 0`,
    lineHeight: tokens.typography.lineHeight.relaxed,
    maxWidth: '600px',
  });

  const getBadgeStyles = () => ({
    display: 'inline-block' as const,
    background: 'var(--accent, #007bff)',
    color: 'white',
    padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
    marginBottom: tokens.spacing.md,
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.medium,
    border: '2px solid var(--accent, #007bff)',
    borderRadius: '20px 8px 18px 10px',
    transform: `rotate(${badgeRotation}deg)`,
    fontFamily: tokens.typography.fontFamily.sketch,
  });

  const getActionButtonsStyles = () => ({
    display: 'flex' as const,
    gap: tokens.spacing.md,
    justifyContent: variant === 'centered' ? 'center' as const : 'flex-start' as const,
    flexWrap: 'wrap' as const,
  });

  const renderVisual = () => {
    if (showChart) {
      return (
        <div
          style={{
            width: '400px',
            height: '300px',
            border: '3px solid var(--border-color, #e5e7eb)',
            borderRadius: '20px 12px 20px 12px',
            background: 'var(--bg-color, #f0f0f0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted, #9ca3af)',
            fontFamily: tokens.typography.fontFamily.sketch,
            transform: `rotate(${(Math.random() - 0.5) * 3}deg)`,
            fontSize: tokens.typography.fontSize.lg,
          }}
        >
          📊 Chart Preview
        </div>
      );
    }
    
    if (image || variant === 'product' || variant === 'split') {
      return (
        <div
          style={{
            width: '400px',
            height: '300px',
            border: '3px solid var(--border-color, #e5e7eb)',
            borderRadius: '20px 12px 20px 12px',
            background: image ? `url(${image}) center/cover` : 'var(--bg-color, #f0f0f0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted, #9ca3af)',
            fontFamily: tokens.typography.fontFamily.sketch,
            transform: `rotate(${(Math.random() - 0.5) * 3}deg)`,
            fontSize: tokens.typography.fontSize.lg,
          }}
        >
          {!image && '📱 App Preview'}
        </div>
      );
    }
    
    return null;
  };

  const renderContent = () => (
    <>
      <div style={variant === 'split' ? {} : {}}>
        {badge && (
          <span style={getBadgeStyles()}>
            {badge}
          </span>
        )}
        
        {skeleton ? (
          <>
            <Skeleton variant="text" width="200px" height="1.5rem" style={{ margin: '0 auto 1rem' }} />
            <Skeleton variant="text" width="80%" height="3rem" style={{ margin: '0 auto 1rem' }} />
            <Skeleton variant="text" lines={2} width="70%" style={{ margin: '0 auto' }} />
          </>
        ) : (
          <>
            {subtitle && <h2 style={getSubtitleStyles()}>{subtitle}</h2>}
            <h1 style={getTitleStyles()}>{title}</h1>
            {description && (
              <p style={getDescriptionStyles()}>{description}</p>
            )}
          </>
        )}
        
        <div style={getActionButtonsStyles()}>
          {skeleton ? (
            <>
              <Skeleton variant="rounded" width="120px" height="48px" />
              <Skeleton variant="rounded" width="120px" height="48px" />
            </>
          ) : (
            <>
              {primaryAction && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.label}
                </Button>
              )}
              
              {secondaryAction && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      
      {(variant === 'split' || showChart || image) && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {renderVisual()}
        </div>
      )}
    </>
  );

  return (
    <section style={getContainerStyles()}>
      {/* Background pattern */}
      {backgroundPattern && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 20%, var(--accent, #007bff) 2px, transparent 2px),
              radial-gradient(circle at 60% 80%, var(--border-color, #e5e7eb) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px, 30px 30px',
            opacity: 0.1,
            zIndex: 1,
          }}
        />
      )}

      {/* Sketchy underline effect */}
      <div
        style={{
          position: 'absolute',
          bottom: '-3px',
          left: '10%',
          right: '15%',
          height: '2px',
          background: 'var(--border-color, #e5e7eb)',
          opacity: 0.3,
          transform: `rotate(${(Math.random() - 0.5) * 0.5}deg)`,
        }}
      />

      <Container maxWidth="xl">
        <div style={getContentStyles()}>
          {variant === 'centered' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: tokens.spacing.xl }}>
              {renderContent()}
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </Container>
    </section>
  );
};