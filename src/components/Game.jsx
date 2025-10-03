import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useBackgroundMusic } from '../hooks/useBackgroundMusic'
import './Game.css'

// Sentient card images
const cardSymbols = [
  '/sentient/G2Qmz45XQAAsT3Q.webp',
  '/sentient/G2QNst5akAA7hLO.webp',
  '/sentient/G2SqF7naQAAVKm2.webp',
  '/sentient/G2TdNvkbMAE7ZQc.webp',
  '/sentient/G2TyLrubMAYi3AM.webp',
  '/sentient/G2UZ3OBWQAAd65H.webp',
  '/sentient/G2UZf5MXEAA_dMC.webp',
  '/sentient/photo_2025-10-02_16-56-28.webp'
]

// Level configuration: [pairs, gridColumns]
const LEVELS = [
  { pairs: 2, cols: 2 },  // Level 1: 4 cards (2x2)
  { pairs: 3, cols: 3 },  // Level 2: 6 cards (3x2)
  { pairs: 4, cols: 4 },  // Level 3: 8 cards (4x2)
  { pairs: 6, cols: 4 },  // Level 4: 12 cards (4x3)
  { pairs: 8, cols: 4 },  // Level 5: 16 cards (4x4)
]

const createDeck = (numPairs) => {
  const selectedSymbols = cardSymbols.slice(0, numPairs)
  const deck = [...selectedSymbols, ...selectedSymbols]
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({ id: index, symbol, matched: false }))
  return deck
}

function Game({ lives, setLives, onGameOver, onGameWon }) {
  const [level, setLevel] = useState(0)
  const [cards, setCards] = useState(createDeck(LEVELS[0].pairs))
  const [flipped, setFlipped] = useState([])
  const [solved, setSolved] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [moves, setMoves] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  
  // Play background music during game
  useBackgroundMusic(true)
  
  const currentLevel = LEVELS[level]

  // Sound effects
  const playSound = (type) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (type === 'flip') {
      oscillator.frequency.value = 400
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    } else if (type === 'match') {
      oscillator.frequency.value = 600
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } else if (type === 'wrong') {
      oscillator.frequency.value = 200
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } else if (type === 'win') {
      oscillator.frequency.value = 800
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true)
      const [first, second] = flipped
      if (cards[first].symbol === cards[second].symbol) {
        playSound('match')
        setSolved([...solved, cards[first].symbol])
        setFlipped([])
        setDisabled(false)
      } else {
        playSound('wrong')
        setTimeout(() => {
          setFlipped([])
          setDisabled(false)
          setLives(prev => {
            const newLives = prev - 1
            if (newLives <= 0) {
              onGameOver()
            }
            return newLives
          })
        }, 1000)
      }
      setMoves(prev => prev + 1)
    }
  }, [flipped])

  useEffect(() => {
    const requiredPairs = currentLevel.pairs
    if (solved.length === requiredPairs && solved.length > 0) {
      playSound('win')
      setTimeout(() => {
        const levelScore = Math.max(500 - moves * 10, 0)
        const newTotalScore = totalScore + levelScore
        
        if (level < LEVELS.length - 1) {
          // Next level
          setLevel(level + 1)
          setCards(createDeck(LEVELS[level + 1].pairs))
          setSolved([])
          setFlipped([])
          setMoves(0)
          setTotalScore(newTotalScore)
          // Restore some lives on level up
          setLives(prev => Math.min(prev + 1, 5))
        } else {
          // Game won - completed all levels
          onGameWon(newTotalScore)
        }
      }, 1000)
    }
  }, [solved])

  const handleClick = (index) => {
    if (disabled || flipped.includes(index) || solved.includes(cards[index].symbol)) return
    playSound('flip')
    setFlipped([...flipped, index])
  }

  return (
    <motion.div
      className="game-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="game-header">
        <div className="stat">
          <span className="label">Level:</span>
          <span className="value">{level + 1}/{LEVELS.length}</span>
        </div>
        <div className="stat">
          <span className="label">Lives:</span>
          <span className="value">{lives}</span>
        </div>
        <div className="stat">
          <span className="label">Moves:</span>
          <span className="value">{moves}</span>
        </div>
        <div className="stat">
          <span className="label">Matched:</span>
          <span className="value">{solved.length}/{currentLevel.pairs}</span>
        </div>
        <div className="stat">
          <span className="label">Score:</span>
          <span className="value">{totalScore}</span>
        </div>
      </div>

      <div className="cards-grid" style={{ gridTemplateColumns: `repeat(${currentLevel.cols}, 1fr)` }}>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`card ${
              flipped.includes(index) || solved.includes(card.symbol) ? 'flipped' : ''
            } ${solved.includes(card.symbol) ? 'solved' : ''}`}
            onClick={() => handleClick(index)}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="card-inner">
              <div className="card-front">
                <div className="card-pattern"></div>
                <span className="sentient-text">S</span>
              </div>
              <div className="card-back">
                <img src={card.symbol} alt="Sentient" className="card-image" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Game

