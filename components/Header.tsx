'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-navy border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Church Directory Home">
            <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center group-hover:bg-gold/25 transition-colors">
              <span className="text-gold text-lg leading-none" aria-hidden="true">&#10013;</span>
            </div>
            <span className="font-display text-lg sm:text-xl font-semibold text-gold tracking-wide">
              The New Christian Right
            </span>
          </Link>
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            <Link
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className={`px-3 sm:px-4 py-2 rounded-lg font-body text-sm transition-all ${
                pathname === '/'
                  ? 'text-white bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Directory
            </Link>
            <Link
              href="/submit"
              aria-current={pathname === '/submit' ? 'page' : undefined}
              className="ml-1 sm:ml-2 px-3 sm:px-4 py-2 rounded-lg font-body text-sm bg-gold/15 text-gold border border-gold/25 hover:bg-gold/25 transition-all"
            >
              + Submit Church
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
