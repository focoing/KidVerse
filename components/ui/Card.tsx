import { cn } from '@/utils/cn'
import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  hover?: boolean
  gradient?: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = false, gradient = 'from-white to-white/80', whileHover, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative rounded-3xl overflow-hidden glass',
          'bg-gradient-to-br',
          gradient,
          hover && 'card-hover cursor-pointer',
          className
        )}
        whileHover={whileHover || (hover ? { y: -8, scale: 1.02 } : {})}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export { Card }
