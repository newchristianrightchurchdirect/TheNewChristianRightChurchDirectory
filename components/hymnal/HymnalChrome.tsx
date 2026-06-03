'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

type Tab = { href: string; label: string; match: (p: string) => boolean; icon: React.ReactNode }

const TABS: Tab[] = [
  {
    href: '/hymnal',
    label: 'Home',
    match: (p) => p === '/hymnal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    href: '/hymnal/bible',
    label: 'Bible',
    match: (p) => p.startsWith('/hymnal/bible'),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 4h11a3 3 0 013 3v13H7a3 3 0 01-3-3V4z" /><path d="M4 17a3 3 0 013-3h11" />
      </svg>
    ),
  },
  {
    href: '/hymnal/creeds',
    label: 'Creeds',
    match: (p) => p.startsWith('/hymnal/creeds'),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6 3h12v18l-6-3-6 3V3z" />
      </svg>
    ),
  },
  {
    href: '/hymnal/services',
    label: 'Order',
    match: (p) => p.startsWith('/hymnal/services'),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    ),
  },
  {
    href: '/hymnal/saved',
    label: 'Saved',
    match: (p) => p.startsWith('/hymnal/saved'),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6 3h12v18l-6-4-6 4V3z" />
      </svg>
    ),
  },
  {
    href: '/hymnal/more',
    label: 'More',
    match: (p) => p.startsWith('/hymnal/more') || p.startsWith('/hymnal/search') || p.startsWith('/install'),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" />
      </svg>
    ),
  },
]

export default function HymnalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/hymnal'

  // Register the service worker once when the hymnal section mounts.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator)) return
    navigator.serviceWorker.register('/sw.js').catch(() => { /* offline still works without SW */ })
  }, [])

  return (
    <div className="hymnal-shell">
      <header className="hymnal-masthead">
        <div className="hymnal-masthead-inner">
          <Link href="/hymnal" aria-label="NXR Hymnal home">
            <div className="title">NXR <em>Hymnal</em></div>
            <div className="subtitle">Psalters &middot; Hymnals &middot; Scripture</div>
          </Link>
          <div className="right">
            <Link href="/hymnal/search" className="hymnal-icon-btn" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="hymnal-page">
        {children}
      </main>

      <nav className="hymnal-tabbar" aria-label="Hymnal sections">
        <div className="hymnal-tabbar-inner">
          {TABS.map((t) => (
            <Link key={t.href} href={t.href} className={`hymnal-tab${t.match(pathname) ? ' active' : ''}`}>
              {t.icon}
              <span>{t.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}
