'use client';

import React, { useState } from 'react';
import { Skeleton } from './Skeleton';

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  variant?: 'default' | 'simple' | 'bordered';
  style?: React.CSSProperties;
  skeleton?: boolean;
  skeletonItems?: number;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  variant = 'default',
  style,
  skeleton = false,
  skeletonItems = 3,
}) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    const isExpanded = expandedItems.includes(index);
    
    let newExpandedItems: number[];
    
    if (allowMultiple) {
      if (isExpanded) {
        newExpandedItems = expandedItems.filter(i => i !== index);
      } else {
        newExpandedItems = [...expandedItems, index];
      }
    } else {
      newExpandedItems = isExpanded ? [] : [index];
    }
    
    setExpandedItems(newExpandedItems);
  };

  const getVariantStyles = () => {
    const baseStyles = {
      width: '100%',
      fontFamily: 'Kalam, cursive'
    };

    switch (variant) {
      case 'bordered':
        return {
          ...baseStyles,
          border: '2px solid var(--border-color, #e5e7eb)',
          borderRadius: '12px 8px 12px 8px',
          overflow: 'hidden'
        };
      case 'simple':
        return {
          ...baseStyles,
          border: 'none'
        };
      default:
        return baseStyles;
    }
  };

  if (skeleton) {
    return (
      <div style={{ ...getVariantStyles(), ...style }}>
        {Array.from({ length: skeletonItems }, (_, index) => (
          <div key={index} style={{
            borderBottom: index < skeletonItems - 1 ? '1px solid var(--border-color, #e5e7eb)' : 'none',
            padding: '1rem 1.25rem'
          }}>
            <Skeleton variant="text" width="60%" height="1rem" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ ...getVariantStyles(), ...style }}>
      {items.map((item, index) => {
        const isExpanded = expandedItems.includes(index);
        const rotation = Math.random() * 0.5 - 0.25;
        
        const itemStyle = variant === 'default' ? {
          border: '2px solid var(--border-color, #e5e7eb)',
          borderRadius: '12px 8px 12px 8px',
          marginBottom: index < items.length - 1 ? '0.5rem' : '0',
          transform: `rotate(${rotation}deg)`
        } : {
          borderBottom: index < items.length - 1 ? '1px solid var(--border-color, #e5e7eb)' : 'none'
        };

        return (
          <div key={index} style={itemStyle}>
            {/* Header */}
            <button
              onClick={() => !item.disabled && handleToggle(index)}
              disabled={item.disabled}
              style={{
                width: '100%',
                background: isExpanded ? 'rgba(0, 123, 255, 0.1)' : 'var(--surface-color, #fafafa)',
                border: 'none',
                padding: '1rem 1.25rem',
                textAlign: 'left',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '1rem',
                fontWeight: '500',
                color: 'var(--text-primary, #1a1a1a)',
                fontFamily: 'Kalam, cursive',
                transition: 'all 0.2s ease',
                opacity: item.disabled ? 0.5 : 1,
                borderBottom: isExpanded && variant !== 'simple' ? '1px solid var(--border-color, #e5e7eb)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!item.disabled) {
                  e.currentTarget.style.background = isExpanded ? 'rgba(0, 123, 255, 0.15)' : 'rgba(0, 123, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateX(2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!item.disabled) {
                  e.currentTarget.style.background = isExpanded ? 'rgba(0, 123, 255, 0.1)' : 'var(--surface-color, #fafafa)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }
              }}
            >
              <span>{item.title}</span>
              <span style={{
                transform: `rotate(${isExpanded ? 180 : 0}deg)`,
                transition: 'transform 0.2s ease',
                fontSize: '0.875rem'
              }}>
                ▼
              </span>
            </button>

            {/* Content */}
            <div
              style={{
                maxHeight: isExpanded ? '500px' : '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                opacity: isExpanded ? 1 : 0
              }}
            >
              <div style={{
                padding: isExpanded ? '1rem 1.25rem' : '0 1.25rem',
                color: 'var(--text-secondary, #6b7280)',
                lineHeight: '1.5',
                fontSize: '0.875rem'
              }}>
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};