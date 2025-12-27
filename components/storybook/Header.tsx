import React, { useState } from 'react';
import { tokens } from '@/lib/tokens';
import { Container } from './Container';
import { Button } from './Button';
import { SearchBox } from './SearchBox';
import { Select } from './Select';
import { Skeleton } from './Skeleton';

export interface HeaderProps {
  logo?: string | React.ReactNode;
  navigation?: Array<{ id: string; label: string; href?: string; active?: boolean }>;
  showSearch?: boolean;
  searchPlaceholder?: string;
  user?: {
    name: string;
    avatar?: string;
    status?: 'online' | 'offline' | 'away' | 'busy';
  };
  actions?: Array<{ icon: string; badge?: number; onClick: () => void }>;
  variant?: 'default' | 'minimal' | 'branded';
  sticky?: boolean;
  cartCount?: number;
  showLanguageSwitcher?: boolean;
  showAuthButtons?: boolean;
  skeleton?: boolean;
  skeletonNavItems?: number;
}

export const Header: React.FC<HeaderProps> = ({
  logo = 'WireFrame',
  navigation = [],
  showSearch = true,
  searchPlaceholder = 'Search...',
  user,
  actions = [],
  variant = 'default',
  sticky = false,
  cartCount = 0,
  showLanguageSwitcher = true,
  showAuthButtons = true,
  skeleton = false,
  skeletonNavItems = 4,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('SV');
  // Generate random rotations for sketchy effect
  const headerRotation = React.useMemo(() => (Math.random() - 0.5) * 0.2, []);
  const logoRotation = React.useMemo(() => (Math.random() - 0.5) * 2, []);
  const underlineRotation = React.useMemo(() => (Math.random() - 0.5) * 0.5, []);

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const getHeaderStyles = () => ({
    background: 'var(--surface-color, #fafafa)',
    borderBottom: '2px solid var(--border-color, #e5e7eb)',
    position: sticky ? 'sticky' as const : 'relative' as const,
    top: 0,
    zIndex: 100,
    padding: `${variant === 'minimal' ? tokens.spacing.sm : tokens.spacing.md} 0`,
    transform: `rotate(${headerRotation}deg)`,
  });

  const getContentStyles = () => ({
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    gap: tokens.spacing.md,
  });

  const getLogoStyles = () => ({
    fontFamily: tokens.typography.fontFamily.sketch,
    fontSize: tokens.typography.fontSize['2xl'],
    fontWeight: tokens.typography.fontWeight.bold,
    color: 'var(--accent, #007bff)',
    transform: `rotate(${logoRotation}deg)`,
    flexShrink: 0,
  });

  const getNavigationStyles = () => ({
    flex: 1,
    display: 'flex' as const,
    justifyContent: 'center' as const,
    gap: tokens.spacing.lg,
  });

  const getSearchSectionStyles = () => ({
    flex: '0 1 300px',
    maxWidth: '400px',
  });

  const getActionsSectionStyles = () => ({
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    flexShrink: 0,
  });

  const getUserSectionStyles = () => ({
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: tokens.spacing.sm,
    cursor: 'pointer' as const,
    padding: tokens.spacing.xs,
    borderRadius: '12px 8px 12px 8px',
    border: '2px solid transparent',
    transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.ease}`,
  });

  const getNavItemStyles = (active?: boolean) => ({
    color: active ? 'var(--accent, #007bff)' : 'var(--text-primary, #1a1a1a)',
    textDecoration: 'none',
    fontFamily: tokens.typography.fontFamily.sketch,
    fontSize: tokens.typography.fontSize.base,
    fontWeight: active ? tokens.typography.fontWeight.semibold : tokens.typography.fontWeight.normal,
    transform: `rotate(${(Math.random() - 0.5) * 1}deg)`,
    transition: `all ${tokens.animation.duration.fast} ${tokens.animation.easing.ease}`,
  });

  const renderLogo = () => {
    if (typeof logo === 'string') {
      return (
        <div 
          style={{
            ...getLogoStyles(),
            cursor: 'pointer'
          }}
          onClick={() => window.location.href = '/clients/stadkjakten/booking-flow/flows/booking-start'}
        >
          {logo}
        </div>
      );
    }
    return logo;
  };

  const renderActions = () => {
    return actions.map((action, index) => (
      <div key={index} style={{ position: 'relative' }}>
        <Button
          variant="ghost"
          size="sm"
          onClick={action.onClick}
          style={{ minWidth: 'auto', padding: tokens.spacing.sm }}
        >
          {action.icon === 'notifications' ? '🔔' : 
           action.icon === 'settings' ? '⚙️' : 
           action.icon === 'menu' ? '☰' : '🔧'}
        </Button>
        {action.badge && action.badge > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: 'var(--danger, #dc3545)',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 'bold',
              transform: 'scale(0.8)',
            }}
          >
            {action.badge > 99 ? '99+' : action.badge}
          </div>
        )}
      </div>
    ));
  };

  const renderNavigation = () => {
    if ((navigation.length === 0 && !skeleton) || variant === 'minimal') return null;
    
    return (
      <nav style={getNavigationStyles()}>
        {skeleton ? (
          Array.from({ length: skeletonNavItems }, (_, index) => (
            <Skeleton 
              key={index} 
              variant="text" 
              width={`${60 + Math.random() * 40}px`} 
              height="1.2em" 
            />
          ))
        ) : (
          navigation.map((item) => (
            <a
              key={item.id}
              href={item.href || '#'}
              style={getNavItemStyles(item.active)}
              onMouseEnter={(e) => {
                const link = e.currentTarget;
                link.style.color = 'var(--accent, #007bff)';
                link.style.transform = `rotate(${(Math.random() - 0.5) * 2}deg)`;
              }}
              onMouseLeave={(e) => {
                const link = e.currentTarget;
                link.style.color = item.active ? 'var(--accent, #007bff)' : 'var(--text-primary, #1a1a1a)';
                link.style.transform = `rotate(${(Math.random() - 0.5) * 1}deg)`;
              }}
            >
              {item.label}
            </a>
          ))
        )}
      </nav>
    );
  };

  return (
    <header style={getHeaderStyles()}>
      {/* Sketchy underline effect */}
      <div
        style={{
          position: 'absolute',
          bottom: '-3px',
          left: '10%',
          right: '15%',
          height: '2px',
          background: 'var(--border-color, #e5e7eb)',
          opacity: 0.3,
          transform: `rotate(${underlineRotation}deg)`,
        }}
      />

      <Container maxWidth="xl" padding="none">
        <div style={getContentStyles()}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {skeleton ? (
              <Skeleton variant="text" width="120px" height="1.5em" />
            ) : (
              renderLogo()
            )}
          </div>

          {/* Navigation - hidden on mobile */}
          {renderNavigation()}

          {/* Search - hidden on small screens */}
          {showSearch && variant !== 'minimal' && (
            <div style={getSearchSectionStyles()}>
              <SearchBox
                placeholder={searchPlaceholder}
                onSearch={handleSearch}
                fullWidth
                size="sm"
              />
            </div>
          )}

          {/* Actions & User */}
          <div style={getActionsSectionStyles()}>
            {/* Language Switcher */}
            {showLanguageSwitcher && (
              <Select
                options={[
                  { value: 'SV', label: '🇸🇪 SV' },
                  { value: 'EN', label: '🇬🇧 EN' }
                ]}
                value={currentLanguage}
                onChange={setCurrentLanguage}
                size="sm"
                style={{ minWidth: '80px' }}
              />
            )}

            {/* Cart */}
            <div style={{ position: 'relative' }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => console.log('Cart clicked')}
                style={{ minWidth: 'auto', padding: tokens.spacing.sm }}
              >
                🛒
              </Button>
              {cartCount > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: 'var(--accent, #007bff)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    fontFamily: 'Kalam, cursive',
                  }}
                >
                  {cartCount > 99 ? '99+' : cartCount}
                </div>
              )}
            </div>

            {/* Action buttons */}
            {renderActions()}

            {/* Auth Buttons */}
            {showAuthButtons && !user && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => console.log('Login clicked')}
                >
                  Logga in
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => console.log('Register clicked')}
                >
                  Registrera
                </Button>
              </>
            )}

            {/* User profile */}
            {user && (
              <div
                style={getUserSectionStyles()}
                onMouseEnter={(e) => {
                  const section = e.currentTarget;
                  section.style.background = 'var(--bg-color, #f0f0f0)';
                  section.style.borderColor = 'var(--border-color, #e5e7eb)';
                  section.style.transform = `rotate(${(Math.random() - 0.5) * 1}deg)`;
                }}
                onMouseLeave={(e) => {
                  const section = e.currentTarget;
                  section.style.background = 'transparent';
                  section.style.borderColor = 'transparent';
                  section.style.transform = 'rotate(0deg)';
                }}
              >
                <span
                  style={{
                    fontFamily: tokens.typography.fontFamily.sketch,
                    color: 'var(--text-primary, #1a1a1a)',
                    fontSize: tokens.typography.fontSize.sm,
                  }}
                >
                  {user.name}
                </span>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: user.avatar ? `url(${user.avatar}) center/cover` : 'var(--accent, #007bff)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: tokens.typography.fontSize.sm,
                    fontWeight: tokens.typography.fontWeight.bold,
                    border: '2px solid var(--border-color, #e5e7eb)',
                  }}
                >
                  {!user.avatar && user.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <div style={{ display: 'none' }}>
              <Button variant="ghost" size="sm">
                ☰
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};