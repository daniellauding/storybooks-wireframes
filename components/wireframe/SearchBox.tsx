import React, { useState } from 'react';

interface SearchBoxProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Sök...',
  onSearch,
  suggestions = [],
  fullWidth = true,
  size = 'lg',
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const inputStyle = {
    borderRadius: '30px 20px 25px 18px',
    transform: `rotate(${Math.random() * 1 - 0.5}deg)`,
  };

  const buttonStyle = {
    borderRadius: '20px 15px 18px 12px',
    transform: `rotate(${Math.random() * 2 - 1}deg)`,
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''} max-w-2xl mx-auto`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className={`
            w-full border-2 border-gray-400 bg-gray-50 pr-12 
            focus:border-blue-500 focus:outline-none focus:bg-white
            transition-all duration-200
            ${sizeClasses[size]}
          `}
          style={inputStyle}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors"
          style={buttonStyle}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-white shadow-lg border-2 border-gray-300 z-10"
          style={{
            borderRadius: '15px 10px 12px 8px',
            transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`,
          }}
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-gray-200 last:border-b-0"
              onClick={() => {
                setQuery(suggestion);
                setShowSuggestions(false);
                if (onSearch) onSearch(suggestion);
              }}
              style={{
                transform: `rotate(${Math.random() * 0.2 - 0.1}deg)`,
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};