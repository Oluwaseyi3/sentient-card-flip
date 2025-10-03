import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import Game from './components/Game'
import Quiz from './components/Quiz'
import sentientQuestions from './data/questions'

function App() {
  const [gameState, setGameState] = useState('start') // start, playing, failed, quiz, won
  const [lives, setLives] = useState(5)
  const [score, setScore] = useState(0)

  const startGame = () => {
    setGameState('playing')
    setLives(5)
    setScore(0)
  }

  const handleGameOver = () => {
    setGameState('failed')
  }

  const handleQuizPass = () => {
    setGameState('playing')
    setLives(5)
  }

  const handleGameWon = (finalScore) => {
    setScore(finalScore)
    setGameState('won')
  }

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            className="screen start-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="logo-container"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
            >
              <img src="/sentient/logo.jpg" alt="Sentient Labs" className="logo" />
            </motion.div>
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Sentient Memory Game
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="subtitle"
            >
              Match the cards to win. Lose all lives and answer questions to continue!
            </motion.p>
            <motion.button
              className="start-button"
              onClick={startGame}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game
            </motion.button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <Game
            key="game"
            lives={lives}
            setLives={setLives}
            onGameOver={handleGameOver}
            onGameWon={handleGameWon}
          />
        )}

        {gameState === 'failed' && (
          <motion.div
            key="failed"
            className="screen failed-screen"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1>Game Over!</h1>
            <p>Answer 3 questions correctly to earn another chance!</p>
            <motion.button
              className="quiz-button"
              onClick={() => setGameState('quiz')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Take Quiz
            </motion.button>
            <motion.button
              className="secondary-button"
              onClick={startGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Restart Instead
            </motion.button>
          </motion.div>
        )}

        {gameState === 'quiz' && (
          <Quiz
            key="quiz"
            onPass={handleQuizPass}
            onFail={() => setGameState('failed')}
          />
        )}

        {gameState === 'won' && (
          <motion.div
            key="won"
            className="screen won-screen"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1>You Won!</h1>
            <p className="score">Score: {score}</p>
            <motion.button
              className="start-button"
              onClick={startGame}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="footer">
        <p>Made with ❤️ by <a href="https://x.com/seyi_dev" target="_blank" rel="noopener noreferrer">@seyi_dev</a></p>
      </div>
    </div>
  )
}

export default App

