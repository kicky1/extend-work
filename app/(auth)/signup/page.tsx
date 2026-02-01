'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      toast.success('Verification email sent! Please check your inbox.')
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f7] px-4">
      {/* Logo */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#1a4a4a] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
        </div>
        <span className="font-semibold text-[#1a2a2a] text-lg tracking-tight">Extend Career</span>
      </Link>

      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-[#e8e4df] p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1a2a2a]">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-[#5a6a6a]">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-medium text-[#1a4a4a] hover:text-[#0d3535]"
              >
                Sign in
              </Link>
            </p>
          </div>
          <form className="space-y-5" onSubmit={handleSignup}>
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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-[#e8e4df] placeholder-[#8a9a9a] text-[#1a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a4a4a]/20 focus:border-[#1a4a4a] transition-colors bg-white"
                  placeholder="Min 6 characters"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-[#3a4a4a] mb-1.5">
                  Confirm password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-4 py-2.5 border border-[#e8e4df] placeholder-[#8a9a9a] text-[#1a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a4a4a]/20 focus:border-[#1a4a4a] transition-colors bg-white"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#1a4a4a] hover:bg-[#0d3535] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a4a4a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-[#8a9a9a] mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
