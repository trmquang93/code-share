import React, { useState } from 'react';
import Header from './components/Header';
import MacOSWindow from './components/MacOSWindow';
import CodeEditor from './components/CodeEditor-simple';

function App() {
  const [code, setCode] = useState(`// Test code
function hello() {
  console.log("Hello World!");
  return "success";
}`);

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
        <h1>Testing CodeEditor Component</h1>
        <div style={{ maxWidth: '800px', margin: '20px 0' }}>
          <MacOSWindow theme="vs-dark">
            <CodeEditor
              code={code}
              onChange={setCode}
              theme="vs-dark"
              placeholder="Type your code here..."
            />
          </MacOSWindow>
        </div>
      </div>
    </div>
  );
}

export default App;