import React, { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { 
  vscDarkPlus, 
  vs, 
  materialDark,
  oneDark,
  nord,
  dracula,
  ghcolors
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { detectLanguage } from '../data/languages';
import { themes } from '../data/themes';

const CodeEditor = ({ 
  code, 
  onChange, 
  language, 
  theme = 'vs-dark',
  placeholder = 'Paste your code here...',
  className = '',
  showLineNumbers = true,
  startLineNumber = 1
}) => {
  const textareaRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const currentTheme = themes[theme];

  // Get the detected language for highlighting
  const detectedLang = language || detectLanguage(code);
  const syntaxLang = getSyntaxHighlighterLanguage(detectedLang);

  // Map our themes to react-syntax-highlighter themes
  function getSyntaxHighlighterTheme(themeName) {
    const themeMap = {
      // Dark themes
      'vs-dark': vscDarkPlus,
      'monokai': materialDark,
      'dracula': dracula,
      'one-dark': oneDark,
      'material-dark': materialDark,
      'nord': nord,
      
      // Light themes
      'github-light': ghcolors,
      'solarized-light': vs,
      'vs-light': vs,
      'material-light': vs
    };
    return themeMap[themeName] || vscDarkPlus;
  }

  // Map our language names to react-syntax-highlighter language names
  function getSyntaxHighlighterLanguage(lang) {
    const langMap = {
      'javascript': 'javascript',
      'js': 'javascript',
      'typescript': 'typescript',
      'ts': 'typescript',
      'jsx': 'jsx',
      'tsx': 'tsx',
      'python': 'python',
      'py': 'python',
      'java': 'java',
      'c': 'c',
      'cpp': 'cpp',
      'c++': 'cpp',
      'go': 'go',
      'rust': 'rust',
      'php': 'php',
      'ruby': 'ruby',
      'swift': 'swift',
      'css': 'css',
      'scss': 'scss',
      'sass': 'sass',
      'json': 'json',
      'bash': 'bash',
      'shell': 'bash',
      'sh': 'bash',
      'markdown': 'markdown',
      'md': 'markdown',
      'html': 'markup',
      'xml': 'markup',
      'yaml': 'yaml',
      'yml': 'yaml',
      'sql': 'sql',
      'dockerfile': 'docker'
    };
    return langMap[lang?.toLowerCase()] || 'javascript';
  }

  const handleChange = (e) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleContainerClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      // Focus the textarea after a brief delay to ensure it's rendered
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 10);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    // Handle tab key for proper indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const textColor = currentTheme.type === 'dark' ? '#ffffff' : '#000000';
  const backgroundColor = currentTheme.codeBg;

  return (
    <div 
      className={`relative font-mono text-sm ${className}`}
      style={{ backgroundColor: backgroundColor, minHeight: '400px' }}
      onClick={handleContainerClick}
    >
      {isEditing ? (
        // Editing mode - show textarea
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          className="w-full h-full p-4 m-0 bg-transparent border-0 outline-0 resize-none font-mono"
          style={{ 
            fontSize: '14px',
            lineHeight: '1.5',
            fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, Menlo, Consolas, monospace',
            color: textColor,
            backgroundColor: 'transparent',
            minHeight: '400px'
          }}
          autoFocus
        />
      ) : (
        // Display mode - show syntax highlighted code
        <div className="w-full h-full" style={{ minHeight: '400px' }}>
          {code ? (
            <SyntaxHighlighter
              language={syntaxLang}
              style={getSyntaxHighlighterTheme(theme)}
              customStyle={{
                margin: 0,
                padding: '16px',
                backgroundColor: 'transparent',
                fontSize: '14px',
                lineHeight: '1.5',
                fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, Menlo, Consolas, monospace',
                minHeight: '400px',
                cursor: 'text'
              }}
              codeTagProps={{
                style: {
                  fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, Menlo, Consolas, monospace',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }
              }}
              showLineNumbers={showLineNumbers}
              startingLineNumber={startLineNumber}
              lineNumberStyle={{
                color: currentTheme.type === 'dark' ? '#6B7280' : '#9CA3AF',
                fontSize: '14px',
                fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, Menlo, Consolas, monospace',
                paddingRight: '16px',
                textAlign: 'right',
                userSelect: 'none'
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {code}
            </SyntaxHighlighter>
          ) : (
            // Show placeholder when no code
            <div 
              className="p-4 cursor-text"
              style={{
                fontSize: '14px',
                lineHeight: '1.5',
                fontFamily: 'SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, Menlo, Consolas, monospace',
                color: textColor + '60',
                minHeight: '400px'
              }}
            >
              {placeholder}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;