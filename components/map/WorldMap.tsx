import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { worlds, levels } from '@/data/levels'
import { TreePine, Waves, Rocket, Castle, Skull, Lock, Star, ChevronLeft, ChevronRight } from 'lucide-react'

interface WorldMapProps {
  onLevelSelect: (levelId: string) => void
}

const iconMap: Record<string, React.ElementType> = {
  TreePine,
  Waves,
  Rocket,
  Castle,
  Skull,
}

const WorldMap = ({ onLevelSelect }: WorldMapProps) => {
  const [selectedWorld, setSelectedWorld] = useState(0)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const world = worlds[selectedWorld]
  const worldLevels = levels.filter(l => l.world === world.id)

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setScale(prev => Math.min(Math.max(prev + delta, 0.5), 2))
  }

  const nextWorld = () => {
    setSelectedWorld(prev => (prev + 1) % worlds.length)
  }

  const prevWorld = () => {
    setSelectedWorld(prev => (prev - 1 + worlds.length) % worlds.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold gradient-text">学习地图</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={prevWorld}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-gray-600">{world.name}</span>
          <Button variant="ghost" size="sm" onClick={nextWorld}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* World info */}
      <Card className="p-4 mb-4">
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${world.color}20` }}
          >
            {(() => {
              const Icon = iconMap[world.icon] || TreePine
              return <Icon className="w-8 h-8" style={{ color: world.color }} />
            })()}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800">{world.name}</h3>
            <p className="text-gray-500">
              {worldLevels.filter(l => l.locked === false).length}/{worldLevels.length} 关卡已解锁
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-kid-yellow fill-kid-yellow" />
            <span className="font-bold text-kid-yellow">
              {worldLevels.reduce((acc, l) => acc + l.stars, 0)}
            </span>
          </div>
        </div>
      </Card>
      
      {/* Map canvas */}
      <div 
        className="relative bg-gradient-to-br rounded-3xl overflow-hidden shadow-xl"
        style={{ background: `linear-gradient(135deg, ${world.color}30, ${world.color}10)` }}
        onWheel={handleWheel}
      >
        {/* Decorative elements based on world */}
        {world.id === 'forest' && (
          <div className="absolute inset-0 opacity-20">
            <span className="absolute top-10 left-10 text-4xl">🌲</span>
            <span className="absolute top-20 right-20 text-3xl">🌳</span>
            <span className="absolute bottom-20 left-20 text-4xl">🌿</span>
            <span className="absolute bottom-10 right-10 text-3xl">🌱</span>
          </div>
        )}
        
        {world.id === 'ocean' && (
          <div className="absolute inset-0 opacity-20">
            <span className="absolute top-10 left-1/4 text-3xl">🐠</span>
            <span className="absolute top-1/3 right-1/3 text-2xl">🐬</span>
            <span className="absolute bottom-1/4 left-1/3 text-3xl">🦀</span>
            <span className="absolute bottom-10 right-1/4 text-2xl">🐙</span>
          </div>
        )}
        
        {world.id === 'space' && (
          <div className="absolute inset-0 opacity-20">
            <span className="absolute top-10 left-1/3 text-2xl">⭐</span>
            <span className="absolute top-1/4 right-1/4 text-3xl">🌙</span>
            <span className="absolute bottom-1/3 left-1/4 text-2xl">✨</span>
            <span className="absolute bottom-10 right-1/3 text-2xl">🚀</span>
          </div>
        )}
        
        {world.id === 'castle' && (
          <div className="absolute inset-0 opacity-20">
            <span className="absolute top-10 left-1/4 text-4xl">🏰</span>
            <span className="absolute top-1/3 right-1/3 text-3xl">🏯</span>
            <span className="absolute bottom-1/4 left-1/3 text-2xl">🏴</span>
          </div>
        )}
        
        {world.id === 'dinosaur' && (
          <div className="absolute inset-0 opacity-20">
            <span className="absolute top-1/4 left-1/4 text-4xl">🦖</span>
            <span className="absolute top-1/3 right-1/4 text-3xl">🦕</span>
            <span className="absolute bottom-1/3 left-1/3 text-3xl">🌋</span>
          </div>
        )}
        
        {/* Level nodes */}
        <motion.div
          className="relative h-96 md:h-[500px]"
          style={{ 
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)` 
          }}
        >
          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {worldLevels.slice(0, -1).map((level, index) => {
              const nextLevel = worldLevels[index + 1]
              return (
                <motion.line
                  key={`line-${level.id}`}
                  x1={`${level.position.x}%`}
                  y1={`${level.position.y}%`}
                  x2={`${nextLevel.position.x}%`}
                  y2={`${nextLevel.position.y}%`}
                  stroke={level.locked ? '#D1D5DB' : world.color}
                  strokeWidth="3"
                  strokeDasharray={level.locked ? '5,5' : 'none'}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              )
            })}
          </svg>
          
          {/* Level nodes */}
          {worldLevels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${level.position.x}%`, 
                top: `${level.position.y}%` 
              }}
            >
              <motion.button
                onClick={() => !level.locked && onLevelSelect(level.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={level.locked}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center shadow-lg transition-all ${
                  level.locked 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-white hover:shadow-xl cursor-pointer'
                }`}
              >
                {level.locked ? (
                  <Lock className="w-6 h-6 text-gray-500" />
                ) : (
                  <>
                    <span className="text-lg font-bold" style={{ color: world.color }}>
                      {index + 1}
                    </span>
                    {level.stars > 0 && (
                      <div className="flex gap-0.5">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < level.stars ? 'text-kid-yellow fill-kid-yellow' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setScale(prev => Math.min(prev + 0.2, 2))}
          >
            +
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setScale(prev => Math.max(prev - 0.2, 0.5))}
          >
            -
          </Button>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-300" />
          <span className="text-sm text-gray-600">未完成</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: world.color }} />
          <span className="text-sm text-gray-600">已完成</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-300" />
          <span className="text-sm text-gray-600">未解锁</span>
        </div>
      </div>
    </div>
  )
}

export { WorldMap }
