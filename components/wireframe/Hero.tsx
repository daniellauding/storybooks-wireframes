import React from 'react';
import { Button } from './Button';

interface HeroProps {
  variant?: 'default' | 'centered' | 'split' | 'minimal' | 'product';
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  image?: string;
  showChart?: boolean;
  backgroundPattern?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  variant = 'centered',
  title,
  subtitle,
  description,
  badge,
  primaryAction,
  secondaryAction,
  image,
  showChart = false,
  backgroundPattern = false,
}) => {
  const containerStyle = {
    transform: `rotate(${Math.random() * 0.1 - 0.05}deg)`,
  };

  const titleStyle = {
    transform: `rotate(${Math.random() * 1 - 0.5}deg)`,
    fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  };

  const subtitleStyle = {
    transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`,
  };

  return (
    <section 
      className={`
        relative overflow-hidden bg-gray-50 border-b-2 border-gray-300
        ${variant === 'minimal' ? 'py-12' : 'py-16'}
      `}
      style={containerStyle}
    >
      {/* Background pattern */}
      {backgroundPattern && (
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, blue 2px, transparent 2px), radial-gradient(circle at 60% 80%, gray 1px, transparent 1px)`,
            backgroundSize: '50px 50px, 30px 30px',
          }}
        />
      )}

      {/* Sketchy border effects */}
      <div 
        className="absolute bottom-0 left-10 right-15 h-0.5 bg-gray-300 opacity-30"
        style={{
          transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`,
        }}
      />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {badge && (
            <span 
              className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 mb-4 border-2 border-blue-200"
              style={{
                borderRadius: '20px 8px 18px 10px',
                transform: `rotate(${Math.random() * 2 - 1}deg)`,
              }}
            >
              {badge}
            </span>
          )}

          {subtitle && (
            <h2 
              className="mb-4 text-lg font-semibold text-blue-600"
              style={subtitleStyle}
            >
              {subtitle}
            </h2>
          )}
          
          <h1 
            className={`
              mb-6 font-bold tracking-tight text-gray-900 
              ${variant === 'minimal' ? 'text-2xl' : 'text-4xl sm:text-5xl md:text-6xl'}
            `}
            style={titleStyle}
          >
            {title}
          </h1>
          
          {description && (
            <p 
              className="mx-auto mb-8 max-w-2xl text-lg text-gray-600"
              style={{
                transform: `rotate(${Math.random() * 0.2 - 0.1}deg)`,
              }}
            >
              {description}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryAction && (
              <Button
                variant="primary"
                size="lg"
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            )}
            
            {secondaryAction && (
              <Button
                variant="secondary"
                size="lg"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>

          {/* Placeholder image/chart */}
          {(image || showChart) && variant === 'split' && (
            <div className="mt-12 flex justify-center">
              <div 
                className="w-96 h-64 border-3 border-gray-400 bg-gray-100 flex items-center justify-center text-gray-500 font-serif"
                style={{
                  borderRadius: '20px 12px 20px 12px',
                  transform: `rotate(${Math.random() * 3 - 1.5}deg)`,
                }}
              >
                {showChart ? '📊 Chart Preview' : '📱 App Preview'}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};