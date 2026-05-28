'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Users, Hand, Package, Sparkles, Star } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface CooperationGameProps {
  onBack: () => void
}

interface CooperationTask {
  id: string
  title: string
  description: string
  partner: string
  items: { id: string; emoji: string; name: string }[]
  targetCount: number
}

const cooperationTasks: CooperationTask[] = [
  {
    id: 'task1',
    title: '搬水果回家',
    description: '和小猴子一起把水果搬回家吧！轮到你啦，点击搬水果！',
    partner: '🐒',
    items: [
      { id: 'apple', emoji: '🍎', name: '苹果' },
      { id: 'orange', emoji: '🍊', name: '橙子' },
      { id: 'grape', emoji: '🍇', name: '葡萄' },
      { id: 'watermelon', emoji: '🍉', name: '西瓜' },
      { id: 'strawberry', emoji: '🍓', name: '草莓' },
      { id: 'peach', emoji: '🍑', name: '桃子' },
    ],
    targetCount: 4,
  },
  {
    id: 'task2',
    title: '整理玩具',
    description: '和小兔子一起整理玩具！点击选择要整理的玩具。',
    partner: '🐰',
    items: [
      { id: 'car', emoji: '🚗', name: '小汽车' },
      { id: 'ball', emoji: '⚽', name: '皮球' },
      { id: 'doll', emoji: '🧸', name: '小熊' },
      { id: 'plane', emoji: '✈️', name: '飞机' },
      { id: 'train', emoji: '🚂', name: '火车' },
      { id: 'boat', emoji: '🚢', name: '小船' },
    ],
    targetCount: 4,
  },
  {
    id: 'task3',
    title: '收集星星',
    description: '和小星星一起收集天上的星星！点击收集星星。',
    partner: '⭐',
    items: [
      { id: 'star1', emoji: '⭐', name: '星星1' },
      { id: 'star2', emoji: '🌟', name: '星星2' },
      { id: 'star3', emoji: '✨', name: '星星3' },
      { id: 'star4', emoji: '💫', name: '星星4' },
      { id: 'star5', emoji: '⭐', name: '星星5' },
      { id: 'star6', emoji: '🌟', name: '星星6' },
    ],
    targetCount: 4,
  },
]

const encouragementMessages = [
  '太棒了！你和小伙伴合作得很好！👏',
  '合作成功！继续加油！💪',
  '真厉害！你们是最佳搭档！🌟',
  '完美！团队合作真棒！🤝',
]

const CooperationGame = ({ onBack }: CooperationGameProps) => {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showEncouragement, setShowEncouragement] = useState(false)

  const currentTask = cooperationTasks[currentTaskIndex]

  const handleSelectItem = useCallback((itemId: string) => {
    if (isAnimating || selectedItems.length >= currentTask.targetCount) return
    
    setIsAnimating(true)
    setSelectedItems((prev) => [...prev, itemId])

    setTimeout(() => {
      if (selectedItems.length + 1 >= currentTask.targetCount) {
        setScore((prev) => prev + 1)
        setShowEncouragement(true)
        setTimeout(() => setShowEncouragement(false), 1500)
        
        setTimeout(() => {
          if (currentTaskIndex < cooperationTasks.length - 1) {
            setCurrentTaskIndex((prev) => prev + 1)
            setSelectedItems([])
          } else {
            setShowResult(true)
          }
          setIsAnimating(false)
        }, 1500)
      } else {
        setIsAnimating(false)
      }
    }, 500)
  }, [selectedItems, currentTask, currentTaskIndex, isAnimating])

  const handleRestart = () => {
    setCurrentTaskIndex(0)
    setSelectedItems([])
    setScore(0)
    setShowResult(false)
    setIsAnimating(false)
    setShowEncouragement(false)
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 text-center shadow-lg border-2 border-green-200">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              {score === cooperationTasks.length ? '🎉' : score >= cooperationTasks.length / 2 ? '😊' : '💪'}
            </motion.div>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">合作成功！</h2>
            <p className="text-gray-600 mb-2">你完成了 {score} / {cooperationTasks.length} 个合作任务</p>
            <p className="text-sm text-gray-500 mb-6">
              {score === cooperationTasks.length ? '🎉 你是合作小能手！太厉害了！' : 
               score >= cooperationTasks.length / 2 ? '😊 做得不错！继续努力！' : 
               '💪 加油！多多练习会更好！'}
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleRestart} className="bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md hover:shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                再玩一次
              </Button>
              <Button variant="outline" onClick={onBack} className="border-green-300 text-green-600 hover:bg-green-50">
                返回首页
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-4">
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
              <span className="text-2xl">🤝</span> 合作乐园
            </h1>
            <p className="text-sm text-gray-500">和小伙伴一起完成任务，学会合作与等待</p>
          </div>
        </motion.div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-600 bg-white/50 px-3 py-1 rounded-full">
            任务 {currentTaskIndex + 1} / {cooperationTasks.length}
          </span>
          <span className="text-sm font-bold text-green-600 bg-white/50 px-3 py-1 rounded-full">
            得分: {score} ⭐
          </span>
        </div>

        <Card className="p-6 mb-6 shadow-md border-2 border-green-100">
          <motion.div
            key={currentTask.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-4xl"
              >
                {currentTask.partner}
              </motion.div>
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-green-500" />
                <h2 className="text-lg font-bold text-gray-800">{currentTask.title}</h2>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{currentTask.description}</p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2">
                <Hand className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700 font-medium">
                  已完成: {selectedItems.length} / {currentTask.targetCount}
                </span>
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              </div>
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
              <div className="bg-white rounded-2xl px-6 py-3 shadow-xl border-2 border-green-300">
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

        <div className="grid grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {currentTask.items.map((item) => {
              const isSelected = selectedItems.includes(item.id)
              
              return (
                <motion.button
                  key={item.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={() => handleSelectItem(item.id)}
                  disabled={isSelected || isAnimating || selectedItems.length >= currentTask.targetCount}
                  className={`aspect-square p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center ${
                    isSelected 
                      ? 'bg-green-100 border-green-400 shadow-md' 
                      : 'bg-white hover:bg-green-50 border-gray-100 shadow-sm'
                  } ${selectedItems.length >= currentTask.targetCount && !isSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <motion.span 
                    className="text-3xl mb-1"
                    animate={isSelected ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {item.emoji}
                  </motion.span>
                  <span className="text-xs font-medium text-gray-600">{item.name}</span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1"
                    >
                      <Check className="w-5 h-5 text-green-500" />
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>

        <Card className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-green-500" />
            <p className="text-sm text-gray-700">💡 小贴士：学会和小伙伴合作，可以完成更大的任务哦！</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export { CooperationGame }