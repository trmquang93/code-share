import React from 'react';
import { themes } from '../data/themes';

const MacOSWindow = ({ 
  children, 
  theme = 'vs-dark', 
  className = '',
  filename = '',
  onFilenameChange = () => {},
  isEditingFilename = false,
  onEditingFilenameChange = () => {},
  showFilename = true,
  ...props 
}) => {
  const currentTheme = themes[theme];
  
  const handleFilenameClick = () => {
    onEditingFilenameChange(true);
  };
  
  const handleFilenameChange = (e) => {
    onFilenameChange(e.target.value);
  };
  
  const handleFilenameKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEditingFilenameChange(false);
    } else if (e.key === 'Escape') {
      onEditingFilenameChange(false);
    }
  };
  
  const handleFilenameBlur = () => {
    onEditingFilenameChange(false);
  };
  
  return (
    <div 
      className={`code-window ${className}`}
      style={{ backgroundColor: currentTheme.windowBg }}
      {...props}
    >
      {/* macOS Title Bar */}
      <div 
        className="code-window-titlebar"
        style={{ backgroundColor: currentTheme.titlebarBg }}
      >
        <div className="macos-dots">
          <div className="macos-dot macos-dot-red" />
          <div className="macos-dot macos-dot-yellow" />
          <div className="macos-dot macos-dot-green" />
        </div>
        
        {/* Filename Display */}
        {showFilename && (
          <div className="macos-filename-container">
            {isEditingFilename ? (
              <input
                type="text"
                value={filename}
                onChange={handleFilenameChange}
                onKeyDown={handleFilenameKeyDown}
                onBlur={handleFilenameBlur}
                className="macos-filename-input"
                style={{ 
                  color: currentTheme.type === 'dark' ? '#ffffff' : '#000000',
                  backgroundColor: currentTheme.type === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }}
                autoFocus
              />
            ) : (
              <div 
                className="macos-filename-display"
                onClick={handleFilenameClick}
                style={{ 
                  color: currentTheme.type === 'dark' ? '#ffffff' : '#000000'
                }}
              >
                {filename || 'Untitled'}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div 
        className="relative"
        style={{ backgroundColor: currentTheme.codeBg }}
      >
        {children}
      </div>
    </div>
  );
};

export default MacOSWindow;