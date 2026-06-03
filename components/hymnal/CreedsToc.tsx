'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { loadConfessions } from '@/lib/hymnal/loader'
import type { ConfessionDocument } from '@/types/hymnal'

const TYPE_ORDER = ['creed', 'confession', 'catechism', 'declaration', 'other']

function rank(type: string | undefined): number {
  const t = (type || 'other').toLowerCase()
  const i = TYPE_ORDER.indexOf(t)
  return i < 0 ? TYPE_ORDER.length : i
}

export default function CreedsToc() {
  const [docs, setDocs] = useState<ConfessionDocument[] | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    let alive = true
    loadConfessions()
      .then((d) => { if (alive) setDocs(d.documents) })
      .catch((e) => { if (alive) setErr(e.message) })
    return () => { alive = false }
  }, [])

  const groups = useMemo(() => {
    if (!docs) return [] as { type: string; items: ConfessionDocument[] }[]
    const norm = q.trim().toLowerCase()
    const filt = norm
      ? docs.filter((d) =>
          d.title.toLowerCase().includes(norm) ||
          (d.tradition || '').toLowerCase().includes(norm) ||
          (d.alternativeTitles || []).some((a) => a.toLowerCase().includes(norm))
        )
      : docs
    const map = new Map<string, ConfessionDocument[]>()
    for (const d of filt) {
      const t = (d.type || 'other').toLowerCase()
      if (!map.has(t)) map.set(t, [])
      map.get(t)!.push(d)
    }
    return Array.from(map.entries())
      .sort((a, b) => rank(a[0]) - rank(b[0]))
      .map(([type, items]) => ({
        type,
        items: items.sort((a, b) => (a.year || 9999) - (b.year || 9999) || a.title.localeCompare(b.title)),
      }))
  }, [docs, q])

  if (err) return <div className="hymnal-empty">Could not load creeds: {err}</div>
  if (!docs) return <div className="hymnal-empty">Loading&hellip;</div>

  return (
    <div>
      <input
        className="hymn-search"
        type="search"
        placeholder="Search creeds, confessions, catechisms&hellip;"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search creeds"
      />
      {groups.map((g) => (
        <section key={g.type} style={{ marginBottom: 18 }}>
          <h2 className="hymnal-eyebrow" style={{ marginBottom: 6 }}>{g.type[0].toUpperCase() + g.type.slice(1)}s</h2>
          <div className="creed-toc">
            {g.items.map((d) => (
              <Link key={d.id} href={`/hymnal/creeds/${d.id}`}>
                {d.title}
                <span className="meta">
                  {(d.tradition || '').toUpperCase()}
                  {d.year ? `  \u00B7  ${d.year}` : ''}
                  {d.country ? `  \u00B7  ${d.country}` : ''}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
