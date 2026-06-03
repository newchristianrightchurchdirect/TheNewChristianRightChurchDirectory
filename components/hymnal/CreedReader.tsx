'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadConfessions } from '@/lib/hymnal/loader'
import { useHymnalStore } from '@/store/hymnal'
import type { ConfessionDocument, ConfessionEntry, ConfessionGroup } from '@/types/hymnal'

export default function CreedReader({ id }: { id: string }) {
  const router = useRouter()
  const [doc, setDoc] = useState<ConfessionDocument | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const textScale = useHymnalStore((s) => s.textScale)
  const isFav = useHymnalStore((s) => s.isConfessionFavorite({ id }))
  const toggleFav = useHymnalStore((s) => s.toggleConfessionFavorite)
  const isEntryFav = useHymnalStore((s) => s.isConfessionEntryBookmarked)
  const toggleEntryFav = useHymnalStore((s) => s.toggleConfessionEntryBookmark)

  useEffect(() => {
    let alive = true
    loadConfessions()
      .then((d) => {
        if (!alive) return
        const found = d.documents.find((x) => x.id === id)
        if (!found) { setErr('Document not found'); return }
        setDoc(found)
      })
      .catch((e) => { if (alive) setErr(e.message) })
    return () => { alive = false }
  }, [id])

  const baseSize = useMemo(() => `${Math.round(18 * textScale)}px`, [textScale])

  if (err) return <div className="hymnal-empty">{err}</div>
  if (!doc) return <div className="hymnal-empty">Loading&hellip;</div>

  const chromeLabel = (doc.type || 'CREED').toUpperCase()

  return (
    <article>
      <div className="detail-chrome">
        <button className="back-btn" onClick={() => router.push('/hymnal/creeds')} aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="label">{chromeLabel}{doc.year ? `  \u00B7  ${doc.year}` : ''}</div>
        <div className="actions">
          <button onClick={() => toggleFav({ id })} aria-label={isFav ? 'Remove favorite' : 'Add favorite'} className={isFav ? 'fav-heart on' : 'fav-heart'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      <header style={{ textAlign: 'center', padding: '4px 0 22px' }}>
        <h1 className="hymnal-h1" style={{ margin: '0 0 6px' }}>{doc.title}</h1>
        {(doc.authors && doc.authors.length > 0) && (
          <div className="creed-head-meta">By {doc.authors.join(', ')}</div>
        )}
        {(doc.alternativeTitles && doc.alternativeTitles.length > 0) && (
          <div className="creed-head-meta"><span className="alt">Also known as: {doc.alternativeTitles.join('; ')}</span></div>
        )}
        {doc.tradition && (
          <div style={{ fontFamily: 'var(--serif)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--nxr-ink-mute)', marginTop: 12 }}>
            {doc.tradition}
          </div>
        )}
      </header>

      <div className="creed-prose" style={{ fontSize: baseSize }}>
        {doc.groups && doc.groups.length > 0 ? (
          doc.groups.map((g, gi) => (
            <Group key={gi} docId={doc.id} group={g} groupIndex={gi} isBmk={isEntryFav} toggleBmk={toggleEntryFav} />
          ))
        ) : doc.content ? (
          <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--serif)', lineHeight: 1.65 }}>{doc.content}</div>
        ) : null}
      </div>
    </article>
  )
}

function Group({
  docId,
  group,
  groupIndex,
  isBmk,
  toggleBmk,
}: {
  docId: string
  group: ConfessionGroup
  groupIndex: number
  isBmk: (ref: { docId: string; key: string }) => boolean
  toggleBmk: (ref: { docId: string; key: string }) => void
}) {
  return (
    <section style={{ marginBottom: 28 }}>
      {(group.title || group.number != null) && (
        <h2 className="creed-section-num">
          {group.number != null && <em>{String(group.number)}</em>}
          {group.title}
        </h2>
      )}
      {(group.entries || []).map((e, ei) => (
        <Card
          key={ei}
          entry={e}
          bookmarked={isBmk({ docId, key: `${groupIndex}.${ei}` })}
          onToggle={() => toggleBmk({ docId, key: `${groupIndex}.${ei}` })}
        />
      ))}
    </section>
  )
}

function Card({
  entry,
  bookmarked,
  onToggle,
}: {
  entry: ConfessionEntry
  bookmarked: boolean
  onToggle: () => void
}) {
  const hasQ = !!(entry.question && entry.question.length > 0)
  const hasA = !!(entry.answer && entry.answer.length > 0)
  return (
    <div className="creed-card">
      <div>
        {entry.label && <div className="label-l">{entry.label}</div>}
        {hasQ && <div className="qt">{entry.question}</div>}
        {hasA && <div className="at">{entry.answer}</div>}
        {entry.proofs && <div className="pf">{entry.proofs}</div>}
      </div>
      <button className={bookmarked ? 'bmk on' : 'bmk'} onClick={onToggle} aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    </div>
  )
}
