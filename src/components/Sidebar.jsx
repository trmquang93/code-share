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
  editorWidth,
  onEditorWidthChange,
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
          
          {/* Width Control */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Editor Width
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="400"
                max="1200"
                value={editorWidth}
                onChange={(e) => onEditorWidthChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-gray-500 text-center">
                {editorWidth}px
              </div>
            </div>
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