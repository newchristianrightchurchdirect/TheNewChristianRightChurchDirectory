'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadBible } from '@/lib/hymnal/loader'
import type { BibleBook } from '@/types/hymnal'

export default function BibleBookToc({ translation, book }: { translation: string; book: string }) {
  const [bk, setBk] = useState<BibleBook | null>(null)
  const [err, setErr] = useState<string | null>(null)

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
      <header className="hymnal-section-head">
        <div className="hymnal-eyebrow">{bk.abbreviation}</div>
        <h1 className="hymnal-h1">{bk.name}</h1>
        <p className="hymnal-dek">{bk.chapters.length} chapters</p>
      </header>
      <div className="chapter-nav" aria-label="Chapters">
        {bk.chapters.map((c) => (
          <Link key={c.number} href={`/hymnal/bible/${translation}/${bk.id}/${c.number}`}>
            {c.number}
          </Link>
        ))}
      </div>
    </div>
  )
}
