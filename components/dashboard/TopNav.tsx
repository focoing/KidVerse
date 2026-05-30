import { motion } from 'framer-motion'
import { Star, Coins, Flame, Zap, Menu, Settings } from 'lucide-react'
import { useKidVerseStore } from '@/store/useStore'
import Image from 'next/image'

interface TopNavProps {
  onMenuToggle: () => void
  onParentMode: () => void
  onLogoClick: () => void
  onAvatarClick: () => void
  onAchievementsClick: () => void
  onTasksClick: () => void
  onCharacterClick: () => void
}

const TopNav = ({ onMenuToggle, onParentMode, onLogoClick, onAvatarClick, onAchievementsClick, onTasksClick, onCharacterClick }: TopNavProps) => {
  const { user, character } = useKidVerseStore()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 glass border-b border-white/20"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={onLogoClick}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">🌟</span>
            <span className="font-bold text-lg gradient-text">KidVerse</span>
          </motion.button>
          
          {/* User info */}
          <div className="flex items-center gap-4">
            {/* Stats */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                onClick={onAchievementsClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 bg-kid-yellow/10 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Star className="w-4 h-4 text-kid-yellow fill-kid-yellow" />
                <span className="font-medium text-kid-yellow">{user.stars}</span>
              </motion.button>
              
              <motion.button
                onClick={onTasksClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 bg-kid-orange/10 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Coins className="w-4 h-4 text-kid-orange" />
                <span className="font-medium text-kid-orange">{user.gold}</span>
              </motion.button>
              
              <motion.button
                onClick={onTasksClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 bg-kid-red/10 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Flame className="w-4 h-4 text-kid-red" />
                <span className="font-medium text-kid-red">{user.streak}天</span>
              </motion.button>
              
              <motion.button
                onClick={onCharacterClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 bg-kid-purple/10 px-3 py-1.5 rounded-full cursor-pointer"
              >
                <Zap className="w-4 h-4 text-kid-purple" />
                <span className="font-medium text-kid-purple">Lv.{character.level}</span>
              </motion.button>
            </div>
            
            {/* Avatar */}
            <motion.button
              onClick={onAvatarClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-kid-blue shadow-lg bg-white flex items-center justify-center">
                {character.avatarType === 'animal' ? (
                  <span className="text-xl md:text-2xl">{character.avatar}</span>
                ) : (
                  <Image
                    src={character.avatar}
                    alt={character.name}
                    width={50}
                    height={50}
                    className="object-cover"
                    unoptimized
                  />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-kid-green rounded-full border-2 border-white" />
            </motion.button>
            
            {/* Parent mode button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onParentMode}
              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </motion.button>
            
            {/* Menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>
        
        {/* Mobile stats */}
        <div className="md:hidden flex items-center justify-center gap-4 mt-3 pt-3 border-t border-gray-100">
          <motion.button
            onClick={onAchievementsClick}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1"
          >
            <Star className="w-4 h-4 text-kid-yellow fill-kid-yellow" />
            <span className="text-sm font-medium">{user.stars}</span>
          </motion.button>
          <motion.button
            onClick={onTasksClick}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1"
          >
            <Coins className="w-4 h-4 text-kid-orange" />
            <span className="text-sm font-medium">{user.gold}</span>
          </motion.button>
          <motion.button
            onClick={onTasksClick}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1"
          >
            <Flame className="w-4 h-4 text-kid-red" />
            <span className="text-sm font-medium">{user.streak}天</span>
          </motion.button>
          <motion.button
            onClick={onCharacterClick}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1"
          >
            <Zap className="w-4 h-4 text-kid-purple" />
            <span className="text-sm font-medium">Lv.{character.level}</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

export { TopNav }
