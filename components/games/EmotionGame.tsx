'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, X, Smile, Frown, Angry, HelpCircle, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useKidVerseStore } from '@/store/useStore'

interface EmotionGameProps {
  onBack: () => void
}

interface EmotionQuestion {
  id: string
  scenario: string
  image: string
  correctAnswer: string
  options: { id: string; label: string; icon: typeof Smile; emoji: string }[]
}

const emotionQuestions: EmotionQuestion[] = [
  {
    id: 'q1',
    scenario: '小明收到了生日礼物',
    image: '🎁',
    correctAnswer: 'happy',
    options: [
      { id: 'happy', label: '开心', icon: Smile, emoji: '😊' },
      { id: 'sad', label: '伤心', icon: Frown, emoji: '😢' },
      { id: 'angry', label: '生气', icon: Angry, emoji: '😤' },
      { id: 'scared', label: '害怕', icon: HelpCircle, emoji: '😰' },
    ],
  },
  {
    id: 'q2',
    scenario: '小红不小心打碎了妈妈的杯子',
    image: '😢',
    correctAnswer: 'sad',
    options: [
      { id: 'happy', label: '开心', icon: Smile, emoji: '😊' },
      { id: 'sad', label: '伤心', icon: Frown, emoji: '😢' },
      { id: 'angry', label: '生气', icon: Angry, emoji: '😤' },
      { id: 'scared', label: '害怕', icon: HelpCircle, emoji: '😰' },
    ],
  },
  {
    id: 'q3',
    scenario: '小刚的玩具被弟弟弄坏了',
    image: '😤',
    correctAnswer: 'angry',
    options: [
      { id: 'happy', label: '开心', icon: Smile, emoji: '😊' },
      { id: 'sad', label: '伤心', icon: Frown, emoji: '😢' },
      { id: 'angry', label: '生气', icon: Angry, emoji: '😤' },
      { id: 'scared', label: '害怕', icon: HelpCircle, emoji: '😰' },
    ],
  },
  {
    id: 'q4',
    scenario: '小美晚上一个人在家，突然停电了',
    image: '😰',
    correctAnswer: 'scared',
    options: [
      { id: 'happy', label: '开心', icon: Smile, emoji: '😊' },
      { id: 'sad', label: '伤心', icon: Frown, emoji: '😢' },
      { id: 'angry', label: '生气', icon: Angry, emoji: '😤' },
      { id: 'scared', label: '害怕', icon: HelpCircle, emoji: '😰' },
    ],
  },
]

const encouragementMessages = [
  '太棒了！你真聪明！🌟',
  '答对啦！继续加油！💪',
  '真厉害！你是情绪小专家！🎯',
  '完美！你读懂了他的心情！❤️',
]

const EmotionGame = ({ onBack }: EmotionGameProps) => {
  const { addGameRecord, addPlayTime } = useKidVerseStore()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [startTime] = useState(Date.now())

  const currentQuestion = emotionQuestions[currentQuestionIndex]

  const handleSelectAnswer = useCallback((answerId: string) => {
    if (selectedAnswer) return
    
    setSelectedAnswer(answerId)
    const correct = answerId === currentQuestion.correctAnswer
    setIsCorrect(correct)
    
    if (correct) {
      setScore((prev) => prev + 1)
      setShowEncouragement(true)
      setTimeout(() => setShowEncouragement(false), 1500)
    }

    setTimeout(() => {
      if (currentQuestionIndex < emotionQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
      } else {
        const timeSpent = Math.ceil((Date.now() - startTime) / 60000)
        addPlayTime(timeSpent)
        addGameRecord({
          gameId: 'emotion-recognition',
          score: Math.round((score / emotionQuestions.length) * 100),
          completed: true,
          timeSpent: timeSpent,
        })
        setShowResult(true)
      }
    }, 2000)
  }, [selectedAnswer, currentQuestion, currentQuestionIndex, score, startTime, addGameRecord, addPlayTime])

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
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 text-center shadow-lg border-2 border-pink-200">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              {score === emotionQuestions.length ? '🎉' : score >= emotionQuestions.length / 2 ? '😊' : '💪'}
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">游戏结束！</h2>
            <p className="text-gray-600 mb-2">你答对了 {score} / {emotionQuestions.length} 题</p>
            <p className="text-sm text-gray-500 mb-6">
              {score === emotionQuestions.length ? '🎉 你是情绪大师！太厉害了！' : 
               score >= emotionQuestions.length / 2 ? '😊 做得不错！继续努力！' : 
               '💪 加油！多多练习会更好！'}
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleRestart} className="bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-md hover:shadow-lg">
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4">
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
              <span className="text-2xl">🌈</span> 情绪识别屋
            </h1>
            <p className="text-sm text-gray-500">识别角色的情绪，学会理解他人感受</p>
          </div>
        </motion.div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600 bg-white/50 px-3 py-1 rounded-full">
            题目 {currentQuestionIndex + 1} / {emotionQuestions.length}
          </span>
          <span className="text-sm font-bold text-purple-600 bg-white/50 px-3 py-1 rounded-full">
            得分: {score} ⭐
          </span>
        </div>

        <Card className="p-6 mb-6 shadow-md border-2 border-pink-100">
          <motion.div
            key={currentQuestion.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-4"
            >
              {currentQuestion.image}
            </motion.div>
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3 mb-3">
              <p className="text-sm text-gray-600">情景：</p>
            </div>
            <p className="text-lg font-medium text-gray-800">{currentQuestion.scenario}</p>
            <p className="text-gray-500 mt-2">他现在是什么心情呢？</p>
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
              <div className="bg-white rounded-2xl px-6 py-3 shadow-xl border-2 border-yellow-300">
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

        <div className="grid grid-cols-2 gap-3">
          <AnimatePresence mode="wait">
            {currentQuestion.options.map((option) => {
              const Icon = option.icon
              const isSelected = selectedAnswer === option.id
              const isCorrectOption = option.id === currentQuestion.correctAnswer
              
              let bgClass = 'bg-white hover:bg-pink-50 border-2 border-gray-100 shadow-sm'
              if (isSelected && isCorrect) {
                bgClass = 'bg-green-100 border-2 border-green-400 shadow-md'
              } else if (isSelected && !isCorrect) {
                bgClass = 'bg-red-100 border-2 border-red-400 shadow-md'
              } else if (!isSelected && isCorrectOption && selectedAnswer) {
                bgClass = 'bg-green-100 border-2 border-green-400 shadow-md'
              }

              return (
                <motion.button
                  key={option.id}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -20 }}
                  onClick={() => handleSelectAnswer(option.id)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 rounded-2xl transition-all ${bgClass} hover:scale-105 active:scale-95`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <motion.span
                      animate={isSelected ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 0.3 }}
                      className="text-4xl"
                    >
                      {option.emoji}
                    </motion.span>
                    <Icon className={`w-8 h-8 ${
                      isSelected && isCorrect ? 'text-green-500' :
                      isSelected && !isCorrect ? 'text-red-500' :
                      !isSelected && isCorrectOption && selectedAnswer ? 'text-green-500' :
                      'text-gray-500'
                    }`} />
                    <span className="font-bold text-gray-700">{option.label}</span>
                    {isSelected && (
                      isCorrect ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2"
                        >
                          <Check className="w-6 h-6 text-green-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2"
                        >
                          <X className="w-6 h-6 text-red-500" />
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>

        <Card className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <p className="text-sm text-gray-700">💡 小贴士：学会识别情绪，可以更好地理解朋友哦！</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export { EmotionGame }