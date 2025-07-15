import React from 'react';
import Header from './components/Header';
import MacOSWindow from './components/MacOSWindow';

function App() {
  const handleExport = () => {
    console.log('Export clicked');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Header 
        onExport={handleExport}
        isExporting={false}
      />
      <div style={{ padding: '20px' }}>
        <h1>Testing MacOSWindow Component</h1>
        <div style={{ maxWidth: '600px', margin: '20px 0' }}>
          <MacOSWindow theme="vs-dark">
            <div style={{ padding: '20px', color: 'white' }}>
              <h2>Test Content</h2>
              <p>This is inside the macOS window!</p>
              <code>console.log('Hello World!');</code>
            </div>
          </MacOSWindow>
        </div>
      </div>
    </div>
  );
}

export default App;