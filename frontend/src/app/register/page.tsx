'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Mail, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '@/lib/api'

export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/auth/register', { email, username, password })
      toast.success('Registration successful! Please login.')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-dark-800 p-8 rounded-lg border border-neon-purple shadow-neon-purple">
          <h1 className="text-4xl font-bold text-center mb-8 text-neon-purple glow-text">
            Register
          </h1>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:border-neon-purple focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:border-neon-purple focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:border-neon-purple focus:outline-none"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-neon-purple text-white font-bold rounded-lg shadow-neon-purple hover:shadow-neon-purple transition-all disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Register'}
            </motion.button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-neon-blue hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
