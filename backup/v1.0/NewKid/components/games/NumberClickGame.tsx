import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Confetti } from '@/components/animations/Confetti'
import { useKidVerseStore } from '@/store/useStore'
import { numberGameQuestions } from '@/data/games'
import { Home, RotateCcw, Trophy, Star } from 'lucide-react'

interface NumberClickGameProps {
  onBack: () => void
}

const NumberClickGame = ({ onBack }: NumberClickGameProps) => {
  const { addXP, addGold, addStars } = useKidVerseStore()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const question = numberGameQuestions[currentQuestion]

  const handleNumberClick = useCallback((number: number) => {
    if (selectedNumber !== null || showResult) return
    
    setSelectedNumber(number)
    const correct = number === question.answer
    setIsCorrect(correct)
    
    if (correct) {
      setScore(prev => prev + 10)
    }
    
    setTimeout(() => {
      setShowResult(true)
      
      setTimeout(() => {
        if (currentQuestion < numberGameQuestions.length - 1) {
          setCurrentQuestion(prev => prev + 1)
          setSelectedNumber(null)
          setShowResult(false)
        } else {
          setGameOver(true)
          addXP(score + 20)
          addGold(Math.floor(score / 2))
          addStars(score >= 60 ? 3 : score >= 40 ? 2 : 1)
          if (score >= 60) {
            setShowConfetti(true)
          }
        }
      }, 1000)
    }, 300)
  }, [currentQuestion, question.answer, selectedNumber, showResult, score, addXP, addGold, addStars])

  const resetGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedNumber(null)
    setShowResult(false)
    setGameOver(false)
    setShowConfetti(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!gameOver && currentQuestion === 0 && score === 0) {
        // Auto start animation
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center p-4">
        <Confetti show={showConfetti} />
        <Card className="p-8 text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="text-2xl font-bold gradient-text mb-4">游戏结束！</h2>
          <div className="flex justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
          </div>
          <div className="bg-gradient-to-r from-kid-blue/10 to-kid-purple/10 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-kid-yellow" />
              <span className="text-3xl font-bold text-kid-yellow">{score}</span>
              <span className="text-gray-600">分</span>
            </div>
            <p className="text-gray-500">
              你答对了 {Math.floor(score / 10)}/{numberGameQuestions.length} 题
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={resetGame} className="flex-1">
              <RotateCcw className="w-5 h-5 mr-2" />
              再玩一次
            </Button>
            <Button onClick={onBack} className="flex-1">
              <Home className="w-5 h-5 mr-2" />
              返回
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-100 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack}>
          返回
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-kid-yellow">⭐ {score}</span>
          <span className="text-gray-500">第 {currentQuestion + 1}/{numberGameQuestions.length} 题</span>
        </div>
      </div>
      
      {/* Question */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {question.question}
        </h2>
        <p className="text-gray-500">点击正确的数字！</p>
      </motion.div>
      
      {/* Number buttons */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg w-full">
          {question.options.map((number, index) => {
            const isSelected = selectedNumber === number
            const isAnswer = number === question.answer
            
            return (
              <motion.button
                key={index}
                onClick={() => handleNumberClick(number)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={selectedNumber !== null}
                className={`w-full aspect-square rounded-3xl text-3xl md:text-4xl font-bold transition-all duration-300 ${
                  isSelected
                    ? isCorrect
                      ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg shadow-green-500/50'
                      : 'bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg shadow-red-500/50'
                    : 'bg-white shadow-lg hover:shadow-xl'
                } ${showResult && !isSelected ? 'opacity-50' : ''}`}
              >
                {number}
              </motion.button>
            )
          })}
        </div>
      </div>
      
      {/* Feedback */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mb-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`text-4xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
            >
              {isCorrect ? '✅' : '❌'}
            </motion.div>
            <p className={`text-xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '太棒了！' : '再试试！'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { NumberClickGame }
