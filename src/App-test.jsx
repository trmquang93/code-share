import React from 'react';
import Header from './components/Header';

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
        <h1>Testing Header Component</h1>
        <p>If you see the header above, the Header component is working!</p>
      </div>
    </div>
  );
}

export default App;