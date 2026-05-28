'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowLeft, Music, Play, RotateCcw, Pause } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface MusicGameProps {
  onBack: () => void
}

interface Note {
  id: number
  lane: number
  top: number
}

interface Song {
  id: string
  name: string
  notes: { lane: number; delay: number }[]
}

const LANES = [
  { id: 0, color: '#EF4444', key: 'D', label: 'D', freq: 261.63 },
  { id: 1, color: '#3B82F6', key: 'F', label: 'F', freq: 293.66 },
  { id: 2, color: '#22C55E', key: 'J', label: 'J', freq: 329.63 },
  { id: 3, color: '#EAB308', key: 'K', label: 'K', freq: 392.00 },
]

const SONGS: Song[] = [
  {
    id: 'twinkle',
    name: '小星星',
    notes: [
      { lane: 0, delay: 0 }, { lane: 0, delay: 500 }, { lane: 3, delay: 500 }, { lane: 3, delay: 500 },
      { lane: 2, delay: 500 }, { lane: 2, delay: 500 }, { lane: 3, delay: 750 },
      { lane: 0, delay: 500 }, { lane: 0, delay: 500 }, { lane: 3, delay: 500 }, { lane: 3, delay: 500 },
      { lane: 2, delay: 500 }, { lane: 2, delay: 500 }, { lane: 3, delay: 750 },
      { lane: 3, delay: 500 }, { lane: 2, delay: 500 }, { lane: 1, delay: 500 }, { lane: 0, delay: 500 },
      { lane: 3, delay: 500 }, { lane: 2, delay: 500 }, { lane: 1, delay: 500 }, { lane: 0, delay: 1000 },
    ],
  },
  {
    id: 'happy',
    name: '欢乐颂',
    notes: [
      { lane: 0, delay: 0 }, { lane: 1, delay: 400 }, { lane: 2, delay: 400 }, { lane: 3, delay: 600 },
      { lane: 0, delay: 400 }, { lane: 1, delay: 400 }, { lane: 2, delay: 400 }, { lane: 3, delay: 600 },
      { lane: 2, delay: 400 }, { lane: 3, delay: 400 }, { lane: 0, delay: 400 }, { lane: 1, delay: 400 },
      { lane: 2, delay: 400 }, { lane: 3, delay: 400 }, { lane: 0, delay: 800 },
    ],
  },
  {
    id: 'mario',
    name: '超级玛丽',
    notes: [
      { lane: 2, delay: 0 }, { lane: 2, delay: 200 }, { lane: 2, delay: 200 },
      { lane: 0, delay: 400 }, { lane: 1, delay: 400 },
      { lane: 2, delay: 600 },
      { lane: 3, delay: 600 },
      { lane: 1, delay: 400 }, { lane: 3, delay: 400 }, { lane: 2, delay: 400 }, { lane: 0, delay: 800 },
    ],
  },
  {
    id: 'random',
    name: '自由模式',
    notes: [],
  },
]

const GAME_HEIGHT = 400
const JUDGE_LINE = 350
const HIT_RANGE = 30
const FALL_SPEED = 2.5

const MusicGame = ({ onBack }: MusicGameProps) => {
  const [notes, setNotes] = useState<Note[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [activeLane, setActiveLane] = useState<number | null>(null)
  const [selectedSong, setSelectedSong] = useState('twinkle')
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  
  const noteIdRef = useRef(0)
  const audioContextRef = useRef<AudioContext | null>(null)
  const songIndexRef = useRef(0)
  const lastNoteTimeRef = useRef(0)
  const gameLoopRef = useRef<number | null>(null)
  const gameStateRef = useRef({ isPlaying: false, gameOver: false })

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    return audioContextRef.current
  }, [])

  const playNoteSound = useCallback((freq: number) => {
    try {
      const ctx = getAudioContext()
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime)
      
      gainNode.gain.setValueAtTime(0.25, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)
      
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.25)
    } catch (e) {
      console.log('Audio playback failed:', e)
    }
  }, [getAudioContext])

  const resetGame = useCallback(() => {
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current)
      gameLoopRef.current = null
    }
    setNotes([])
    setIsPlaying(false)
    setGameOver(false)
    setScore(0)
    setCombo(0)
    noteIdRef.current = 0
    songIndexRef.current = 0
    lastNoteTimeRef.current = 0
    gameStateRef.current = { isPlaying: false, gameOver: false }
  }, [])

  const spawnNote = useCallback((laneId: number) => {
    const newNote: Note = {
      id: noteIdRef.current++,
      lane: laneId,
      top: -30,
    }
    setNotes(prev => [...prev, newNote])
  }, [])

  const handleHit = useCallback((laneId: number) => {
    if (!gameStateRef.current.isPlaying || gameStateRef.current.gameOver) return

    setActiveLane(laneId)
    setTimeout(() => setActiveLane(null), 150)

    const lane = LANES.find(l => l.id === laneId)
    if (lane) {
      playNoteSound(lane.freq)
    }

    setNotes(prev => {
      const hitNoteIndex = prev.findIndex(
        note => note.lane === laneId && 
                Math.abs(note.top - JUDGE_LINE) <= HIT_RANGE
      )
      
      if (hitNoteIndex !== -1) {
        const newNotes = [...prev]
        newNotes.splice(hitNoteIndex, 1)
        
        setCombo(prevCombo => {
          const newCombo = prevCombo + 1
          setScore(prev => prev + 10 * (1 + Math.floor(newCombo / 5)))
          return newCombo
        })
        
        return newNotes
      } else {
        setCombo(0)
        return prev
      }
    })
  }, [playNoteSound])

  useEffect(() => {
    gameStateRef.current = { isPlaying, gameOver }
  }, [isPlaying, gameOver])

  useEffect(() => {
    if (!isPlaying || gameOver) return

    const currentSong = SONGS.find(s => s.id === selectedSong)
    const isSongMode = currentSong && currentSong.notes.length > 0

    const gameLoop = () => {
      const now = Date.now()

      if (isSongMode && songIndexRef.current < currentSong!.notes.length) {
        const noteInfo = currentSong!.notes[songIndexRef.current]
        const expectedTime = lastNoteTimeRef.current + noteInfo.delay
        
        if (now >= expectedTime) {
          spawnNote(noteInfo.lane)
          lastNoteTimeRef.current = now
          songIndexRef.current++
        }
      } else if (!isSongMode) {
        const shouldSpawn = Math.random() < 0.02
        if (shouldSpawn) {
          spawnNote(Math.floor(Math.random() * 4))
        }
      }

      setNotes(prev => {
        const updated = prev.map(note => ({
          ...note,
          top: note.top + FALL_SPEED,
        }))

        const stillOnScreen = updated.filter(note => {
          if (note.top > GAME_HEIGHT) {
            setCombo(0)
            return false
          }
          return true
        })

        if (isSongMode && songIndexRef.current >= currentSong!.notes.length && stillOnScreen.length === 0) {
          setTimeout(() => {
            setGameOver(true)
            setIsPlaying(false)
          }, 1000)
        } else if (!isSongMode && stillOnScreen.length === 0 && prev.length > 30) {
          setTimeout(() => {
            setGameOver(true)
            setIsPlaying(false)
          }, 1000)
        }

        return stillOnScreen
      })

      if (gameStateRef.current.isPlaying && !gameStateRef.current.gameOver) {
        gameLoopRef.current = requestAnimationFrame(gameLoop)
      }
    }

    lastNoteTimeRef.current = Date.now()
    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }
  }, [isPlaying, gameOver, selectedSong, spawnNote])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStateRef.current.isPlaying || gameStateRef.current.gameOver) return

      const lane = LANES.find(l => l.key.toLowerCase() === e.key.toLowerCase())
      if (lane) {
        handleHit(lane.id)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleHit])

  useEffect(() => {
    return () => {
      resetGame()
    }
  }, [resetGame])

  const startGame = useCallback(() => {
    resetGame()
    setTimeout(() => {
      setIsPlaying(true)
    }, 100)
  }, [resetGame])

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="p-8 text-center">
            <div className="text-6xl mb-4">🎵</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">演奏完成！</h2>
            <div className="bg-gradient-to-r from-kid-purple/10 to-indigo-400/10 rounded-2xl p-4 mb-6">
              <div className="text-3xl font-bold text-kid-purple mb-2">{score} 分</div>
              <div className="text-sm text-gray-500">最高连击: {combo}</div>
            </div>
            <div className="flex gap-4">
              <Button onClick={startGame} className="flex-1 bg-gradient-to-r from-kid-purple to-kid-indigo">
                <RotateCcw className="w-5 h-5 mr-2" />
                再玩一次
              </Button>
              <Button variant="outline" onClick={onBack}>
                返回首页
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <Music className="w-6 h-6 text-kid-purple" />
            <h1 className="text-xl font-bold text-gray-800">音乐节奏</h1>
          </div>
          <div className="w-10" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <select
            value={selectedSong}
            onChange={(e) => {
              if (!isPlaying) {
                setSelectedSong(e.target.value)
              }
            }}
            disabled={isPlaying}
            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-kid-purple/50 w-32 disabled:opacity-50"
          >
            {SONGS.map(song => (
              <option key={song.id} value={song.id}>
                {song.name}
              </option>
            ))}
          </select>
          
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-kid-purple">{score} 分</span>
            {combo > 0 && (
              <span className="px-2 py-1 bg-kid-yellow/20 rounded-full text-kid-yellow font-medium">
                {combo} 连击
              </span>
            )}
          </div>

          <Button
            onClick={isPlaying ? resetGame : startGame}
            className={isPlaying ? 'bg-kid-red' : 'bg-gradient-to-r from-kid-purple to-kid-indigo'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
        </div>

        <Card className="relative overflow-hidden" style={{ height: GAME_HEIGHT }}>
          <div 
            className="absolute left-0 right-0 h-2 bg-gray-400 rounded-full" 
            style={{ top: JUDGE_LINE - 4 }} 
          />
          
          <div className="relative w-full h-full flex">
            {LANES.map((lane) => (
              <div key={lane.id} className="flex-1 relative border-x border-gray-100">
                {notes
                  .filter(note => note.lane === lane.id)
                  .map((note) => (
                    <div
                      key={note.id}
                      className="absolute left-1/2 -translate-x-1/2 w-10 h-6 rounded-full transition-opacity"
                      style={{ 
                        top: note.top,
                        backgroundColor: lane.color,
                        boxShadow: `0 0 12px ${lane.color}`,
                        opacity: note.top > GAME_HEIGHT - 50 ? 0 : 1,
                      }}
                    />
                  ))}

                <button
                  onClick={() => handleHit(lane.id)}
                  disabled={!isPlaying}
                  className="absolute bottom-0 left-0 right-0 h-20 flex items-center justify-center transition-all disabled:opacity-50"
                  style={{ 
                    backgroundColor: activeLane === lane.id ? `${lane.color}60` : `${lane.color}20`,
                  }}
                >
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transition-transform ${
                      activeLane === lane.id ? 'scale-110' : ''
                    }`}
                    style={{ backgroundColor: lane.color }}
                  >
                    {lane.label}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </Card>

        <p className="text-center text-gray-500 text-sm mt-4">
          点击按钮或按键盘 D F J K 键来击打音符！
        </p>
      </div>
    </div>
  )
}

export { MusicGame }