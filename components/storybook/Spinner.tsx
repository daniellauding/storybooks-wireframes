import React from 'react';
import { tokens } from '@/lib/tokens';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circular' | 'dots' | 'pulse';
  color?: 'primary' | 'secondary' | 'current';
  speed?: 'slow' | 'normal' | 'fast';
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'circular',
  color = 'primary',
  speed = 'normal',
  label,
  className = '',
  style = {},
}) => {
  // Generate random rotation for sketchy effect
  const rotation = React.useMemo(() => Math.random() * 5 - 2.5, []);

  const getSizeStyles = () => {
    const sizes = {
      sm: { width: '16px', height: '16px' },
      md: { width: '24px', height: '24px' },
      lg: { width: '48px', height: '48px' },
    };
    return sizes[size];
  };

  const getColorStyles = () => {
    const colors = {
      primary: 'var(--accent, #007bff)',
      secondary: 'var(--text-secondary, #6b7280)',
      current: 'currentColor',
    };
    return colors[color];
  };

  const getAnimationDuration = () => {
    const speeds = {
      slow: '2s',
      normal: '1s',
      fast: '0.5s',
    };
    return speeds[speed];
  };

  const baseStyles = {
    display: 'inline-flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    transform: `rotate(${rotation}deg)`,
    fontFamily: tokens.typography.fontFamily.sketch,
    ...getSizeStyles(),
    ...style,
  };

  const renderCircular = () => (
    <div style={baseStyles} className={className}>
      <style jsx>{`
        .circular-spinner {
          width: 100%;
          height: 100%;
          border: 2px solid transparent;
          border-top-color: ${getColorStyles()};
          border-radius: 50%;
          animation: spin ${getAnimationDuration()} linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div className="circular-spinner" />
    </div>
  );

  const renderDots = () => (
    <div style={baseStyles} className={className}>
      <style jsx>{`
        .dots-container {
          display: flex;
          gap: 0.125rem;
          align-items: center;
        }
        
        .dot {
          width: 0.25em;
          height: 0.25em;
          border-radius: 50%;
          background: ${getColorStyles()};
          animation: bounce ${getAnimationDuration()} infinite;
        }
        
        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes bounce {
          0%, 20% { transform: scale(1); }
          50% { transform: scale(1.5); }
          80%, 100% { transform: scale(1); }
        }
      `}</style>
      <div className="dots-container">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </div>
  );

  const renderPulse = () => (
    <div style={baseStyles} className={className}>
      <style jsx>{`
        .pulse-spinner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: ${getColorStyles()};
          animation: pulse ${getAnimationDuration()} infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
      <div className="pulse-spinner" />
    </div>
  );

  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      default:
        return renderCircular();
    }
  };

  const spinner = renderSpinner();

  if (label) {
    return (
      <div style={{ 
        display: 'inline-flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '0.5rem' 
      }}>
        {spinner}
        <span style={{ 
          fontSize: tokens.typography.fontSize.sm, 
          color: 'var(--text-secondary, #6b7280)',
          textAlign: 'center',
          transform: `rotate(${Math.random() * 1 - 0.5}deg)`
        }}>
          {label}
        </span>
      </div>
    );
  }

  return spinner;
};