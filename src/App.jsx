import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MacOSWindow from './components/MacOSWindow';
import CodeEditor from './components/CodeEditor-simple';
import Sidebar from './components/Sidebar';
import { sampleCode, placeholderText } from './data/sampleCode';
import { defaultTheme } from './data/themes';
import { detectLanguage } from './data/languages';
import { defaultExportSettings, exportCodeAsImage, downloadBlob, generateFilename } from './utils/exportUtils';

function App() {
  const [code, setCode] = useState(sampleCode);
  const [selectedTheme, setSelectedTheme] = useState(defaultTheme);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [shadow, setShadow] = useState(false);
  const [exportSettings, setExportSettings] = useState(defaultExportSettings);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const currentLanguage = selectedLanguage || detectLanguage(code);
      const finalExportSettings = {
        ...exportSettings,
        shadow
      };
      
      const blob = await exportCodeAsImage('code-preview', finalExportSettings);
      const filename = generateFilename(currentLanguage, exportSettings.format);
      downloadBlob(blob, filename);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
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
              filter: shadow ? 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))' : 'none'
            }}
          >
            <MacOSWindow theme={selectedTheme} shadow={false}>
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
          shadow={shadow}
          onShadowChange={setShadow}
        />
      </div>
    </div>
  );
}

export default App;