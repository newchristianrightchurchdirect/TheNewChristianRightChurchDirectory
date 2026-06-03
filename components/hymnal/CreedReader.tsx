'use client'

import { useEffect, useMemo, useState } from 'react'
import { loadConfessions } from '@/lib/hymnal/loader'
import { useHymnalStore } from '@/store/hymnal'
import type { ConfessionDocument } from '@/types/hymnal'

export default function CreedReader({ id }: { id: string }) {
  const [doc, setDoc] = useState<ConfessionDocument | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const textScale = useHymnalStore((s) => s.textScale)
  const isFav = useHymnalStore((s) => s.isConfessionFavorite({ id }))
  const toggleFav = useHymnalStore((s) => s.toggleConfessionFavorite)

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

  return (
    <article>
      <header className="hymnal-section-head">
        <div className="hymnal-eyebrow">
          {(doc.type || '').toUpperCase()}
          {doc.year ? `  \u00B7  ${doc.year}` : ''}
          {doc.tradition ? `  \u00B7  ${doc.tradition}` : ''}
        </div>
        <h1 className="hymnal-h1">{doc.title}</h1>
        {doc.authors && doc.authors.length > 0 && (
          <p className="hymnal-dek">By {doc.authors.join(', ')}</p>
        )}
        {doc.alternativeTitles && doc.alternativeTitles.length > 0 && (
          <p className="meta-row" style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginTop: 4 }}>
            Also known as: {doc.alternativeTitles.join('; ')}
          </p>
        )}
      </header>

      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <button
          className="hymnal-icon-btn"
          onClick={() => toggleFav({ id })}
          aria-label={isFav ? 'Remove favorite' : 'Add favorite'}
          title={isFav ? 'Remove favorite' : 'Add favorite'}
          style={{ color: isFav ? 'var(--brass)' : 'var(--ink-soft)' }}
        >
          {isFav ? '\u2605' : '\u2606'}
        </button>
      </div>

      <div className="creed-prose" style={{ fontSize: baseSize }}>
        {doc.groups && doc.groups.length > 0 ? (
          doc.groups.map((g, gi) => (
            <section key={gi} style={{ marginBottom: 24 }}>
              {(g.title || g.number) && (
                <h3>
                  {g.number != null && <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--brass-deep)', marginRight: 10 }}>{String(g.number)}</span>}
                  {g.title}
                </h3>
              )}
              {(g.entries || []).map((e, ei) => {
                const hasQA = (e.question && e.question.length > 0) || (e.answer && e.answer.length > 0)
                if (hasQA) {
                  return (
                    <div key={ei} className="qa-block">
                      {e.label && <span className="qn">{e.label}</span>}
                      {e.question && <div className="q">{e.question}</div>}
                      {e.answer && <div className="a">{e.answer}</div>}
                      {e.proofs && (
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-mute)', marginTop: 6 }}>
                          {e.proofs}
                        </div>
                      )}
                    </div>
                  )
                }
                return (
                  <div key={ei} style={{ marginBottom: 14 }}>
                    {e.label && <span className="qn" style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--brass-deep)', marginRight: 10 }}>{e.label}</span>}
                    {e.answer || ''}
                    {e.proofs && (
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-mute)', marginTop: 4 }}>
                        {e.proofs}
                      </div>
                    )}
                  </div>
                )
              })}
            </section>
          ))
        ) : (
          <div>{doc.content || ''}</div>
        )}
      </div>
    </article>
  )
}
