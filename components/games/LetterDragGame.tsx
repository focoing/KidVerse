import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Confetti } from '@/components/animations/Confetti'
import { useKidVerseStore } from '@/store/useStore'
import { letterWords } from '@/data/games'
import { Home, RotateCcw, Trophy, Star } from 'lucide-react'

interface LetterDragGameProps {
  onBack: () => void
}

interface DraggedLetter {
  letter: string
  index: number
}

const LetterDragGame = ({ onBack }: LetterDragGameProps) => {
  const { addXP, addGold, addStars, addGameRecord, addPlayTime } = useKidVerseStore()
  const [currentWord, setCurrentWord] = useState(0)
  const [score, setScore] = useState(0)
  const [userAnswer, setUserAnswer] = useState<string[]>([])
  const [availableLetters, setAvailableLetters] = useState<string[]>([])
  const [draggedLetter, setDraggedLetter] = useState<DraggedLetter | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [startTime] = useState(Date.now())

  const word = letterWords[currentWord]

  // Initialize letters when word changes
  useEffect(() => {
    const shuffled = [...word.letters].sort(() => Math.random() - 0.5)
    setAvailableLetters(shuffled)
    setUserAnswer(new Array(word.letters.length).fill(''))
  }, [currentWord, word.letters])

  const handleDragStart = (letter: string, index: number) => {
    setDraggedLetter({ letter, index })
  }

  const handleDragEnd = () => {
    setDraggedLetter(null)
  }

  const handleDrop = (position: number) => {
    if (!draggedLetter || userAnswer[position] !== '') return
    
    const newAnswer = [...userAnswer]
    newAnswer[position] = draggedLetter.letter
    setUserAnswer(newAnswer)
    
    const newAvailable = [...availableLetters]
    newAvailable.splice(draggedLetter.index, 1)
    setAvailableLetters(newAvailable)
    
    setDraggedLetter(null)
  }

  const handleRemoveLetter = (position: number) => {
    if (userAnswer[position] === '') return
    
    const letter = userAnswer[position]
    const newAnswer = [...userAnswer]
    newAnswer[position] = ''
    setUserAnswer(newAnswer)
    
    setAvailableLetters([...availableLetters, letter])
  }

  const checkAnswer = useCallback(() => {
    const correct = userAnswer.join('') === word.word
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      setScore(prev => prev + 20)
    }
    
    setTimeout(() => {
      if (currentWord < letterWords.length - 1) {
        setCurrentWord(prev => prev + 1)
        setShowResult(false)
      } else {
        const timeSpent = Math.ceil((Date.now() - startTime) / 60000)
        const finalScore = score + 30
        const accuracy = Math.round((finalScore / (letterWords.length * 30)) * 100)
        
        setGameOver(true)
        addXP(finalScore)
        addGold(Math.floor(finalScore / 2))
        addStars(finalScore >= 80 ? 3 : finalScore >= 60 ? 2 : 1)
        addPlayTime(timeSpent)
        addGameRecord({
          gameId: 'english-letter-drag',
          score: accuracy,
          completed: true,
          timeSpent: timeSpent,
        })
        if (finalScore >= 80) {
          setShowConfetti(true)
        }
      }
    }, 1500)
  }, [userAnswer, word.word, currentWord, score, startTime, addXP, addGold, addStars, addPlayTime, addGameRecord])

  const resetGame = () => {
    setCurrentWord(0)
    setScore(0)
    setUserAnswer([])
    setAvailableLetters([])
    setShowResult(false)
    setGameOver(false)
    setShowConfetti(false)
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center p-4">
        <Confetti show={showConfetti} />
        <Card className="p-8 text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            🎊
          </motion.div>
          <h2 className="text-2xl font-bold gradient-text mb-4">游戏结束！</h2>
          <div className="flex justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
          </div>
          <div className="bg-gradient-to-r from-kid-pink/10 to-kid-purple/10 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-kid-yellow" />
              <span className="text-3xl font-bold text-kid-yellow">{score}</span>
              <span className="text-gray-600">分</span>
            </div>
            <p className="text-gray-500">
              你完成了 {Math.floor(score / 20)}/{letterWords.length} 个单词
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack}>
          返回
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-kid-yellow">⭐ {score}</span>
          <span className="text-gray-500">第 {currentWord + 1}/{letterWords.length} 题</span>
        </div>
      </div>
      
      {/* Hint */}
      <motion.div
        key={currentWord}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <p className="text-gray-500 mb-2">提示：</p>
        <p className="text-xl font-bold text-gray-800">{word.hint}</p>
      </motion.div>
      
      {/* Word slots */}
      <div className="flex justify-center gap-2 mb-8">
        {userAnswer.map((letter, index) => (
          <motion.div
            key={index}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            onClick={() => handleRemoveLetter(index)}
            className={`w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 border-dashed flex items-center justify-center text-2xl font-bold ${
              letter ? 'border-kid-blue bg-kid-blue/10 cursor-pointer' : 'border-gray-300 bg-white'
            }`}
          >
            {letter}
          </motion.div>
        ))}
      </div>
      
      {/* Available letters */}
      <div className="flex justify-center flex-wrap gap-3 mb-8">
        {availableLetters.map((letter, index) => (
          <motion.div
            key={`${letter}-${index}`}
            draggable
            onDragStart={() => handleDragStart(letter, index)}
            onDragEnd={handleDragEnd}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-kid-blue to-kid-purple text-white flex items-center justify-center text-xl font-bold cursor-grab active:cursor-grabbing shadow-lg"
          >
            {letter}
          </motion.div>
        ))}
      </div>
      
      {/* Submit button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={checkAnswer}
        disabled={userAnswer.some(l => l === '')}
        className={`w-full max-w-xs mx-auto py-4 rounded-xl text-lg font-bold transition-all ${
          userAnswer.some(l => l === '')
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-kid-blue to-kid-purple text-white shadow-lg hover:shadow-xl'
        }`}
      >
        检查答案
      </motion.button>
      
      {/* Feedback */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center mt-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`text-4xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
            >
              {isCorrect ? '✅' : '❌'}
            </motion.div>
            <p className={`text-xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '正确！' : `正确答案是 ${word.word}`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { LetterDragGame }
