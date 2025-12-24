import React from 'react';
import { tokens } from '@/lib/tokens';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  outlined?: boolean;
  rounded?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  outlined = false,
  rounded = false,
  className = '',
  style = {},
}) => {
  // Generate random rotation for sketchy effect
  const rotation = React.useMemo(() => (Math.random() - 0.5) * 2, []);

  const getBadgeStyles = () => {
    const baseStyles = {
      display: 'inline-flex' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      fontFamily: tokens.typography.fontFamily.sketch,
      fontWeight: tokens.typography.fontWeight.medium,
      border: '2px solid',
      transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.ease}`,
      transform: `rotate(${rotation}deg)`,
    };

    // Size styles
    const sizeStyles = {
      sm: {
        padding: `2px ${tokens.spacing.xs}`,
        fontSize: tokens.typography.fontSize.xs,
        borderRadius: rounded ? '50px' : '8px 12px 8px 12px',
      },
      md: {
        padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
        fontSize: tokens.typography.fontSize.sm,
        borderRadius: rounded ? '50px' : '12px 16px 12px 16px',
      },
      lg: {
        padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
        fontSize: tokens.typography.fontSize.base,
        borderRadius: rounded ? '50px' : '16px 20px 16px 20px',
      },
    };

    // Variant styles
    const variants = {
      default: {
        bg: 'var(--surface-color, #fafafa)',
        color: 'var(--text-primary, #1a1a1a)',
        border: 'var(--border-color, #e5e7eb)',
      },
      primary: {
        bg: 'var(--accent, #007bff)',
        color: 'white',
        border: 'var(--accent, #007bff)',
      },
      success: {
        bg: 'var(--success, #28a745)',
        color: 'white',
        border: 'var(--success, #28a745)',
      },
      warning: {
        bg: 'var(--warning, #ffc107)',
        color: 'white',
        border: 'var(--warning, #ffc107)',
      },
      error: {
        bg: 'var(--error, #dc3545)',
        color: 'white',
        border: 'var(--error, #dc3545)',
      },
      info: {
        bg: 'var(--info, #17a2b8)',
        color: 'white',
        border: 'var(--info, #17a2b8)',
      },
    };

    const colors = variants[variant] || variants.default;
    const variantStyles = {
      backgroundColor: outlined ? 'transparent' : colors.bg,
      color: outlined ? colors.color : colors.color,
      borderColor: colors.border,
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles,
      ...style, // Allow style overrides
    };
  };

  return (
    <span style={getBadgeStyles()} className={className}>
      {children}
    </span>
  );
};