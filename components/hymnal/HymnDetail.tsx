'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { loadHymnal, toRoman } from '@/lib/hymnal/loader'
import { useHymnalStore } from '@/store/hymnal'
import type { Hymn } from '@/types/hymnal'

export default function HymnDetail({ slug, number }: { slug: string; number: number }) {
  const [hymn, setHymn] = useState<Hymn | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [prev, setPrev] = useState<number | null>(null)
  const [next, setNext] = useState<number | null>(null)

  const isFav = useHymnalStore((s) => s.isHymnFavorite({ hymnal: slug, number }))
  const toggleFav = useHymnalStore((s) => s.toggleHymnFavorite)
  const textScale = useHymnalStore((s) => s.textScale)
  const showRoman = useHymnalStore((s) => s.showRomanNumerals)
  const showDrop = useHymnalStore((s) => s.showDropCaps)

  useEffect(() => {
    let alive = true
    loadHymnal(slug)
      .then((doc) => {
        if (!alive) return
        const idx = doc.hymns.findIndex((h) => h.number === number)
        if (idx < 0) { setErr('Hymn not found'); return }
        setHymn(doc.hymns[idx])
        setPrev(idx > 0 ? doc.hymns[idx - 1].number : null)
        setNext(idx < doc.hymns.length - 1 ? doc.hymns[idx + 1].number : null)
      })
      .catch((e) => { if (alive) setErr(e.message) })
    return () => { alive = false }
  }, [slug, number])

  const verseFontSize = useMemo(() => `${Math.round(19 * textScale)}px`, [textScale])

  if (err) return <div className="hymnal-empty">{err}</div>
  if (!hymn) return <div className="hymnal-empty">Loading&hellip;</div>

  return (
    <article className="hymn-detail">
      <div className="num-band">No. {hymn.number}</div>
      <h1 className="ttl">{hymn.title}</h1>
      {hymn.tune && <div className="meta">Tune: {hymn.tune}{hymn.meter ? `  \u00B7  ${hymn.meter}` : ''}{hymn.key ? `  \u00B7  ${hymn.key}` : ''}</div>}
      {(hymn.author || hymn.composer) && (
        <div className="meta-row">
          {hymn.author && <>Words: {hymn.author}</>}
          {hymn.author && hymn.composer && <>  &nbsp;&middot;&nbsp;  </>}
          {hymn.composer && <>Music: {hymn.composer}</>}
        </div>
      )}
      {hymn.scriptureReference && (
        <div className="meta-row">Scripture: {hymn.scriptureReference}</div>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 14, alignItems: 'center' }}>
        <button
          className="hymnal-icon-btn"
          onClick={() => toggleFav({ hymnal: slug, number })}
          aria-label={isFav ? 'Remove favorite' : 'Add favorite'}
          title={isFav ? 'Remove favorite' : 'Add favorite'}
          style={{ color: isFav ? 'var(--brass)' : 'var(--ink-soft)' }}
        >
          {isFav ? '\u2605' : '\u2606'}
        </button>
        {hymn.sheetMusicUrl && (
          <a className="hymnal-icon-btn" href={hymn.sheetMusicUrl} target="_blank" rel="noopener noreferrer" aria-label="Sheet music" title="Sheet music">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
            </svg>
          </a>
        )}
        {hymn.audioUrl && (
          <a className="hymnal-icon-btn" href={hymn.audioUrl} target="_blank" rel="noopener noreferrer" aria-label="Audio" title="Audio">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polygon points="6,4 20,12 6,20" />
            </svg>
          </a>
        )}
      </div>

      <div className="rule" />

      <div className="verses" style={{ fontSize: verseFontSize }}>
        {hymn.verses.map((v, i) => {
          if (v.isChorus) {
            return (
              <div key={`${v.number}-c-${i}`} className="verse chorus">
                <div className="marker">Chorus</div>
                <div className="text">{v.text}</div>
              </div>
            )
          }
          const marker = showRoman ? toRoman(v.number) : String(v.number)
          const showDC = showDrop && i === 0 && v.text && v.text.trim().length > 0
          let body: React.ReactNode = v.text
          if (showDC) {
            const trimmed = v.text.replace(/^\s+/, '')
            const head = trimmed.charAt(0)
            const tail = trimmed.slice(1)
            body = (<><span className="dropcap">{head}</span>{tail}</>)
          }
          return (
            <div key={`${v.number}-${i}`} className="verse">
              <div className="marker">{marker}</div>
              <div className="text">{body}</div>
            </div>
          )
        })}
      </div>

      <div className="rule" />

      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        <div>
          {prev != null && <Link href={`/hymnal/library/${slug}/${prev}`}>&larr; #{prev}</Link>}
        </div>
        <div>
          {next != null && <Link href={`/hymnal/library/${slug}/${next}`}>#{next} &rarr;</Link>}
        </div>
      </nav>
    </article>
  )
}
