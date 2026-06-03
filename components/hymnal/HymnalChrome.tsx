'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import { toRoman } from '@/lib/hymnal/loader'

type Tab = { href: string; label: string; match: (p: string) => boolean; icon: React.ReactNode }

const TABS: Tab[] = [
  {
    href: '/hymnal',
    label: 'Hymns',
    match: (p) => p === '/hymnal' || p.startsWith('/hymnal/library'),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" />
      </svg>
    ),
  },
  {
    href: '/hymnal/bible',
    label: 'Bible',
    match: (p) => p.startsWith('/hymnal/bible'),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 4h11a3 3 0 013 3v13H7a3 3 0 01-3-3V4z" /><path d="M4 17a3 3 0 013-3h11" />
      </svg>
    ),
  },
  {
    href: '/hymnal/creeds',
    label: 'Creeds',
    match: (p) => p.startsWith('/hymnal/creeds'),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 4h14v16H8a3 3 0 01-3-3V4z" /><path d="M5 17a3 3 0 013-3h11" />
      </svg>
    ),
  },
  {
    href: '/hymnal/services',
    label: 'Order',
    match: (p) => p.startsWith('/hymnal/services'),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="5" y="3" width="14" height="18" rx="1" /><path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    ),
  },
  {
    href: '/hymnal/saved',
    label: 'Saved',
    match: (p) => p.startsWith('/hymnal/saved'),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 21s-7-4.5-7-11a4 4 0 017-2.6A4 4 0 0119 10c0 6.5-7 11-7 11z" />
      </svg>
    ),
  },
  {
    href: '/hymnal/more',
    label: 'More',
    match: (p) => p.startsWith('/hymnal/more') || p.startsWith('/hymnal/search') || p.startsWith('/install'),
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 005 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 005 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 5a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
]

function pageNumber(pathname: string): string {
  // Stable folio-style page number derived from path length, for ornamentation.
  const seed = pathname.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return toRoman((seed % 480) + 7)
}

export default function HymnalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/hymnal'

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator)) return
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  }, [])

  const folio = useMemo(() => pageNumber(pathname), [pathname])
  const volume = useMemo(() => {
    if (pathname.startsWith('/hymnal/bible')) return 'Vol. II'
    if (pathname.startsWith('/hymnal/creeds')) return 'Vol. III'
    if (pathname.startsWith('/hymnal/services')) return 'Vol. IV'
    if (pathname.startsWith('/hymnal/saved')) return 'Vol. V'
    if (pathname.startsWith('/hymnal/more') || pathname.startsWith('/hymnal/search')) return 'Vol. VI'
    return 'Vol. I'
  }, [pathname])

  return (
    <div className="hymnal-shell">
      <header className="hymnal-masthead">
        <div className="hymnal-masthead-inner">
          <div className="util-left">
            No.&nbsp;{folio}&nbsp;&middot;&nbsp;{volume}
          </div>
          <div className="util-actions">
            <Link href="/hymnal/search" className="hymnal-icon-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
              </svg>
            </Link>
            <Link href="/install" className="hymnal-icon-btn" aria-label="Install / share">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 3v12" /><path d="M7 8l5-5 5 5" /><path d="M5 21h14" />
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
