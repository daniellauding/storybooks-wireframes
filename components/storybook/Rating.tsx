'use client';

import React from 'react';

export interface RatingProps {
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  showValue?: boolean;
  color?: string;
  emptyColor?: string;
  style?: React.CSSProperties;
}

export const Rating: React.FC<RatingProps> = ({
  value = 0,
  max = 5,
  size = 'md',
  readonly = false,
  showValue = false,
  color = '#ffd700',
  emptyColor = '#e5e7eb',
  style,
}) => {
  const sizeMap = {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem'
  };

  const renderStars = () => {
    return Array.from({ length: max }, (_, index) => {
      const starIndex = index + 1;
      const isFilled = value >= starIndex;
      const rotation = Math.random() * 3 - 1.5;
      
      return (
        <span
          key={index}
          style={{
            fontSize: sizeMap[size],
            color: isFilled ? color : emptyColor,
            transform: `rotate(${rotation}deg)`,
            display: 'inline-block',
            cursor: readonly ? 'default' : 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontFamily: 'Kalam, cursive',
        ...style
      }}
    >
      {renderStars()}
      {showValue && (
        <span
          style={{
            marginLeft: '0.5rem',
            fontSize: sizeMap[size],
            color: 'var(--text-secondary, #6b7280)',
            fontWeight: '600'
          }}
        >
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};