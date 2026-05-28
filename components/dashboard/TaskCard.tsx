import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { Calculator, BookOpen, Brain, Palette, Check, Coins, Zap, Star } from 'lucide-react'
import { DailyTask } from '@/store/useStore'
import { useKidVerseStore } from '@/store/useStore'

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  BookOpen,
  Brain,
  Palette,
}

interface TaskCardProps {
  task: DailyTask
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { completeDailyTask } = useKidVerseStore()
  const Icon = iconMap[task.icon] || Brain

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Card className={`p-4 ${task.completed ? 'opacity-70' : ''}`}>
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
            task.completed ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            {task.completed ? (
              <Check className="w-6 h-6 text-green-500" />
            ) : (
              <Icon className="w-6 h-6 text-gray-600" />
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-800 mb-1">{task.title}</h4>
            <p className="text-sm text-gray-500 mb-3">{task.description}</p>
            
            {/* Progress */}
            {!task.completed && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">进度</span>
                  <span className="text-gray-600">{task.progress}/{task.target}</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-kid-blue to-kid-purple rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(task.progress / task.target) * 100}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Reward */}
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
        
        {/* Complete button */}
        {!task.completed && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => completeDailyTask(task.id)}
            className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-kid-blue to-kid-purple text-white font-medium"
          >
            完成任务
          </motion.button>
        )}
      </Card>
    </motion.div>
  )
}

export { TaskCard }
