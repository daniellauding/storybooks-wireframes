'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { Select, SelectOption } from './Select';
import { Input } from './Input';

export interface CombinedSearchProps {
  onSearch?: (city: string, service: string) => void;
  style?: React.CSSProperties;
}

export const CombinedSearch: React.FC<CombinedSearchProps> = ({
  onSearch,
  style,
}) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  const cities = [
    'Malmö',
    'Göteborg',
    'Stockholm',
    'Västerås',
    'Kiruna',
    'Uppsala',
    'Örebro',
    'Linköping',
    'Helsingborg',
    'Jönköping'
  ];

  const services: SelectOption[] = [
    { value: 'hemstadning', label: '🏠 Hemstädning' },
    { value: 'fonsterputs', label: '🪟 Fönsterputsning' },
    { value: 'flyttstadning', label: '📦 Flyttstädning' },
    { value: 'byggstadning', label: '🏗️ Byggstädning' },
    { value: 'kontorsstadning', label: '🏢 Kontorsstädning' },
    { value: 'storstadning', label: '✨ Storstädning' },
  ];

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(cityInput.toLowerCase())
  );

  const handleSearch = () => {
    // Navigate directly to the wizard flow - no city/service required
    console.log('[DEBUG] Search clicked - navigating to wizard');
    window.location.href = '/clients/stadkjakten/booking-flow/flows/wizard';
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setCityInput(city);
    setShowCitySuggestions(false);
  };

  const rotation = Math.random() * 1 - 0.5;

  return (
    <div style={{
      background: 'white',
      border: '3px solid var(--accent, #007bff)',
      borderRadius: '20px 12px 20px 12px',
      padding: '2rem',
      boxShadow: '6px 6px 0 rgba(0, 0, 0, 0.1)',
      transform: `rotate(${rotation}deg)`,
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'Kalam, cursive',
      ...style
    }}>
      <h3 style={{
        margin: '0 0 1.5rem 0',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: 'var(--text-primary, #1a1a1a)',
        textAlign: 'center',
        transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`
      }}>
        🔍 Hitta städhjälp i din stad
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {/* City Input with Autocomplete */}
        <div style={{ position: 'relative' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--text-primary, #1a1a1a)'
          }}>
            📍 Stad/Ort
          </label>
          <Input
            value={cityInput}
            onChange={(value: string) => {
              setCityInput(value);
              setSelectedCity(value);
              setShowCitySuggestions(value.length > 0);
            }}
            onFocus={() => setShowCitySuggestions(cityInput.length > 0)}
            placeholder="Ex: Malmö, Göteborg..."
            fullWidth
            size="lg"
          />
          
          {/* City Suggestions Dropdown */}
          {showCitySuggestions && filteredCities.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 50,
              marginTop: '0.25rem',
              background: 'white',
              border: '2px solid var(--border-color, #e5e7eb)',
              borderRadius: '12px 8px 12px 8px',
              boxShadow: '4px 4px 0 rgba(0, 0, 0, 0.1)',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {filteredCities.map((city, index) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleCitySelect(city)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    textAlign: 'left',
                    border: 'none',
                    background: 'transparent',
                    color: 'var(--text-primary, #1a1a1a)',
                    cursor: 'pointer',
                    fontFamily: 'Kalam, cursive',
                    fontSize: '1rem',
                    borderBottom: index < filteredCities.length - 1 ? '1px dashed var(--border-color, #e5e7eb)' : 'none',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--surface-color, #fafafa)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  📍 {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Service Dropdown */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'var(--text-primary, #1a1a1a)'
          }}>
            🧹 Typ av städning
          </label>
          <Select
            options={services}
            value={selectedService}
            onChange={setSelectedService}
            placeholder="Välj städtjänst..."
            fullWidth
            size="lg"
          />
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        variant="primary"
        size="lg"
        fullWidth
      >
        🔍 Sök städfirmor
      </Button>

      {/* Quick Service Links */}
      <div style={{
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: '1px dashed var(--border-color, #e5e7eb)',
        textAlign: 'center'
      }}>
        <p style={{
          margin: '0 0 0.5rem 0',
          fontSize: '0.875rem',
          color: 'var(--text-secondary, #6b7280)'
        }}>
          Populära sökningar:
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center'
        }}>
          {[
            'Hemstädning Stockholm',
            'Fönsterputs Göteborg',
            'Flyttstädning Malmö',
            'Kontorsstäd Västerås'
          ].map((term, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                const [service, city] = term.split(' ');
                setCityInput(city);
                setSelectedCity(city);
                // Find matching service
                const matchingService = services.find(s => 
                  s.label.toLowerCase().includes(service.toLowerCase())
                );
                if (matchingService) {
                  setSelectedService(matchingService.value);
                }
              }}
              style={{
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                background: 'transparent',
                border: '1px solid var(--border-color, #e5e7eb)',
                borderRadius: '8px 4px 8px 4px',
                color: 'var(--text-secondary, #6b7280)',
                cursor: 'pointer',
                fontFamily: 'Kalam, cursive',
                transition: 'all 0.2s ease',
                transform: `rotate(${Math.random() * 0.5 - 0.25}deg)`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent, #007bff)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = 'var(--accent, #007bff)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--text-secondary, #6b7280)';
                e.currentTarget.style.borderColor = 'var(--border-color, #e5e7eb)';
              }}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Close suggestions overlay */}
      {showCitySuggestions && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40
          }}
          onClick={() => setShowCitySuggestions(false)}
        />
      )}
    </div>
  );
};