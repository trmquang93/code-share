import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MacOSWindow from './components/MacOSWindow';
import CodeEditor from './components/CodeEditor-simple';
import Sidebar from './components/Sidebar';
import WatermarkPreview from './components/WatermarkPreview';
import { sampleCode, placeholderText } from './data/sampleCode';
import { defaultTheme } from './data/themes';
import { detectLanguage } from './data/languages';
import { defaultExportSettings, defaultWatermarkSettings, exportCodeAsImage, downloadBlob, generateFilename, generateDisplayFilename, copyImageToClipboard, checkClipboardSupport } from './utils/exportUtils';

function App() {
  const [code, setCode] = useState(sampleCode);
  const [selectedTheme, setSelectedTheme] = useState(defaultTheme);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [exportSettings, setExportSettings] = useState(defaultExportSettings);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [clipboardSupport, setClipboardSupport] = useState(null);
  const [editorWidth, setEditorWidth] = useState(600);
  const [isDragging, setIsDragging] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [startLineNumber, setStartLineNumber] = useState(1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filename, setFilename] = useState('');
  const [isEditingFilename, setIsEditingFilename] = useState(false);
  const [showFilename, setShowFilename] = useState(true);
  const [watermarkSettings, setWatermarkSettings] = useState(defaultWatermarkSettings);

  // Check clipboard support on mount
  useEffect(() => {
    const support = checkClipboardSupport();
    setClipboardSupport(support);
  }, []);

  // Auto-update filename when language changes
  useEffect(() => {
    const currentLanguage = selectedLanguage || detectLanguage(code);
    const generatedFilename = generateDisplayFilename(currentLanguage);
    
    // Only update if user hasn't manually set a filename
    if (!filename || filename === generateDisplayFilename(detectLanguage(code))) {
      setFilename(generatedFilename);
    }
  }, [selectedLanguage, code, filename]);

  // Cleanup event listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', () => {});
      document.removeEventListener('mouseup', () => {});
    };
  }, []);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const element = document.getElementById('code-preview');
      if (!element) {
        throw new Error('Export element not found');
      }
      
      const currentLanguage = selectedLanguage || detectLanguage(code);
      const finalExportSettings = {
        ...exportSettings,
        watermark: watermarkSettings
      };
      
      const blob = await exportCodeAsImage('code-preview', finalExportSettings);
      const filename = generateFilename(currentLanguage, exportSettings.format);
      downloadBlob(blob, filename);
      
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed: ${error.message}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopy = async () => {
    setIsCopying(true);
    
    try {
      const finalExportSettings = {
        ...exportSettings,
        format: 'png', // Always use PNG for clipboard
        watermark: watermarkSettings
      };
      
      const result = await copyImageToClipboard('code-preview', finalExportSettings);
      
      // Show success feedback
      if (result.success) {
        showNotification(result.message, 'success');
      }
      
    } catch (error) {
      console.error('Copy failed:', error);
      showNotification(error.message, 'error');
    } finally {
      setIsCopying(false);
    }
  };

  // Resize functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const startX = e.clientX;
    const startWidth = editorWidth;
    
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newWidth = Math.max(400, Math.min(1200, startWidth + deltaX));
      setEditorWidth(newWidth);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Enhanced notification function with better UX
  const showNotification = (message, type = 'info') => {
    if (type === 'success') {
      // Create a temporary success message
      const successDiv = document.createElement('div');
      successDiv.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: #10B981;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 9999;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 14px;
          font-weight: 500;
        ">
          ✅ ${message}
        </div>
      `;
      document.body.appendChild(successDiv);
      
      // Remove after 3 seconds
      setTimeout(() => {
        if (successDiv.parentNode) {
          document.body.removeChild(successDiv);
        }
      }, 3000);
    } else if (type === 'error') {
      // Show error with additional context
      const errorMsg = `❌ ${message}`;
      
      // Check if it's a browser-specific issue
      if (clipboardSupport) {
        if (clipboardSupport.browserWarnings.firefox) {
          alert(errorMsg + '\n\n💡 Tip: Firefox has limited clipboard support. Try using Chrome or Safari, or use the Export button to download the image.');
        } else if (clipboardSupport.browserWarnings.safari && message.includes('denied')) {
          alert(errorMsg + '\n\n💡 Tip: In Safari, look for the clipboard permission icon in the address bar and click "Allow".');
        } else {
          alert(errorMsg);
        }
      } else {
        alert(errorMsg);
      }
    } else {
      alert(message);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header 
        onExport={handleExport}
        isExporting={isExporting}
        onCopy={clipboardSupport?.supported ? handleCopy : null}
        isCopying={isCopying}
        clipboardSupport={clipboardSupport}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <div style={{ flex: '1', display: 'flex' }}>
        <div style={{ 
          flex: '1', 
          padding: '32px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          position: 'relative'
        }}>
          <div 
            id="code-preview"
            style={{ 
              width: `${editorWidth + (exportSettings.padding * 2)}px`,
              backgroundColor: exportSettings.padding === 0 ? 'transparent' : exportSettings.backgroundColor,
              padding: `${exportSettings.padding}px`,
              filter: 'none',
              position: 'relative'
            }}
          >
            <MacOSWindow 
              theme={selectedTheme}
              filename={filename}
              onFilenameChange={setFilename}
              isEditingFilename={isEditingFilename}
              onEditingFilenameChange={setIsEditingFilename}
              showFilename={showFilename}
            >
              <CodeEditor
                code={code}
                onChange={setCode}
                language={selectedLanguage}
                theme={selectedTheme}
                placeholder={placeholderText}
                showLineNumbers={showLineNumbers}
                startLineNumber={startLineNumber}
              />
            </MacOSWindow>
            
            {/* Watermark Preview Overlay - Always show when enabled */}
            {watermarkSettings && watermarkSettings.enabled && (
              <WatermarkPreview 
                watermarkSettings={watermarkSettings}
                backgroundColor={exportSettings.backgroundColor}
                className="watermark-preview-overlay"
              />
            )}
            
            {/* Resize Handle */}
            <div
              style={{
                position: 'absolute',
                right: '-2px',
                top: '0',
                bottom: '0',
                width: '4px',
                backgroundColor: isDragging ? '#3B82F6' : 'transparent',
                cursor: 'col-resize',
                zIndex: 10,
                opacity: isDragging ? 1 : 0,
                transition: 'opacity 0.2s ease'
              }}
              onMouseDown={handleMouseDown}
              onMouseEnter={(e) => {
                e.target.style.opacity = '0.5';
                e.target.style.backgroundColor = '#3B82F6';
              }}
              onMouseLeave={(e) => {
                if (!isDragging) {
                  e.target.style.opacity = '0';
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            />
          </div>
        </div>
        
        <Sidebar
          selectedTheme={selectedTheme}
          onThemeChange={setSelectedTheme}
          selectedLanguage={selectedLanguage || detectLanguage(code)}
          onLanguageChange={setSelectedLanguage}
          backgroundColor={exportSettings.backgroundColor}
          onBackgroundColorChange={(color) => setExportSettings(prev => ({...prev, backgroundColor: color}))}
          exportSettings={exportSettings}
          onExportSettingsChange={setExportSettings}
          onExport={handleExport}
          isExporting={isExporting}
          editorWidth={editorWidth}
          onEditorWidthChange={setEditorWidth}
          showLineNumbers={showLineNumbers}
          onShowLineNumbersChange={setShowLineNumbers}
          startLineNumber={startLineNumber}
          onStartLineNumberChange={setStartLineNumber}
          filename={filename}
          onFilenameChange={setFilename}
          showFilename={showFilename}
          onShowFilenameChange={setShowFilename}
          watermarkSettings={watermarkSettings}
          onWatermarkSettingsChange={setWatermarkSettings}
          onCollapseChange={setSidebarCollapsed}
        />
      </div>
    </div>
  );
}

export default App;