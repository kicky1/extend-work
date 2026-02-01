'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/cv-creator')
      router.refresh()
    } catch (error: any) {
      if (error.message === 'Email not confirmed') {
        toast.error('Email not confirmed. Please check your inbox for the verification link.')
      } else {
        toast.error(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f7] px-4">
      {/* Logo */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2">
        <span className="font-semibold text-[#1a2a2a] text-lg tracking-tight">Extend Career</span>
      </Link>

      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e4df] p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1a2a2a]">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-[#5a6a6a]">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="font-medium text-[#1a4a4a] hover:text-[#0d3535]"
              >
                Sign up
              </Link>
            </p>
          </div>
          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#3a4a4a] mb-1.5">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-[#e8e4df] placeholder-[#8a9a9a] text-[#1a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a4a4a]/20 focus:border-[#1a4a4a] transition-colors bg-white"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#3a4a4a] mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-[#e8e4df] placeholder-[#8a9a9a] text-[#1a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a4a4a]/20 focus:border-[#1a4a4a] transition-colors bg-white"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a4a4a] hover:bg-[#0d3535] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a4a4a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
