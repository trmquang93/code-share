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
    <div className={`space-y-6 ${className}`}>
      {/* Background Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <div className="space-y-2">
          {/* Predefined colors */}
          <div className="grid grid-cols-4 gap-2">
            {predefinedColors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorChange(color.value)}
                className={`w-8 h-8 rounded border-2 ${
                  exportSettings.backgroundColor === color.value 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          
          {/* Custom color picker */}
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#F5F5F5"
            />
          </div>
        </div>
      </div>

      {/* Image Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Width
        </label>
        <select
          value={exportSettings.width}
          onChange={(e) => handleSettingChange('width', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={1280}>1280px (720p)</option>
          <option value={1920}>1920px (1080p)</option>
          <option value={2560}>2560px (1440p)</option>
          <option value={3840}>3840px (4K)</option>
        </select>
      </div>

      {/* Padding */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Padding: {exportSettings.padding}px
        </label>
        <input
          type="range"
          min="0"
          max="128"
          step="8"
          value={exportSettings.padding}
          onChange={(e) => handleSettingChange('padding', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0px</span>
          <span>128px</span>
        </div>
      </div>

      {/* Format */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Format
        </label>
        <div className="space-y-2">
          {Object.entries(exportFormats).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="radio"
                name="format"
                value={value}
                checked={exportSettings.format === value}
                onChange={() => handleSettingChange('format', value)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{key}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Quality for JPG */}
      {exportSettings.format === exportFormats.JPG && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality: {Math.round(exportSettings.quality * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={exportSettings.quality}
            onChange={(e) => handleSettingChange('quality', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10%</span>
            <span>100%</span>
          </div>
        </div>
      )}

      {/* Shadow Toggle */}
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={exportSettings.shadow}
            onChange={(e) => handleSettingChange('shadow', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Drop Shadow</span>
        </label>
      </div>

      {/* Export Button */}
      <button
        onClick={onExport}
        disabled={isExporting}
        className={`w-full btn-primary ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isExporting ? (
          <span className="flex items-center justify-center space-x-2">
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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