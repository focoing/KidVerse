export interface Level {
  id: string
  name: string
  world: string
  worldIcon: string
  worldColor: string
  position: { x: number; y: number }
  locked: boolean
  type: 'math' | 'english' | 'emotion' | 'language' | 'cooperation' | 'friends' | 'art' | 'music'
  difficulty: 1 | 2 | 3
  stars: number
  bestScore?: number
}

export const worlds = [
  { id: 'forest', name: '魔法森林', icon: 'TreePine', color: '#22C55E', bgGradient: 'from-green-400 via-green-500 to-emerald-600' },
  { id: 'ocean', name: '海洋世界', icon: 'Waves', color: '#06B6D4', bgGradient: 'from-cyan-400 via-blue-500 to-indigo-600' },
  { id: 'space', name: '太空探险', icon: 'Rocket', color: '#7C3AED', bgGradient: 'from-purple-400 via-indigo-500 to-blue-600' },
  { id: 'castle', name: '童话城堡', icon: 'Castle', color: '#EC4899', bgGradient: 'from-pink-400 via-rose-500 to-red-600' },
  { id: 'dinosaur', name: '恐龙乐园', icon: 'Dinosaur', color: '#F97316', bgGradient: 'from-orange-400 via-amber-500 to-yellow-600' },
]

export const levels: Level[] = [
  // Forest World
  { id: 'forest-1', name: '数字入门', world: 'forest', worldIcon: 'TreePine', worldColor: '#22C55E', position: { x: 10, y: 80 }, locked: false, type: 'math', difficulty: 1, stars: 3 },
  { id: 'forest-2', name: '小动物数数', world: 'forest', worldIcon: 'TreePine', worldColor: '#22C55E', position: { x: 25, y: 60 }, locked: false, type: 'math', difficulty: 1, stars: 3 },
  { id: 'forest-3', name: '颜色配对', world: 'forest', worldIcon: 'TreePine', worldColor: '#22C55E', position: { x: 40, y: 75 }, locked: false, type: 'focus', difficulty: 1, stars: 3 },
  { id: 'forest-4', name: '情绪识别', world: 'forest', worldIcon: 'TreePine', worldColor: '#22C55E', position: { x: 55, y: 55 }, locked: false, type: 'emotion', difficulty: 1, stars: 3 },
  { id: 'forest-5', name: '简单拼图', world: 'forest', worldIcon: 'TreePine', worldColor: '#22C55E', position: { x: 70, y: 70 }, locked: true, type: 'puzzle', difficulty: 1, stars: 0 },
  
  // Ocean World
  { id: 'ocean-1', name: 'ABC海洋', world: 'ocean', worldIcon: 'Waves', worldColor: '#06B6D4', position: { x: 15, y: 40 }, locked: false, type: 'english', difficulty: 1, stars: 3 },
  { id: 'ocean-2', name: '海底数字', world: 'ocean', worldIcon: 'Waves', worldColor: '#06B6D4', position: { x: 30, y: 25 }, locked: false, type: 'math', difficulty: 2, stars: 2 },
  { id: 'ocean-3', name: '语言表达', world: 'ocean', worldIcon: 'Waves', worldColor: '#06B6D4', position: { x: 50, y: 35 }, locked: false, type: 'language', difficulty: 1, stars: 3 },
  { id: 'ocean-4', name: '字母拼写', world: 'ocean', worldIcon: 'Waves', worldColor: '#06B6D4', position: { x: 65, y: 20 }, locked: true, type: 'english', difficulty: 2, stars: 0 },
  { id: 'ocean-5', name: '海洋拼图', world: 'ocean', worldIcon: 'Waves', worldColor: '#06B6D4', position: { x: 80, y: 30 }, locked: true, type: 'puzzle', difficulty: 2, stars: 0 },
  
  // Space World
  { id: 'space-1', name: '星星计数', world: 'space', worldIcon: 'Rocket', worldColor: '#7C3AED', position: { x: 20, y: 15 }, locked: false, type: 'math', difficulty: 2, stars: 3 },
  { id: 'space-2', name: '太空字母', world: 'space', worldIcon: 'Rocket', worldColor: '#7C3AED', position: { x: 45, y: 10 }, locked: false, type: 'english', difficulty: 2, stars: 2 },
  { id: 'space-3', name: '音乐星球', world: 'space', worldIcon: 'Rocket', worldColor: '#7C3AED', position: { x: 60, y: 5 }, locked: true, type: 'music', difficulty: 2, stars: 0 },
  { id: 'space-4', name: '逻辑迷宫', world: 'space', worldIcon: 'Rocket', worldColor: '#7C3AED', position: { x: 85, y: 15 }, locked: true, type: 'logic', difficulty: 3, stars: 0 },
  
  // Castle World
  { id: 'castle-1', name: '公主拼图', world: 'castle', worldIcon: 'Castle', worldColor: '#EC4899', position: { x: 10, y: 50 }, locked: false, type: 'puzzle', difficulty: 1, stars: 3 },
  { id: 'castle-2', name: '骑士数学', world: 'castle', worldIcon: 'Castle', worldColor: '#EC4899', position: { x: 35, y: 45 }, locked: false, type: 'math', difficulty: 2, stars: 2 },
  { id: 'castle-3', name: '魔法绘画', world: 'castle', worldIcon: 'Castle', worldColor: '#EC4899', position: { x: 55, y: 55 }, locked: true, type: 'art', difficulty: 2, stars: 0 },
  { id: 'castle-4', name: '城堡记忆', world: 'castle', worldIcon: 'Castle', worldColor: '#EC4899', position: { x: 75, y: 40 }, locked: true, type: 'focus', difficulty: 3, stars: 0 },
  
  // Dinosaur World
  { id: 'dino-1', name: '恐龙字母', world: 'dinosaur', worldIcon: 'Dinosaur', worldColor: '#F97316', position: { x: 25, y: 85 }, locked: false, type: 'english', difficulty: 2, stars: 3 },
  { id: 'dino-2', name: '恐龙数字', world: 'dinosaur', worldIcon: 'Dinosaur', worldColor: '#F97316', position: { x: 45, y: 90 }, locked: false, type: 'math', difficulty: 3, stars: 1 },
  { id: 'dino-3', name: '恐龙拼图', world: 'dinosaur', worldIcon: 'Dinosaur', worldColor: '#F97316', position: { x: 65, y: 88 }, locked: true, type: 'puzzle', difficulty: 3, stars: 0 },
  { id: 'dino-4', name: '恐龙逻辑', world: 'dinosaur', worldIcon: 'Dinosaur', worldColor: '#F97316', position: { x: 85, y: 85 }, locked: true, type: 'logic', difficulty: 3, stars: 0 },
]

export const getLevelsByWorld = (worldId: string) => {
  return levels.filter((level) => level.world === worldId)
}

export const getUnlockedLevels = () => {
  return levels.filter((level) => !level.locked)
}
