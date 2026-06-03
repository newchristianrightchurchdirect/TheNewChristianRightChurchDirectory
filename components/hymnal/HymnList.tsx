'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { loadHymnal } from '@/lib/hymnal/loader'
import { useHymnalStore } from '@/store/hymnal'
import type { Hymn } from '@/types/hymnal'

export default function HymnList({ slug }: { slug: string }) {
  const [hymns, setHymns] = useState<Hymn[] | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const favs = useHymnalStore((s) => s.favoriteHymns)
  const toggleFav = useHymnalStore((s) => s.toggleHymnFavorite)
  const lastOpened = useHymnalStore((s) => s.lastOpenedHymn[slug])

  useEffect(() => {
    let alive = true
    loadHymnal(slug)
      .then((doc) => { if (alive) setHymns(doc.hymns) })
      .catch((e) => { if (alive) setErr(e.message) })
    return () => { alive = false }
  }, [slug])

  const filtered = useMemo(() => {
    if (!hymns) return []
    const q = query.trim().toLowerCase()
    if (!q) return hymns
    return hymns.filter((h) => {
      if (String(h.number).includes(q)) return true
      if (h.title && h.title.toLowerCase().includes(q)) return true
      if (h.firstLine && h.firstLine.toLowerCase().includes(q)) return true
      if (h.tune && h.tune.toLowerCase().includes(q)) return true
      if (h.author && h.author.toLowerCase().includes(q)) return true
      return false
    })
  }, [hymns, query])

  if (err) return <div className="hymnal-empty">Could not load this hymnal: {err}</div>
  if (!hymns) return <div className="hymnal-empty">Loading&hellip;</div>

  const lastHymn = lastOpened ? hymns.find((h) => h.number === lastOpened) : null

  return (
    <div>
      {lastHymn && (
        <Link href={`/hymnal/library/${slug}/${encodeURIComponent(lastHymn.number)}`} className="continue-pill">
          <span className="lbl">Continue</span>
          <span className="ttl">#{lastHymn.number} &middot; {lastHymn.title}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      )}
      <input
        className="hymn-search"
        type="search"
        placeholder="Search number, title, tune, or author\u2026"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search hymns"
      />
      <div className="hymn-list" role="list">
        {filtered.map((h) => {
          const isFav = favs.some((f) => f.hymnal === slug && f.number === h.number)
          return (
            <Link key={h.number} role="listitem" href={`/hymnal/library/${slug}/${encodeURIComponent(h.number)}`} className="hymn-row">
              <span className="num">{h.number}</span>
              <span className="ttl">
                {h.title}
                {h.firstLine && h.firstLine !== h.title && (
                  <span className="firstline">{h.firstLine}</span>
                )}
              </span>
              <button
                className={`fav${isFav ? ' on' : ''}`}
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFav({ hymnal: slug, number: h.number }) }}
              >
                {isFav ? '\u2605' : '\u2606'}
              </button>
            </Link>
          )
        })}
        {filtered.length === 0 && (
          <div className="hymnal-empty">No hymns match &ldquo;{query}&rdquo;.</div>
        )}
      </div>
    </div>
  )
}
