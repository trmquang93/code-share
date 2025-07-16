import React from 'react';

const Header = ({ onExport, isExporting = false, onCopy, isCopying = false, clipboardSupport, className = '' }) => {
  return (
    <header className={`bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between ${className}`}>
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Code Snippet Share</h1>
        <p className="text-sm text-gray-600">Transform your code into beautiful, shareable images</p>
      </div>
      
      <div className="flex items-center space-x-3">
        {onCopy && (
          <button
            onClick={onCopy}
            disabled={isCopying || isExporting}
            className={`btn-secondary ${isCopying || isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isCopying ? 'Copying...' : 'Copy image to clipboard'}
          >
          {isCopying ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Copying...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </span>
          )}
          </button>
        )}
        
        <button
          onClick={onExport}
          disabled={isExporting || isCopying}
          className={`btn-primary ${isExporting || isCopying ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isExporting ? (
            <span className="flex items-center space-x-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Exporting...</span>
            </span>
          ) : (
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
              <span>Export Image</span>
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;