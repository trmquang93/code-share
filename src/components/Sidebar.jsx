import React, { useState, useRef, useEffect } from 'react';
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
  showLineNumbers,
  onShowLineNumbersChange,
  startLineNumber,
  onStartLineNumberChange,
  filename,
  onFilenameChange,
  showFilename,
  onShowFilenameChange,
  className = '',
  onCollapseChange
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    appearance: true,
    export: true
  });
  const sidebarRef = useRef(null);

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    // Notify parent component about collapse state change
    if (onCollapseChange) {
      onCollapseChange(newCollapsed);
    }
  };

  const closeSidebar = () => {
    setIsCollapsed(true);
    if (onCollapseChange) {
      onCollapseChange(true);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle responsive behavior with systematic control management
  useEffect(() => {
    const handleResize = () => {
      const newCollapsed = window.innerWidth < 1024;
      setIsCollapsed(newCollapsed);
      // Notify parent component about collapse state change
      if (onCollapseChange) {
        onCollapseChange(newCollapsed);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => window.removeEventListener('resize', handleResize);
  }, [onCollapseChange]);

  // Handle keyboard events (Escape key to close sidebar)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isCollapsed && window.innerWidth < 1024) {
        setIsCollapsed(true);
        if (onCollapseChange) {
          onCollapseChange(true);
        }
      }
    };

    if (!isCollapsed && window.innerWidth < 1024) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isCollapsed, onCollapseChange]);
  
  /*
   * SYSTEMATIC SIDEBAR CONTROL DESIGN
   * 
   * Desktop (≥1024px):
   * - Only shows: Desktop collapse button (arrow) in sidebar header
   * - Behavior: Collapses sidebar to 60px width, header adjusts margin
   * - Hover expand zone when collapsed
   * 
   * Mobile/Tablet (<1024px):
   * - Primary: Floating toggle button (top-right)
   * - Secondary: Close button in sidebar header (when open)
   * - Tertiary: Backdrop dismiss, escape key
   * - Behavior: Shows/hides sidebar as overlay
   */
  
  return (
    <>
      {/* Mobile/Tablet Toggle Button - Hidden on Desktop */}
      <button
        onClick={toggleCollapse}
        className="fixed top-4 right-4 z-50 lg:hidden premium-sidebar-toggle"
        aria-label={isCollapsed ? 'Open sidebar' : 'Close sidebar'}
      >
        {isCollapsed ? (
          <svg 
            className="w-6 h-6 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ) : (
          <svg 
            className="w-6 h-6 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm z-30 lg:hidden premium-backdrop"
          onClick={closeSidebar}
          aria-label="Close sidebar"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              closeSidebar();
            }
          }}
        />
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`premium-sidebar ${isCollapsed ? 'premium-sidebar-collapsed' : 'premium-sidebar-expanded'} ${className}`}
      >
        {/* Sidebar Header */}
        <div className="premium-sidebar-header">
          <div className="flex items-center justify-between">
            <h1 className={`premium-sidebar-title ${isCollapsed ? 'premium-sidebar-title-collapsed' : ''}`}>Settings</h1>
            
            {/* Desktop Only: Collapse Button (Arrow) */}
            <button
              onClick={toggleCollapse}
              className="premium-collapse-btn premium-collapse-btn-desktop hidden lg:flex"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Mobile Only: Close Button (X) - Only visible when sidebar is open */}
            <button
              onClick={closeSidebar}
              className="premium-mobile-close-btn lg:hidden block"
              title="Close sidebar"
              aria-label="Close sidebar"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Collapsed State Hover Expand Zone */}
        {isCollapsed && (
          <div 
            className="premium-collapse-hover-zone"
            onClick={toggleCollapse}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCollapse();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Expand sidebar"
            title="Click to expand sidebar"
          >
            <div className="premium-collapse-hint">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}

        {/* Sidebar Content */}
        <div className={`premium-sidebar-content ${isCollapsed ? 'premium-sidebar-content-collapsed' : ''}`}>
          {/* Appearance Section */}
          <div className="premium-section">
            <button 
              onClick={() => toggleSection('appearance')}
              className="premium-section-header"
              aria-expanded={expandedSections.appearance}
            >
              <h2 className="premium-section-title">Appearance</h2>
              <svg 
                className={`premium-section-arrow ${expandedSections.appearance ? 'premium-section-arrow-expanded' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`premium-section-content ${expandedSections.appearance ? 'premium-section-content-expanded' : 'premium-section-content-collapsed'}`}>
              <div className="premium-controls-grid">
                <ThemeSelector
                  selectedTheme={selectedTheme}
                  onThemeChange={onThemeChange}
                  className="premium-control-item"
                />
                
                <LanguageSelector
                  selectedLanguage={selectedLanguage}
                  onLanguageChange={onLanguageChange}
                  className="premium-control-item"
                />
                
                {/* Width Control */}
                <div className="premium-control-item">
                  <label className="premium-label">
                    Editor Width
                  </label>
                  <div className="premium-slider-container">
                    <input
                      type="range"
                      min="400"
                      max="1200"
                      value={editorWidth}
                      onChange={(e) => onEditorWidthChange(Number(e.target.value))}
                      className="premium-slider"
                    />
                    <div className="premium-slider-value">
                      {editorWidth}px
                    </div>
                  </div>
                </div>

                {/* Line Numbers Control */}
                <div className="premium-control-item">
                  <label className="premium-label">
                    Line Numbers
                  </label>
                  <div className="premium-line-numbers-control">
                    {/* Toggle Switch */}
                    <div className="premium-toggle-container">
                      <span className="premium-toggle-label">Show line numbers</span>
                      <button
                        onClick={() => onShowLineNumbersChange(!showLineNumbers)}
                        className={`premium-toggle ${showLineNumbers ? 'premium-toggle-on' : 'premium-toggle-off'}`}
                        role="switch"
                        aria-checked={showLineNumbers}
                      >
                        <span className={`premium-toggle-thumb ${showLineNumbers ? 'premium-toggle-thumb-on' : 'premium-toggle-thumb-off'}`} />
                      </button>
                    </div>
                    
                    {/* Starting Line Number */}
                    <div className={`premium-line-number-input ${showLineNumbers ? 'premium-line-number-input-visible' : 'premium-line-number-input-hidden'}`}>
                      <label className="premium-sublabel">
                        Starting line number
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="999"
                        value={startLineNumber}
                        onChange={(e) => onStartLineNumberChange(Math.max(1, Math.min(999, Number(e.target.value) || 1)))}
                        className="premium-number-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Filename Control */}
                <div className="premium-control-item">
                  <label className="premium-label">
                    Filename
                  </label>
                  <div className="premium-filename-control">
                    {/* Toggle Switch */}
                    <div className="premium-toggle-container">
                      <span className="premium-toggle-label">Show filename in header</span>
                      <button
                        onClick={() => onShowFilenameChange(!showFilename)}
                        className={`premium-toggle ${showFilename ? 'premium-toggle-on' : 'premium-toggle-off'}`}
                        role="switch"
                        aria-checked={showFilename}
                      >
                        <span className={`premium-toggle-thumb ${showFilename ? 'premium-toggle-thumb-on' : 'premium-toggle-thumb-off'}`} />
                      </button>
                    </div>
                    
                    {/* Filename Input */}
                    <div className={`premium-filename-input-container ${showFilename ? 'premium-filename-input-visible' : 'premium-filename-input-hidden'}`}>
                      <input
                        type="text"
                        value={filename}
                        onChange={(e) => onFilenameChange(e.target.value)}
                        className="premium-filename-input"
                        placeholder="Enter filename..."
                        disabled={!showFilename}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Export Settings Section */}
          <div className="premium-section">
            <button 
              onClick={() => toggleSection('export')}
              className="premium-section-header"
              aria-expanded={expandedSections.export}
            >
              <h2 className="premium-section-title">Export Settings</h2>
              <svg 
                className={`premium-section-arrow ${expandedSections.export ? 'premium-section-arrow-expanded' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`premium-section-content ${expandedSections.export ? 'premium-section-content-expanded' : 'premium-section-content-collapsed'}`}>
              <ExportPanel
                exportSettings={exportSettings}
                onExportSettingsChange={onExportSettingsChange}
                onExport={onExport}
                isExporting={isExporting}
                className="premium-export-panel"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="premium-sidebar-footer">
          <div className="premium-footer-content">
            Made with precision
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;