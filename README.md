# Sentient Memory Card Game 🎮

A beautiful, interactive memory card game built with React and Framer Motion, featuring a quiz system based on Sentient knowledge.

## Features

✨ **Beautiful Pink Theme** - Stunning gradient backgrounds and smooth animations
🎴 **Card Flip Game** - Match 8 pairs of cards with smooth 3D flip animations
❤️ **Lives System** - 3 lives per game session
🎯 **Quiz Challenge** - Answer 3 random Sentient questions correctly to earn another try
🔊 **Sound Effects** - Interactive audio feedback for flips, matches, and wins
📱 **Responsive** - Works great on desktop and mobile

## Installation

```bash
# Navigate to the project directory
cd /Users/mac/Documents/JOSHUA/sentient-game

# Install dependencies
npm install

# Start the development server
npm run dev
```

The game will be available at `http://localhost:5173`

## How to Play

1. Click **Start Game** to begin
2. Click on cards to flip them and find matching pairs
3. Match all 8 pairs to win!
4. If you lose all 3 lives, take the quiz to earn another chance
5. Answer 3 Sentient questions correctly to continue playing

## Customization

- Replace emoji symbols in `src/components/Game.jsx` with images from `/Users/mac/Downloads/sentient`
- Modify colors in CSS files
- Add more questions to `src/data/questions.js`
- Adjust animations in component files

## Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- React 18
- Framer Motion (animations)
- Vite (build tool)
- Web Audio API (sound effects)

Enjoy the game! 🎉

