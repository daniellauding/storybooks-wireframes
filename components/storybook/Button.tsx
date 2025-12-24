import React from 'react';
import { tokens } from '@/lib/tokens';

export interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  iconOnly?: boolean;
  icon?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  iconOnly = false,
  icon,
  style = {},
  className = '',
}) => {
  // Generate random rotation for sketchy effect
  const rotation = React.useMemo(() => Math.random() * 2 - 1, []);
  const borderRotation = React.useMemo(() => Math.random() * 2 - 1, []);

  const getButtonStyles = () => {
    const baseStyles = {
      fontFamily: tokens.typography.fontFamily.sketch,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.ease}`,
      position: 'relative' as const,
      display: 'inline-flex' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      fontWeight: tokens.typography.fontWeight.medium,
      gap: tokens.spacing.xs,
      border: '2px solid',
      borderRadius: '255px 15px 225px 15px',
      transform: `rotate(${rotation}deg)`,
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.5 : 1,
    };

    // Size styles
    const sizeStyles = iconOnly ? {
      sm: { padding: tokens.spacing.xs, width: '32px', height: '32px', minWidth: '32px' },
      md: { padding: tokens.spacing.sm, width: '40px', height: '40px', minWidth: '40px' },
      lg: { padding: tokens.spacing.md, width: '48px', height: '48px', minWidth: '48px' },
    } : {
      sm: { 
        padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`, 
        fontSize: tokens.typography.fontSize.sm 
      },
      md: { 
        padding: `${tokens.spacing.sm} ${tokens.spacing.md}`, 
        fontSize: tokens.typography.fontSize.base 
      },
      lg: { 
        padding: `${tokens.spacing.md} ${tokens.spacing.lg}`, 
        fontSize: tokens.typography.fontSize.lg 
      },
    };

    // Variant styles
    const variantStyles = {
      primary: {
        backgroundColor: 'var(--accent, #007bff)',
        color: 'white',
        borderColor: 'var(--accent, #007bff)',
      },
      secondary: {
        backgroundColor: 'transparent',
        color: 'var(--text-primary, #1a1a1a)',
        borderColor: 'var(--border-color, #e5e7eb)',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--text-secondary, #6b7280)',
        borderColor: 'transparent',
      },
      danger: {
        backgroundColor: 'var(--error, #dc3545)',
        color: 'white',
        borderColor: 'var(--error, #dc3545)',
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...style, // Allow style overrides
    };
  };

  const getBorderStyles = () => ({
    content: '""',
    position: 'absolute' as const,
    inset: '-2px',
    border: '2px solid currentColor',
    borderRadius: '255px 15px 225px 15px',
    transform: `rotate(${borderRotation}deg)`,
    pointerEvents: 'none' as const,
  });

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!disabled) {
      const button = e.currentTarget as HTMLElement;
      if (variant === 'primary' || variant === 'danger') {
        button.style.transform = `translateY(-2px) rotate(${rotation + (Math.random() * 2 - 1)}deg)`;
        button.style.boxShadow = '4px 4px 0 rgba(0, 0, 0, 0.1)';
      } else {
        button.style.transform = `translateY(-1px) rotate(${rotation + (Math.random() * 1 - 0.5)}deg)`;
        if (variant === 'secondary') {
          button.style.backgroundColor = 'var(--surface-color, #fafafa)';
        } else if (variant === 'ghost') {
          button.style.color = 'var(--accent, #007bff)';
          button.style.backgroundColor = 'rgba(51, 102, 255, 0.05)';
        }
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!disabled) {
      const button = e.currentTarget as HTMLElement;
      button.style.transform = `rotate(${rotation}deg)`;
      button.style.boxShadow = 'none';
      button.style.backgroundColor = '';
      if (variant === 'ghost') {
        button.style.color = 'var(--text-secondary, #6b7280)';
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!disabled) {
      const button = e.currentTarget as HTMLElement;
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = 'none';
    }
  };

  return (
    <button
      style={getButtonStyles()}
      className={className}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      type={type}
    >
      <style jsx>{`
        button::before {
          content: '';
          position: absolute;
          inset: -2px;
          border: 2px solid currentColor;
          border-radius: 255px 15px 225px 15px;
          transform: rotate(${borderRotation}deg);
          pointer-events: none;
        }
      `}</style>
      
      {icon && <span style={{ fontSize: size === 'lg' ? tokens.typography.fontSize.base : tokens.typography.fontSize.sm }}>🔧</span>}
      {!iconOnly && children}
    </button>
  );
};