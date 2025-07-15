export const sampleCode = `// Welcome to Code Snippet Share!
// Paste your code here to get started

function createCodeSnippet(code, theme) {
  const snippet = {
    id: generateId(),
    code: code,
    theme: theme,
    language: detectLanguage(code),
    timestamp: new Date().toISOString()
  };
  
  return snippet;
}

// Export your formatted code as a beautiful image
// Perfect for sharing on social media!
export default createCodeSnippet;`;

export const placeholderText = "Paste your code here to get started";