'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, X, Users2, Lightbulb, Heart, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface FriendsGameProps {
  onBack: () => void
}

interface FriendsQuestion {
  id: string
  scenario: string
  character: string
  characterName: string
  question: string
  options: { id: string; text: string; isCorrect: boolean; emoji: string }[]
}

const friendsQuestions: FriendsQuestion[] = [
  {
    id: 'q1',
    scenario: '小熊一直看着鱼缸',
    character: '🐻',
    characterName: '小熊',
    question: '小熊一直看着鱼缸，他可能想做什么？',
    options: [
      { id: 'a1', text: '想喂鱼', isCorrect: false, emoji: '🐟' },
      { id: 'a2', text: '想喝水', isCorrect: false, emoji: '💧' },
      { id: 'a3', text: '想养鱼', isCorrect: true, emoji: '🐠' },
    ],
  },
  {
    id: 'q2',
    scenario: '小兔子坐在书桌前，手里拿着画笔',
    character: '🐰',
    characterName: '小兔子',
    question: '小兔子坐在书桌前，手里拿着画笔，她可能想做什么？',
    options: [
      { id: 'a1', text: '想画画', isCorrect: true, emoji: '🎨' },
      { id: 'a2', text: '想吃饭', isCorrect: false, emoji: '🍚' },
      { id: 'a3', text: '想睡觉', isCorrect: false, emoji: '😴' },
    ],
  },
  {
    id: 'q3',
    scenario: '小猫在门口不停地叫',
    character: '🐱',
    characterName: '小猫',
    question: '小猫在门口不停地叫，它可能想做什么？',
    options: [
      { id: 'a1', text: '想出去玩', isCorrect: true, emoji: '🚪' },
      { id: 'a2', text: '想洗澡', isCorrect: false, emoji: '🛁' },
      { id: 'a3', text: '想看书', isCorrect: false, emoji: '📚' },
    ],
  },
  {
    id: 'q4',
    scenario: '小狗把球叼到你面前',
    character: '🐶',
    characterName: '小狗',
    question: '小狗把球叼到你面前，它想做什么？',
    options: [
      { id: 'a1', text: '想让你陪它玩', isCorrect: true, emoji: '🎾' },
      { id: 'a2', text: '想让你吃球', isCorrect: false, emoji: '❌' },
      { id: 'a3', text: '想睡觉', isCorrect: false, emoji: '😴' },
    ],
  },
]

const encouragementMessages = [
  '太棒了！你读懂了朋友的想法！👏',
  '真聪明！你很懂小动物！🌟',
  '正确！继续加油！💪',
  '太赞了！你是知心小天使！👼',
]

const FriendsGame = ({ onBack }: FriendsGameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showEncouragement, setShowEncouragement] = useState(false)

  const currentQuestion = friendsQuestions[currentQuestionIndex]

  const handleSelectAnswer = useCallback((answerId: string) => {
    if (selectedAnswer) return
    
    const option = currentQuestion.options.find((o) => o.id === answerId)
    setSelectedAnswer(answerId)
    const correct = option?.isCorrect ?? false
    setIsCorrect(correct)
    
    if (correct) {
      setScore((prev) => prev + 1)
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 1500)
    }

    setTimeout(() => {
      if (currentQuestionIndex < friendsQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
      } else {
        setShowResult(true)
      }
    }, 2000)
  }, [selectedAnswer, currentQuestion, currentQuestionIndex])

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setScore(0)
    setShowResult(false)
    setShowEncouragement(false)
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-violet-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 text-center shadow-lg border-2 border-purple-200">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              {score === friendsQuestions.length ? '🎉' : score >= friendsQuestions.length / 2 ? '😊' : '💪'}
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">游戏结束！</h2>
            <p className="text-gray-600 mb-2">你答对了 {score} / {friendsQuestions.length} 题</p>
            <p className="text-sm text-gray-500 mb-6">
              {score === friendsQuestions.length ? '🎉 你是知心小达人！太厉害了！' : 
               score >= friendsQuestions.length / 2 ? '😊 做得不错！继续努力！' : 
               '💪 加油！多多练习会更好！'}
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleRestart} className="bg-gradient-to-r from-purple-400 to-pink-500 text-white shadow-md hover:shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                再玩一次
              </Button>
              <Button variant="outline" onClick={onBack} className="border-purple-300 text-purple-600 hover:bg-purple-50">
                返回首页
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-violet-100 p-4">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-6"
        >
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white/70 hover:bg-white shadow-md transition-all hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">👥</span> 朋友广场
            </h1>
            <p className="text-sm text-gray-500">理解他人行为背后的想法和意图</p>
          </div>
        </motion.div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600 bg-white/50 px-3 py-1 rounded-full">
            题目 {currentQuestionIndex + 1} / {friendsQuestions.length}
          </span>
          <span className="text-sm font-bold text-purple-600 bg-white/50 px-3 py-1 rounded-full">
            得分: {score} ⭐
          </span>
        </div>

        <Card className="p-6 mb-6 shadow-md border-2 border-purple-100">
          <motion.div
            key={currentQuestion.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-6xl"
              >
                {currentQuestion.character}
              </motion.div>
              <div>
                <div className="bg-purple-100 px-3 py-1 rounded-full w-fit mb-2">
                  <span className="text-sm text-purple-600 font-medium">{currentQuestion.characterName}</span>
                </div>
                <p className="text-gray-600 text-sm">{currentQuestion.scenario}</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
              <p className="text-lg font-medium text-gray-800">{currentQuestion.question}</p>
            </div>
          </motion.div>
        </Card>

        <AnimatePresence>
          {showEncouragement && (
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50"
            >
              <div className="bg-white rounded-2xl px-6 py-3 shadow-xl border-2 border-purple-300">
                <motion.p 
                  animate={{ scale: [1, 1.1, 1] }}
                  className="text-lg font-bold text-green-600"
                >
                  {encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option.id
              
              let bgClass = 'bg-white hover:bg-purple-50 border-2 border-gray-100 shadow-sm'
              if (isSelected && option.isCorrect) {
                bgClass = 'bg-green-100 border-2 border-green-400 shadow-md'
              } else if (isSelected && !option.isCorrect) {
                bgClass = 'bg-red-100 border-2 border-red-400 shadow-md'
              } else if (!isSelected && option.isCorrect && selectedAnswer) {
                bgClass = 'bg-green-100 border-2 border-green-400 shadow-md'
              }

              return (
                <motion.button
                  key={option.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  onClick={() => handleSelectAnswer(option.id)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center gap-3 ${bgClass} hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <motion.span
                    animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                    className="text-3xl"
                  >
                    {option.emoji}
                  </motion.span>
                  <span className="font-medium text-gray-700 flex-1 text-left">{option.text}</span>
                  {isSelected && (
                    option.isCorrect ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="p-2 bg-green-200 rounded-full"
                      >
                        <Check className="w-5 h-5 text-green-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="p-2 bg-red-200 rounded-full"
                      >
                        <X className="w-5 h-5 text-red-600" />
                      </motion.div>
                    )
                  )}
                  {!isSelected && option.isCorrect && selectedAnswer && (
                    <div className="p-2 bg-green-200 rounded-full">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>

        <Card className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-500" />
            <p className="text-sm text-gray-700">💡 小贴士：学会理解朋友的想法，才能更好地和他们相处哦！</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export { FriendsGame }