'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { ArrowLeft, Palette, Undo2, Download, Trash2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface ArtGameProps {
  onBack: () => void
}

const brushSizes = [4, 8, 12, 16]

const artColors = [
  { name: '红色', color: '#EF4444' },
  { name: '蓝色', color: '#3B82F6' },
  { name: '绿色', color: '#22C55E' },
  { name: '黄色', color: '#EAB308' },
  { name: '紫色', color: '#A855F7' },
  { name: '橙色', color: '#F97316' },
  { name: '粉色', color: '#EC4899' },
  { name: '黑色', color: '#1F2937' },
  { name: '白色', color: '#FFFFFF', border: '1px solid #E5E7EB' },
  { name: '棕色', color: '#92400E' },
  { name: '青色', color: '#06B6D4' },
  { name: '灰色', color: '#6B7280' },
]

interface Point {
  x: number
  y: number
  color: string
  size: number
}

interface Stroke {
  points: Point[]
}

const ArtGame = ({ onBack }: ArtGameProps) => {
  const [strokes, setStrokes] = useState<Stroke[]>([])
  const [currentStroke, setCurrentStroke] = useState<Point[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [selectedColor, setSelectedColor] = useState('#EF4444')
  const [brushSize, setBrushSize] = useState(8)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    strokes.forEach(stroke => {
      if (stroke.points.length > 1) {
        ctx.beginPath()
        ctx.strokeStyle = stroke.points[0].color
        ctx.lineWidth = stroke.points[0].size
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y)
        
        stroke.points.forEach(point => {
          ctx.lineTo(point.x, point.y)
        })
        ctx.stroke()
      }
    })

    if (currentStroke.length > 1) {
      ctx.beginPath()
      ctx.strokeStyle = currentStroke[0].color
      ctx.lineWidth = currentStroke[0].size
      ctx.moveTo(currentStroke[0].x, currentStroke[0].y)
      
      currentStroke.forEach(point => {
        ctx.lineTo(point.x, point.y)
      })
      ctx.stroke()
    }
  }, [strokes, currentStroke])

  useEffect(() => {
    redrawCanvas()
  }, [redrawCanvas])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setIsDrawing(true)
    setCurrentStroke([{ x, y, color: selectedColor, size: brushSize }])
  }, [selectedColor, brushSize])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    
    const canvas = e.currentTarget
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setCurrentStroke(prev => [...prev, { x, y, color: selectedColor, size: brushSize }])
  }, [isDrawing, selectedColor, brushSize])

  const handleMouseUp = useCallback(() => {
    if (currentStroke.length > 0) {
      setStrokes(prev => [...prev, { points: currentStroke }])
    }
    setIsDrawing(false)
    setCurrentStroke([])
  }, [currentStroke])

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    const canvas = e.currentTarget
    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    
    setIsDrawing(true)
    setCurrentStroke([{ x, y, color: selectedColor, size: brushSize }])
  }, [selectedColor, brushSize])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawing) return
    
    const canvas = e.currentTarget
    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    
    setCurrentStroke(prev => [...prev, { x, y, color: selectedColor, size: brushSize }])
  }, [isDrawing, selectedColor, brushSize])

  const handleTouchEnd = useCallback(() => {
    if (currentStroke.length > 0) {
      setStrokes(prev => [...prev, { points: currentStroke }])
    }
    setIsDrawing(false)
    setCurrentStroke([])
  }, [currentStroke])

  const undoStroke = useCallback(() => {
    if (strokes.length > 0) {
      setStrokes(prev => prev.slice(0, -1))
    }
  }, [strokes.length])

  const clearCanvas = useCallback(() => {
    setStrokes([])
    setCurrentStroke([])
  }, [])

  const downloadImage = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement('a')
      link.download = 'my-drawing.png'
      link.href = canvas.toDataURL()
      link.click()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-kid-orange" />
            <h1 className="text-xl font-bold text-gray-800">创意绘画</h1>
          </div>
          <div className="w-10" />
        </div>

        <Card className="p-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {artColors.map((colorItem) => (
              <button
                key={colorItem.name}
                onClick={() => setSelectedColor(colorItem.color)}
                className={`w-8 h-8 rounded-full transition-all ${
                  selectedColor === colorItem.color ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''
                }`}
                style={{ 
                  backgroundColor: colorItem.color,
                  ...(colorItem.border ? { border: colorItem.border } : {})
                }}
                title={colorItem.name}
              />
            ))}
          </div>
        </Card>

        <Card className="p-4 mb-4">
          <div className="flex items-center justify-center gap-4">
            {brushSizes.map((size) => (
              <button
                key={size}
                onClick={() => setBrushSize(size)}
                className={`rounded-full transition-all ${
                  brushSize === size ? 'ring-2 ring-kid-orange' : 'bg-gray-100'
                }`}
                style={{ width: size * 2, height: size * 2 }}
              />
            ))}
          </div>
        </Card>

        <Card className="p-2 mb-4 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="w-full bg-white rounded-lg touch-none cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </Card>

        <div className="flex gap-3">
          <Button variant="outline" onClick={undoStroke} className="flex-1">
            <Undo2 className="w-5 h-5 mr-2" />
            撤销
          </Button>
          <Button variant="outline" onClick={clearCanvas} className="flex-1 bg-kid-red/10 hover:bg-kid-red/20 text-kid-red">
            <Trash2 className="w-5 h-5 mr-2" />
            清空
          </Button>
          <Button onClick={downloadImage} className="flex-1 bg-gradient-to-r from-kid-orange to-kid-yellow">
            <Download className="w-5 h-5 mr-2" />
            保存
          </Button>
        </div>
      </div>
    </div>
  )
}

export { ArtGame }