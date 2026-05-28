import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { ChevronRight, Star, Trophy, MessageCircle, UserPlus } from 'lucide-react'
import Image from 'next/image'

interface FriendsPageProps {
  onBack: () => void
}

const friends = [
  { id: '1', name: '小红', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=red', level: 7, stars: 35 },
  { id: '2', name: '小华', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=blue', level: 9, stars: 48 },
  { id: '3', name: '小李', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=green', level: 6, stars: 28 },
  { id: '4', name: '小王', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yellow', level: 8, stars: 41 },
]

const FriendsPage = ({ onBack }: FriendsPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronRight className="w-5 h-5" />
          <span>返回</span>
        </button>
        <h2 className="text-xl font-bold gradient-text">我的朋友</h2>
        <button className="p-2 rounded-xl bg-white shadow hover:shadow-lg transition-shadow">
          <UserPlus className="w-5 h-5 text-kid-blue" />
        </button>
      </div>
      
      {/* Leaderboard */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-kid-yellow" />
            排行榜
          </h3>
        </div>
        
        <div className="space-y-3">
          {friends.slice(0, 3).map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                index === 0 ? 'bg-yellow-400 text-white' :
                index === 1 ? 'bg-gray-300 text-white' :
                'bg-orange-400 text-white'
              }`}>
                {index + 1}
              </div>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow">
                <Image src={friend.avatar} alt={friend.name} width={40} height={40} className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{friend.name}</div>
                <div className="text-sm text-gray-500">Lv.{friend.level}</div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-kid-yellow fill-kid-yellow" />
                <span className="font-bold text-kid-yellow">{friend.stars}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
      
      {/* Friends list */}
      <h3 className="font-bold text-gray-800 mb-4">好友列表</h3>
      <div className="space-y-4">
        {friends.map((friend, index) => (
          <motion.div
            key={friend.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow">
                  <Image src={friend.avatar} alt={friend.name} width={48} height={48} className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{friend.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Lv.{friend.level}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-kid-yellow fill-kid-yellow" />
                      {friend.stars}
                    </span>
                  </div>
                </div>
                <button className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { FriendsPage }
