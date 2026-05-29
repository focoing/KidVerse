'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { LearningSystem } from '@/components/landing/LearningSystem'
import { ParentModeSection } from '@/components/landing/ParentModeSection'
import { TopNav } from '@/components/dashboard/TopNav'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { DashboardContent } from '@/components/dashboard/DashboardContent'
import { WorldMap } from '@/components/map/WorldMap'
import { CharacterProfile } from '@/components/character/CharacterProfile'
import { ParentDashboard } from '@/components/parent/ParentDashboard'
import { AchievementsPage } from '@/components/achievements/AchievementsPage'
import { TasksPage } from '@/components/tasks/TasksPage'
import { FriendsPage } from '@/components/friends/FriendsPage'
import { NumberClickGame } from '@/components/games/NumberClickGame'
import { LetterDragGame } from '@/components/games/LetterDragGame'
import { MemoryCardsGame } from '@/components/games/MemoryCardsGame'
import { ColorMatchGame } from '@/components/games/ColorMatchGame'
import { PuzzleGame } from '@/components/games/PuzzleGame'
import { EmotionGame } from '@/components/games/EmotionGame'
import { LanguageGame } from '@/components/games/LanguageGame'
import { CooperationGame } from '@/components/games/CooperationGame'
import { FriendsGame } from '@/components/games/FriendsGame'
import { ArtGame } from '@/components/games/ArtGame'
import { MusicGame } from '@/components/games/MusicGame'
import { useKidVerseStore } from '@/store/useStore'

type PageView = 
  | 'landing'
  | 'dashboard'
  | 'map'
  | 'character'
  | 'parent'
  | 'achievements'
  | 'tasks'
  | 'friends'
  | 'game-number-click'
  | 'game-letter-drag'
  | 'game-emotion'
  | 'game-language'
  | 'game-cooperation'
  | 'game-friends'
  | 'game-art'
  | 'game-music'
  | 'game-color-match'
  | 'game-puzzle'
  | 'game-memory-cards'

export default function Home() {
  const [currentView, setCurrentView] = useState<PageView>('landing')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { toggleParentMode } = useKidVerseStore()

  const handleStart = () => {
    setCurrentView('dashboard')
  }

  const handleSelectFeature = (featureId: string) => {
    switch (featureId) {
      case 'math':
        setCurrentView('game-number-click')
        break
      case 'english':
        setCurrentView('game-letter-drag')
        break
      case 'emotion':
        setCurrentView('game-emotion')
        break
      case 'language':
        setCurrentView('game-language')
        break
      case 'cooperation':
        setCurrentView('game-cooperation')
        break
      case 'friends':
        setCurrentView('game-friends')
        break
      case 'art':
        setCurrentView('game-art')
        break
      case 'music':
        setCurrentView('game-music')
        break
      default:
        setCurrentView('dashboard')
    }
  }

  const handleCourseClick = (courseId: string) => {
    handleSelectFeature(courseId)
  }

  const handleLevelSelect = (levelId: string) => {
    setCurrentView('game-number-click')
  }

  const handleBack = () => {
    setCurrentView('dashboard')
  }

  const handleParentMode = () => {
    toggleParentMode()
    setCurrentView('parent')
  }

  const handleCloseParent = () => {
    setCurrentView('dashboard')
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection onStart={handleStart} />
            <FeaturesSection onSelectFeature={handleSelectFeature} />
            <LearningSystem />
            <ParentModeSection />
          </motion.div>
        )}
        
        {(currentView === 'dashboard' || currentView === 'map') && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
          >
            <Sidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              activeItem={currentView === 'map' ? 'map' : 'home'}
              onItemSelect={(item) => {
                switch (item) {
                  case 'home':
                    setCurrentView('dashboard')
                    break
                  case 'map':
                    setCurrentView('map')
                    break
                  case 'achievements':
                    setCurrentView('achievements')
                    break
                  case 'tasks':
                    setCurrentView('tasks')
                    break
                  case 'friends':
                    setCurrentView('friends')
                    break
                  case 'parent':
                    handleParentMode()
                    break
                  default:
                    setCurrentView('dashboard')
                }
              }}
            />
            
            <div className="flex-1 flex flex-col">
              <TopNav
                onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                onParentMode={handleParentMode}
              />
              
              {currentView === 'dashboard' && (
                <DashboardContent
                  onCourseClick={handleCourseClick}
                  onContinueLearning={() => setCurrentView('game-number-click')}
                />
              )}
              
              {currentView === 'map' && (
                <div className="flex-1 p-4">
                  <WorldMap onLevelSelect={handleLevelSelect} />
                </div>
              )}
            </div>
          </motion.div>
        )}
        
        {currentView === 'character' && (
          <motion.div
            key="character"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <CharacterProfile onClose={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'parent' && (
          <motion.div
            key="parent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <ParentDashboard onClose={handleCloseParent} />
          </motion.div>
        )}
        
        {currentView === 'achievements' && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <AchievementsPage onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'tasks' && (
          <motion.div
            key="tasks"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <TasksPage onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'friends' && (
          <motion.div
            key="friends"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <FriendsPage onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'game-number-click' && (
          <motion.div
            key="game-number-click"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NumberClickGame onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'game-letter-drag' && (
          <motion.div
            key="game-letter-drag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LetterDragGame onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'game-memory-cards' && (
          <motion.div
            key="game-memory-cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MemoryCardsGame onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'game-emotion' && (
          <motion.div
            key="game-emotion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EmotionGame onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'game-language' && (
          <motion.div
            key="game-language"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LanguageGame onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'game-cooperation' && (
          <motion.div
            key="game-cooperation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CooperationGame onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'game-friends' && (
          <motion.div
            key="game-friends"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FriendsGame onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'game-art' && (
          <motion.div
            key="game-art"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ArtGame onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'game-music' && (
          <motion.div
            key="game-music"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MusicGame onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'game-color-match' && (
          <motion.div
            key="game-color-match"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ColorMatchGame onBack={handleBack} />
          </motion.div>
        )}
        
        {currentView === 'game-puzzle' && (
          <motion.div
            key="game-puzzle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PuzzleGame onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
