import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import {
  Calculator,
  Languages,
  Smile,
  MessageCircle,
  Users,
  Users2,
  Palette,
  Music,
  Star,
  TrendingUp,
} from 'lucide-react'

const features = [
  {
    id: 'math',
    name: '数学乐园',
    icon: Calculator,
    description: '趣味数字游戏，培养数学思维',
    color: 'from-indigo-400 to-purple-500',
    bgColor: 'bg-indigo-50',
    progress: 65,
    level: 8,
  },
  {
    id: 'english',
    name: '英语探险',
    icon: Languages,
    description: '字母拼写，快乐学英语',
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50',
    progress: 55,
    level: 6,
  },
  {
    id: 'emotion',
    name: '情绪识别屋',
    icon: Smile,
    description: '识别角色情绪，学会理解他人感受',
    color: 'from-rose-400 to-pink-500',
    bgColor: 'bg-pink-50',
    progress: 45,
    level: 5,
  },
  {
    id: 'language',
    name: '语言表达森林',
    icon: MessageCircle,
    description: '学会表达需求，礼貌沟通',
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-blue-50',
    progress: 40,
    level: 5,
  },
  {
    id: 'cooperation',
    name: '合作乐园',
    icon: Users,
    description: '和小伙伴一起完成任务',
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50',
    progress: 35,
    level: 4,
  },
  {
    id: 'friends',
    name: '朋友广场',
    icon: Users2,
    description: '理解他人行为背后的想法',
    color: 'from-purple-400 to-violet-500',
    bgColor: 'bg-purple-50',
    progress: 30,
    level: 4,
  },
  {
    id: 'art',
    name: '创意绘画',
    icon: Palette,
    description: '释放想象力，创作美丽作品',
    color: 'from-orange-400 to-amber-500',
    bgColor: 'bg-orange-50',
    progress: 35,
    level: 4,
  },
  {
    id: 'music',
    name: '音乐节奏',
    icon: Music,
    description: '跟着节奏，感受音乐魅力',
    color: 'from-violet-400 to-purple-500',
    bgColor: 'bg-violet-50',
    progress: 25,
    level: 3,
  },
]

const FeaturesSection = ({ onSelectFeature }: { onSelectFeature: (featureId: string) => void }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            趣味学习模块
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            精心设计的学习模块，让孩子在游戏中学习，在学习中成长
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                hover
                className="p-4 md:p-6 h-full cursor-pointer"
                onClick={() => onSelectFeature(feature.id)}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 mx-auto`}>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center p-0.5`}>
                    <div className="w-full h-full bg-white rounded-lg flex items-center justify-center p-1">
                      <feature.icon className="w-full h-full" style={{ color: feature.color.split(' ')[1] }} />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
                  {feature.name}
                </h3>
                
                <p className="text-sm text-gray-500 text-center mb-4">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">进度</span>
                    <span className="font-semibold" style={{ color: feature.color.split(' ')[1] }}>
                      {feature.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${feature.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${feature.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-1 mt-4">
                  <Star className="w-4 h-4 text-kid-yellow fill-kid-yellow" />
                  <span className="text-sm font-medium text-gray-600">Lv.{feature.level}</span>
                  <TrendingUp className="w-4 h-4 text-kid-green" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { FeaturesSection }