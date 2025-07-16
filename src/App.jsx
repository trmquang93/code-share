import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MacOSWindow from './components/MacOSWindow';
import CodeEditor from './components/CodeEditor-simple';
import Sidebar from './components/Sidebar';
import { sampleCode, placeholderText } from './data/sampleCode';
import { defaultTheme } from './data/themes';
import { detectLanguage } from './data/languages';
import { defaultExportSettings, exportCodeAsImage, downloadBlob, generateFilename, copyImageToClipboard, checkClipboardSupport } from './utils/exportUtils';

function App() {
  const [code, setCode] = useState(sampleCode);
  const [selectedTheme, setSelectedTheme] = useState(defaultTheme);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [exportSettings, setExportSettings] = useState(defaultExportSettings);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [clipboardSupport, setClipboardSupport] = useState(null);

  // Check clipboard support on mount
  useEffect(() => {
    const support = checkClipboardSupport();
    setClipboardSupport(support);
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
        ...exportSettings
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
        format: 'png' // Always use PNG for clipboard
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
      />
      
      <div style={{ flex: '1', display: 'flex' }}>
        <div style={{ 
          flex: '1', 
          padding: '32px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div 
            id="code-preview"
            style={{ 
              width: '100%',
              maxWidth: '896px',
              backgroundColor: 'transparent',
              filter: 'none'
            }}
          >
            <MacOSWindow theme={selectedTheme}>
              <CodeEditor
                code={code}
                onChange={setCode}
                language={selectedLanguage}
                theme={selectedTheme}
                placeholder={placeholderText}
              />
            </MacOSWindow>
          </div>
        </div>
        
        <Sidebar
          selectedTheme={selectedTheme}
          onThemeChange={setSelectedTheme}
          selectedLanguage={selectedLanguage || detectLanguage(code)}
          onLanguageChange={setSelectedLanguage}
          exportSettings={exportSettings}
          onExportSettingsChange={setExportSettings}
          onExport={handleExport}
          isExporting={isExporting}
        />
      </div>
    </div>
  );
}

export default App;