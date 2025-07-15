# Technical Context

## Technology Stack
- **Frontend Framework**: React 18+ with hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **Syntax Highlighting**: Prism.js for comprehensive language support
- **Export**: html2canvas for DOM-to-image conversion
- **Language Detection**: Custom client-side algorithm

## Development Environment
- **Node.js**: Version 18+ required
- **Package Manager**: npm or yarn
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Development Server**: Vite dev server with HMR

## Key Dependencies
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "vite": "^4.0.0",
  "tailwindcss": "^3.0.0",
  "prismjs": "^1.29.0",
  "html2canvas": "^1.4.0"
}
```

## Technical Constraints
- **Client-side Only**: No backend infrastructure
- **Memory Limitations**: Browser memory constraints for large files
- **Canvas Limitations**: Browser canvas size limits
- **Performance**: Real-time updates required (<100ms theme changes)
- **Export Quality**: High DPI support for quality output

## Browser API Usage
- **Canvas API**: For image generation and export
- **File API**: For download functionality
- **localStorage**: For temporary session preferences (optional)
- **ResizeObserver**: For responsive layout updates

## Performance Considerations
- **Code Splitting**: Lazy load themes and language definitions
- **Debouncing**: For real-time input processing
- **Memoization**: For expensive computations
- **Virtualization**: For large code snippets if needed

## Security Considerations
- **No Code Storage**: All processing client-side
- **No External Transmission**: Code never leaves user's browser
- **XSS Prevention**: Proper input sanitization
- **Content Security Policy**: Strict CSP headers

## Build Configuration
- **Bundling**: Vite with Rollup for optimized builds
- **Tree Shaking**: Remove unused code
- **Asset Optimization**: Image and font optimization
- **Service Worker**: For offline functionality (optional)

## Testing Strategy
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: User interaction flows
- **Performance Tests**: Load testing with large code snippets
- **Cross-browser Tests**: Automated testing across supported browsers