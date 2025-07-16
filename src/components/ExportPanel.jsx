import React, { useState } from 'react';
import { exportFormats, defaultExportSettings } from '../utils/exportUtils';

const ExportPanel = ({ 
  exportSettings, 
  onExportSettingsChange, 
  onExport, 
  isExporting = false,
  className = ''
}) => {
  const [customColor, setCustomColor] = useState(exportSettings.backgroundColor || defaultExportSettings.backgroundColor);

  const handleSettingChange = (key, value) => {
    onExportSettingsChange({
      ...exportSettings,
      [key]: value
    });
  };

  const handleColorChange = (color) => {
    setCustomColor(color);
    handleSettingChange('backgroundColor', color);
  };

  const predefinedColors = [
    { name: 'Light Gray', value: '#F5F5F5' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Dark Gray', value: '#1F1F1F' },
    { name: 'Black', value: '#000000' },
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Red', value: '#EF4444' }
  ];

  return (
    <div className={`premium-export-panel ${className}`}>
      {/* Background Color */}
      <div className="premium-export-control">
        <label className="premium-label">
          Background Color
        </label>
        <div className="premium-color-controls">
          {/* Predefined colors */}
          <div className="premium-color-grid">
            {predefinedColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorChange(color.value)}
                className={`premium-color-swatch ${
                  exportSettings.backgroundColor === color.value 
                    ? 'premium-color-swatch-selected' 
                    : ''
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          
          {/* Custom color picker */}
          <div className="premium-custom-color">
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="premium-color-picker"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="premium-color-input"
              placeholder="#F5F5F5"
            />
          </div>
        </div>
      </div>

      {/* Image Width */}
      <div className="premium-export-control">
        <label className="premium-label">
          Image Width
        </label>
        <select
          value={exportSettings.width}
          onChange={(e) => handleSettingChange('width', parseInt(e.target.value))}
          className="premium-select"
        >
          <option value={1280}>1280px (720p)</option>
          <option value={1920}>1920px (1080p)</option>
          <option value={2560}>2560px (1440p)</option>
          <option value={3840}>3840px (4K)</option>
        </select>
      </div>

      {/* Padding */}
      <div className="premium-export-control">
        <label className="premium-label">
          Padding: {exportSettings.padding}px
        </label>
        <div className="premium-slider-container">
          <input
            type="range"
            min="0"
            max="128"
            step="8"
            value={exportSettings.padding}
            onChange={(e) => handleSettingChange('padding', parseInt(e.target.value))}
            className="premium-slider"
          />
          <div className="premium-slider-labels">
            <span>0px</span>
            <span>128px</span>
          </div>
        </div>
      </div>

      {/* Format */}
      <div className="premium-export-control">
        <label className="premium-label">
          Format
        </label>
        <div className="premium-format-options">
          {Object.entries(exportFormats).map(([key, value]) => (
            <label key={key} className={`premium-format-option ${exportSettings.format === value ? 'premium-format-option-selected' : ''}`}>
              <input
                type="radio"
                name="format"
                value={value}
                checked={exportSettings.format === value}
                onChange={() => handleSettingChange('format', value)}
                className="premium-format-radio"
              />
              <span className="premium-format-name">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Quality for JPG */}
      {exportSettings.format === exportFormats.JPG && (
        <div className="premium-export-control premium-quality-control">
          <label className="premium-label">
            Quality: {Math.round(exportSettings.quality * 100)}%
          </label>
          <div className="premium-slider-container">
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={exportSettings.quality}
              onChange={(e) => handleSettingChange('quality', parseFloat(e.target.value))}
              className="premium-slider"
            />
            <div className="premium-slider-labels">
              <span>10%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      )}


      {/* Export Button */}
      <button
        onClick={onExport}
        disabled={isExporting}
        className={`premium-export-button ${isExporting ? 'premium-export-button-loading' : ''}`}
      >
        {isExporting ? (
          <span className="premium-export-button-content">
            <svg className="premium-export-spinner" fill="none" viewBox="0 0 24 24">
              <circle className="premium-export-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="premium-export-spinner-fill" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Exporting...</span>
          </span>
        ) : (
          'Export Image'
        )}
      </button>
    </div>
  );
};

export default ExportPanel;