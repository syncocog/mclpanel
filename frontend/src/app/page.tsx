'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Zap, Server, Shield, TrendingUp } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-blue rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <motion.h1
          className="text-7xl font-bold mb-4 glow-text text-neon-blue"
          animate={{ textShadow: ['0 0 10px #00f3ff', '0 0 30px #00f3ff', '0 0 10px #00f3ff'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          MCLEGENDS.GG
        </motion.h1>
        
        <p className="text-2xl text-gray-400 mb-12">
          Next-Generation Game Server Management
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Zap, title: 'Lightning Fast', color: 'neon-blue' },
            { icon: Server, title: 'Full Control', color: 'neon-purple' },
            { icon: Shield, title: 'Secure', color: 'neon-pink' },
            { icon: TrendingUp, title: 'Analytics', color: 'neon-green' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className={`p-6 bg-dark-800 rounded-lg border border-${feature.color} shadow-neon-${feature.color} hover:scale-105 transition-transform`}
            >
              <feature.icon className={`w-12 h-12 mx-auto mb-4 text-${feature.color}`} />
              <h3 className="text-lg font-semibold">{feature.title}</h3>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/login')}
            className="px-8 py-4 bg-neon-blue text-dark-900 font-bold rounded-lg shadow-neon-blue hover:shadow-neon-blue transition-all"
          >
            Login
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/register')}
            className="px-8 py-4 bg-transparent border-2 border-neon-purple text-neon-purple font-bold rounded-lg hover:bg-neon-purple hover:text-dark-900 transition-all"
          >
            Register
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
