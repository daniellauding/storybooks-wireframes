import React from 'react';
import { tokens } from '@/lib/tokens';

export interface InputProps {
  value?: string;
  onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => void) | ((value: string) => void);
  onFocus?: () => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  name?: string;
  required?: boolean;
  autoComplete?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  onFocus,
  placeholder,
  type = 'text',
  size = 'md',
  fullWidth = false,
  disabled = false,
  error = false,
  label,
  helperText,
  className = '',
  style = {},
  id,
  name,
  required = false,
  autoComplete,
}) => {
  // Generate random rotation for sketchy effect
  const rotation = React.useMemo(() => Math.random() * 1 - 0.5, []);
  const borderRotation = React.useMemo(() => Math.random() * 1 - 0.5, []);

  const getInputStyles = () => {
    const baseStyles = {
      fontFamily: tokens.typography.fontFamily.sketch,
      background: 'var(--surface-color, #fafafa)',
      color: 'var(--text-primary, #1a1a1a)',
      border: '2px solid',
      borderColor: error ? 'var(--error, #dc3545)' : 'var(--border-color, #e5e7eb)',
      borderRadius: '255px 15px 225px 15px',
      transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.ease}`,
      outline: 'none',
      position: 'relative' as const,
      transform: `rotate(${rotation}deg)`,
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'text',
    };

    // Size styles
    const sizeStyles = {
      sm: {
        padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
        fontSize: tokens.typography.fontSize.sm,
      },
      md: {
        padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
        fontSize: tokens.typography.fontSize.base,
      },
      lg: {
        padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
        fontSize: tokens.typography.fontSize.lg,
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...style,
    };
  };

  const getLabelStyles = () => ({
    fontFamily: tokens.typography.fontFamily.sketch,
    fontSize: tokens.typography.fontSize.sm,
    color: 'var(--text-secondary, #6b7280)',
    fontWeight: tokens.typography.fontWeight.medium,
    marginBottom: tokens.spacing.xs,
    display: 'block' as const,
  });

  const getHelperTextStyles = () => ({
    fontSize: tokens.typography.fontSize.xs,
    color: error ? 'var(--error, #dc3545)' : 'var(--text-muted, #9ca3af)',
    fontFamily: tokens.typography.fontFamily.sketch,
    marginTop: tokens.spacing.xs,
    display: 'block' as const,
  });

  const getWrapperStyles = () => ({
    display: 'inline-flex' as const,
    flexDirection: 'column' as const,
    width: fullWidth ? '100%' : 'auto',
  });

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.style.borderColor = 'var(--accent, #007bff)';
    input.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
    input.style.transform = `rotate(${rotation + (Math.random() * 0.5 - 0.25)}deg)`;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    input.style.borderColor = error ? 'var(--error, #dc3545)' : 'var(--border-color, #e5e7eb)';
    input.style.boxShadow = 'none';
    input.style.transform = `rotate(${rotation}deg)`;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!disabled) {
      const input = e.currentTarget;
      input.style.borderColor = 'var(--accent, #007bff)';
      input.style.transform = `rotate(${rotation + (Math.random() * 0.5 - 0.25)}deg)`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!disabled) {
      const input = e.currentTarget;
      input.style.borderColor = error ? 'var(--error, #dc3545)' : 'var(--border-color, #e5e7eb)';
      input.style.transform = `rotate(${rotation}deg)`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      // Always call onChange with the event to ensure compatibility
      (onChange as (e: React.ChangeEvent<HTMLInputElement>) => void)(e);
    }
  };

  const inputElement = (
    <>
      <style jsx>{`
        input::before {
          content: '';
          position: absolute;
          inset: -2px;
          border: 2px solid currentColor;
          border-radius: 255px 15px 225px 15px;
          transform: rotate(${borderRotation}deg);
          pointer-events: none;
        }
        
        input::placeholder {
          color: var(--text-muted, #9ca3af);
          font-style: italic;
        }
      `}</style>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        style={getInputStyles()}
        className={className}
        onFocus={(e) => {
          handleFocus(e);
          onFocus?.();
        }}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </>
  );

  if (label || helperText) {
    return (
      <div style={getWrapperStyles()}>
        {label && (
          <label htmlFor={id} style={getLabelStyles()}>
            {label}
          </label>
        )}
        {inputElement}
        {helperText && (
          <span style={getHelperTextStyles()}>
            {helperText}
          </span>
        )}
      </div>
    );
  }

  return inputElement;
};