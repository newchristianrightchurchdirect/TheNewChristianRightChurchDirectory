'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser, checkAuthStatus, verifyAccessCode } from '@/lib/actions/auth-actions'
import { useUserStore } from '@/store/use-user'

export default function SecureLoginPage() {
  const router = useRouter()
  const { setUser, logout } = useUserStore()

  // Access code gate
  const [accessCode, setAccessCode] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [accessError, setAccessError] = useState('')
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)

  // Login form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      setIsCheckingAuth(true)
      try {
        const res = await checkAuthStatus()
        if (res.authorized) {
          if (res.user?.role === 'admin') {
            router.push('/admin/dashboard')
          } else {
            router.push('/')
          }
          return
        }
      } catch {
        await logout()
      } finally {
        setIsCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  const handleAccessCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifyingCode(true)
    setAccessError('')

    try {
      const result = await verifyAccessCode(accessCode)
      if (result.valid) {
        setIsUnlocked(true)
      } else {
        setAccessError(result.error || 'Invalid access code.')
      }
    } catch {
      setAccessError('Something went wrong. Please try again.')
    } finally {
      setIsVerifyingCode(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!email || !password) {
      setError('Email and password are required.')
      setIsLoading(false)
      return
    }

    try {
      const res = await loginUser(email, password)

      if (res.error) {
        setError(res.error)
      } else {
        setUser(res.user ?? null)
        if (res.user?.role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/')
        }
      }
    } catch {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto"></div>
          <p className="font-body text-sm text-gray-500">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // Access code gate
  if (!isUnlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-ivory">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy mb-3">
              <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
            </div>
            <h1 className="font-display text-2xl font-bold text-navy">Restricted Access</h1>
            <p className="font-body text-sm text-gray-500">Enter the access code to continue</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-navy/5 border border-cream p-6">
            {accessError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="font-body text-sm text-red-700">{accessError}</p>
              </div>
            )}

            <form onSubmit={handleAccessCode} className="space-y-4">
              <div>
                <label htmlFor="accessCode" className="block font-body text-sm font-medium text-navy mb-1.5">Access Code</label>
                <input
                  id="accessCode"
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Enter access code"
                  disabled={isVerifyingCode}
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-body text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-navy text-white font-body text-sm font-semibold rounded-xl hover:bg-navy-light transition-colors disabled:opacity-50"
                disabled={isVerifyingCode}
              >
                {isVerifyingCode ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Verifying...
                  </span>
                ) : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Login form
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-ivory">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy mb-3">
            <span className="text-gold text-2xl">&#10013;</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-navy">Admin Login</h1>
          <p className="font-body text-sm text-gray-500">Church Directory Administration</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-navy/5 border border-cream p-6">
          <div className="mb-5">
            <h2 className="font-display text-lg font-semibold text-navy">Sign In</h2>
            <p className="font-body text-xs text-gray-500 mt-0.5">Enter your credentials to access the admin dashboard</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="font-body text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-body text-sm font-medium text-navy mb-1.5">Email Address</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 font-body text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-body text-sm font-medium text-navy mb-1.5">Password</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 font-body text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-all"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-navy text-white font-body text-sm font-semibold rounded-xl hover:bg-navy-light transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
