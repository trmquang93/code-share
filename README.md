# Code Snippet Share

A beautiful, modern code snippet sharing application built with React and Vite. Create stunning visual representations of your code with customizable themes and export them as high-quality images.

## Features

- **Syntax Highlighting**: Professional code highlighting with support for multiple programming languages
- **Multiple Themes**: Choose from various color schemes to match your style
- **MacOS-Style Windows**: Beautiful, authentic macOS window design for your code snippets
- **Export to Image**: Generate high-quality PNG/JPEG images of your code
- **Auto Language Detection**: Automatically detects the programming language from your code
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Preview**: See changes instantly as you type

## Tech Stack

- **React 19.1.0** - Modern React with latest features
- **Vite 7.0.4** - Lightning-fast build tool and dev server
- **React Syntax Highlighter** - Professional code syntax highlighting
- **html2canvas** - High-quality code-to-image conversion
- **PrismJS** - Additional syntax highlighting support

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd code-share
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality
- `npm run deploy` - Build and deploy to GitHub Pages

## Usage

1. **Add Your Code**: Paste or type your code in the editor
2. **Select Theme**: Choose from available color themes
3. **Choose Language**: Select the programming language (or let it auto-detect)
4. **Customize Export**: Adjust export settings like format and quality
5. **Export**: Click export to download your code as an image

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # App header with branding
│   ├── MacOSWindow.jsx # MacOS-style window wrapper
│   ├── CodeEditor.jsx  # Code input and preview
│   └── Sidebar.jsx     # Theme and settings panel
├── data/               # Static data and configurations
│   ├── sampleCode.js   # Default code examples
│   ├── themes.js       # Color theme definitions
│   └── languages.js    # Language detection and support
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
│   └── exportUtils.js  # Image export functionality
├── themes/             # CSS theme files
└── assets/             # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and Vite for optimal performance
- Syntax highlighting powered by React Syntax Highlighter
- Beautiful UI inspired by modern code editors and macOS design
