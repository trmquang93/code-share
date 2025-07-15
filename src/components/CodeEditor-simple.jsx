import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import { detectLanguage } from '../data/languages';
import { themes } from '../data/themes';

// Import only essential Prism themes and languages
import 'prismjs/themes/prism.css';
import 'prismjs/themes/prism-dark.css';
import 'prismjs/themes/prism-tomorrow.css';

// Import only common, stable languages
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';

const CodeEditor = ({ 
  code, 
  onChange, 
  language, 
  theme = 'vs-dark',
  placeholder = 'Paste your code here...',
  className = ''
}) => {
  const textareaRef = useRef(null);
  const currentTheme = themes[theme];

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  // For now, let's just show the code with basic styling and proper colors
  const textColor = currentTheme.type === 'dark' ? '#ffffff' : '#000000';
  const backgroundColor = currentTheme.codeBg;

  return (
    <div 
      className={`relative font-mono text-sm ${className}`}
      style={{ backgroundColor: backgroundColor }}
    >
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        placeholder={placeholder}
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        className="relative w-full h-full p-4 m-0 bg-transparent border-0 outline-0 resize-none font-mono"
        style={{ 
          fontSize: '14px',
          lineHeight: '1.5',
          fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, Menlo, Consolas, monospace',
          color: textColor,
          backgroundColor: 'transparent',
          minHeight: '400px'
        }}
      />
    </div>
  );
};

export default CodeEditor;