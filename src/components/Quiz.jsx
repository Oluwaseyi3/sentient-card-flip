import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import sentientQuestions from '../data/questions'
import './Quiz.css'

function Quiz({ onPass, onFail }) {
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    // Pick 3 random questions
    const shuffled = [...sentientQuestions].sort(() => Math.random() - 0.5)
    setQuestions(shuffled.slice(0, 3))
  }, [])

  const handleAnswer = (option) => {
    setSelectedAnswer(option)
    setShowResult(true)

    const isCorrect = option === questions[currentQuestion].answer
    
    setTimeout(() => {
      if (isCorrect) {
        const newCorrect = correctAnswers + 1
        setCorrectAnswers(newCorrect)

        if (currentQuestion + 1 === questions.length) {
          // All questions answered
          if (newCorrect === 3) {
            onPass()
          } else {
            onFail()
          }
        } else {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedAnswer(null)
          setShowResult(false)
        }
      } else {
        setTimeout(() => {
          onFail()
        }, 1000)
      }
    }, 1500)
  }

  if (questions.length === 0) {
    return <div className="quiz-container">Loading...</div>
  }

  const question = questions[currentQuestion]

  return (
    <motion.div
      className="quiz-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="quiz-header">
        <h2>Knowledge Check</h2>
        <p className="quiz-progress">
          Question {currentQuestion + 1} of 3 | Correct: {correctAnswers}/3
        </p>
      </div>

      <motion.div
        className="question-card"
        key={currentQuestion}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h3 className="question-text">{question.question}</h3>

        <div className="options-grid">
          {question.options.map((option, index) => {
            const optionLetter = option.charAt(0)
            const isSelected = selectedAnswer === optionLetter
            const isCorrect = optionLetter === question.answer
            
            let className = 'option-button'
            if (showResult && isSelected && isCorrect) className += ' correct'
            if (showResult && isSelected && !isCorrect) className += ' wrong'
            if (showResult && !isSelected && isCorrect) className += ' correct'

            return (
              <motion.button
                key={index}
                className={className}
                onClick={() => !showResult && handleAnswer(optionLetter)}
                disabled={showResult}
                whileHover={!showResult ? { scale: 1.03 } : {}}
                whileTap={!showResult ? { scale: 0.97 } : {}}
              >
                {option}
              </motion.button>
            )
          })}
        </div>

        {showResult && (
          <motion.div
            className={`result-message ${selectedAnswer === question.answer ? 'correct-message' : 'wrong-message'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {selectedAnswer === question.answer ? 'Correct!' : 'Wrong!'}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Quiz

