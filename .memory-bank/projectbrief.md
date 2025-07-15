# Code Snippet Sharing Website - Project Brief

## Project Overview
A single-page web application that transforms code snippets into beautifully formatted, shareable images optimized for social media platforms.

## Core Problem
Developers struggle with poor formatting and social media limitations when sharing code snippets. Plain text code looks unprofessional and loses visual appeal on social platforms.

## Solution
Web-based platform displaying code snippets within an elegant macOS window interface with:
- Customizable themes (10 total: 6 dark, 4 light)
- One-click export to social media-optimized images
- Automatic language detection with manual override
- Real-time preview updates

## Key Requirements
- Single Page Application (SPA)
- No user accounts or persistence
- Anonymous usage only
- Client-side processing for privacy
- Support for maximum programming languages
- macOS window styling with three colored dots
- PNG/JPG export at Full HD resolution (1920x1080)
- Shadow effects toggle
- Responsive design for desktop/tablet (1024px+)

## Success Metrics
- Time spent customizing snippets
- Number of successful exports
- Theme usage distribution
- Language detection accuracy (95% target)

## Technical Constraints
- Client-side only (no backend)
- Modern browser support (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- WCAG 2.1 AA accessibility compliance
- Performance: Theme changes <100ms, export <2s
- Handle up to 10,000 lines of code

## Non-Goals
- User registration/login
- Snippet persistence or saving
- URL sharing
- Collaborative features
- Advanced code analysis