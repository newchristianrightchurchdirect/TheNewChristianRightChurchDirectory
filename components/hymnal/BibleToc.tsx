'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadBible, toRoman } from '@/lib/hymnal/loader'
import { useHymnalStore } from '@/store/hymnal'
import type { BibleBook } from '@/types/hymnal'

function lower(n: number): string {
  return toRoman(n).toLowerCase()
}

export default function BibleToc({ translation }: { translation: string }) {
  const [books, setBooks] = useState<BibleBook[] | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const lastChapter = useHymnalStore((s) => s.lastOpenedChapter[translation])

  useEffect(() => {
    let alive = true
    loadBible(translation)
      .then((d) => { if (alive) setBooks(d.books) })
      .catch((e) => { if (alive) setErr(e.message) })
    return () => { alive = false }
  }, [translation])

  if (err) return <div className="hymnal-empty">Could not load Bible: {err}</div>
  if (!books) return <div className="hymnal-empty">Loading&hellip;</div>

  const lastBook = lastChapter ? books.find((b) => b.id === lastChapter.book) : null

  const ot = books.filter((b) => (b.testament || '').toLowerCase().startsWith('o'))
  const nt = books.filter((b) => (b.testament || '').toLowerCase().startsWith('n'))
  const other = books.filter((b) =>
    !(b.testament || '').toLowerCase().startsWith('o') &&
    !(b.testament || '').toLowerCase().startsWith('n')
  )

  let counter = 0
  const chapCount = (items: BibleBook[]) => items.reduce((a, b) => a + b.chapters.length, 0)

  function Section({ label, latin, items }: { label: string; latin: string; items: BibleBook[] }) {
    if (!items.length) return null
    return (
      <section>
        <div className="hymnal-section-head">
          <span>{label}</span>
          <span className="right">{latin} &middot; {items.length} books</span>
        </div>
        <div className="col-list">
          {items.map((b) => {
            counter += 1
            const n = counter
            return (
              <Link key={b.id} href={`/hymnal/bible/${translation}/${b.id}`}>
                <span className="n">{lower(n)}.</span>
                <span>{b.name}</span>
              </Link>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <div>
      <div className="hymnal-hero-meta" style={{ marginTop: 0 }}>
        <span>{books.length} books &middot; {chapCount(books).toLocaleString()} chapt&hellip;</span>
        <span>Anno Domini MMXXVI</span>
      </div>
      {lastBook && lastChapter && (
        <Link href={`/hymnal/bible/${translation}/${lastBook.id}/${lastChapter.chapter}`} className="continue-pill">
          <span className="lbl">Continue</span>
          <span className="ttl">{lastBook.name} {lastChapter.chapter}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      )}
      <Section label="Old Testament" latin="Vetus Testamentum" items={ot} />
      <Section label="New Testament" latin="Novum Testamentum" items={nt} />
      <Section label="Other" latin="Reliqua" items={other} />
    </div>
  )
}
