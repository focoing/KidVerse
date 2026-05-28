import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { Play, BookOpen } from 'lucide-react'

interface ContinueLearningProps {
  onClick: () => void
}

const ContinueLearning = ({ onClick }: ContinueLearningProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card
        gradient="from-indigo-500/10 via-purple-500/10 to-pink-500/10"
        className="p-6 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-kid-blue to-kid-purple flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">继续学习</h3>
              <p className="text-gray-500">上次学到：数学乐园 - 数字入门</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-kid-blue to-kid-purple flex items-center justify-center shadow-lg"
          >
            <Play className="w-6 h-6 text-white ml-1" />
          </motion.button>
        </div>
      </Card>
    </motion.div>
  )
}

export { ContinueLearning }
