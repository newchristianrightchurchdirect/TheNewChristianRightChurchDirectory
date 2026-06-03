'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loadBible } from '@/lib/hymnal/loader'
import { findBible } from '@/lib/hymnal/sources'
import { useHymnalStore } from '@/store/hymnal'
import type { BibleBook, BibleChapter as BC } from '@/types/hymnal'

export default function BibleChapter({ translation, book, chapter }: { translation: string; book: string; chapter: number }) {
  const router = useRouter()
  const [bk, setBk] = useState<BibleBook | null>(null)
  const [ch, setCh] = useState<BC | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [allBooks, setAllBooks] = useState<BibleBook[] | null>(null)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => { setSelected(new Set()); setCopied(null) }, [translation, book, chapter])

  const textScale = useHymnalStore((s) => s.textScale)
  const single = useHymnalStore((s) => s.bibleSingleColumn)
  const isBookmarked = useHymnalStore((s) => s.isChapterBookmarked({ translation, book, chapter }))
  const toggleBookmark = useHymnalStore((s) => s.toggleChapterBookmark)

  const src = findBible(translation)
  const label = src?.short?.toUpperCase() ?? translation.toUpperCase()

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
    ? { book: bk.id, bookName: bk.name, chapter: chapter - 1 }
    : (allBooks && idx > 0
        ? { book: allBooks[idx - 1].id, bookName: allBooks[idx - 1].name, chapter: allBooks[idx - 1].chapters.length }
        : null)
  const nextCh = chapter < bk.chapters.length
    ? { book: bk.id, bookName: bk.name, chapter: chapter + 1 }
    : (allBooks && idx >= 0 && idx < allBooks.length - 1
        ? { book: allBooks[idx + 1].id, bookName: allBooks[idx + 1].name, chapter: 1 }
        : null)

  return (
    <article>
      <div className="detail-chrome">
        <button className="back-btn" onClick={() => router.push(`/hymnal/bible/${translation}/${bk.id}`)} aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="label">{label} &middot; {bk.abbreviation}</div>
        <div className="actions">
          <button
            onClick={() => toggleBookmark({ translation, book, chapter })}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark chapter'}
            className={isBookmarked ? 'on' : ''}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>
      </div>

      <header style={{ textAlign: 'center', padding: '4px 0 14px' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 11, letterSpacing: '0.30em', textTransform: 'uppercase', color: 'var(--nxr-brass-deep)', marginBottom: 10 }}>
          Chapter {chapter}
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 32, lineHeight: 1.05, margin: '0 0 4px', color: 'var(--nxr-ink)' }}>
          {bk.name} <em style={{ fontStyle: 'italic', color: 'var(--nxr-brass)' }}>{chapter}</em>
        </h1>
      </header>

      <div className="bible-prose-wrap">
        <div className={`bible-prose${single ? '' : ' two-col'}`} style={{ fontSize: proseSize }}>
          {ch.verses.map((v) => {
            const on = selected.has(v.number)
            return (
              <span
                key={v.number}
                className={`v${on ? ' selected' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelected((s) => {
                    const next = new Set(s)
                    if (next.has(v.number)) next.delete(v.number); else next.add(v.number)
                    return next
                  })
                }}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault()
                    setSelected((s) => {
                      const next = new Set(s)
                      if (next.has(v.number)) next.delete(v.number); else next.add(v.number)
                      return next
                    })
                  }
                }}
              >
                <sup className="vn">{v.number}</sup>
                {v.text}
                {' '}
              </span>
            )
          })}
        </div>
      </div>

      {selected.size > 0 && (
        <VerseSelectionBar
          count={selected.size}
          onCopy={async () => {
            const sorted = [...selected].sort((a, b) => a - b)
            const verses = sorted.map((n) => ch.verses.find((v) => v.number === n)).filter(Boolean) as typeof ch.verses
            const range = sorted.length === 1 ? `${sorted[0]}` : (sorted[sorted.length - 1] - sorted[0] === sorted.length - 1 ? `${sorted[0]}-${sorted[sorted.length - 1]}` : sorted.join(','))
            const body = verses.map((v) => `${v.number} ${v.text}`).join(' ')
            const text = `${bk.name} ${chapter}:${range} (${label}) \u2014 ${body}`
            try { await navigator.clipboard.writeText(text); setCopied('Copied'); setTimeout(() => setCopied(null), 1400) }
            catch { setCopied('Copy failed'); setTimeout(() => setCopied(null), 1400) }
          }}
          onShare={async () => {
            const sorted = [...selected].sort((a, b) => a - b)
            const verses = sorted.map((n) => ch.verses.find((v) => v.number === n)).filter(Boolean) as typeof ch.verses
            const range = sorted.length === 1 ? `${sorted[0]}` : `${sorted[0]}-${sorted[sorted.length - 1]}`
            const body = verses.map((v) => `${v.number} ${v.text}`).join(' ')
            const text = `${bk.name} ${chapter}:${range} (${label}) \u2014 ${body}`
            if (navigator.share) {
              try { await navigator.share({ title: `${bk.name} ${chapter}:${range}`, text }) } catch { /* cancelled */ }
            } else {
              try { await navigator.clipboard.writeText(text); setCopied('Copied'); setTimeout(() => setCopied(null), 1400) }
              catch { setCopied('Copy failed'); setTimeout(() => setCopied(null), 1400) }
            }
          }}
          onClear={() => setSelected(new Set())}
          message={copied}
        />
      )}

      <div className="chapter-nav-row">
        {prevCh ? (
          <Link href={`/hymnal/bible/${translation}/${prevCh.book}/${prevCh.chapter}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Prev</span>
          </Link>
        ) : <span className="dummy">Prev</span>}
        <span className="ctr">{bk.name} {chapter}</span>
        {nextCh ? (
          <Link href={`/hymnal/bible/${translation}/${nextCh.book}/${nextCh.chapter}`} style={{ justifyContent: 'flex-end' }}>
            <span>Next</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        ) : <span className="dummy">Next</span>}
      </div>
    </article>
  )
}

function VerseSelectionBar({ count, onCopy, onShare, onClear, message }: {
  count: number
  onCopy: () => void
  onShare: () => void
  onClear: () => void
  message: string | null
}) {
  return (
    <div className="verse-selection-bar">
      <div className="verse-selection-bar-inner">
        <span className="cnt">{count} verse{count === 1 ? '' : 's'} selected</span>
        <div className="acts">
          <button onClick={onCopy}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="9" y="9" width="13" height="13" rx="1" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy
          </button>
          <button onClick={onShare}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Share
          </button>
          <button onClick={onClear} className="clear">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {message && <div className="msg">{message}</div>}
      </div>
    </div>
  )
}
