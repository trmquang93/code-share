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
  const highlightRef = useRef(null);
  const [detectedLanguage, setDetectedLanguage] = useState(language || 'javascript');
  const currentTheme = themes[theme];

  // Update detected language when code changes
  useEffect(() => {
    if (code && !language) {
      const detected = detectLanguage(code);
      setDetectedLanguage(detected);
    } else if (language) {
      setDetectedLanguage(language);
    }
  }, [code, language]);

  // Highlight code
  useEffect(() => {
    if (highlightRef.current && code) {
      try {
        // Map language names to Prism language keys
        let prismLanguage = detectedLanguage;
        
        // Handle language mapping
        const languageMap = {
          'javascript': 'javascript',
          'typescript': 'typescript', 
          'python': 'python',
          'java': 'java',
          'cpp': 'javascript', // fallback
          'c': 'javascript', // fallback
          'csharp': 'javascript', // fallback
          'go': 'javascript', // fallback
          'rust': 'javascript', // fallback
          'php': 'javascript', // fallback
          'ruby': 'javascript', // fallback
          'swift': 'javascript', // fallback
          'kotlin': 'javascript', // fallback
          'scala': 'javascript', // fallback
          'css': 'css',
          'scss': 'css',
          'sass': 'css',
          'less': 'css',
          'bash': 'bash',
          'powershell': 'bash',
          'json': 'json',
          'yaml': 'javascript', // fallback
          'xml': 'markup',
          'html': 'markup',
          'markdown': 'markdown',
          'sql': 'javascript', // fallback
          'plaintext': 'javascript'
        };
        
        prismLanguage = languageMap[detectedLanguage] || 'javascript';
        
        const grammar = Prism.languages[prismLanguage];
        if (grammar) {
          const highlighted = Prism.highlight(code, grammar, prismLanguage);
          highlightRef.current.innerHTML = highlighted;
          // Add the appropriate Prism theme class
          highlightRef.current.className = `absolute inset-0 p-4 m-0 overflow-hidden pointer-events-none whitespace-pre-wrap break-words language-${prismLanguage}`;
        } else {
          const highlighted = Prism.highlight(code, Prism.languages.javascript, 'javascript');
          highlightRef.current.innerHTML = highlighted;
          highlightRef.current.className = `absolute inset-0 p-4 m-0 overflow-hidden pointer-events-none whitespace-pre-wrap break-words language-javascript`;
        }
      } catch (error) {
        console.warn('Highlighting error:', error);
        highlightRef.current.textContent = code;
      }
    }
  }, [code, detectedLanguage]);

  // Sync scroll between textarea and highlighted code
  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div 
      className={`relative font-mono text-sm ${className}`}
      style={{ backgroundColor: currentTheme.codeBg }}
    >
      {/* Syntax highlighted background */}
      <pre 
        ref={highlightRef}
        className="absolute inset-0 p-4 m-0 overflow-hidden pointer-events-none whitespace-pre-wrap break-words"
        style={{ 
          backgroundColor: 'transparent',
          fontSize: '14px',
          lineHeight: '1.5',
          fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, Menlo, Consolas, monospace'
        }}
        aria-hidden="true"
      />
      
      {/* Code input textarea */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        onScroll={handleScroll}
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
          caretColor: currentTheme.type === 'dark' ? '#ffffff' : '#000000',
          minHeight: '400px',
          color: 'transparent',
          backgroundColor: 'transparent'
        }}
      />
    </div>
  );
};

export default CodeEditor;