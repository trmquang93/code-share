import React from 'react';
import { themes } from '../data/themes';

const MacOSWindow = ({ 
  children, 
  theme = 'vs-dark', 
  className = '',
  ...props 
}) => {
  const currentTheme = themes[theme];
  
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