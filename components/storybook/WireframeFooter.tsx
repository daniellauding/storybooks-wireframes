'use client';

import React from 'react';
import { Skeleton } from './Skeleton';

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube';
  href: string;
}

export interface WireframeFooterProps {
  companyName: string;
  description?: string;
  links?: FooterLink[];
  socialLinks?: SocialLink[];
  showNewsletter?: boolean;
  style?: React.CSSProperties;
  skeleton?: boolean;
}

export const WireframeFooter: React.FC<WireframeFooterProps> = ({
  companyName,
  description,
  links = [],
  socialLinks = [],
  showNewsletter = false,
  style,
  skeleton = false,
}) => {
  const rotation = Math.random() * 0.2 - 0.1;

  const getSocialIcon = (platform: string) => {
    const icons: Record<string, string> = {
      facebook: 'f',
      instagram: '📸',
      twitter: '🐦',
      linkedin: '💼',
      youtube: '📺'
    };
    return icons[platform] || '🌐';
  };

  return (
    <footer style={{
      width: '100%',
      background: 'var(--surface-color, #fafafa)',
      border: '2px solid var(--border-color, #e5e7eb)',
      borderRadius: '15px 8px 15px 8px',
      padding: '2rem',
      margin: '2rem 0',
      transform: `rotate(${rotation}deg)`,
      fontFamily: 'Kalam, cursive',
      ...style
    }}>
      {/* Newsletter Section */}
      {showNewsletter && (
        <div style={{
          background: 'var(--bg-color, #f0f0f0)',
          border: '1px dashed var(--border-color, #e5e7eb)',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem',
          textAlign: 'center',
          transform: `rotate(${Math.random() * 0.3 - 0.15}deg)`
        }}>
          <h4 style={{
            margin: '0 0 0.5rem 0',
            color: 'var(--text-primary, #1a1a1a)',
            fontSize: '1.25rem'
          }}>
            Få de senaste nyheterna
          </h4>
          <p style={{
            margin: '0 0 1rem 0',
            color: 'var(--text-secondary, #6b7280)',
            fontSize: '0.875rem'
          }}>
            Prenumerera på vårt nyhetsbrev för tips och erbjudanden
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px', margin: '0 auto' }}>
            <input 
              type="email"
              placeholder="Din e-postadress"
              style={{
                flex: 1,
                padding: '0.75rem',
                border: '2px solid var(--border-color, #e5e7eb)',
                borderRadius: '8px 4px 8px 4px',
                fontSize: '0.875rem'
              }}
            />
            <button style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--accent, #007bff)',
              color: 'white',
              border: 'none',
              borderRadius: '8px 4px 8px 4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontFamily: 'Kalam, cursive'
            }}>
              Prenumerera
            </button>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: '2rem',
        marginBottom: '2rem',
        paddingBottom: '2rem',
        borderBottom: '1px dashed var(--border-color, #e5e7eb)'
      }}>
        {/* Company Info */}
        <div>
          {skeleton ? (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <Skeleton variant="text" width="150px" height="1.5rem" />
              </div>
              <Skeleton variant="text" lines={2} width="90%" />
            </>
          ) : (
            <>
              <h3 style={{
                margin: '0 0 1rem 0',
                fontSize: '1.5rem',
                color: 'var(--text-primary, #1a1a1a)',
                transform: `rotate(${Math.random() * 1 - 0.5}deg)`
              }}>
                {companyName}
              </h3>
              {description && (
                <p style={{
                  margin: '0 0 1rem 0',
                  color: 'var(--text-secondary, #6b7280)',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}>
                  {description}
                </p>
              )}
            </>
          )}
        </div>

        {/* Links */}
        <div>
          <h4 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.125rem',
            color: 'var(--text-primary, #1a1a1a)',
            transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`
          }}>
            Länkar
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {links.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                style={{
                  color: 'var(--text-secondary, #6b7280)',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transform: `rotate(${Math.random() * 0.3 - 0.15}deg)`,
                  display: 'inline-block',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent, #007bff)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary, #6b7280)';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.125rem',
            color: 'var(--text-primary, #1a1a1a)',
            transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`
          }}>
            Kontakt
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: 'var(--text-secondary, #6b7280)'
          }}>
            <div>📧 info@{companyName.toLowerCase()}.se</div>
            <div>📞 08-123 456 78</div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary, #6b7280)'
        }}>
          © 2024 {companyName}. Alla rättigheter förbehållna.
        </div>

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {socialLinks.map((social, index) => (
              <a 
                key={index}
                href={social.href}
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--border-color, #e5e7eb)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  transform: `rotate(${Math.random() * 10 - 5}deg)`,
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--accent, #007bff)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = `rotate(${Math.random() * 15 - 7.5}deg) scale(1.1)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--border-color, #e5e7eb)';
                  e.currentTarget.style.color = 'initial';
                  e.currentTarget.style.transform = `rotate(${Math.random() * 10 - 5}deg) scale(1)`;
                }}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};