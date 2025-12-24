import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1',
    secondary: 'bg-transparent text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5',
    ghost: 'bg-transparent text-gray-600 border-2 border-transparent hover:text-blue-600 hover:bg-blue-50',
    danger: 'bg-red-600 text-white border-2 border-red-600 hover:bg-red-700 hover:shadow-lg hover:-translate-y-1',
  };

  const baseClasses = [
    'font-medium',
    'transition-all duration-200',
    'inline-flex items-center justify-center',
    'relative',
    'transform',
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    sizeClasses[size],
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  const sketchyStyle = {
    borderRadius: '255px 15px 225px 15px',
    transform: `rotate(${Math.random() * 2 - 1}deg)`,
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={baseClasses}
      style={sketchyStyle}
    >
      {children}
    </button>
  );
};