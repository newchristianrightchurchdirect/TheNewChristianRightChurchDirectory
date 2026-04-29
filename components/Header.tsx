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

  const active =
    pathname === '/' ? 'directory' :
    pathname?.startsWith('/about') ? 'about' :
    pathname?.startsWith('/submit') ? 'submit' : ''

  return (
    <header className="masthead">
      <div className="masthead-top">
        <div className="left">No. CDXVII &middot; Vol. III</div>
        <div className="right">
          <Link href="/" className={active === 'directory' ? 'active' : ''}>Directory</Link>
          <Link href="/about" className={active === 'about' ? 'active' : ''}>About</Link>
          <Link href="/submit" className={active === 'submit' ? 'active' : ''}>Submit a Church</Link>
        </div>
      </div>
      <div className="masthead-main">
        <div className="masthead-meta-l">
          Established<br />
          MMXXIV<br />
          &Vert; Independent
        </div>
        <h1 className="masthead-title">
          The New <em>Christian</em> Right<br />
          <span className="masthead-subtitle">— A Directory of Faithful Churches —</span>
        </h1>
        <div className="masthead-meta-r">
          {date || '\u00A0'}<br />
          50 States<br />
          &Vert; Confessional
        </div>
      </div>
      <div className="masthead-rule">
        <span className="masthead-rule-text">Identifying anti-Zionist, Bible-believing churches across America</span>
      </div>
    </header>
  )
}
