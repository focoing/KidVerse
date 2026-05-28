import { Button } from '@/components/ui/Button'
import { Clouds } from '@/components/animations/Clouds'
import { Sun } from '@/components/animations/Sun'
import { Particles } from '@/components/animations/Particles'
import { FloatingCharacter } from '@/components/animations/FloatingCharacter'
import { motion } from 'framer-motion'
import { Play, Sparkles } from 'lucide-react'

const HeroSection = ({ onStart }: { onStart: () => void }) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-white overflow-hidden">
      {/* Animated background elements */}
      <Sun />
      <Clouds />
      <Particles />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16 flex flex-col items-center justify-center min-h-screen">
        {/* Logo and title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-5xl">🌟</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text">
              KidVerse
            </h1>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-5xl">🎨</span>
            </motion.div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            儿童成长互动乐园
          </p>
        </motion.div>
        
        {/* Floating characters */}
        <div className="flex gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FloatingCharacter emoji="🧒" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FloatingCharacter emoji="🦸" size="text-8xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <FloatingCharacter emoji="👧" />
          </motion.div>
        </div>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-gray-700 text-center max-w-2xl mb-10"
        >
          通过游戏化学习，让孩子在快乐中成长！
          <br />
          <span className="text-kid-blue font-semibold">数学启蒙、英语学习、认知训练</span>
          一站式搞定！
        </motion.p>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Button size="xl" onClick={onStart} className="flex items-center gap-3">
            <Play className="w-6 h-6" />
            <span>开始冒险</span>
            <Sparkles className="w-5 h-5" />
          </Button>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-3 gap-8 mt-16"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-kid-blue mb-2">50+</div>
            <div className="text-gray-600">趣味游戏</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-kid-purple mb-2">100万+</div>
            <div className="text-gray-600">快乐儿童</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-kid-pink mb-2">98%</div>
            <div className="text-gray-600">家长好评</div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative grass at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-400/30 to-transparent" />
    </section>
  )
}

export { HeroSection }
