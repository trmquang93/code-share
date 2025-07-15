export const languages = [
  // Popular languages first
  { id: 'javascript', name: 'JavaScript', extensions: ['.js', '.jsx', '.mjs'] },
  { id: 'typescript', name: 'TypeScript', extensions: ['.ts', '.tsx'] },
  { id: 'python', name: 'Python', extensions: ['.py', '.pyx', '.pyi'] },
  { id: 'java', name: 'Java', extensions: ['.java'] },
  { id: 'cpp', name: 'C++', extensions: ['.cpp', '.cc', '.cxx', '.h', '.hpp'] },
  { id: 'c', name: 'C', extensions: ['.c', '.h'] },
  { id: 'csharp', name: 'C#', extensions: ['.cs'] },
  { id: 'go', name: 'Go', extensions: ['.go'] },
  { id: 'rust', name: 'Rust', extensions: ['.rs'] },
  { id: 'php', name: 'PHP', extensions: ['.php', '.phtml'] },
  { id: 'ruby', name: 'Ruby', extensions: ['.rb', '.rbw'] },
  { id: 'swift', name: 'Swift', extensions: ['.swift'] },
  { id: 'kotlin', name: 'Kotlin', extensions: ['.kt', '.kts'] },
  { id: 'scala', name: 'Scala', extensions: ['.scala', '.sc'] },
  
  // Web languages
  { id: 'html', name: 'HTML', extensions: ['.html', '.htm'] },
  { id: 'css', name: 'CSS', extensions: ['.css'] },
  { id: 'scss', name: 'SCSS', extensions: ['.scss'] },
  { id: 'sass', name: 'Sass', extensions: ['.sass'] },
  { id: 'less', name: 'Less', extensions: ['.less'] },
  
  // Shell and config
  { id: 'bash', name: 'Bash', extensions: ['.sh', '.bash'] },
  { id: 'powershell', name: 'PowerShell', extensions: ['.ps1'] },
  { id: 'json', name: 'JSON', extensions: ['.json'] },
  { id: 'yaml', name: 'YAML', extensions: ['.yml', '.yaml'] },
  { id: 'xml', name: 'XML', extensions: ['.xml'] },
  { id: 'toml', name: 'TOML', extensions: ['.toml'] },
  
  // Other languages
  { id: 'sql', name: 'SQL', extensions: ['.sql'] },
  { id: 'r', name: 'R', extensions: ['.r', '.R'] },
  { id: 'matlab', name: 'MATLAB', extensions: ['.m'] },
  { id: 'perl', name: 'Perl', extensions: ['.pl', '.pm'] },
  { id: 'lua', name: 'Lua', extensions: ['.lua'] },
  { id: 'dart', name: 'Dart', extensions: ['.dart'] },
  { id: 'elixir', name: 'Elixir', extensions: ['.ex', '.exs'] },
  { id: 'haskell', name: 'Haskell', extensions: ['.hs'] },
  { id: 'clojure', name: 'Clojure', extensions: ['.clj', '.cljs'] },
  { id: 'erlang', name: 'Erlang', extensions: ['.erl'] },
  { id: 'vim', name: 'Vim', extensions: ['.vim'] },
  { id: 'dockerfile', name: 'Dockerfile', extensions: ['Dockerfile'] },
  { id: 'makefile', name: 'Makefile', extensions: ['Makefile', 'makefile'] },
  { id: 'markdown', name: 'Markdown', extensions: ['.md', '.markdown'] },
  { id: 'latex', name: 'LaTeX', extensions: ['.tex'] },
  { id: 'graphql', name: 'GraphQL', extensions: ['.graphql', '.gql'] },
  { id: 'regex', name: 'Regex', extensions: [] },
  { id: 'plaintext', name: 'Plain Text', extensions: ['.txt'] }
];

export const defaultLanguage = 'javascript';

// Language detection patterns
export const languageDetection = {
  'javascript': [
    /\b(function|const|let|var|=&gt;|import|export|require)\b/,
    /\bconsole\.log\b/,
    /\b(async|await)\b/,
    /\$\{.*\}/,
    /\bnew\s+\w+\(/
  ],
  'typescript': [
    /\b(interface|type|enum|namespace)\b/,
    /:\s*(string|number|boolean|object|any)\b/,
    /\bimport.*from\s+['"].*['"]/,
    /\bexport\s+(interface|type|enum|class)\b/
  ],
  'python': [
    /\b(def|class|import|from|if\s+__name__\s+==\s+['"']__main__['"'])\b/,
    /\bprint\s*\(/,
    /\bself\b/,
    /:\s*$/m,
    /\b(elif|except|finally)\b/
  ],
  'java': [
    /\b(public|private|protected|static|final|class|interface)\b/,
    /\bSystem\.out\.println\b/,
    /\bpublic\s+static\s+void\s+main\b/,
    /\bpackage\s+[\w.]+;/,
    /\bimport\s+[\w.]+\*/
  ],
  'cpp': [
    /\b(#include|using\s+namespace|std::)\b/,
    /\bcout\s*&lt;&lt;/,
    /\bint\s+main\s*\(/,
    /\bclass\s+\w+\s*{/,
    /\bvoid\s+\w+\s*\(/
  ],
  'c': [
    /\b(#include|stdio\.h|stdlib\.h|printf|scanf)\b/,
    /\bint\s+main\s*\(/,
    /\bstruct\s+\w+/,
    /\bmalloc\s*\(/,
    /\bfree\s*\(/
  ],
  'csharp': [
    /\b(using\s+System|namespace|class|public\s+static\s+void\s+Main)\b/,
    /\bConsole\.WriteLine\b/,
    /\bpublic\s+class\s+\w+/,
    /\bvar\s+\w+\s*=/,
    /\bstring\[\]\s+args\b/
  ],
  'go': [
    /\b(package\s+main|import|func\s+main|fmt\.Print)\b/,
    /\bvar\s+\w+\s+\w+/,
    /\bfunc\s+\w+\s*\(/,
    /\bgo\s+\w+\s*\(/,
    /\bdefer\s+\w+/
  ],
  'rust': [
    /\b(fn\s+main|let\s+mut|println!|use\s+std::)\b/,
    /\bfn\s+\w+\s*\(/,
    /\bimpl\s+\w+/,
    /\bstruct\s+\w+/,
    /\bmatch\s+\w+/
  ],
  'php': [
    /&lt;\?php/,
    /\becho\s+/,
    /\$\w+/,
    /\bfunction\s+\w+\s*\(/,
    /\bclass\s+\w+/
  ],
  'ruby': [
    /\b(def|class|module|require|puts|print)\b/,
    /\bend\b/,
    /\b(if|elsif|else|unless|while|until|for|in)\b/,
    /\bdo\s*\|.*\|/,
    /\b@\w+/
  ],
  'swift': [
    /\b(import\s+Foundation|func|var|let|class|struct)\b/,
    /\bprint\s*\(/,
    /\boverride\s+func/,
    /\bextension\s+\w+/,
    /\bprotocol\s+\w+/
  ],
  'html': [
    /&lt;!DOCTYPE\s+html&gt;/i,
    /&lt;html[^&gt;]*&gt;/i,
    /&lt;head[^&gt;]*&gt;/i,
    /&lt;body[^&gt;]*&gt;/i,
    /&lt;\/\w+&gt;/
  ],
  'css': [
    /\{\s*[\w-]+\s*:\s*[^}]+\s*\}/,
    /\@media\s*\(/,
    /\#\w+\s*\{/,
    /\.\w+\s*\{/,
    /\w+\s*\{/
  ],
  'json': [
    /^\s*\{/,
    /^\s*\[/,
    /"\w+"\s*:\s*"/,
    /"\w+"\s*:\s*\d+/,
    /"\w+"\s*:\s*(true|false|null)/
  ],
  'yaml': [
    /^\s*\w+\s*:\s*$/m,
    /^\s*-\s+\w+/m,
    /^\s*\w+\s*:\s*\w+/m,
    /---/,
    /^\s*#/m
  ],
  'sql': [
    /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|TABLE|DATABASE)\b/i,
    /\b(JOIN|LEFT|RIGHT|INNER|OUTER)\b/i,
    /\b(ORDER\s+BY|GROUP\s+BY|HAVING)\b/i,
    /\b(PRIMARY\s+KEY|FOREIGN\s+KEY|INDEX)\b/i
  ],
  'bash': [
    /^#!/,
    /\$\{?\w+\}?/,
    /\becho\s+/,
    /\bif\s+\[/,
    /\bfor\s+\w+\s+in\b/
  ]
};

export function detectLanguage(code) {
  if (!code || code.trim().length === 0) return defaultLanguage;
  
  let scores = {};
  
  // Initialize scores
  Object.keys(languageDetection).forEach(lang => {
    scores[lang] = 0;
  });
  
  // Score based on pattern matches
  Object.entries(languageDetection).forEach(([language, patterns]) => {
    patterns.forEach(pattern => {
      const matches = code.match(pattern);
      if (matches) {
        scores[language] += matches.length;
      }
    });
  });
  
  // Find the highest scoring language
  const maxScore = Math.max(...Object.values(scores));
  
  if (maxScore === 0) {
    return defaultLanguage;
  }
  
  const detectedLanguage = Object.keys(scores).find(lang => scores[lang] === maxScore);
  return detectedLanguage || defaultLanguage;
}

export function searchLanguages(query) {
  if (!query) return languages;
  
  const lowerQuery = query.toLowerCase();
  return languages.filter(lang => 
    lang.name.toLowerCase().includes(lowerQuery) ||
    lang.id.toLowerCase().includes(lowerQuery)
  );
}