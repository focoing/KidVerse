import { motion } from 'framer-motion'

interface FloatingCharacterProps {
  emoji: string
  size?: string
}

const FloatingCharacter = ({ emoji, size = 'text-6xl' }: FloatingCharacterProps) => {
  return (
    <motion.div
      className={`${size} drop-shadow-lg`}
      animate={{
        y: [0, -15, 0],
        rotate: [-3, 3, -3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {emoji}
    </motion.div>
  )
}

export { FloatingCharacter }
