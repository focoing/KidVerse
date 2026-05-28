import { CourseCard } from './CourseCard'
import { TaskCard } from './TaskCard'
import { ContinueLearning } from './ContinueLearning'
import { motion } from 'framer-motion'
import { useKidVerseStore } from '@/store/useStore'
import { Sparkles, TrendingUp } from 'lucide-react'

interface DashboardContentProps {
  onCourseClick: (courseId: string) => void
  onContinueLearning: () => void
}

const DashboardContent = ({ onCourseClick, onContinueLearning }: DashboardContentProps) => {
  const { subjects, dailyTasks } = useKidVerseStore()

  return (
    <div className="flex-1 p-6 space-y-8 overflow-y-auto">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <span className="text-3xl">👋</span>
        <div>
          <h2 className="text-xl font-bold text-gray-800">你好，小明！</h2>
          <p className="text-gray-500">今天也要快乐学习哦！</p>
        </div>
      </motion.div>
      
      {/* Continue Learning */}
      <ContinueLearning onClick={onContinueLearning} />
      
      {/* Daily Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-kid-yellow" />
            <h3 className="font-bold text-lg text-gray-800">每日任务</h3>
          </div>
          <span className="text-sm text-gray-500">
            {dailyTasks.filter(t => t.completed).length}/{dailyTasks.length} 已完成
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {dailyTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </motion.div>
      
      {/* Recommended Courses - First Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-kid-green" />
          <h3 className="font-bold text-lg text-gray-800">推荐课程</h3>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {subjects.slice(0, 4).map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <CourseCard
                course={course}
                onClick={() => onCourseClick(course.id)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* More Courses - Second Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <h3 className="font-bold text-lg text-gray-800">更多课程</h3>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {subjects.slice(4).map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <CourseCard
                course={course}
                onClick={() => onCourseClick(course.id)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export { DashboardContent }