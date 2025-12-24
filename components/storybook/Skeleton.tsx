import React from 'react';
import { tokens } from '@/lib/tokens';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animation?: 'pulse' | 'wave' | 'none';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  lines = 1,
  animation = 'wave',
  speed = 'normal',
  className,
  children,
  style
}) => {
  const rotation = React.useMemo(() => Math.random() * 0.5 - 0.25, []);
  
  const getSkeletonStyles = () => {
    const baseStyles: React.CSSProperties = {
      background: 'var(--border-color, #e5e7eb)',
      position: 'relative',
      overflow: 'hidden',
      transform: `rotate(${rotation}deg)`,
      animation: animation === 'pulse' ? `pulse ${speed === 'slow' ? '2s' : speed === 'fast' ? '0.8s' : '1.5s'} infinite` : undefined,
    };

    switch (variant) {
      case 'circular':
        return {
          ...baseStyles,
          borderRadius: '50%',
          width: typeof width === 'number' ? `${width}px` : width || '40px',
          height: typeof height === 'number' ? `${height}px` : height || '40px',
          ...style,
        };
      case 'rounded':
        return {
          ...baseStyles,
          borderRadius: '8px',
          width: typeof width === 'number' ? `${width}px` : width || '100%',
          height: typeof height === 'number' ? `${height}px` : height || '1em',
          ...style,
        };
      case 'rectangular':
        return {
          ...baseStyles,
          borderRadius: '4px',
          width: typeof width === 'number' ? `${width}px` : width || '100%',
          height: typeof height === 'number' ? `${height}px` : height || '60px',
          ...style,
        };
      default: // text
        return {
          ...baseStyles,
          borderRadius: '4px',
          width: typeof width === 'number' ? `${width}px` : width || '100%',
          height: typeof height === 'number' ? `${height}px` : height || '1em',
          ...style,
        };
    }
  };

  if (children) {
    return (
      <div
        className={className}
        style={{ ...getSkeletonStyles(), background: 'transparent', ...style }}
      >
        {children}
      </div>
    );
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', ...style }} className={className}>
        {Array.from({ length: lines }, (_, index) => (
          <div
            key={index}
            style={{
              ...getSkeletonStyles(),
              width: index === lines - 1 ? '75%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      style={{ ...getSkeletonStyles() }}
      className={className}
    />
  );
};