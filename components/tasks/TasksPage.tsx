import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { useKidVerseStore } from '@/store/useStore'
import { Calculator, BookOpen, Brain, Palette, Check, Coins, Zap, Star, ChevronRight, RefreshCw, Calendar } from 'lucide-react'

interface TasksPageProps {
  onBack: () => void
}

const TasksPage = ({ onBack }: TasksPageProps) => {
  const { dailyTasks, completeDailyTask, refreshDailyTasks, lastTaskRefresh } = useKidVerseStore()

  const completedCount = dailyTasks.filter(t => t.completed).length
  const totalCount = dailyTasks.length
  const today = new Date().toISOString().split('T')[0]
  const isToday = lastTaskRefresh === today

  const handleRefresh = () => {
    refreshDailyTasks()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronRight className="w-5 h-5" />
          <span>返回</span>
        </button>
        <h2 className="text-xl font-bold gradient-text">每日任务</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className="p-2 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow"
          title="刷新今日任务"
        >
          <RefreshCw className={`w-5 h-5 ${isToday ? 'text-gray-400' : 'text-kid-blue'}`} />
        </motion.button>
      </div>
      
      {/* Refresh status */}
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
        <Calendar className="w-4 h-4" />
        <span>今日任务已更新于 {lastTaskRefresh}</span>
        {!isToday && (
          <span className="text-kid-green font-medium">点击刷新获取新任务</span>
        )}
      </div>
      
      {/* Progress */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-gray-800">今日进度</h3>
            <p className="text-gray-500">完成任务获取奖励！</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-kid-blue">{completedCount}</span>
            <span className="text-gray-500">/ {totalCount}</span>
          </div>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-kid-blue to-kid-purple rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / totalCount) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </Card>
      
      {/* Tasks list */}
      <div className="space-y-4">
        {dailyTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`p-4 ${task.completed ? 'opacity-70' : ''}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  task.completed ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {task.completed ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    task.icon === 'Calculator' && <Calculator className="w-6 h-6 text-gray-600" />
                  ) || task.icon === 'BookOpen' && <BookOpen className="w-6 h-6 text-gray-600" />
                  || task.icon === 'Brain' && <Brain className="w-6 h-6 text-gray-600" />
                  || task.icon === 'Palette' && <Palette className="w-6 h-6 text-gray-600" />
                }
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{task.title}</h4>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  
                  {!task.completed && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">进度</span>
                        <span className="text-gray-600">{task.progress}/{task.target}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-kid-blue to-kid-purple rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(task.progress / task.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-1 text-right">
                  <div className="flex items-center gap-1 text-sm text-kid-orange">
                    <Coins className="w-4 h-4" />
                    <span>{task.reward.gold}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-kid-purple">
                    <Zap className="w-4 h-4" />
                    <span>{task.reward.xp}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-kid-yellow">
                    <Star className="w-4 h-4" />
                    <span>{task.reward.stars}</span>
                  </div>
                </div>
              </div>
              
              {!task.completed && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => completeDailyTask(task.id)}
                  className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-kid-blue to-kid-purple text-white font-medium"
                >
                  完成任务
                </motion.button>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { TasksPage }
