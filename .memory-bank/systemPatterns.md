# System Patterns

## Architecture Overview
Single Page Application (SPA) with client-side only processing, no backend infrastructure.

## Core Components
1. **CodeEditor**: Input area with live preview
2. **MacOSWindow**: Styled container with three colored dots
3. **ThemeSelector**: Dynamic theme switching system
4. **LanguageDetector**: Auto-detection with manual override
5. **ExportEngine**: Canvas-based image generation
6. **ControlPanel**: Sidebar with appearance and export settings

## Key Design Patterns

### Theme System
- Modular theme architecture separating window styling from syntax highlighting
- Dynamic theme switching without page reload
- Coordinated background colors matching syntax themes
- CSS custom properties for theme variables

### Language Detection
- Client-side pattern matching algorithm
- Fuzzy search for language selection
- Fallback to markdown for unknown languages
- Caching for performance optimization

### Export System
- HTML5 Canvas for high-quality image generation
- DOM-to-Canvas conversion for accurate rendering
- Support for PNG/JPG formats
- Customizable output settings (resolution, padding, background)

### State Management
- Local component state for UI interactions
- No persistence - resets on page refresh
- Real-time updates for all user changes
- Session-only theme and setting preferences

## Component Relationships
```
App
├── Header (Download Button)
├── MainArea
│   ├── CodeEditor
│   └── MacOSWindow
│       └── SyntaxHighlighter
└── Sidebar
    ├── AppearancePanel
    │   ├── ThemeSelector
    │   ├── LanguageSelector
    │   └── ShadowToggle
    └── ExportPanel
        ├── BackgroundColorPicker
        ├── SizeControls
        └── ExportButton
```

## Technical Decisions
- **No Backend**: All processing client-side for privacy and simplicity
- **No Persistence**: Anonymous usage, no user accounts or saved snippets
- **Performance First**: Real-time updates with sub-100ms theme changes
- **Accessibility**: WCAG 2.1 AA compliance throughout
- **Mobile Support**: Responsive design for 1024px+ screens