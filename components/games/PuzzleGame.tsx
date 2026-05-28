import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Confetti } from '@/components/animations/Confetti'
import { useKidVerseStore } from '@/store/useStore'
import { puzzleImages } from '@/data/games'
import { Home, RotateCcw, Trophy, Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface PuzzleGameProps {
  onBack: () => void
}

interface PuzzlePiece {
  id: number
  correctPosition: number
  currentPosition: number
  isPlaced: boolean
}

const PuzzleGame = ({ onBack }: PuzzleGameProps) => {
  const { addXP, addGold, addStars } = useKidVerseStore()
  const [currentImage, setCurrentImage] = useState(0)
  const [pieces, setPieces] = useState<PuzzlePiece[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const image = puzzleImages[currentImage]
  const gridSize = Math.sqrt(image.pieces)

  // Initialize puzzle
  const initPuzzle = useCallback(() => {
    const newPieces = Array.from({ length: image.pieces }, (_, i) => ({
      id: i,
      correctPosition: i,
      currentPosition: i,
      isPlaced: false,
    }))
    // Shuffle pieces
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPieces[i], newPieces[j]] = [newPieces[j], newPieces[i]]
    }
    setPieces(newPieces)
    setScore(0)
    setGameOver(false)
    setShowConfetti(false)
  }, [image.pieces])

  useEffect(() => {
    initPuzzle()
  }, [initPuzzle])

  useEffect(() => {
    if (pieces.length > 0 && pieces.every(p => p.currentPosition === p.correctPosition)) {
      setTimeout(() => {
        setGameOver(true)
        addXP(score + 30)
        addGold(Math.floor(score / 2))
        addStars(score >= 50 ? 3 : score >= 30 ? 2 : 1)
        if (score >= 50) {
          setShowConfetti(true)
        }
      }, 500)
    }
  }, [pieces, score, addXP, addGold, addStars])

  const handlePieceClick = useCallback((pieceId: number) => {
    const clickedPiece = pieces.find(p => p.id === pieceId)
    if (!clickedPiece) return
    
    // Find empty spot
    const emptyIndex = pieces.findIndex(p => p.currentPosition === -1)
    
    if (emptyIndex === -1) {
      // First click, mark this piece as selected
      const newPieces = pieces.map(p => ({
        ...p,
        isPlaced: p.id === pieceId ? true : false,
      }))
      setPieces(newPieces)
    } else {
      const emptyPiece = pieces[emptyIndex]
      const newPieces = pieces.map(p => {
        if (p.id === pieceId) {
          return { ...p, currentPosition: emptyPiece.currentPosition, isPlaced: false }
        }
        if (p.id === emptyPiece.id) {
          return { ...p, currentPosition: clickedPiece.currentPosition }
        }
        return { ...p, isPlaced: false }
      })
      setPieces(newPieces)
      setScore(prev => prev + 5)
    }
  }, [pieces])

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % puzzleImages.length)
  }

  const prevImage = () => {
    setCurrentImage(prev => (prev - 1 + puzzleImages.length) % puzzleImages.length)
  }

  const resetGame = () => {
    initPuzzle()
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-violet-100 flex items-center justify-center p-4">
        <Confetti show={showConfetti} />
        <Card className="p-8 text-center max-w-md w-full">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl mb-4"
          >
            🧩
          </motion.div>
          <h2 className="text-2xl font-bold gradient-text mb-4">拼图完成！</h2>
          <div className="flex justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
            <Star className="w-8 h-8 text-kid-yellow fill-kid-yellow" />
          </div>
          <div className="bg-gradient-to-r from-kid-purple/10 to-violet-400/10 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-6 h-6 text-kid-yellow" />
              <span className="text-3xl font-bold text-kid-yellow">{score}</span>
              <span className="text-gray-600">分</span>
            </div>
            <p className="text-gray-500">
              你完成了 "{image.name}" 拼图
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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-violet-100 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={onBack}>
          返回
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-kid-yellow">⭐ {score}</span>
        </div>
      </div>
      
      {/* Image selector */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <Button variant="ghost" onClick={prevImage} size="sm">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <span className="text-gray-600">{image.name}</span>
        <Button variant="ghost" onClick={nextImage} size="sm">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      
      {/* Puzzle grid */}
      <div className="flex-1 flex items-center justify-center">
        <div 
          className="grid gap-1 p-2 rounded-2xl bg-gray-200 shadow-lg"
          style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
        >
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              onClick={() => handlePieceClick(piece.id)}
              whileHover={{ scale: piece.currentPosition !== -1 ? 1.05 : 1 }}
              whileTap={{ scale: piece.currentPosition !== -1 ? 0.95 : 1 }}
              className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all ${
                piece.isPlaced ? 'ring-4 ring-kid-blue' : ''
              } ${piece.currentPosition === -1 ? 'bg-gray-300' : ''}`}
            >
              {piece.currentPosition !== -1 && (
                <img
                  src={image.src}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: `${(piece.id % gridSize) * (100 / (gridSize - 1))}% ${Math.floor(piece.id / gridSize) * (100 / (gridSize - 1))}%`,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Hint */}
      <div className="text-center mt-4">
        <p className="text-gray-500">点击拼图块移动，完成拼图！</p>
      </div>
    </div>
  )
}

export { PuzzleGame }
