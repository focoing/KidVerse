import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import {
  Gamepad2,
  Trophy,
  BookOpen,
  Star,
  Sparkles,
  Heart,
} from 'lucide-react'

const learningFeatures = [
  {
    icon: Gamepad2,
    title: '游戏化学习',
    description: '将学习融入有趣的游戏中，让孩子主动爱上学习',
    color: 'text-kid-blue',
    bg: 'bg-blue-50',
  },
  {
    icon: Trophy,
    title: '成就系统',
    description: '完成任务获得奖励，激发孩子的成就感和动力',
    color: 'text-kid-yellow',
    bg: 'bg-yellow-50',
  },
  {
    icon: BookOpen,
    title: '分级课程',
    description: '根据年龄和水平定制学习内容，循序渐进',
    color: 'text-kid-purple',
    bg: 'bg-purple-50',
  },
  {
    icon: Star,
    title: '进度追踪',
    description: '实时记录学习进度，让家长随时了解孩子成长',
    color: 'text-kid-orange',
    bg: 'bg-orange-50',
  },
  {
    icon: Sparkles,
    title: 'AI推荐',
    description: '智能推荐适合孩子的学习内容，个性化学习',
    color: 'text-kid-pink',
    bg: 'bg-pink-50',
  },
  {
    icon: Heart,
    title: '正向激励',
    description: '充满鼓励的反馈机制，培养孩子自信心',
    color: 'text-kid-green',
    bg: 'bg-green-50',
  },
]

const LearningSystem = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
              科学的学习体系
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              基于儿童认知发展规律，我们设计了一套完整的游戏化学习体系，
              让孩子在快乐中成长，在游戏中学习。
            </p>
            
            {/* Features list */}
            <div className="grid grid-cols-2 gap-4">
              {learningFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="p-4">
                    <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-3`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-kid-blue/10 to-kid-purple/10 rounded-3xl p-8">
              {/* Character */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center mb-6"
              >
                <span className="text-8xl">🦸</span>
              </motion.div>
              
              {/* Progress rings */}
              <div className="flex justify-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="relative w-20 h-20"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="url(#gradient1)" strokeWidth="8"
                      strokeDasharray="200"
                      strokeDashoffset="50"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#7C3AED" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-kid-blue">75%</span>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="relative w-16 h-16"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                    <circle
                      cx="50" cy="50" r="35" fill="none"
                      stroke="url(#gradient2)" strokeWidth="6"
                      strokeDasharray="180"
                      strokeDashoffset="45"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#F97316" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-kid-pink">67%</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Badges */}
              <div className="flex justify-center gap-2 mt-6">
                {['🏆', '⭐', '🎯', '💡'].map((badge, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { LearningSystem }
