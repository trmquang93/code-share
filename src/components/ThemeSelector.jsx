import React from 'react';
import { themes } from '../data/themes';

const ThemeSelector = ({ selectedTheme, onThemeChange, className = '' }) => {
  const darkThemes = Object.entries(themes).filter(([_, theme]) => theme.type === 'dark');
  const lightThemes = Object.entries(themes).filter(([_, theme]) => theme.type === 'light');

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Theme</h3>
        <div className="space-y-3">
          {/* Dark Themes */}
          <div>
            <h4 className="text-xs text-gray-500 mb-2">Dark Themes</h4>
            <div className="space-y-1">
              {darkThemes.map(([key, theme]) => (
                <label key={key} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value={key}
                    checked={selectedTheme === key}
                    onChange={() => onThemeChange(key)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{theme.name}</span>
                  <div 
                    className="w-4 h-4 rounded border border-gray-300 ml-auto"
                    style={{ backgroundColor: theme.windowBg }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Light Themes */}
          <div>
            <h4 className="text-xs text-gray-500 mb-2">Light Themes</h4>
            <div className="space-y-1">
              {lightThemes.map(([key, theme]) => (
                <label key={key} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value={key}
                    checked={selectedTheme === key}
                    onChange={() => onThemeChange(key)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{theme.name}</span>
                  <div 
                    className="w-4 h-4 rounded border border-gray-300 ml-auto"
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