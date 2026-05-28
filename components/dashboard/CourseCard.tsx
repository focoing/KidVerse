import { Card } from '@/components/ui/Card'
import { StarRating } from '@/components/ui/StarRating'
import { motion } from 'framer-motion'
import { Calculator, Languages, Smile, MessageCircle, Users, Users2, Palette, Music, Brain } from 'lucide-react'
import { Subject } from '@/store/useStore'

const iconMap: Record<string, React.ElementType> = {
  Calculator,
  Languages,
  Smile,
  MessageCircle,
  Users,
  Users2,
  Palette,
  Music,
}

interface CourseCardProps {
  course: Subject
  onClick: () => void
}

const CourseCard = ({ course, onClick }: CourseCardProps) => {
  const Icon = iconMap[course.icon] || Brain

  return (
    <motion.div whileHover={{ y: -4 }}>
      <Card hover onClick={onClick} className="p-4 h-full">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ backgroundColor: `${course.color}20` }}
        >
          <Icon className="w-8 h-8" style={{ color: course.color }} />
        </div>
        
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-800 mb-2">{course.name}</h3>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">完成进度</span>
            <span className="font-semibold" style={{ color: course.color }}>
              {course.completedLevels}/{course.totalLevels}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: course.color }}
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        {/* Stars */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <StarRating stars={Math.min(Math.floor(course.progress / 20), 3)} />
          <span className="text-sm text-gray-500">继续学习</span>
        </div>
      </Card>
    </motion.div>
  )
}

export { CourseCard }
