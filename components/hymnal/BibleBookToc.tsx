'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loadBible } from '@/lib/hymnal/loader'
import { findBible } from '@/lib/hymnal/sources'
import type { BibleBook } from '@/types/hymnal'

export default function BibleBookToc({ translation, book }: { translation: string; book: string }) {
  const router = useRouter()
  const [bk, setBk] = useState<BibleBook | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const src = findBible(translation)
  const label = src?.short?.toUpperCase() ?? translation.toUpperCase()

  useEffect(() => {
    let alive = true
    loadBible(translation)
      .then((d) => {
        if (!alive) return
        const b = d.books.find((x) => x.id === book) || d.books.find((x) => x.id.toLowerCase() === book.toLowerCase())
        if (!b) { setErr('Book not found'); return }
        setBk(b)
      })
      .catch((e) => { if (alive) setErr(e.message) })
    return () => { alive = false }
  }, [translation, book])

  if (err) return <div className="hymnal-empty">{err}</div>
  if (!bk) return <div className="hymnal-empty">Loading&hellip;</div>

  return (
    <div>
      <div className="detail-chrome">
        <button className="back-btn" onClick={() => router.push(`/hymnal/bible/${translation}`)} aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="label">{label}</div>
        <div className="actions" />
      </div>

      <header style={{ textAlign: 'center', padding: '4px 0 18px' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 11, letterSpacing: '0.30em', textTransform: 'uppercase', color: 'var(--nxr-brass-deep)', marginBottom: 10 }}>
          {bk.abbreviation}
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 32, lineHeight: 1.05, margin: '0 0 8px', color: 'var(--nxr-ink)' }}>{bk.name}</h1>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--nxr-ink-mute)', fontSize: 14 }}>
          {bk.chapters.length} chapters &middot; {bk.testament === 'old' ? 'Old Testament' : bk.testament === 'new' ? 'New Testament' : bk.testament}
        </div>
      </header>

      <nav className="chapter-grid" aria-label="Chapters">
        {bk.chapters.map((c) => (
          <Link key={c.number} href={`/hymnal/bible/${translation}/${bk.id}/${c.number}`}>
            {c.number}
          </Link>
        ))}
      </nav>
    </div>
  )
}
