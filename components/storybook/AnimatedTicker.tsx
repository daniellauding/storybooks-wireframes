'use client';

import React from 'react';

export interface TickerItem {
  id: string;
  icon: string;
  text: string;
  color?: string;
}

export interface AnimatedTickerProps {
  items: TickerItem[];
  speed?: number;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

export const AnimatedTicker: React.FC<AnimatedTickerProps> = ({
  items,
  speed = 50,
  backgroundColor = '#f8f9fa',
  style,
}) => {
  return (
    <div style={{
      backgroundColor,
      borderBottom: '1px solid var(--border-color, #e5e7eb)',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      position: 'relative',
      padding: '0.5rem 0',
      fontFamily: 'Kalam, cursive',
      ...style
    }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3rem',
          animation: `scroll ${speed}s linear infinite`,
          willChange: 'transform'
        }}
      >
        {/* Duplicate items for seamless scrolling */}
        {[...items, ...items, ...items].map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              color: item.color || 'var(--text-primary, #1a1a1a)',
              transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`,
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{ fontSize: '1rem' }}>{item.icon}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};