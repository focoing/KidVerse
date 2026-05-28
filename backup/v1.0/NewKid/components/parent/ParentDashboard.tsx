import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useKidVerseStore } from '@/store/useStore'
import { 
  BarChart3, 
  Clock, 
  Target, 
  Calendar, 
  Volume2, 
  Shield,
  Settings,
  ChevronRight,
  Star,
  TrendingUp,
  Clock4,
  Brain,
  X
} from 'lucide-react'

interface ParentDashboardProps {
  onClose: () => void
}

const ParentDashboard = ({ onClose }: ParentDashboardProps) => {
  const { user, subjects, achievements, settings, updateSettings } = useKidVerseStore()
  const [activeTab, setActiveTab] = useState('overview')

  const weeklyData = [30, 45, 20, 55, 40, 60, 35]
  const dailyData = [
    { day: '周一', time: 30, correct: 85 },
    { day: '周二', time: 45, correct: 90 },
    { day: '周三', time: 20, correct: 80 },
    { day: '周四', time: 55, correct: 95 },
    { day: '周五', time: 40, correct: 88 },
    { day: '周六', time: 60, correct: 92 },
    { day: '周日', time: 35, correct: 86 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronRight className="w-5 h-5" />
          <span>返回</span>
        </button>
        <h2 className="text-xl font-bold text-gray-800">家长中心</h2>
        <div className="w-16" />
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock4 className="w-5 h-5 text-kid-blue" />
            <span className="text-sm text-gray-500">连续学习</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{user.streak}天</div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-kid-yellow fill-kid-yellow" />
            <span className="text-sm text-gray-500">获得星星</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{user.stars}</div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-kid-green" />
            <span className="text-sm text-gray-500">平均正确率</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">92%</div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-kid-purple" />
            <span className="text-sm text-gray-500">累计学习</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">{Math.floor(user.totalPlayTime / 60)}h</div>
        </Card>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: '学习概览', icon: BarChart3 },
          { id: 'progress', label: '学习进度', icon: TrendingUp },
          { id: 'achievements', label: '成就', icon: Star },
          { id: 'settings', label: '设置', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-kid-blue to-kid-purple text-white' 
                : 'bg-white text-gray-600'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Tab content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Weekly chart */}
          <Card className="p-4">
            <h4 className="font-bold text-gray-800 mb-4">本周学习时长</h4>
            <div className="flex items-end justify-between h-32 gap-2">
              {weeklyData.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <motion.div
                    className="w-full bg-gradient-to-t from-kid-blue to-kid-purple rounded-t-lg"
                    initial={{ height: 0 }}
                    animate={{ height: `${value}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{ minHeight: '10px' }}
                  />
                  <span className="text-xs text-gray-500">{dailyData[index].day}</span>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Daily stats */}
          <Card className="p-4">
            <h4 className="font-bold text-gray-800 mb-4">每日详情</h4>
            <div className="space-y-3">
              {dailyData.map((day) => (
                <div key={day.day} className="flex items-center justify-between">
                  <span className="text-gray-600">{day.day}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{day.time}分钟</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Brain className="w-4 h-4 text-gray-400" />
                      <span className={`font-medium ${day.correct >= 90 ? 'text-kid-green' : day.correct >= 85 ? 'text-kid-yellow' : 'text-kid-orange'}`}>
                        {day.correct}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      
      {activeTab === 'progress' && (
        <Card className="p-4">
          <h4 className="font-bold text-gray-800 mb-4">各科目进度</h4>
          <div className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{subject.name}</span>
                  <span className="text-sm text-gray-500">{subject.completedLevels}/{subject.totalLevels}</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: subject.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${subject.progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {activeTab === 'achievements' && (
        <Card className="p-4">
          <h4 className="font-bold text-gray-800 mb-4">成就获取</h4>
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <div 
                key={ach.id}
                className={`p-4 rounded-xl ${ach.unlocked ? 'bg-gradient-to-br from-kid-yellow/10 to-amber-100' : 'bg-gray-100'}`}
              >
                <div className="text-3xl mb-2">{ach.unlocked ? '🏆' : '🔒'}</div>
                <h5 className="font-medium text-gray-800">{ach.name}</h5>
                <p className="text-sm text-gray-500">{ach.description}</p>
                {!ach.unlocked && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>进度</span>
                      <span>{ach.progress}/{ach.target}</span>
                    </div>
                    <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-500 rounded-full"
                        style={{ width: `${(ach.progress / ach.target) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
      
      {activeTab === 'settings' && (
        <Card className="p-4">
          <h4 className="font-bold text-gray-800 mb-4">家长控制</h4>
          <div className="space-y-4">
            {/* Screen time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-kid-blue" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">屏幕时间限制</div>
                  <div className="text-sm text-gray-500">当前：{settings.screenTimeLimit}分钟</div>
                </div>
              </div>
              <select 
                value={settings.screenTimeLimit}
                onChange={(e) => updateSettings({ screenTimeLimit: parseInt(e.target.value) })}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white"
              >
                <option value={30}>30分钟</option>
                <option value={60}>60分钟</option>
                <option value={90}>90分钟</option>
                <option value={120}>120分钟</option>
              </select>
            </div>
            
            {/* Sound */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-kid-purple" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">音效</div>
                  <div className="text-sm text-gray-500">游戏和反馈音效</div>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`w-12 h-6 rounded-full transition-all ${
                  settings.soundEnabled ? 'bg-gradient-to-r from-kid-blue to-kid-purple' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{ x: settings.soundEnabled ? 20 : 0 }}
                  className="w-5 h-5 rounded-full bg-white shadow"
                />
              </button>
            </div>
            
            {/* Music */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                  <Volume2 className="w-5 h-5 text-kid-pink" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">背景音乐</div>
                  <div className="text-sm text-gray-500">界面背景音乐</div>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ musicEnabled: !settings.musicEnabled })}
                className={`w-12 h-6 rounded-full transition-all ${
                  settings.musicEnabled ? 'bg-gradient-to-r from-kid-blue to-kid-purple' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{ x: settings.musicEnabled ? 20 : 0 }}
                  className="w-5 h-5 rounded-full bg-white shadow"
                />
              </button>
            </div>
            
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-kid-green" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">学习提醒</div>
                  <div className="text-sm text-gray-500">每日学习提醒通知</div>
                </div>
              </div>
              <button
                onClick={() => updateSettings({ notificationsEnabled: !settings.notificationsEnabled })}
                className={`w-12 h-6 rounded-full transition-all ${
                  settings.notificationsEnabled ? 'bg-gradient-to-r from-kid-blue to-kid-purple' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{ x: settings.notificationsEnabled ? 20 : 0 }}
                  className="w-5 h-5 rounded-full bg-white shadow"
                />
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}

export { ParentDashboard }
