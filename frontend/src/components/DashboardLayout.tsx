'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Server, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Database,
  BarChart3,
  Users
} from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Server, label: 'Servers', path: '/dashboard/servers' },
    { icon: Database, label: 'Backups', path: '/dashboard/backups' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Users, label: 'Users', path: '/dashboard/users' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 80 }}
        className="bg-dark-800 border-r border-gray-700 relative"
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-neon-blue glow-text"
            >
              MCLEGENDS
            </motion.h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-dark-700 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="mt-8 space-y-2 px-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.path}
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-700 transition-colors"
            >
              <item.icon className="w-5 h-5 text-neon-blue" />
              {sidebarOpen && <span>{item.label}</span>}
            </motion.button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-900/20 text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
