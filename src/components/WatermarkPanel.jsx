import React from 'react';
import PositionSelector from './PositionSelector';

const WatermarkPanel = ({ 
  watermarkSettings,
  onWatermarkSettingsChange,
  exportSettings = {},
  className = ''
}) => {
  const handleSettingChange = (key, value) => {
    onWatermarkSettingsChange({
      ...watermarkSettings,
      [key]: value
    });
  };

  const colorPresets = [
    { value: 'auto', label: 'Auto', description: 'Adapts to background' },
    { value: '#FFFFFF', label: 'White', description: 'White text' },
    { value: '#000000', label: 'Black', description: 'Black text' },
    { value: '#6B7280', label: 'Gray', description: 'Gray text' },
    { value: 'custom', label: 'Custom', description: 'Custom color' }
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  const fontWeightOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'medium', label: 'Medium' },
    { value: 'bold', label: 'Bold' }
  ];

  return (
    <div className={`premium-watermark-panel ${className}`}>
      {/* Enable/Disable Toggle */}
      <div className="premium-watermark-control">
        <div className="premium-toggle-container">
          <span className="premium-toggle-label">Add watermark to exports</span>
          <button
            onClick={() => handleSettingChange('enabled', !watermarkSettings.enabled)}
            className={`premium-toggle ${watermarkSettings.enabled ? 'premium-toggle-on' : 'premium-toggle-off'}`}
            role="switch"
            aria-checked={watermarkSettings.enabled}
          >
            <span className={`premium-toggle-thumb ${watermarkSettings.enabled ? 'premium-toggle-thumb-on' : 'premium-toggle-thumb-off'}`} />
          </button>
        </div>
      </div>

      {/* Watermark Controls - Only show when enabled */}
      {watermarkSettings.enabled && (
        <div className="premium-watermark-controls">
          {/* Text Input */}
          <div className="premium-watermark-control">
            <label className="premium-label">
              Watermark Text
            </label>
            <input
              type="text"
              value={watermarkSettings.text}
              onChange={(e) => handleSettingChange('text', e.target.value)}
              className="premium-text-input"
              placeholder="Enter watermark text..."
              maxLength={50}
            />
            <div className="premium-watermark-help">
              Examples: @username, yoursite.com, Company Name
            </div>
          </div>

          {/* Position Selector */}
          <PositionSelector
            selectedPosition={watermarkSettings.position}
            onPositionChange={(position) => handleSettingChange('position', position)}
            className="premium-watermark-control"
          />

          {/* Size Control */}
          <div className="premium-watermark-control">
            <label className="premium-label">
              Size
            </label>
            <div className="premium-size-options">
              {sizeOptions.map((option) => (
                <label 
                  key={option.value}
                  className={`premium-size-option ${watermarkSettings.size === option.value ? 'premium-size-option-selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="watermark-size"
                    value={option.value}
                    checked={watermarkSettings.size === option.value}
                    onChange={() => handleSettingChange('size', option.value)}
                    className="premium-size-radio"
                  />
                  <span className="premium-size-name">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Opacity Control */}
          <div className="premium-watermark-control">
            <label className="premium-label">
              Opacity: {Math.round(watermarkSettings.opacity * 100)}%
            </label>
            <div className="premium-slider-container">
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={watermarkSettings.opacity}
                onChange={(e) => handleSettingChange('opacity', parseFloat(e.target.value))}
                className="premium-slider"
              />
              <div className="premium-slider-labels">
                <span>10%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Color Control */}
          <div className="premium-watermark-control">
            <label className="premium-label">
              Color
            </label>
            <div className="premium-color-options">
              {colorPresets.map((preset) => (
                <label 
                  key={preset.value}
                  className={`premium-color-option ${watermarkSettings.color === preset.value ? 'premium-color-option-selected' : ''}`}
                  title={preset.description}
                >
                  <input
                    type="radio"
                    name="watermark-color"
                    value={preset.value}
                    checked={watermarkSettings.color === preset.value}
                    onChange={() => handleSettingChange('color', preset.value)}
                    className="premium-color-radio"
                  />
                  <div className="premium-color-preview">
                    {preset.value === 'auto' ? (
                      <div className="premium-color-auto">
                        <div className="premium-color-auto-light" />
                        <div className="premium-color-auto-dark" />
                      </div>
                    ) : preset.value === 'custom' ? (
                      <div className="premium-color-custom">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="13.5" cy="6.5" r=".5"/>
                          <circle cx="17.5" cy="10.5" r=".5"/>
                          <circle cx="8.5" cy="7.5" r=".5"/>
                          <circle cx="6.5" cy="12.5" r=".5"/>
                          <circle cx="12.5" cy="16.5" r=".5"/>
                          <circle cx="13.5" cy="20.5" r=".5"/>
                          <circle cx="9.5" cy="14.5" r=".5"/>
                          <circle cx="16.5" cy="17.5" r=".5"/>
                          <circle cx="11.5" cy="9.5" r=".5"/>
                        </svg>
                      </div>
                    ) : (
                      <div 
                        className="premium-color-swatch" 
                        style={{ backgroundColor: preset.value }}
                      />
                    )}
                  </div>
                  <span className="premium-color-name">{preset.label}</span>
                </label>
              ))}
            </div>

            {/* Custom Color Picker */}
            {watermarkSettings.color === 'custom' && (
              <div className="premium-custom-color-container">
                <input
                  type="color"
                  value={watermarkSettings.customColor}
                  onChange={(e) => handleSettingChange('customColor', e.target.value)}
                  className="premium-color-picker"
                />
                <input
                  type="text"
                  value={watermarkSettings.customColor}
                  onChange={(e) => handleSettingChange('customColor', e.target.value)}
                  className="premium-color-input"
                  placeholder="#000000"
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
              </div>
            )}
          </div>

          {/* Font Weight Control */}
          <div className="premium-watermark-control">
            <label className="premium-label">
              Font Weight
            </label>
            <div className="premium-weight-options">
              {fontWeightOptions.map((option) => (
                <label 
                  key={option.value}
                  className={`premium-weight-option ${watermarkSettings.fontWeight === option.value ? 'premium-weight-option-selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="watermark-weight"
                    value={option.value}
                    checked={watermarkSettings.fontWeight === option.value}
                    onChange={() => handleSettingChange('fontWeight', option.value)}
                    className="premium-weight-radio"
                  />
                  <span className="premium-weight-name">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatermarkPanel;