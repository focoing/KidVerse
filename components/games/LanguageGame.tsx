'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, X, Mic, Send, Sparkles, Heart } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface LanguageGameProps {
  onBack: () => void
}

interface LanguageQuestion {
  id: string
  scenario: string
  question: string
  options: { id: string; text: string; isCorrect: boolean; emoji: string }[]
}

const languageQuestions: LanguageQuestion[] = [
  {
    id: 'q1',
    scenario: '你想玩玩具',
    question: '你想玩玩具，应该怎么说呢？',
    options: [
      { id: 'a1', text: '把玩具给我！', isCorrect: false, emoji: '😠' },
      { id: 'a2', text: '请问我可以玩玩具吗？', isCorrect: true, emoji: '😊' },
      { id: 'a3', text: '我要玩玩具！', isCorrect: false, emoji: '😤' },
      { id: 'a4', text: '给我玩具', isCorrect: false, emoji: '😒' },
    ],
  },
  {
    id: 'q2',
    scenario: '别人帮了你',
    question: '别人帮了你，你应该说什么？',
    options: [
      { id: 'a1', text: '谢谢！', isCorrect: true, emoji: '🙏' },
      { id: 'a2', text: '知道了', isCorrect: false, emoji: '😐' },
      { id: 'a3', text: '哦', isCorrect: false, emoji: '😕' },
      { id: 'a4', text: '不用谢', isCorrect: false, emoji: '😅' },
    ],
  },
  {
    id: 'q3',
    scenario: '你不小心撞到别人',
    question: '你不小心撞到别人，应该说什么？',
    options: [
      { id: 'a1', text: '对不起！', isCorrect: true, emoji: '😔' },
      { id: 'a2', text: '不关我的事', isCorrect: false, emoji: '😏' },
      { id: 'a3', text: '你挡路了', isCorrect: false, emoji: '😡' },
      { id: 'a4', text: '没事吧', isCorrect: false, emoji: '🤔' },
    ],
  },
  {
    id: 'q4',
    scenario: '你想借同学的橡皮',
    question: '你想借同学的橡皮，应该怎么说呢？',
    options: [
      { id: 'a1', text: '橡皮拿来！', isCorrect: false, emoji: '😠' },
      { id: 'a2', text: '橡皮借我', isCorrect: false, emoji: '😐' },
      { id: 'a3', text: '请问可以借我橡皮用一下吗？', isCorrect: true, emoji: '🥺' },
      { id: 'a4', text: '把橡皮给我用', isCorrect: false, emoji: '😤' },
    ],
  },
]

const encouragementMessages = [
  '说得太好了！👏',
  '真棒！你很有礼貌！🌟',
  '正确！继续加油！💪',
  '太赞了！你是礼貌小天使！👼',
]

const LanguageGame = ({ onBack }: LanguageGameProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showEncouragement, setShowEncouragement] = useState(false)

  const currentQuestion = languageQuestions[currentQuestionIndex]

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
      if (currentQuestionIndex < languageQuestions.length - 1) {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 text-center shadow-lg border-2 border-blue-200">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              {score === languageQuestions.length ? '🎉' : score >= languageQuestions.length / 2 ? '😊' : '💪'}
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">游戏结束！</h2>
            <p className="text-gray-600 mb-2">你答对了 {score} / {languageQuestions.length} 题</p>
            <p className="text-sm text-gray-500 mb-6">
              {score === languageQuestions.length ? '🎉 你是礼貌小达人！太有礼貌了！' : 
               score >= languageQuestions.length / 2 ? '😊 做得不错！继续努力！' : 
               '💪 加油！多多练习会更好！'}
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleRestart} className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-md hover:shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                再玩一次
              </Button>
              <Button variant="outline" onClick={onBack} className="border-blue-300 text-blue-600 hover:bg-blue-50">
                返回首页
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 p-4">
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
              <span className="text-2xl">🗣️</span> 语言表达森林
            </h1>
            <p className="text-sm text-gray-500">学会表达自己的需求，礼貌沟通</p>
          </div>
        </motion.div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600 bg-white/50 px-3 py-1 rounded-full">
            题目 {currentQuestionIndex + 1} / {languageQuestions.length}
          </span>
          <span className="text-sm font-bold text-blue-600 bg-white/50 px-3 py-1 rounded-full">
            得分: {score} ⭐
          </span>
        </div>

        <Card className="p-6 mb-4 shadow-md border-2 border-blue-100">
          <motion.div
            key={currentQuestion.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="p-2 rounded-full bg-blue-100"
              >
                <Mic className="w-6 h-6 text-blue-500" />
              </motion.div>
              <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">情景</span>
            </div>
            <p className="text-gray-700 mb-3">{currentQuestion.scenario}</p>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
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
              <div className="bg-white rounded-2xl px-6 py-3 shadow-xl border-2 border-blue-300">
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
              
              let bgClass = 'bg-white hover:bg-blue-50 border-2 border-gray-100 shadow-sm'
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
                  className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${bgClass} hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <div className="flex items-center gap-3">
                    <motion.span
                      animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                      className="text-2xl"
                    >
                      {option.emoji}
                    </motion.span>
                    <span className="font-medium text-gray-700 flex-1">{option.text}</span>
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
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>

        <Card className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-blue-500" />
            <p className="text-sm text-gray-700">💡 小贴士：使用礼貌用语可以让沟通更顺畅哦！</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export { LanguageGame }