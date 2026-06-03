'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { loadBible } from '@/lib/hymnal/loader'
import { useHymnalStore } from '@/store/hymnal'
import type { BibleBook, BibleChapter as BC } from '@/types/hymnal'

export default function BibleChapter({ translation, book, chapter }: { translation: string; book: string; chapter: number }) {
  const [bk, setBk] = useState<BibleBook | null>(null)
  const [ch, setCh] = useState<BC | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [allBooks, setAllBooks] = useState<BibleBook[] | null>(null)

  const textScale = useHymnalStore((s) => s.textScale)
  const single = useHymnalStore((s) => s.bibleSingleColumn)
  const isBookmarked = useHymnalStore((s) => s.isChapterBookmarked({ translation, book, chapter }))
  const toggleBookmark = useHymnalStore((s) => s.toggleChapterBookmark)

  useEffect(() => {
    let alive = true
    loadBible(translation)
      .then((d) => {
        if (!alive) return
        setAllBooks(d.books)
        const b = d.books.find((x) => x.id === book) || d.books.find((x) => x.id.toLowerCase() === book.toLowerCase())
        if (!b) { setErr('Book not found'); return }
        setBk(b)
        const c = b.chapters.find((x) => x.number === chapter)
        if (!c) { setErr('Chapter not found'); return }
        setCh(c)
      })
      .catch((e) => { if (alive) setErr(e.message) })
    return () => { alive = false }
  }, [translation, book, chapter])

  const proseSize = useMemo(() => `${Math.round(19 * textScale)}px`, [textScale])

  if (err) return <div className="hymnal-empty">{err}</div>
  if (!bk || !ch) return <div className="hymnal-empty">Loading&hellip;</div>

  const idx = allBooks?.findIndex((b) => b.id === bk.id) ?? -1
  const prevCh = chapter > 1
    ? { book: bk.id, chapter: chapter - 1 }
    : (allBooks && idx > 0
        ? { book: allBooks[idx - 1].id, chapter: allBooks[idx - 1].chapters.length }
        : null)
  const nextCh = chapter < bk.chapters.length
    ? { book: bk.id, chapter: chapter + 1 }
    : (allBooks && idx >= 0 && idx < allBooks.length - 1
        ? { book: allBooks[idx + 1].id, chapter: 1 }
        : null)

  return (
    <article>
      <header className="hymnal-section-head">
        <div className="hymnal-eyebrow">{bk.abbreviation} {chapter}</div>
        <h1 className="hymnal-h1">{bk.name} <em>{chapter}</em></h1>
      </header>

      <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
        <button
          className="hymnal-icon-btn"
          onClick={() => toggleBookmark({ translation, book, chapter })}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark chapter'}
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark chapter'}
          style={{ color: isBookmarked ? 'var(--brass)' : 'var(--ink-soft)' }}
        >
          {isBookmarked ? '\u2605' : '\u2606'}
        </button>
      </div>

      <div className="chapter-nav" aria-label="Chapters">
        {bk.chapters.map((c) => (
          <Link
            key={c.number}
            href={`/hymnal/bible/${translation}/${bk.id}/${c.number}`}
            className={c.number === chapter ? 'active' : ''}
          >
            {c.number}
          </Link>
        ))}
      </div>

      <div className={`bible-prose${single ? '' : ' two-col'}`} style={{ fontSize: proseSize }}>
        {ch.verses.map((v) => (
          <span key={v.number}>
            <sup className="vn">{v.number}</sup>
            {v.text}
            {' '}
          </span>
        ))}
      </div>

      <nav style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        <div>
          {prevCh && <Link href={`/hymnal/bible/${translation}/${prevCh.book}/${prevCh.chapter}`}>&larr; {prevCh.book.toUpperCase()} {prevCh.chapter}</Link>}
        </div>
        <div>
          {nextCh && <Link href={`/hymnal/bible/${translation}/${nextCh.book}/${nextCh.chapter}`}>{nextCh.book.toUpperCase()} {nextCh.chapter} &rarr;</Link>}
        </div>
      </nav>
    </article>
  )
}
