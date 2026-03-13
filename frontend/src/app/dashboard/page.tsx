'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Server, Plus, Activity, Users, Cpu } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '@/lib/api'
import DashboardLayout from '@/components/DashboardLayout'
import ServerCard from '@/components/ServerCard'
import StatsCard from '@/components/StatsCard'

export default function Dashboard() {
  const router = useRouter()
  const [servers, setServers] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalServers: 0,
    runningServers: 0,
    totalPlayers: 0,
    avgCpu: 0,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    fetchServers()
  }, [router])

  const fetchServers = async () => {
    try {
      const response = await api.get('/servers')
      setServers(response.data)
      
      const running = response.data.filter((s: any) => s.status === 'running').length
      setStats({
        totalServers: response.data.length,
        runningServers: running,
        totalPlayers: 0,
        avgCpu: 0,
      })
    } catch (error) {
      toast.error('Failed to fetch servers')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-neon-blue glow-text">Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/dashboard/servers/create')}
            className="flex items-center gap-2 px-6 py-3 bg-neon-blue text-dark-900 font-bold rounded-lg shadow-neon-blue"
          >
            <Plus className="w-5 h-5" />
            Create Server
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            icon={Server}
            title="Total Servers"
            value={stats.totalServers}
            color="neon-blue"
          />
          <StatsCard
            icon={Activity}
            title="Running"
            value={stats.runningServers}
            color="neon-green"
          />
          <StatsCard
            icon={Users}
            title="Players"
            value={stats.totalPlayers}
            color="neon-purple"
          />
          <StatsCard
            icon={Cpu}
            title="Avg CPU"
            value={`${stats.avgCpu}%`}
            color="neon-pink"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Your Servers</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : servers.length === 0 ? (
            <div className="text-center py-12 bg-dark-800 rounded-lg border border-gray-700">
              <Server className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400 mb-4">No servers yet</p>
              <button
                onClick={() => router.push('/dashboard/servers/create')}
                className="px-6 py-2 bg-neon-blue text-dark-900 font-bold rounded-lg"
              >
                Create Your First Server
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servers.map((server: any) => (
                <ServerCard key={server.id} server={server} onUpdate={fetchServers} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
