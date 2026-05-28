import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Confetti } from '@/components/animations/Confetti'
import { useKidVerseStore } from '@/store/useStore'
import { animalCards } from '@/data/games'
import { Home, RotateCcw, Trophy, Star, Clock } from 'lucide-react'

interface MemoryCardsGameProps {
  onBack: () => void
}

interface CardItem {
  id: string
  name: string
  emoji: string
  isFlipped: boolean
  isMatched: boolean
  key: string
}

const MemoryCardsGame = ({ onBack }: MemoryCardsGameProps) => {
  const { addXP, addGold, addStars } = useKidVerseStore()
  const [cards, setCards] = useState<CardItem[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matches, setMatches] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameOver, setGameOver] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  // Initialize game
  const initGame = useCallback(() => {
    const pairs = [...animalCards, ...animalCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        key: `${card.id}-${index}`,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(pairs)
    setFlippedCards([])
    setMatches(0)
    setScore(0)
    setTimeLeft(60)
    setGameOver(false)
    setShowConfetti(false)
  }, [])

  useEffect(() => {
    initGame()
  }, [initGame])

  useEffect(() => {
    if (gameOver) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [gameOver])

  useEffect(() => {
    if (matches === animalCards.length) {
      setGameOver(true)
      const finalScore = score + timeLeft * 2
      addXP(finalScore + 30)
      addGold(Math.floor(finalScore / 2))
      addStars(finalScore >= 150 ? 3 : finalScore >= 100 ? 2 : 1)
      if (finalScore >= 150) {
        setShowConfetti(true)
      }
    }
  }, [matches, score, timeLeft, addXP, addGold, addStars])

  const handleCardClick = useCallback((index: number) => {
    if (flippedCards.length >= 2) return
    if (cards[index].isFlipped || cards[index].isMatched) return
    
    const newCards = [...cards]
    newCards[index].isFlipped = true
    setCards(newCards)
    
    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      if (cards[first].id === cards[second].id) {
        setTimeout(() => {
          const updatedCards = [...cards]
          updatedCards[first].isMatched = true
          updatedCards[second].isMatched = true
          setCards(updatedCards)
          setMatches(prev => prev + 1)
          setScore(prev => prev + 15)
          setFlippedCards([])
        }, 500)
      } else {
        setTimeout(() => {
          const updatedCards = [...cards]
          updatedCards[first].isFlipped = false
          updatedCards[second].isFlipped = false
          setCards(updatedCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [cards, flippedCards])

  const resetGame = () => {
    initGame()
  }

  if (gameOver) {
    const finalScore = score + timeLeft * 2
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center p-4">
        <Confetti show={showConfetti} />
        <Card className="p-8 text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            {matches === animalCards.length ? '🏆' : '⏰'}
          </motion.div>
          <h2 className="text-2xl font-bold gradient-text mb-4">
            {matches === animalCards.length ? '恭喜完成！' : '时间到！'}
          </h2>
          <div className="flex justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
          </div>
          <div className="bg-gradient-to-r from-kid-green/10 to-emerald-400/10 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-kid-yellow" />
              <span className="text-3xl font-bold text-kid-yellow">{finalScore}</span>
              <span className="text-gray-600">分</span>
            </div>
            <p className="text-gray-500">
              你找到了 {matches}/{animalCards.length} 对动物
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-100 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack}>
          返回
        </Button>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
            timeLeft <= 10 ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
          }`}>
            <Clock className="w-4 h-4" />
            <span className="font-bold">{timeLeft}s</span>
          </div>
          <span className="text-xl font-bold text-kid-yellow">⭐ {score}</span>
        </div>
      </div>
      
      {/* Cards grid */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-w-lg w-full">
          {cards.map((card, index) => (
            <motion.div
              key={card.key}
              onClick={() => handleCardClick(index)}
              animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
              className={`w-full aspect-square cursor-pointer ${card.isMatched ? 'opacity-60' : ''}`}
            >
              {/* Card front */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-kid-green to-emerald-500 flex items-center justify-center text-3xl shadow-lg"
                style={{ backfaceVisibility: 'hidden' }}
              >
                🐾
              </div>
              {/* Card back */}
              <div
                className="absolute inset-0 rounded-2xl bg-white flex items-center justify-center text-4xl shadow-lg"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                {card.emoji}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Matches counter */}
      <div className="text-center mt-4">
        <p className="text-gray-600">
          已配对：{matches}/{animalCards.length}
        </p>
      </div>
    </div>
  )
}

export { MemoryCardsGame }
