'use client'

import { useRouter } from 'next/navigation'

export default function BackBar({ label = 'Back', fallbackHref = '/hymnal' }: { label?: string; fallbackHref?: string }) {
  const router = useRouter()
  function go() {
    if (typeof window !== 'undefined' && window.history.length > 1) router.back()
    else router.push(fallbackHref)
  }
  return (
    <div className="back-bar">
      <button type="button" className="back-link" onClick={go} aria-label={label}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span>{label}</span>
      </button>
    </div>
  )
}
