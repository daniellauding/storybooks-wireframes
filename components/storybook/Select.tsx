'use client';

import React, { useState } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  placeholder = 'Välj alternativ...',
  onChange,
  disabled = false,
  fullWidth = false,
  size = 'md',
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotation = Math.random() * 1 - 0.5;

  const sizeMap = {
    sm: {
      padding: '0.5rem 0.75rem',
      fontSize: '0.875rem',
    },
    md: {
      padding: '0.75rem 1rem',
      fontSize: '1rem',
    },
    lg: {
      padding: '1rem 1.25rem',
      fontSize: '1.125rem',
    }
  };

  const selectedOption = options.find(option => option.value === value);

  const handleOptionClick = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div style={{
      position: 'relative',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'Kalam, cursive',
      ...style
    }}>
      {/* Main Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        style={{
          width: '100%',
          background: 'white',
          border: '2px solid var(--border-color, #e5e7eb)',
          borderRadius: '12px 8px 12px 8px',
          ...sizeMap[size],
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontFamily: 'Kalam, cursive',
          color: selectedOption ? 'var(--text-primary, #1a1a1a)' : 'var(--text-secondary, #6b7280)',
          opacity: disabled ? 0.5 : 1,
          transform: `rotate(${rotation}deg)`,
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = `rotate(${rotation + 0.5}deg) scale(1.02)`;
            e.currentTarget.style.borderColor = 'var(--accent, #007bff)';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`;
            e.currentTarget.style.borderColor = 'var(--border-color, #e5e7eb)';
          }
        }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span style={{
          transform: `rotate(${isOpen ? 180 : 0}deg)`,
          transition: 'transform 0.2s ease',
          fontSize: '0.875rem'
        }}>
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 50,
          marginTop: '0.25rem',
          background: 'white',
          border: '2px solid var(--border-color, #e5e7eb)',
          borderRadius: '12px 8px 12px 8px',
          boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.1)',
          transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`,
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                textAlign: 'left',
                border: 'none',
                background: value === option.value ? 'var(--accent, #007bff)' : 'transparent',
                color: value === option.value ? 'white' : 'var(--text-primary, #1a1a1a)',
                cursor: 'pointer',
                fontFamily: 'Kalam, cursive',
                fontSize: sizeMap[size].fontSize,
                borderBottom: index < options.length - 1 ? '1px dashed var(--border-color, #e5e7eb)' : 'none',
                borderRadius: index === 0 ? '12px 8px 0 0' : index === options.length - 1 ? '0 0 12px 8px' : '0',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (value !== option.value) {
                  e.currentTarget.style.background = 'var(--surface-color, #fafafa)';
                }
              }}
              onMouseLeave={(e) => {
                if (value !== option.value) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};