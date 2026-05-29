import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useKidVerseStore } from '@/store/useStore'
import { Star, Coins, Zap, Heart, Shirt, Sparkles, ChevronRight, User } from 'lucide-react'

interface CharacterProfileProps {
  onClose: () => void
}

const CharacterProfile = ({ onClose }: CharacterProfileProps) => {
  const { user, character, updateCharacterOutfit, updateCharacterAvatar, getAnimalAvatars } = useKidVerseStore()
  const [activeTab, setActiveTab] = useState('stats')

  const outfits = [
    { id: 'default', name: '默认', emoji: '👕' },
    { id: 'pirate', name: '海盗', emoji: '🏴‍☠️' },
    { id: 'astronaut', name: '宇航员', emoji: '🚀' },
    { id: 'princess', name: '公主', emoji: '👑' },
  ]

  const animalAvatars = getAnimalAvatars()

  const isAnimalAvatar = character.avatarType === 'animal'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronRight className="w-5 h-5" />
          <span>返回</span>
        </button>
        <h2 className="text-xl font-bold gradient-text">角色成长</h2>
        <div className="w-16" />
      </div>
      
      {/* Character avatar */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        className="flex flex-col items-center mb-6"
      >
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-kid-blue to-kid-purple p-1">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <span className="text-6xl">{isAnimalAvatar ? character.avatar : '🦸'}</span>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-kid-yellow to-kid-orange flex items-center justify-center"
          >
            <Zap className="w-5 h-5 text-white" />
          </motion.div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mt-4">{character.name}</h3>
        <div className="flex items-center gap-2 text-gray-500">
          <Star className="w-4 h-4 text-kid-yellow fill-kid-yellow" />
          <span>Lv.{character.level}</span>
        </div>
      </motion.div>
      
      {/* Stats */}
      <Card className="p-4 mb-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-5 h-5 text-kid-yellow fill-kid-yellow" />
              <span className="text-2xl font-bold text-kid-yellow">{user.stars}</span>
            </div>
            <span className="text-sm text-gray-500">星星</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Coins className="w-5 h-5 text-kid-orange" />
              <span className="text-2xl font-bold text-kid-orange">{user.gold}</span>
            </div>
            <span className="text-sm text-gray-500">金币</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Heart className="w-5 h-5 text-kid-pink" />
              <span className="text-2xl font-bold text-kid-pink">{user.streak}</span>
            </div>
            <span className="text-sm text-gray-500">连续天数</span>
          </div>
        </div>
      </Card>
      
      {/* XP bar */}
      <Card className="p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600">成长值</span>
          <span className="font-bold text-kid-purple">{user.xp}/100 XP</span>
        </div>
        <ProgressBar progress={user.xp} color="from-kid-blue to-kid-purple" />
      </Card>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2 rounded-xl font-medium transition-all ${
            activeTab === 'stats' 
              ? 'bg-gradient-to-r from-kid-blue to-kid-purple text-white' 
              : 'bg-white text-gray-600'
          }`}
        >
          技能树
        </button>
        <button
          onClick={() => setActiveTab('avatar')}
          className={`flex-1 py-2 rounded-xl font-medium transition-all ${
            activeTab === 'avatar' 
              ? 'bg-gradient-to-r from-kid-blue to-kid-purple text-white' 
              : 'bg-white text-gray-600'
          }`}
        >
          小动物头像
        </button>
        <button
          onClick={() => setActiveTab('outfit')}
          className={`flex-1 py-2 rounded-xl font-medium transition-all ${
            activeTab === 'outfit' 
              ? 'bg-gradient-to-r from-kid-blue to-kid-purple text-white' 
              : 'bg-white text-gray-600'
          }`}
        >
          装扮
        </button>
      </div>
      
      {/* Tab content */}
      {activeTab === 'stats' && (
        <Card className="p-4">
          <h4 className="font-bold text-gray-800 mb-4">技能等级</h4>
          <div className="space-y-4">
            {character.skills.map((skill) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-kid-purple" />
                    <span className="font-medium text-gray-800">{skill.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">Lv.{skill.level}/{skill.maxLevel}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-kid-blue to-kid-purple rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm text-gray-500">{skill.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {activeTab === 'avatar' && (
        <Card className="p-4">
          <h4 className="font-bold text-gray-800 mb-4">选择小动物头像</h4>
          <div className="grid grid-cols-4 gap-3">
            {animalAvatars.map((avatar) => (
              <motion.button
                key={avatar.id}
                onClick={() => updateCharacterAvatar(avatar.emoji, 'animal')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                  character.avatar === avatar.emoji
                    ? 'border-kid-blue bg-kid-blue/10'
                    : 'border-gray-200 bg-white hover:border-kid-blue/50'
                }`}
              >
                <span className="text-3xl">{avatar.emoji}</span>
                <span className="text-xs text-gray-600">{avatar.name}</span>
                {character.avatar === avatar.emoji && (
                  <div className="absolute top-1 right-1 w-4 h-4 bg-kid-blue rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white fill-white" />
                  </div>
                )}
              </motion.button>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <motion.button
              onClick={() => updateCharacterAvatar('🦸', 'default')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                !isAnimalAvatar
                  ? 'bg-gradient-to-r from-kid-blue to-kid-purple text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <User className="w-5 h-5" />
              <span>恢复默认头像</span>
            </motion.button>
          </div>
        </Card>
      )}
      
      {activeTab === 'outfit' && (
        <Card className="p-4">
          <h4 className="font-bold text-gray-800 mb-4">选择装扮</h4>
          <div className="grid grid-cols-2 gap-4">
            {outfits.map((outfit) => (
              <motion.button
                key={outfit.id}
                onClick={() => updateCharacterOutfit(outfit.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border-2 transition-all ${
                  character.currentOutfit === outfit.id
                    ? 'border-kid-blue bg-kid-blue/10'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="text-4xl mb-2">{outfit.emoji}</div>
                <div className="font-medium text-gray-800">{outfit.name}</div>
                {character.currentOutfit === outfit.id && (
                  <div className="mt-2 flex items-center justify-center gap-1 text-kid-blue">
                    <Shirt className="w-4 h-4" />
                    <span className="text-sm">当前</span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export { CharacterProfile }
