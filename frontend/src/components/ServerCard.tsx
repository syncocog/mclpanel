'use client'

import { motion } from 'framer-motion'
import { Play, Square, RotateCw, Trash2, Terminal } from 'lucide-react'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'

interface ServerCardProps {
  server: any
  onUpdate: () => void
}

export default function ServerCard({ server, onUpdate }: ServerCardProps) {
  const statusColors = {
    running: 'neon-green',
    stopped: 'gray-500',
    starting: 'neon-blue',
    stopping: 'neon-pink',
  }

  const handleStart = async () => {
    try {
      await api.post(`/servers/${server.id}/start`)
      toast.success('Server starting...')
      onUpdate()
    } catch (error) {
      toast.error('Failed to start server')
    }
  }

  const handleStop = async () => {
    try {
      await api.post(`/servers/${server.id}/stop`)
      toast.success('Server stopping...')
      onUpdate()
    } catch (error) {
      toast.error('Failed to stop server')
    }
  }

  const handleRestart = async () => {
    try {
      await api.post(`/servers/${server.id}/restart`)
      toast.success('Server restarting...')
      onUpdate()
    } catch (error) {
      toast.error('Failed to restart server')
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this server?')) return
    
    try {
      await api.delete(`/servers/${server.id}`)
      toast.success('Server deleted')
      onUpdate()
    } catch (error) {
      toast.error('Failed to delete server')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-dark-800 p-6 rounded-lg border border-${statusColors[server.status as keyof typeof statusColors]} shadow-lg`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{server.name}</h3>
          <p className="text-sm text-gray-400">{server.type}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${statusColors[server.status as keyof typeof statusColors]}/20 text-${statusColors[server.status as keyof typeof statusColors]}`}>
          {server.status}
        </span>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Memory:</span>
          <span>{server.resources?.memory || 0} MB</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">CPU:</span>
          <span>{server.resources?.cpu || 0}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Port:</span>
          <span>{server.ports?.game || 'N/A'}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {server.status === 'stopped' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neon-green text-dark-900 rounded-lg font-semibold"
          >
            <Play className="w-4 h-4" />
            Start
          </motion.button>
        )}
        
        {server.status === 'running' && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStop}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold"
            >
              <Square className="w-4 h-4" />
              Stop
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
              className="px-4 py-2 bg-neon-blue text-dark-900 rounded-lg"
            >
              <RotateCw className="w-4 h-4" />
            </motion.button>
          </>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDelete}
          className="px-4 py-2 bg-red-900/20 text-red-400 rounded-lg"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}
