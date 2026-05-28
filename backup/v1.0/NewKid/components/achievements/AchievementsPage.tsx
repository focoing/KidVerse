import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { useKidVerseStore } from '@/store/useStore'
import { Trophy, Star, Lock, ChevronRight } from 'lucide-react'

interface AchievementsPageProps {
  onBack: () => void
}

const AchievementsPage = ({ onBack }: AchievementsPageProps) => {
  const { achievements, user } = useKidVerseStore()
  
  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronRight className="w-5 h-5" />
          <span>返回</span>
        </button>
        <h2 className="text-xl font-bold gradient-text">我的勋章</h2>
        <div className="w-16" />
      </div>
      
      {/* Stats */}
      <Card className="p-6 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-8 h-8 text-kid-yellow" />
          <span className="text-3xl font-bold text-gray-800">{unlockedCount}/{totalCount}</span>
        </div>
        <p className="text-gray-500">已解锁勋章</p>
        <div className="flex justify-center gap-1 mt-4">
          {Array.from({ length: totalCount }).map((_, i) => (
            <Star 
              key={i} 
              className={`w-6 h-6 ${i < unlockedCount ? 'text-kid-yellow fill-kid-yellow' : 'text-gray-300'}`} 
            />
          ))}
        </div>
      </Card>
      
      {/* Achievements grid */}
      <div className="grid grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`p-4 ${achievement.unlocked ? 'bg-gradient-to-br from-amber-50 to-yellow-50' : 'bg-gray-100'}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-kid-yellow to-amber-500' 
                    : 'bg-gray-300'
                }`}>
                  {achievement.unlocked ? (
                    <Trophy className="w-6 h-6 text-white" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-500" />
                  )}
                </div>
                <div>
                  <h4 className={`font-bold ${achievement.unlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                    {achievement.name}
                  </h4>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs text-gray-500">
                      {achievement.unlockedAt} 解锁
                    </p>
                  )}
                </div>
              </div>
              
              <p className={`text-sm mb-3 ${achievement.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                {achievement.description}
              </p>
              
              {!achievement.unlocked && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">进度</span>
                    <span className="text-gray-600">{achievement.progress}/{achievement.target}</span>
                  </div>
                  <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gray-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { AchievementsPage }
