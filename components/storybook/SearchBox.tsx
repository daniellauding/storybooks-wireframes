import React, { useState } from 'react';
import { tokens } from '@/lib/tokens';

export interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  loading?: boolean;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  suggestions?: string[];
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Search...',
  value: controlledValue,
  onSearch,
  onClear,
  loading = false,
  fullWidth = false,
  size = 'md',
  suggestions = [],
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Generate random rotation for sketchy effect
  const inputRotation = React.useMemo(() => Math.random() * 1 - 0.5, []);
  const buttonRotation = React.useMemo(() => Math.random() * 2 - 1, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    if (onClear) {
      onClear();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getContainerStyles = () => ({
    position: 'relative' as const,
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-flex' as const,
    alignItems: 'stretch' as const,
  });

  const getInputStyles = () => {
    const sizeStyles = {
      sm: { padding: `${tokens.spacing.xs} ${tokens.spacing.xl}`, fontSize: tokens.typography.fontSize.sm },
      md: { padding: `${tokens.spacing.sm} ${tokens.spacing.xl}`, fontSize: tokens.typography.fontSize.base },
      lg: { padding: `${tokens.spacing.md} ${tokens.spacing.xl}`, fontSize: tokens.typography.fontSize.lg },
    };

    return {
      width: '100%',
      border: '2px solid var(--border-color, #e5e7eb)',
      borderRadius: '255px 15px 255px 15px',
      background: 'var(--surface-color, #fafafa)',
      color: 'var(--text-primary, #1a1a1a)',
      fontFamily: tokens.typography.fontFamily.sketch,
      transform: `rotate(${inputRotation}deg)`,
      outline: 'none',
      transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.ease}`,
      ...sizeStyles[size],
    };
  };

  const getButtonStyles = () => ({
    position: 'absolute' as const,
    right: '4px',
    top: '50%',
    transform: `translateY(-50%) rotate(${buttonRotation}deg)`,
    padding: '6px',
    minWidth: 'auto',
    background: 'var(--accent, #007bff)',
    color: 'white',
    border: '2px solid var(--accent, #007bff)',
    borderRadius: '50% 40% 55% 45%',
    cursor: 'pointer',
    zIndex: 1,
    fontFamily: tokens.typography.fontFamily.sketch,
  });

  const getSuggestionsStyles = () => ({
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    right: 0,
    background: 'var(--surface-color, #fafafa)',
    border: '2px solid var(--border-color, #e5e7eb)',
    borderRadius: '15px 10px 12px 8px',
    marginTop: tokens.spacing.xs,
    zIndex: 10,
    boxShadow: tokens.shadows.sketch.md,
    transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`,
  });

  return (
    <div style={getContainerStyles()}>
      <input
        style={getInputStyles()}
        value={value}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder={placeholder}
      />
      
      {loading ? (
        <div
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '16px',
            height: '16px',
            border: '2px solid var(--border-color, #e5e7eb)',
            borderTop: '2px solid var(--accent, #007bff)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
      ) : (
        <>
          {value && (
            <button
              style={{
                ...getButtonStyles(),
                right: '36px',
                background: 'transparent',
                border: '2px solid var(--border-color, #e5e7eb)',
                color: 'var(--text-secondary, #6b7280)',
              }}
              onClick={handleClear}
            >
              ✕
            </button>
          )}
          <button
            style={getButtonStyles()}
            onClick={handleSearch}
          >
            🔍
          </button>
        </>
      )}

      {showSuggestions && suggestions.length > 0 && (
        <div style={getSuggestionsStyles()}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              style={{
                width: '100%',
                textAlign: 'left' as const,
                padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
                background: 'transparent',
                border: 'none',
                borderBottom: index < suggestions.length - 1 ? '1px solid var(--border-color, #e5e7eb)' : 'none',
                cursor: 'pointer',
                fontFamily: tokens.typography.fontFamily.sketch,
                color: 'var(--text-primary, #1a1a1a)',
                transform: `rotate(${Math.random() * 0.2 - 0.1}deg)`,
              }}
              onClick={() => {
                if (controlledValue === undefined) {
                  setInternalValue(suggestion);
                }
                setShowSuggestions(false);
                if (onSearch) onSearch(suggestion);
              }}
              onMouseEnter={(e) => {
                const button = e.currentTarget;
                button.style.background = 'var(--bg-color, #f0f0f0)';
              }}
              onMouseLeave={(e) => {
                const button = e.currentTarget;
                button.style.background = 'transparent';
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};