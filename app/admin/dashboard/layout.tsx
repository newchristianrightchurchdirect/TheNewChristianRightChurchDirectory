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
      <div className="admin-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-mute)' }}>
          Checking authentication&hellip;
        </p>
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <div className="admin-bar">
        <div className="admin-bar-inner">
          <div className="admin-bar-left">
            <Link href="/">&#10013;&nbsp; Directory</Link>
            <span className="admin-bar-sep" />
            <span>Admin</span>
          </div>
          <button className="admin-signout" onClick={async () => { await logout(); router.push('/') }}>
            Sign Out
          </button>
        </div>
      </div>

      <nav className="admin-nav">
        <div className="admin-nav-inner">
          {[
            { href: '/admin/dashboard', label: 'Review Queue' },
            { href: '/admin/dashboard/health', label: 'Data Health' },
            { href: '/admin/dashboard/churches', label: 'Churches' },
            { href: '/admin/dashboard/duplicates', label: 'Duplicates' },
            { href: '/admin/dashboard/reports', label: 'Reports' },
            { href: '/admin/dashboard/history', label: 'Stance History' },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className={`admin-nav-tab${pathname === t.href ? ' active' : ''}`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </nav>

      <div ref={scrollRef} data-admin-scroll>
        <div className="admin-wrap">{children}</div>
      </div>
    </div>
  )
}
