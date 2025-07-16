import React from 'react';
import { themes } from '../data/themes';

const ThemeSelector = ({ selectedTheme, onThemeChange, className = '' }) => {
  const darkThemes = Object.entries(themes).filter(([_, theme]) => theme.type === 'dark');
  const lightThemes = Object.entries(themes).filter(([_, theme]) => theme.type === 'light');

  return (
    <div className={`premium-theme-selector ${className}`}>
      <div>
        <h3 className="premium-label">Theme</h3>
        <div className="premium-theme-groups">
          {/* Dark Themes */}
          <div className="premium-theme-group">
            <h4 className="premium-theme-group-title">Dark Themes</h4>
            <div className="premium-theme-options">
              {darkThemes.map(([key, theme]) => (
                <label key={key} className={`premium-theme-option ${selectedTheme === key ? 'premium-theme-option-selected' : ''}`}>
                  <input
                    type="radio"
                    name="theme"
                    value={key}
                    checked={selectedTheme === key}
                    onChange={() => onThemeChange(key)}
                    className="premium-theme-radio"
                  />
                  <span className="premium-theme-name">{theme.name}</span>
                  <div 
                    className="premium-theme-preview"
                    style={{ backgroundColor: theme.windowBg }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Light Themes */}
          <div className="premium-theme-group">
            <h4 className="premium-theme-group-title">Light Themes</h4>
            <div className="premium-theme-options">
              {lightThemes.map(([key, theme]) => (
                <label key={key} className={`premium-theme-option ${selectedTheme === key ? 'premium-theme-option-selected' : ''}`}>
                  <input
                    type="radio"
                    name="theme"
                    value={key}
                    checked={selectedTheme === key}
                    onChange={() => onThemeChange(key)}
                    className="premium-theme-radio"
                  />
                  <span className="premium-theme-name">{theme.name}</span>
                  <div 
                    className="premium-theme-preview"
                    style={{ backgroundColor: theme.windowBg }}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;