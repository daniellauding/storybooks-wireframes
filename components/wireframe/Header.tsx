import React from 'react';

interface HeaderProps {
  logo?: string;
  navigation?: Array<{ label: string; href: string }>;
  showSearch?: boolean;
  searchPlaceholder?: string;
  variant?: 'default' | 'minimal' | 'branded';
  sticky?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  logo = 'Städkjakten',
  navigation = [],
  showSearch = true,
  searchPlaceholder = 'Sök efter städtjänster...',
  variant = 'default',
  sticky = true,
}) => {
  const headerStyle = {
    transform: `rotate(${Math.random() * 0.2 - 0.1}deg)`,
  };

  const logoStyle = {
    transform: `rotate(${Math.random() * 2 - 1}deg)`,
    fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  };

  const searchStyle = {
    borderRadius: '20px 12px 18px 15px',
    transform: `rotate(${Math.random() * 1 - 0.5}deg)`,
  };

  return (
    <header 
      className={`
        ${sticky ? 'sticky top-0' : 'relative'} 
        z-50 w-full bg-white border-b-2 border-gray-300
        ${variant === 'minimal' ? 'py-2' : 'py-4'}
      `}
      style={headerStyle}
    >
      {/* Sketchy underline effect */}
      <div 
        className="absolute bottom-0 left-1/4 right-1/3 h-0.5 bg-gray-300 opacity-40"
        style={{
          transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`,
        }}
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div 
              className="text-2xl font-bold text-blue-600"
              style={logoStyle}
            >
              {logo}
            </div>
          </div>

          {navigation.length > 0 && variant !== 'minimal' && (
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {navigation.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                      style={{
                        transform: `rotate(${Math.random() * 1 - 0.5}deg)`,
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {showSearch && variant !== 'minimal' && (
            <div className="hidden lg:block">
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-64 border-2 border-gray-300 px-4 py-2 text-sm focus:border-blue-400 focus:outline-none bg-gray-50"
                style={searchStyle}
              />
            </div>
          )}

          <button 
            className="md:hidden p-2"
            style={{
              transform: `rotate(${Math.random() * 2 - 1}deg)`,
            }}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};