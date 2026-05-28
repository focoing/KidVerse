import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface User {
  id: string
  name: string
  avatar: string
  age: number
  level: number
  xp: number
  gold: number
  stars: number
  streak: number
  totalPlayTime: number
  lastPlayDate: string
}

export interface Skill {
  id: string
  name: string
  icon: string
  level: number
  maxLevel: number
  description: string
}

export interface Character {
  id: string
  name: string
  avatar: string
  level: number
  skills: Skill[]
  outfits: string[]
  currentOutfit: string
  pet?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
  progress: number
  target: number
}

export interface GameRecord {
  gameId: string
  score: number
  completed: boolean
  timestamp: string
  timeSpent: number
}

export interface LevelProgress {
  levelId: string
  completed: boolean
  stars: number
  bestScore: number
  unlocked: boolean
}

export interface Subject {
  id: string
  name: string
  icon: string
  color: string
  progress: number
  totalLevels: number
  completedLevels: number
}

export interface DailyTask {
  id: string
  title: string
  description: string
  icon: string
  reward: {
    gold: number
    xp: number
    stars: number
  }
  completed: boolean
  progress: number
  target: number
}

interface KidVerseState {
  // User
  user: User
  
  // Character
  character: Character
  
  // Achievements
  achievements: Achievement[]
  
  // Game Records
  gameRecords: GameRecord[]
  
  // Level Progress
  levelProgress: Record<string, LevelProgress>
  
  // Subjects
  subjects: Subject[]
  
  // Daily Tasks
  dailyTasks: DailyTask[]
  
  // Settings
  settings: {
    soundEnabled: boolean
    musicEnabled: boolean
    notificationsEnabled: boolean
    screenTimeLimit: number
    contentFilter: 'all' | 'kids' | 'educational'
  }
  
  // Parent Mode
  isParentMode: boolean
  
  // Actions
  addXP: (amount: number) => void
  addGold: (amount: number) => void
  addStars: (amount: number) => void
  completeDailyTask: (taskId: string) => void
  completeLevel: (levelId: string, stars: number, score: number) => void
  unlockAchievement: (achievementId: string) => void
  updateCharacterOutfit: (outfit: string) => void
  toggleParentMode: () => void
  updateSettings: (settings: Partial<KidVerseState['settings']>) => void
  incrementStreak: () => void
  resetStreak: () => void
  addPlayTime: (minutes: number) => void
}

// Initial data
const initialUser: User = {
  id: 'user-1',
  name: '小明',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=happy',
  age: 6,
  level: 8,
  xp: 340,
  gold: 1250,
  stars: 42,
  streak: 7,
  totalPlayTime: 1256,
  lastPlayDate: new Date().toISOString().split('T')[0],
}

const initialCharacter: Character = {
  id: 'char-1',
  name: '小探险家',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=explorer',
  level: 8,
  skills: [
    { id: 'skill-1', name: '数学能力', icon: 'Calculator', level: 5, maxLevel: 10, description: '提升数学计算能力' },
    { id: 'skill-2', name: '英语能力', icon: 'Languages', level: 4, maxLevel: 10, description: '提升英语听说能力' },
    { id: 'skill-3', name: '记忆力', icon: 'Brain', level: 6, maxLevel: 10, description: '提升记忆能力' },
    { id: 'skill-4', name: '创造力', icon: 'Palette', level: 3, maxLevel: 10, description: '提升创造力' },
  ],
  outfits: ['default', 'pirate', 'astronaut', 'princess'],
  currentOutfit: 'default',
  pet: 'dog',
}

const initialAchievements: Achievement[] = [
  { id: 'ach-1', name: '初次探索', description: '完成第一个学习关卡', icon: 'Compass', unlocked: true, unlockedAt: '2024-01-15', progress: 1, target: 1 },
  { id: 'ach-2', name: '数学天才', description: '数学关卡累计获得10颗星星', icon: 'Calculator', unlocked: true, unlockedAt: '2024-01-18', progress: 12, target: 10 },
  { id: 'ach-3', name: '阅读之星', description: '英语关卡累计获得10颗星星', icon: 'BookOpen', unlocked: true, unlockedAt: '2024-01-20', progress: 15, target: 10 },
  { id: 'ach-4', name: '连续七天', description: '连续学习7天', icon: 'Flame', unlocked: true, unlockedAt: '2024-01-22', progress: 7, target: 7 },
  { id: 'ach-5', name: '记忆大师', description: '完成所有记忆游戏', icon: 'Brain', unlocked: false, progress: 3, target: 5 },
  { id: 'ach-6', name: '艺术达人', description: '完成创意绘画10次', icon: 'Palette', unlocked: false, progress: 7, target: 10 },
  { id: 'ach-7', name: '音乐之星', description: '完成所有音乐关卡', icon: 'Music', unlocked: false, progress: 2, target: 5 },
  { id: 'ach-8', name: '全能学霸', description: '所有科目达到5级', icon: 'Trophy', unlocked: false, progress: 2, target: 6 },
]

const initialSubjects: Subject[] = [
  { id: 'math', name: '数学乐园', icon: 'Calculator', color: '#4F46E5', progress: 65, totalLevels: 20, completedLevels: 13 },
  { id: 'english', name: '英语探险', icon: 'Languages', color: '#EC4899', progress: 55, totalLevels: 20, completedLevels: 11 },
  { id: 'emotion', name: '情绪识别屋', icon: 'Smile', color: '#FB7185', progress: 45, totalLevels: 15, completedLevels: 7 },
  { id: 'language', name: '语言表达森林', icon: 'MessageCircle', color: '#38BDF8', progress: 40, totalLevels: 15, completedLevels: 6 },
  { id: 'cooperation', name: '合作乐园', icon: 'Users', color: '#4ADE80', progress: 35, totalLevels: 15, completedLevels: 5 },
  { id: 'friends', name: '朋友广场', icon: 'Users2', color: '#A78BFA', progress: 30, totalLevels: 15, completedLevels: 4 },
  { id: 'art', name: '创意绘画', icon: 'Palette', color: '#F97316', progress: 35, totalLevels: 15, completedLevels: 5 },
  { id: 'music', name: '音乐节奏', icon: 'Music', color: '#7C3AED', progress: 25, totalLevels: 10, completedLevels: 3 },
]

const initialDailyTasks: DailyTask[] = [
  { id: 'task-1', title: '学习数学', description: '完成1个数学关卡', icon: 'Calculator', reward: { gold: 50, xp: 100, stars: 1 }, completed: true, progress: 1, target: 1 },
  { id: 'task-2', title: '阅读英语', description: '完成1个英语关卡', icon: 'BookOpen', reward: { gold: 50, xp: 100, stars: 1 }, completed: false, progress: 0, target: 1 },
  { id: 'task-3', title: '记忆挑战', description: '完成1个记忆游戏', icon: 'Brain', reward: { gold: 30, xp: 60, stars: 1 }, completed: false, progress: 0, target: 1 },
  { id: 'task-4', title: '创意创作', description: '完成1次绘画', icon: 'Palette', reward: { gold: 40, xp: 80, stars: 1 }, completed: true, progress: 1, target: 1 },
]

export const useKidVerseStore = create<KidVerseState>()(
  persist(
    (set, get) => ({
      user: initialUser,
      character: initialCharacter,
      achievements: initialAchievements,
      gameRecords: [],
      levelProgress: {},
      subjects: initialSubjects,
      dailyTasks: initialDailyTasks,
      settings: {
        soundEnabled: true,
        musicEnabled: true,
        notificationsEnabled: true,
        screenTimeLimit: 60,
        contentFilter: 'all',
      },
      isParentMode: false,

      addXP: (amount: number) => {
        set((state) => {
          const newXP = state.user.xp + amount
          let newLevel = state.user.level
          let remainingXP = newXP
          
          while (remainingXP >= 100) {
            remainingXP -= 100
            newLevel++
          }
          
          return {
            user: {
              ...state.user,
              xp: remainingXP,
              level: newLevel,
            },
            character: {
              ...state.character,
              level: newLevel,
            },
          }
        })
      },

      addGold: (amount: number) => {
        set((state) => ({
          user: {
            ...state.user,
            gold: state.user.gold + amount,
          },
        }))
      },

      addStars: (amount: number) => {
        set((state) => ({
          user: {
            ...state.user,
            stars: state.user.stars + amount,
          },
        }))
      },

      completeDailyTask: (taskId: string) => {
        set((state) => {
          const task = state.dailyTasks.find((t) => t.id === taskId)
          if (!task || task.completed) return state

          return {
            dailyTasks: state.dailyTasks.map((t) =>
              t.id === taskId ? { ...t, completed: true, progress: t.target } : t
            ),
            user: {
              ...state.user,
              gold: state.user.gold + task.reward.gold,
              xp: state.user.xp + task.reward.xp,
              stars: state.user.stars + task.reward.stars,
            },
          }
        })
      },

      completeLevel: (levelId: string, stars: number, score: number) => {
        set((state) => {
          const existingProgress = state.levelProgress[levelId]
          const newStars = Math.max(existingProgress?.stars || 0, stars)
          const newBestScore = Math.max(existingProgress?.bestScore || 0, score)

          return {
            levelProgress: {
              ...state.levelProgress,
              [levelId]: {
                levelId,
                completed: true,
                stars: newStars,
                bestScore: newBestScore,
                unlocked: true,
              },
            },
          }
        })
      },

      unlockAchievement: (achievementId: string) => {
        set((state) => ({
          achievements: state.achievements.map((ach) =>
            ach.id === achievementId
              ? { ...ach, unlocked: true, unlockedAt: new Date().toISOString().split('T')[0] }
              : ach
          ),
        }))
      },

      updateCharacterOutfit: (outfit: string) => {
        set((state) => ({
          character: {
            ...state.character,
            currentOutfit: outfit,
          },
        }))
      },

      toggleParentMode: () => {
        set((state) => ({
          isParentMode: !state.isParentMode,
        }))
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        }))
      },

      incrementStreak: () => {
        set((state) => ({
          user: {
            ...state.user,
            streak: state.user.streak + 1,
            lastPlayDate: new Date().toISOString().split('T')[0],
          },
        }))
      },

      resetStreak: () => {
        set((state) => ({
          user: {
            ...state.user,
            streak: 0,
          },
        }))
      },

      addPlayTime: (minutes: number) => {
        set((state) => ({
          user: {
            ...state.user,
            totalPlayTime: state.user.totalPlayTime + minutes,
          },
        }))
      },
    }),
    {
      name: 'kidverse-storage',
    }
  )
)
