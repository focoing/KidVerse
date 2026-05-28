import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ConfettiProps {
  show: boolean
  onComplete?: () => void
}

const Confetti = ({ show, onComplete }: ConfettiProps) => {
  const [particles, setParticles] = useState<{ id: number; x: number; color: string; delay: number }[]>([])

  useEffect(() => {
    if (show) {
      const colors = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6', '#EC4899']
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
      }))
      setParticles(newParticles)
      
      const timer = setTimeout(() => {
        onComplete?.()
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                left: `${particle.x}%`,
                top: '-20px',
                backgroundColor: particle.color,
              }}
              initial={{ y: -20, rotate: 0, opacity: 1 }}
              animate={{
                y: '100vh',
                rotate: 720,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 3,
                delay: particle.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

export { Confetti }
