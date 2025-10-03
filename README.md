# Sentient Memory Card Game

An interactive memory matching game featuring progressive difficulty levels and a Sentient knowledge quiz system. Built with modern web technologies and smooth animations.

## Overview

The Sentient Memory Card Game is a web-based card matching game that starts easy and progressively increases in difficulty across 5 levels. Players must match pairs of cards featuring Sentient artwork while managing a limited number of lives. When lives run out, players can continue by answering questions about the Sentient ecosystem.

## Game Features

### Progressive Difficulty System
- **Level 1**: 4 cards (2 pairs) - 2x2 grid
- **Level 2**: 6 cards (3 pairs) - 3x2 grid
- **Level 3**: 8 cards (4 pairs) - 4x2 grid
- **Level 4**: 12 cards (6 pairs) - 4x3 grid
- **Level 5**: 16 cards (8 pairs) - 4x4 grid

### Core Gameplay
- Five lives per game session
- Gain one additional life when advancing to the next level (max 5 lives)
- Score tracking across all levels
- 3D card flip animations
- Real-time sound effects using Web Audio API

### Quiz System
When players lose all lives, they must answer 3 randomly selected questions about the Sentient ecosystem correctly to continue playing. The quiz covers topics including:
- Sentient's core purpose and mission
- The GRID infrastructure
- Artifacts and architecture
- Token economy (SENT)
- Ecosystem roles (Reps, Builders, Stakers, Users)

## Technologies Used

### Frontend Framework
- **React 18** - Component-based UI library
- **JSX** - JavaScript XML syntax for component structure

### Animation & UX
- **Framer Motion** - Production-ready animation library for smooth transitions, card flips, and screen transitions
- **CSS3** - Custom styling with gradients, transforms, and responsive design

### Build Tools
- **Vite** - Fast build tool and development server with hot module replacement
- **npm** - Package management

### Audio
- **Web Audio API** - Native browser API for generating sound effects (card flips, matches, wrong guesses, level completion)
- **Background Music** - Procedurally generated chord progressions using oscillators

### Assets
- Custom Sentient artwork (WebP format)
- SVG logo

## Installation

```bash
# Navigate to the project directory
cd sentient-game

# Install dependencies
npm install

# Start the development server
npm run dev
```

The game will be available at `http://localhost:5173`

## Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```
sentient-game/
├── public/
│   └── sentient/
│       ├── logo.jpg
│       └── [card images]
├── src/
│   ├── components/
│   │   ├── Game.jsx
│   │   ├── Game.css
│   │   ├── Quiz.jsx
│   │   └── Quiz.css
│   ├── data/
│   │   └── questions.js
│   ├── hooks/
│   │   └── useBackgroundMusic.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Development

The game uses React's useState and useEffect hooks for state management. Framer Motion's AnimatePresence handles smooth transitions between game states (start, playing, quiz, game over, victory).

Key components:
- **App.jsx** - Main game state management and screen routing
- **Game.jsx** - Core gameplay logic and card grid
- **Quiz.jsx** - Question display and answer validation
- **useBackgroundMusic.js** - Custom hook for background audio

## Browser Compatibility

Modern browsers with support for:
- ES6+ JavaScript
- Web Audio API
- CSS Grid
- CSS Transforms and Transitions

## License

MIT

## Credits

Made with love by [@seyi_dev](https://x.com/seyi_dev)

