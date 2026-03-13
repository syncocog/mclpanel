'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Mail } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '@/lib/api'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await api.post('/auth/login', { email, password })
      
      if (response.data.requiresTwoFactor) {
        const code = prompt('Enter 2FA code:')
        if (code) {
          const response2fa = await api.post('/auth/login', { email, password, twoFactorCode: code })
          localStorage.setItem('token', response2fa.data.access_token)
          localStorage.setItem('user', JSON.stringify(response2fa.data.user))
          toast.success('Login successful!')
          router.push('/dashboard')
        }
      } else {
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        toast.success('Login successful!')
        router.push('/dashboard')
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed')
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
        <div className="bg-dark-800 p-8 rounded-lg border border-neon-blue shadow-neon-blue">
          <h1 className="text-4xl font-bold text-center mb-8 text-neon-blue glow-text">
            Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:border-neon-blue focus:outline-none"
                  placeholder="admin@mclegends.gg"
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
                  className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-gray-600 rounded-lg focus:border-neon-blue focus:outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-neon-blue text-dark-900 font-bold rounded-lg shadow-neon-blue hover:shadow-neon-blue transition-all disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-neon-purple hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
