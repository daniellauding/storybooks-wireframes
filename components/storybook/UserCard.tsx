'use client';

import React from 'react';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';
import { Skeleton } from './Skeleton';

export interface UserCardProps {
  name: string;
  email?: string;
  subtitle?: string;
  avatar?: string;
  role?: string;
  description?: string;
  variant?: 'default' | 'testimonial';
  style?: React.CSSProperties;
  skeleton?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  subtitle,
  avatar,
  role,
  description,
  variant = 'default',
  style,
  skeleton = false,
}) => {
  const rotation = Math.random() * 2 - 1;

  return (
    <Card 
      variant="outlined" 
      padding="lg" 
      style={{
        maxWidth: '300px',
        textAlign: variant === 'testimonial' ? 'left' : 'center',
        transform: `rotate(${rotation}deg)`,
        ...style
      }}
    >
      <CardContent>
        {skeleton ? (
          <>
            {/* Avatar skeleton */}
            {variant !== 'testimonial' && (
              <div style={{ margin: '0 auto 1rem auto', width: 'fit-content' }}>
                <Skeleton variant="circular" width={60} height={60} />
              </div>
            )}
            
            {/* Name skeleton */}
            <div style={{ marginBottom: '0.5rem' }}>
              <Skeleton variant="text" width="60%" height="1.125rem" style={{ margin: variant === 'testimonial' ? '0' : '0 auto' }} />
            </div>
            
            {/* Subtitle skeleton */}
            <div style={{ marginBottom: '0.5rem' }}>
              <Skeleton variant="text" width="80%" height="0.875rem" style={{ margin: variant === 'testimonial' ? '0' : '0 auto' }} />
            </div>
            
            {/* Description skeleton */}
            <Skeleton variant="text" lines={variant === 'testimonial' ? 3 : 2} />
          </>
        ) : (
          <>
            {/* Avatar placeholder */}
            {avatar && (
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'var(--border-color, #e5e7eb)',
                margin: '0 auto 1rem auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'var(--text-secondary, #6b7280)',
                transform: `rotate(${Math.random() * 5 - 2.5}deg)`
              }}>
                {name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            
            {/* Name */}
            <h3 style={{
              fontFamily: 'Kalam, cursive',
              fontSize: '1.125rem',
              fontWeight: '600',
              color: 'var(--text-primary, #1a1a1a)',
              margin: '0 0 0.25rem 0',
              transform: `rotate(${Math.random() * 1 - 0.5}deg)`
            }}>
              {name}
            </h3>

            {/* Email or Subtitle */}
            {(email || subtitle) && (
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary, #6b7280)',
                margin: '0 0 0.5rem 0'
              }}>
                {email || subtitle}
              </p>
            )}

            {/* Role Badge */}
            {role && (
              <div style={{ marginBottom: '0.75rem' }}>
                <Badge variant="primary" size="sm">
                  {role}
                </Badge>
              </div>
            )}

            {/* Description/Bio */}
            {description && (
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary, #6b7280)',
                lineHeight: '1.5',
                margin: 0,
                fontStyle: variant === 'testimonial' ? 'italic' : 'normal'
              }}>
                "{description}"
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};