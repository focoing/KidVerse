import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Award,
  Map,
  CalendarCheck,
  Users,
  Shield,
  Home,
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeItem: string
  onItemSelect: (item: string) => void
}

const menuItems = [
  { id: 'home', icon: Home, label: '首页' },
  { id: 'courses', icon: BookOpen, label: '我的课程' },
  { id: 'achievements', icon: Award, label: '我的勋章' },
  { id: 'map', icon: Map, label: '学习地图' },
  { id: 'tasks', icon: CalendarCheck, label: '每日任务' },
  { id: 'friends', icon: Users, label: '我的朋友' },
  { id: 'parent', icon: Shield, label: '家长中心' },
]

const Sidebar = ({ isOpen, onClose, activeItem, onItemSelect }: SidebarProps) => {
  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-50 md:hidden"
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed left-0 top-0 h-full w-64 glass z-50 md:translate-x-0 md:relative md:h-auto md:bg-transparent md:backdrop-blur-none"
      >
        <nav className="p-4 md:p-0">
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  onItemSelect(item.id)
                  onClose()
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeItem === item.id
                    ? 'bg-gradient-to-r from-kid-blue to-kid-purple text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </nav>
      </motion.aside>
    </>
  )
}

export { Sidebar }
