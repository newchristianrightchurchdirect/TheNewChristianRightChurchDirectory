'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [date, setDate] = useState('')

  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  }, [])

  // The /hymnal/* section and the /install page render their own chrome
  // (HymnalChrome), so suppress the directory masthead there.
  if (pathname?.startsWith('/hymnal') || pathname?.startsWith('/install')) {
    return null
  }

  const active =
    pathname === '/' ? 'directory' :
    pathname?.startsWith('/about') ? 'about' :
    pathname?.startsWith('/submit') ? 'submit' :
    pathname?.startsWith('/hymnal') ? 'hymnal' : ''

  return (
    <header className="masthead">
      <div className="masthead-top">
        <div className="left">No. CDXVII &middot; Vol. III</div>
        <div className="right">
          <Link href="/" className={active === 'directory' ? 'active' : ''}>Directory</Link>
          <Link href="/hymnal" className={active === 'hymnal' ? 'active' : ''}>Hymnal</Link>
          <Link href="/about" className={active === 'about' ? 'active' : ''}>About</Link>
          <Link href="/submit" className={active === 'submit' ? 'active' : ''}>Submit a Church</Link>
        </div>
      </div>
      <div className="masthead-main">
        <div className="masthead-meta-l">
          Established<br />
          MMXXIV<br />
          ‖ Independent
        </div>
        <h1 className="masthead-title">
          The New <em>Christian</em> Right<br />
          <span className="masthead-subtitle">— Churches Contending for the Crown Rights of Christ —</span>
        </h1>
        <div className="masthead-meta-r">
          {date || '\u00A0'}<br />
          50 States<br />
          ‖ Confessional
        </div>
      </div>
      <div className="masthead-rule">
        <span className="masthead-rule-text">Identifying anti-Zionist, Bible-believing churches across America</span>
      </div>
    </header>
  )
}
