import React from 'react';

const Header = ({ 
  onExport, 
  isExporting = false, 
  onCopy, 
  isCopying = false, 
  className = '', 
  sidebarCollapsed = false 
}) => {
  return (
    <header className={`premium-header ${sidebarCollapsed ? 'premium-header-sidebar-collapsed' : 'premium-header-sidebar-expanded'} ${className}`}>
      {/* Background blur effect */}
      <div className="premium-header-backdrop" />
      
      {/* Header content */}
      <div className="premium-header-content">
        <div className="premium-header-branding">
          <h1 className="premium-header-title">
            <span className="premium-header-title-gradient">Code Snippet Share</span>
          </h1>
          <p className="premium-header-subtitle">Transform your code into beautiful, shareable images</p>
        </div>
        
        <div className="premium-header-actions">
          {onCopy && (
            <button
              onClick={onCopy}
              disabled={isCopying || isExporting}
              className={`premium-header-btn premium-header-btn-secondary ${isCopying || isExporting ? 'premium-header-btn-disabled' : ''}`}
              title={isCopying ? 'Copying...' : 'Copy image to clipboard'}
            >
              <div className="premium-header-btn-content">
                {isCopying ? (
                  <>
                    <svg className="premium-header-btn-spinner" fill="none" viewBox="0 0 24 24">
                      <circle className="premium-header-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="premium-header-spinner-fill" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Copying...</span>
                  </>
                ) : (
                  <>
                    <svg className="premium-header-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </div>
            </button>
          )}
          
          <button
            onClick={onExport}
            disabled={isExporting || isCopying}
            className={`premium-header-btn premium-header-btn-primary ${isExporting || isCopying ? 'premium-header-btn-disabled' : ''}`}
          >
            <div className="premium-header-btn-content">
              {isExporting ? (
                <>
                  <svg className="premium-header-btn-spinner" fill="none" viewBox="0 0 24 24">
                    <circle className="premium-header-spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="premium-header-spinner-fill" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Exporting...</span>
                </>
              ) : (
                <>
                  <svg className="premium-header-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                  <span>Export Image</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;