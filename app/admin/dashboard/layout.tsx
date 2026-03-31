'use client'

import { useRouter, usePathname } from 'next/navigation'
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useUserStore } from '@/store/use-user'
import { checkAuthStatus } from '@/lib/actions/auth-actions'
import Link from 'next/link'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const { logout, setUser } = useUserStore()

  useEffect(() => {
    const doCheck = async () => {
      setIsCheckingAuth(true)
      try {
        const res = await checkAuthStatus()
        if (res.authorized) {
          if (res.user) setUser(res.user)
          if (res.user?.role !== 'admin') {
            router.push('/manage-7x9k')
          }
        } else {
          await logout()
          router.push('/manage-7x9k')
        }
      } catch {
        await logout()
        router.push('/manage-7x9k')
      } finally {
        setIsCheckingAuth(false)
      }
    }

    doCheck()
  }, [])

  useLayoutEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    document.documentElement.style.scrollBehavior = ''
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [pathname])

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

  return (
    <div className="min-h-screen bg-ivory">
      {/* Admin Header */}
      <div className="bg-navy border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="text-gold text-lg">&#10013;</span>
                <span className="font-display text-sm font-semibold text-gold/80 group-hover:text-gold transition-colors">Directory</span>
              </Link>
              <span className="w-px h-4 bg-white/15"></span>
              <span className="font-body text-xs text-white/50 uppercase tracking-wider">Admin</span>
            </div>
            <button
              onClick={async () => { await logout(); router.push('/') }}
              className="px-3 py-1.5 rounded-lg font-body text-xs text-white/50 hover:text-white hover:bg-white/5 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={scrollRef} data-admin-scroll>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </div>
      </div>
    </div>
  )
}
