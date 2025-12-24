import React from 'react';
import { tokens } from '@/lib/tokens';
import { Skeleton } from './Skeleton';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'primary';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  skeleton?: boolean;
  skeletonLines?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  fullWidth = false,
  clickable = false,
  onClick,
  className = '',
  style = {},
  skeleton = false,
  skeletonLines = 3,
}) => {
  // Generate random rotation for sketchy effect
  const rotation = React.useMemo(() => Math.random() * 0.5 - 0.25, []);

  const getCardStyles = () => {
    const paddings = {
      none: '0',
      sm: tokens.spacing.sm,
      md: tokens.spacing.md,
      lg: tokens.spacing.lg,
      xl: tokens.spacing.xl,
    };

    const variants = {
      default: {
        border: '2px solid var(--border-color, #e5e7eb)',
        background: 'var(--surface-color, #fafafa)',
      },
      outlined: {
        border: '2px solid var(--border-color, #e5e7eb)',
        background: 'transparent',
      },
      elevated: {
        border: '2px solid var(--border-color, #e5e7eb)',
        boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.1)',
        transform: `rotate(${rotation}deg)`,
      },
      primary: {
        border: '2px solid var(--accent, #007bff)',
        background: 'rgba(0, 123, 255, 0.05)',
      },
    };

    const baseStyles = {
      fontFamily: tokens.typography.fontFamily.sketch,
      position: 'relative' as const,
      display: 'block' as const,
      transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.ease}`,
      borderRadius: '255px 15px 225px 15px',
      padding: paddings[padding],
      width: fullWidth ? '100%' : 'auto',
      cursor: (clickable || onClick) ? 'pointer' : 'default',
      ...variants[variant],
      ...style,
    };

    return baseStyles;
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (clickable || onClick) {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = `translateY(-2px) rotate(${rotation + (Math.random() * 1 - 0.5)}deg)`;
      card.style.boxShadow = '6px 6px 0 rgba(0, 0, 0, 0.15)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (clickable || onClick) {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = variant === 'elevated' ? `rotate(${rotation}deg)` : 'rotate(0deg)';
      card.style.boxShadow = variant === 'elevated' ? '4px 4px 0 rgba(0, 0, 0, 0.1)' : 'none';
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (clickable || onClick) {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '2px 2px 0 rgba(0, 0, 0, 0.1)';
    }
  };

  return (
    <div
      style={getCardStyles()}
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    >
      {skeleton ? (
        <Skeleton variant="text" lines={skeletonLines} />
      ) : (
        children
      )}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string; skeleton?: boolean }> = ({ 
  children, 
  className = '',
  skeleton = false 
}) => {
  const headerStyles = {
    padding: tokens.spacing.md,
    borderBottom: '2px solid var(--border-color, #e5e7eb)',
    margin: `-${tokens.spacing.md} -${tokens.spacing.md} ${tokens.spacing.md}`,
    fontFamily: tokens.typography.fontFamily.sketch,
  };

  return (
    <div style={headerStyles} className={className}>
      {skeleton ? (
        <Skeleton variant="text" width="60%" height="1.5em" />
      ) : (
        children
      )}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string; skeleton?: boolean; skeletonLines?: number; style?: React.CSSProperties }> = ({ 
  children, 
  className = '',
  skeleton = false,
  skeletonLines = 3,
  style = {}
}) => {
  const contentStyles = {
    color: 'var(--text-primary, #1a1a1a)',
    lineHeight: tokens.typography.lineHeight.relaxed,
    ...style,
  };

  return (
    <div style={contentStyles} className={className}>
      {skeleton ? (
        <Skeleton variant="text" lines={skeletonLines} />
      ) : (
        children
      )}
    </div>
  );
};

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string; skeleton?: boolean }> = ({ 
  children, 
  className = '',
  skeleton = false 
}) => {
  const footerStyles = {
    padding: tokens.spacing.md,
    borderTop: '2px solid var(--border-color, #e5e7eb)',
    margin: `${tokens.spacing.md} -${tokens.spacing.md} -${tokens.spacing.md}`,
    display: 'flex' as const,
    gap: tokens.spacing.sm,
    justifyContent: 'flex-end' as const,
  };

  return (
    <div style={footerStyles} className={className}>
      {skeleton ? (
        <div style={{ display: 'flex', gap: tokens.spacing.sm }}>
          <Skeleton variant="rounded" width="80px" height="36px" />
          <Skeleton variant="rounded" width="80px" height="36px" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};