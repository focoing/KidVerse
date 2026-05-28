import { cn } from '@/utils/cn'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, whileHover, whileTap, ...props }, ref) => {
    const baseStyles = 'btn-ripple relative overflow-hidden font-medium rounded-full transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50'
    
    const variants = {
      primary: 'bg-gradient-to-r from-kid-blue to-kid-purple text-white hover:from-kid-purple hover:to-kid-pink shadow-kid hover:shadow-kid-lg hover:shadow-glow-blue',
      secondary: 'bg-gradient-to-r from-kid-orange to-kid-pink text-white hover:from-kid-pink hover:to-kid-red shadow-kid hover:shadow-kid-lg',
      ghost: 'bg-transparent text-kid-blue hover:bg-kid-blue/10 hover:text-kid-purple',
      outline: 'border-2 border-kid-blue text-kid-blue hover:bg-kid-blue hover:text-white',
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      xl: 'px-10 py-5 text-xl font-bold',
    }
    
    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={whileHover || { scale: 1.05 }}
        whileTap={whileTap || { scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
