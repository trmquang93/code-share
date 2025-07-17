import React from 'react';
import { exportFormats, defaultExportSettings } from '../utils/exportUtils';
import BackgroundSelector from './BackgroundSelector';
import WatermarkPanel from './WatermarkPanel';

const ExportPanel = ({ 
  exportSettings, 
  onExportSettingsChange, 
  onExport, 
  isExporting = false,
  backgroundColor,
  onBackgroundColorChange,
  watermarkSettings,
  onWatermarkSettingsChange,
  className = ''
}) => {
  const handleSettingChange = (key, value) => {
    onExportSettingsChange({
      ...exportSettings,
      [key]: value
    });
  };

  return (
    <div className={`premium-export-panel ${className}`}>
      {/* Background Color */}
      <BackgroundSelector
        backgroundColor={backgroundColor}
        onBackgroundColorChange={onBackgroundColorChange}
        className="premium-export-control"
      />

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

      {/* Watermark */}
      <WatermarkPanel
        watermarkSettings={watermarkSettings}
        onWatermarkSettingsChange={onWatermarkSettingsChange}
        exportSettings={exportSettings}
        className="premium-export-control"
      />

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