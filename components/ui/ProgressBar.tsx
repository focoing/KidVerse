import { cn } from '@/utils/cn'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
  color?: string
  height?: string
  className?: string
}

const ProgressBar = ({
  progress,
  color = 'from-kid-blue to-kid-purple',
  height = 'h-3',
  className,
}: ProgressBarProps) => {
  return (
    <div className={cn('w-full rounded-full bg-gray-200 overflow-hidden', height, className)}>
      <motion.div
        className={cn('h-full rounded-full bg-gradient-to-r', color)}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}

export { ProgressBar }
