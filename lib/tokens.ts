// Brand color palettes for different clients
export const brandPalettes = {
  'default': {
    primary: '#007bff',
    secondary: '#6c757d',
    tertiary: '#17a2b8',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
    info: '#17a2b8',
  },
  'tech': {
    primary: '#6366f1', // Indigo
    secondary: '#8b5cf6', // Purple
    tertiary: '#06b6d4', // Cyan
    success: '#10b981', // Emerald
    warning: '#f59e0b', // Amber
    danger: '#ef4444', // Red
    info: '#3b82f6', // Blue
  },
  'finance': {
    primary: '#1e40af', // Dark Blue
    secondary: '#059669', // Green
    tertiary: '#7c2d12', // Brown
    success: '#16a34a', // Success Green
    warning: '#ea580c', // Orange
    danger: '#dc2626', // Red
    info: '#0284c7', // Sky Blue
  },
  'healthcare': {
    primary: '#0891b2', // Cyan
    secondary: '#16a34a', // Green
    tertiary: '#7c3aed', // Violet
    success: '#059669', // Emerald
    warning: '#d97706', // Orange
    danger: '#e11d48', // Rose
    info: '#0ea5e9', // Light Blue
  },
  'education': {
    primary: '#7c3aed', // Purple
    secondary: '#db2777', // Pink
    tertiary: '#ea580c', // Orange
    success: '#16a34a', // Green
    warning: '#eab308', // Yellow
    danger: '#dc2626', // Red
    info: '#2563eb', // Blue
  },
  'creative': {
    primary: '#ec4899', // Pink
    secondary: '#f97316', // Orange
    tertiary: '#8b5cf6', // Purple
    success: '#22c55e', // Green
    warning: '#f59e0b', // Amber
    danger: '#ef4444', // Red
    info: '#06b6d4', // Cyan
  },
  'enterprise': {
    primary: '#1f2937', // Gray-800
    secondary: '#374151', // Gray-700
    tertiary: '#4b5563', // Gray-600
    success: '#059669', // Emerald
    warning: '#d97706', // Orange
    danger: '#dc2626', // Red
    info: '#0284c7', // Sky
  },
};

export type BrandPalette = keyof typeof brandPalettes;

export const tokens = {
  colors: {
    light: {
      canvas: '#ffffff',
      surface: '#fafafa',
      border: '#e5e7eb',
      text: '#1a1a1a',
      textSecondary: '#6b7280',
      textMuted: '#9ca3af',
      // Dynamic brand colors (will be overridden by theme)
      primary: '#007bff',
      secondary: '#6c757d', 
      tertiary: '#17a2b8',
      success: '#28a745',
      warning: '#ffc107',
      danger: '#dc3545',
      info: '#17a2b8',
    },
    dark: {
      canvas: '#111827',
      surface: '#1f2937',
      border: '#374151',
      text: '#f9fafb',
      textSecondary: '#d1d5db',
      textMuted: '#9ca3af',
      // Dynamic brand colors (will be overridden by theme)
      primary: '#3b82f6',
      secondary: '#6b7280',
      tertiary: '#06b6d4',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#06b6d4',
    },
  },
  typography: {
    fontFamily: {
      sketch: '"Kalam", "Comic Sans MS", cursive',
      mono: '"Courier New", monospace',
      system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sketch: {
      sm: '1px 1px 2px rgba(0,0,0,0.1)',
      md: '2px 2px 4px rgba(0,0,0,0.15)',
      lg: '3px 3px 6px rgba(0,0,0,0.2)',
      xl: '4px 4px 8px rgba(0,0,0,0.25)',
    },
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '250ms',
      slow: '400ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Type definitions
export type Theme = 'light' | 'dark';
export type Tokens = typeof tokens;

// Re-export for better module resolution
export { tokens as default };