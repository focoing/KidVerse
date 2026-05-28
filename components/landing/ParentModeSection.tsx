import { Card } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Clock,
  Shield,
  Settings,
  Eye,
  Bell,
} from 'lucide-react'

const parentFeatures = [
  {
    icon: BarChart3,
    title: '学习数据分析',
    description: '详细的学习报告，了解孩子的学习情况',
  },
  {
    icon: Clock,
    title: '时间管理',
    description: '设置屏幕时间限制，保护孩子视力',
  },
  {
    icon: Shield,
    title: '内容过滤',
    description: '根据年龄筛选适合的学习内容',
  },
  {
    icon: Eye,
    title: '实时监控',
    description: '随时查看孩子的学习进度和状态',
  },
  {
    icon: Bell,
    title: '学习提醒',
    description: '设置学习提醒，培养良好学习习惯',
  },
  {
    icon: Settings,
    title: '个性化设置',
    description: '根据孩子特点定制学习计划',
  },
]

const ParentModeSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-kid-blue/5 via-kid-purple/5 to-kid-pink/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            家长中心
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            全方位了解孩子的学习情况，陪伴孩子健康成长
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parentFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-kid-blue/20 to-kid-purple/20 flex items-center justify-center shrink-0">
                    <feature.icon className="w-7 h-7 text-kid-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Stats cards */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-kid-blue/10 to-kid-blue/5 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-kid-blue mb-1">7</div>
                  <div className="text-sm text-gray-500">连续学习天数</div>
                </div>
                <div className="bg-gradient-to-br from-kid-yellow/10 to-kid-yellow/5 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-kid-yellow mb-1">42</div>
                  <div className="text-sm text-gray-500">获得星星</div>
                </div>
                <div className="bg-gradient-to-br from-kid-green/10 to-kid-green/5 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-kid-green mb-1">92%</div>
                  <div className="text-sm text-gray-500">正确率</div>
                </div>
                <div className="bg-gradient-to-br from-kid-purple/10 to-kid-purple/5 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold text-kid-purple mb-1">21h</div>
                  <div className="text-sm text-gray-500">累计学习</div>
                </div>
              </div>
              
              {/* Progress chart */}
              <div className="flex-1 bg-gray-50 rounded-2xl p-4">
                <h4 className="font-semibold text-gray-700 mb-4">本周学习时长</h4>
                <div className="flex items-end justify-between h-24 gap-2">
                  {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map((day, i) => (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        className="w-full bg-gradient-to-t from-kid-blue to-kid-purple rounded-t-lg"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${30 + Math.random() * 70}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        style={{ minHeight: '20px' }}
                      />
                      <span className="text-xs text-gray-500">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export { ParentModeSection }
