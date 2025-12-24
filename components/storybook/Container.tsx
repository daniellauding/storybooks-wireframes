import React from 'react';
import { tokens } from '@/lib/tokens';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  centered = true,
  padding = 'md',
  style,
}) => {
  const getContainerStyles = () => {
    const widths = {
      sm: tokens.breakpoints.sm,
      md: tokens.breakpoints.md,
      lg: tokens.breakpoints.lg,
      xl: tokens.breakpoints.xl,
      full: '100%',
    };

    const paddings = {
      none: '0',
      sm: tokens.spacing.sm,
      md: tokens.spacing.md,
      lg: tokens.spacing.lg,
    };

    return {
      width: '100%',
      maxWidth: widths[maxWidth],
      margin: centered ? '0 auto' : '0',
      padding: paddings[padding],
      position: 'relative' as const,
      ...style,
    };
  };

  return (
    <div style={getContainerStyles()}>
      {children}
    </div>
  );
};