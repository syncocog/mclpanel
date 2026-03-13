'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  icon: LucideIcon
  title: string
  value: string | number
  color: string
}

export default function StatsCard({ icon: Icon, title, value, color }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`bg-dark-800 p-6 rounded-lg border border-${color} shadow-${color}`}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 text-${color}`} />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className={`w-12 h-12 rounded-full bg-${color}/10 flex items-center justify-center`}
        >
          <div className={`w-6 h-6 rounded-full bg-${color}/20`} />
        </motion.div>
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </motion.div>
  )
}
