import { cn } from '@/utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'error'
  className?: string
}

const Badge = ({ children, variant = 'primary', className }: BadgeProps) => {
  const variants = {
    primary: 'bg-gradient-to-r from-kid-blue/20 to-kid-purple/20 text-kid-blue',
    success: 'bg-gradient-to-r from-kid-green/20 to-emerald-400/20 text-kid-green',
    warning: 'bg-gradient-to-r from-kid-yellow/20 to-amber-400/20 text-kid-orange',
    error: 'bg-gradient-to-r from-kid-red/20 to-red-400/20 text-kid-red',
  }
  
  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-sm font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}

export { Badge }
