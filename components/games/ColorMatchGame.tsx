import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Confetti } from '@/components/animations/Confetti'
import { useKidVerseStore } from '@/store/useStore'
import { colors } from '@/data/games'
import { Home, RotateCcw, Trophy, Star } from 'lucide-react'

interface ColorMatchGameProps {
  onBack: () => void
}

interface ColorItem {
  id: string
  name: string
  color: string
  emoji: string
  isClicked: boolean
  isMatched: boolean
}

const ColorMatchGame = ({ onBack }: ColorMatchGameProps) => {
  const { addXP, addGold, addStars, addGameRecord, addPlayTime } = useKidVerseStore()
  const [colorItems, setColorItems] = useState<ColorItem[]>([])
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [floatingParticles, setFloatingParticles] = useState<{id: number; x: number; y: number}[]>([])
  const [startTime] = useState(Date.now())

  // Initialize game
  const initGame = useCallback(() => {
    const colorPairs = [...colors, ...colors]
      .sort(() => Math.random() - 0.5)
      .map((color, index) => ({
        ...color,
        id: `${color.name}-${index}`,
        isClicked: false,
        isMatched: false,
      }))
    setColorItems(colorPairs)
    setSelectedColor(null)
    setScore(0)
    setMatches(0)
    setGameOver(false)
    setShowConfetti(false)
  }, [])

  useEffect(() => {
    initGame()
  }, [initGame])

  useEffect(() => {
    if (matches === colors.length) {
      setGameOver(true)
      addXP(score + 25)
      addGold(Math.floor(score / 2))
      addStars(score >= 80 ? 3 : score >= 60 ? 2 : 1)
      const timeSpent = Math.ceil((Date.now() - startTime) / 60000)
      addPlayTime(timeSpent)
      addGameRecord({
        gameId: 'color-match',
        score: Math.round((matches / colors.length) * 100),
        completed: true,
        timeSpent: timeSpent,
      })
      if (score >= 80) {
        setShowConfetti(true)
      }
    }
  }, [matches, score, addXP, addGold, addStars, startTime, addGameRecord, addPlayTime])

  const createParticles = (x: number, y: number) => {
    const particles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 100,
      y: y + (Math.random() - 0.5) * 100,
    }))
    setFloatingParticles(prev => [...prev, ...particles])
    setTimeout(() => {
      setFloatingParticles(prev => prev.filter(p => !particles.find(np => np.id === p.id)))
    }, 1000)
  }

  const handleColorClick = useCallback((color: ColorItem, event: React.MouseEvent) => {
    if (color.isClicked || color.isMatched) return
    
    const rect = event.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    
    if (!selectedColor) {
      setSelectedColor(color.color)
      const newItems = [...colorItems]
      newItems.findIndex((item, i) => item.id === color.id && (newItems[i].isClicked = true))
      setColorItems(newItems)
    } else if (selectedColor === color.color) {
      const newItems = [...colorItems]
      newItems.forEach(item => {
        if (item.color === color.color) {
          item.isMatched = true
        }
      })
      setColorItems(newItems)
      setMatches(prev => prev + 1)
      setScore(prev => prev + 15)
      setSelectedColor(null)
      createParticles(x, y)
    } else {
      // Wrong match
      const newItems = [...colorItems]
      newItems.forEach(item => {
        if (item.color === selectedColor) {
          item.isClicked = false
        }
      })
      setColorItems(newItems)
      setSelectedColor(null)
    }
  }, [selectedColor, colorItems])

  const resetGame = () => {
    initGame()
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center p-4">
        <Confetti show={showConfetti} />
        <Card className="p-8 text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            🎨
          </motion.div>
          <h2 className="text-2xl font-bold gradient-text mb-4">游戏结束！</h2>
          <div className="flex justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
          </div>
          <div className="bg-gradient-to-r from-kid-orange/10 to-amber-400/10 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-kid-yellow" />
              <span className="text-3xl font-bold text-kid-yellow">{score}</span>
              <span className="text-gray-600">分</span>
            </div>
            <p className="text-gray-500">
              你配对了 {matches}/{colors.length} 对颜色
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
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-amber-100 flex flex-col p-4 relative overflow-hidden">
      {/* Floating particles */}
      <AnimatePresence>
        {floatingParticles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, scale: 1, x: particle.x, y: particle.y }}
            animate={{ opacity: 0, scale: 0, y: particle.y - 100 }}
            exit={{ opacity: 0 }}
            className="fixed w-3 h-3 rounded-full pointer-events-none"
            style={{ backgroundColor: selectedColor || '#4F46E5' }}
          />
        ))}
      </AnimatePresence>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack}>
          返回
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-kid-yellow">⭐ {score}</span>
          <span className="text-gray-500">配对: {matches}/{colors.length}</span>
        </div>
      </div>
      
      {/* Instruction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <p className="text-gray-500 mb-2">点击匹配相同的颜色！</p>
        {selectedColor && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ backgroundColor: `${selectedColor}20` }}
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedColor }} />
            <span style={{ color: selectedColor }} className="font-medium">寻找配对</span>
          </motion.div>
        )}
      </motion.div>
      
      {/* Color grid */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-lg w-full">
          {colorItems.map((color) => (
            <motion.div
              key={color.id}
              onClick={(e) => handleColorClick(color, e)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full aspect-square rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-all duration-300 ${
                color.isMatched 
                  ? 'opacity-40 scale-90' 
                  : color.isClicked 
                    ? 'ring-4 ring-white ring-offset-2' 
                    : 'cursor-pointer hover:shadow-xl'
              }`}
              style={{ backgroundColor: color.color }}
            >
              {color.isMatched && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ✅
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { ColorMatchGame }
