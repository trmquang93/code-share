import React from 'react';
import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';
import ExportPanel from './ExportPanel';

const Sidebar = ({ 
  selectedTheme,
  onThemeChange,
  selectedLanguage,
  onLanguageChange,
  exportSettings,
  onExportSettingsChange,
  onExport,
  isExporting,
  shadow,
  onShadowChange,
  className = ''
}) => {
  return (
    <div className={`w-80 bg-white border-l border-gray-200 p-6 space-y-8 overflow-y-auto ${className}`}>
      {/* Appearance Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h2>
        <div className="space-y-6">
          <ThemeSelector
            selectedTheme={selectedTheme}
            onThemeChange={onThemeChange}
          />
          
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
          />
          
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={shadow}
                onChange={(e) => onShadowChange(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Drop Shadow</span>
            </label>
          </div>
        </div>
      </div>

      {/* Export Settings Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Export Settings</h2>
        <ExportPanel
          exportSettings={exportSettings}
          onExportSettingsChange={onExportSettingsChange}
          onExport={onExport}
          isExporting={isExporting}
        />
      </div>
    </div>
  );
};

export default Sidebar;