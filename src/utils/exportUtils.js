import html2canvas from 'html2canvas';

export const exportFormats = {
  PNG: 'png',
  JPG: 'jpg'
};

export const defaultExportSettings = {
  format: exportFormats.PNG,
  width: 1920,
  backgroundColor: '#F5F5F5',
  padding: 64,
  quality: 1.0
};

export async function exportCodeAsImage(elementId, settings = {}) {
  const finalSettings = { ...defaultExportSettings, ...settings };
  
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id '${elementId}' not found`);
    }

    // Ensure element is visible and has content
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      throw new Error('Element has zero dimensions and cannot be captured');
    }

    // Wait a bit for any pending renders to complete
    await new Promise(resolve => setTimeout(resolve, 100));

    // Configure html2canvas options - simplified approach
    const options = {
      backgroundColor: finalSettings.backgroundColor,
      scale: 2, // High DPI for quality
      useCORS: true,
      allowTaint: true,
      logging: false, // Reduce console spam
      removeContainer: true,
      onclone: (clonedDoc) => {
        // Ensure all styles are preserved in the cloned document
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          let effectivePadding = finalSettings.padding;
          
          // Apply padding and positioning
          clonedElement.style.padding = `${effectivePadding}px`;
          clonedElement.style.margin = '0';
          clonedElement.style.transform = 'none';
          clonedElement.style.position = 'static';
          clonedElement.style.display = 'block';
          clonedElement.style.visibility = 'visible';
          
          // Remove any CSS filter to prevent conflicts
          clonedElement.style.filter = 'none';
          
          // Ensure fonts are properly loaded
          const originalTextareas = element.querySelectorAll('textarea');
          const clonedTextareas = clonedElement.querySelectorAll('textarea');
          
          clonedTextareas.forEach((textarea, index) => {
            textarea.style.fontFamily = 'SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, Menlo, Consolas, monospace';
            textarea.style.fontSize = '14px';
            textarea.style.lineHeight = '1.5';
            textarea.style.display = 'block';
            textarea.style.visibility = 'visible';
            textarea.style.opacity = '1';
            
            // Get computed style from original element
            if (originalTextareas[index]) {
              const computedStyle = getComputedStyle(originalTextareas[index]);
              textarea.style.color = computedStyle.color;
              textarea.style.backgroundColor = computedStyle.backgroundColor;
              textarea.style.minHeight = '400px';
              textarea.style.padding = '16px';
            }
          });
          
          // Ensure macos dots are visible
          const macOSDots = clonedElement.querySelectorAll('.macos-dot');
          macOSDots.forEach(dot => {
            if (dot.classList.contains('macos-dot-red')) {
              dot.style.backgroundColor = '#FF5F56';
            } else if (dot.classList.contains('macos-dot-yellow')) {
              dot.style.backgroundColor = '#FFBD2E';
            } else if (dot.classList.contains('macos-dot-green')) {
              dot.style.backgroundColor = '#27CA3F';
            }
            dot.style.width = '12px';
            dot.style.height = '12px';
            dot.style.borderRadius = '50%';
            dot.style.display = 'block';
          });
          
          // Ensure window styling is preserved
          const codeWindow = clonedElement.querySelector('.code-window');
          if (codeWindow) {
            codeWindow.style.borderRadius = '8px';
            codeWindow.style.overflow = 'hidden';
            codeWindow.style.display = 'block';
          }
          
          // Ensure titlebar styling
          const titlebar = clonedElement.querySelector('.code-window-titlebar');
          if (titlebar) {
            titlebar.style.height = '48px';
            titlebar.style.padding = '0 16px';
            titlebar.style.display = 'flex';
            titlebar.style.alignItems = 'center';
          }
          
          // Ensure dots container styling
          const dotsContainer = clonedElement.querySelector('.macos-dots');
          if (dotsContainer) {
            dotsContainer.style.display = 'flex';
            dotsContainer.style.gap = '8px';
          }
          
          // Ensure syntax highlighting is preserved in export
          const preSyntax = clonedElement.querySelectorAll('pre code');
          preSyntax.forEach(code => {
            code.style.display = 'block';
            code.style.visibility = 'visible';
          });

          // Handle react-syntax-highlighter elements
          const syntaxHighlighter = clonedElement.querySelectorAll('[class*="react-syntax-highlighter"]');
          syntaxHighlighter.forEach(highlighter => {
            highlighter.style.display = 'block';
            highlighter.style.visibility = 'visible';
          });

          // Ensure all spans with syntax highlighting are visible
          const syntaxSpans = clonedElement.querySelectorAll('span[style*="color"]');
          syntaxSpans.forEach(span => {
            span.style.display = 'inline';
            span.style.visibility = 'visible';
          });
        } else {
          console.error('Cloned element not found in cloned document');
        }
      }
    };

    // Generate canvas
    console.log('Starting html2canvas with options:', options);
    const canvas = await html2canvas(element, options);
    
    console.log('Canvas generated:', {
      width: canvas.width,
      height: canvas.height,
      hasContent: canvas.width > 0 && canvas.height > 0
    });
    
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Generated canvas has zero dimensions');
    }

    // Temporarily add canvas to page for debugging
    if (import.meta.env.DEV) {
      const debugCanvas = canvas.cloneNode(true);
      debugCanvas.style.position = 'fixed';
      debugCanvas.style.top = '10px';
      debugCanvas.style.right = '10px';
      debugCanvas.style.zIndex = '9999';
      debugCanvas.style.border = '2px solid red';
      debugCanvas.style.maxWidth = '300px';
      debugCanvas.style.maxHeight = '200px';
      debugCanvas.title = 'Debug: Generated Canvas';
      document.body.appendChild(debugCanvas);
      
      // Remove after 5 seconds
      setTimeout(() => {
        if (debugCanvas.parentNode) {
          document.body.removeChild(debugCanvas);
        }
      }, 5000);
    }
    
    // Convert to blob
    const format = finalSettings.format === exportFormats.JPG ? 'image/jpeg' : 'image/png';
    const quality = finalSettings.format === exportFormats.JPG ? finalSettings.quality : undefined;
    
    console.log('Converting to blob with format:', format);
    
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob && blob.size > 0) {
          console.log('Blob created successfully, size:', blob.size);
          resolve(blob);
        } else {
          console.error('Failed to create blob or blob is empty');
          reject(new Error('Failed to generate image'));
        }
      }, format, quality);
    });
    
  } catch (error) {
    console.error('Export error:', error);
    throw error;
  }
}

export function downloadBlob(blob, filename) {
  try {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none'; // Hide the link
    
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
}

export function generateFilename(language, format) {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  return `code-snippet-${language}-${timestamp}.${format}`;
}

// Generate display filename based on language
export function generateDisplayFilename(language) {
  const languageExtensions = {
    'javascript': 'main.js',
    'js': 'main.js',
    'typescript': 'main.ts',
    'ts': 'main.ts',
    'jsx': 'App.jsx',
    'tsx': 'App.tsx',
    'python': 'main.py',
    'py': 'main.py',
    'java': 'Main.java',
    'c': 'main.c',
    'cpp': 'main.cpp',
    'c++': 'main.cpp',
    'csharp': 'Program.cs',
    'go': 'main.go',
    'rust': 'main.rs',
    'php': 'index.php',
    'ruby': 'main.rb',
    'swift': 'main.swift',
    'kotlin': 'Main.kt',
    'scala': 'Main.scala',
    'css': 'styles.css',
    'scss': 'styles.scss',
    'sass': 'styles.sass',
    'less': 'styles.less',
    'json': 'data.json',
    'bash': 'script.sh',
    'shell': 'script.sh',
    'sh': 'script.sh',
    'powershell': 'script.ps1',
    'markdown': 'README.md',
    'md': 'README.md',
    'html': 'index.html',
    'xml': 'data.xml',
    'yaml': 'config.yaml',
    'yml': 'config.yml',
    'sql': 'query.sql',
    'dockerfile': 'Dockerfile',
    'plaintext': 'file.txt'
  };
  
  const normalizedLanguage = language?.toLowerCase() || 'javascript';
  return languageExtensions[normalizedLanguage] || 'main.js';
}

// Browser detection utilities
const isSafari = () => {
  return /^((?!chrome|android).)*safari/i.test(navigator?.userAgent);
};

const isFirefox = () => {
  return navigator.userAgent.indexOf("Firefox") >= 0;
};

// Check clipboard API support
export function checkClipboardSupport() {
  const isHttps = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
  const hasClipboardAPI = 'clipboard' in navigator && 'write' in navigator.clipboard;
  const hasClipboardItem = 'ClipboardItem' in window;
  
  return {
    supported: isHttps && hasClipboardAPI && hasClipboardItem,
    isHttps,
    hasClipboardAPI,
    hasClipboardItem,
    browserWarnings: {
      firefox: isFirefox(),
      safari: isSafari()
    }
  };
}

export async function copyImageToClipboard(elementId, settings = {}) {
  try {
    // Check browser support first
    const support = checkClipboardSupport();
    
    if (!support.supported) {
      let message = 'Clipboard copying not supported: ';
      if (!support.isHttps) message += 'HTTPS required. ';
      if (!support.hasClipboardAPI) message += 'Clipboard API not available. ';
      if (!support.hasClipboardItem) message += 'ClipboardItem not supported. ';
      throw new Error(message + 'Please use the Export button instead.');
    }

    // Firefox has limited support
    if (support.browserWarnings.firefox) {
      throw new Error('Firefox has limited clipboard image support. Please use the Export button to download the image.');
    }

    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    // Check permissions
    try {
      const permission = await navigator.permissions.query({ name: 'clipboard-write' });
      if (permission.state === 'denied') {
        throw new Error('Clipboard permission denied. Please allow clipboard access in your browser settings.');
      }
    } catch (permError) {
      // Permissions API might not be available, continue anyway
      console.warn('Permission check failed:', permError);
    }

    // Safari requires special Promise-based handling
    if (isSafari()) {
      return await copyImageToClipboardSafari(element, settings);
    } else {
      return await copyImageToClipboardStandard(element, settings);
    }
    
  } catch (error) {
    console.error('Copy to clipboard failed:', error);
    throw error;
  }
}

// Safari-specific implementation
async function copyImageToClipboardSafari(element, settings) {
  const createImagePromise = () => {
    return new Promise((resolve, reject) => {
      exportCodeAsImage(element.id, settings).then(blob => {
        if (blob) {
          resolve(new Blob([blob], { type: "image/png" }));
        } else {
          reject(new Error('Failed to create image blob'));
        }
      }).catch(reject);
    });
  };

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        "image/png": createImagePromise()
      })
    ]);
    
    console.log('Image copied to clipboard successfully (Safari)');
    return { success: true, message: 'Image copied to clipboard!' };
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      throw new Error('Clipboard access denied. Please allow clipboard access and try again.');
    } else if (error.name === 'NotFoundError') {
      throw new Error('Clipboard API not available. Please update your browser.');
    } else {
      throw new Error(`Copy failed: ${error.message}`);
    }
  }
}

// Standard implementation for Chrome and other browsers
async function copyImageToClipboardStandard(element, settings) {
  try {
    const blob = await exportCodeAsImage(element.id, settings);
    
    if (!blob) {
      throw new Error('Failed to generate image');
    }

    const clipboardItem = new ClipboardItem({
      [blob.type]: blob
    });

    await navigator.clipboard.write([clipboardItem]);
    console.log('Image copied to clipboard successfully');
    return { success: true, message: 'Image copied to clipboard!' };
    
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      throw new Error('Clipboard access denied. Please allow clipboard access and try again.');
    } else if (error.name === 'SecurityError') {
      throw new Error('Clipboard access requires HTTPS and user interaction.');
    } else if (error.name === 'NotFoundError') {
      throw new Error('Clipboard API not available. Please update your browser.');
    } else {
      throw new Error(`Copy failed: ${error.message}`);
    }
  }
}