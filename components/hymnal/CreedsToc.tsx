'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { loadConfessions } from '@/lib/hymnal/loader'
import type { ConfessionDocument } from '@/types/hymnal'

const TYPE_ORDER = ['creed', 'confession', 'catechism', 'declaration', 'other']

const TYPE_LABEL: Record<string, { head: string; tail: string }> = {
  creed:       { head: 'Ecumenical Creeds',  tail: 'Universally received' },
  confession:  { head: 'Confessions of Faith', tail: 'Reformation & after' },
  catechism:   { head: 'Catechisms',         tail: 'Q & A' },
  declaration: { head: 'Declarations',       tail: 'Modern statements' },
  other:       { head: 'Other Documents',    tail: 'Various' },
}

function rank(type: string | undefined): number {
  const t = (type || 'other').toLowerCase()
  const i = TYPE_ORDER.indexOf(t)
  return i < 0 ? TYPE_ORDER.length : i
}

export default function CreedsToc() {
  const [docs, setDocs] = useState<ConfessionDocument[] | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [tradition, setTradition] = useState<string>('ALL')

  useEffect(() => {
    let alive = true
    loadConfessions()
      .then((d) => { if (alive) setDocs(d.documents) })
      .catch((e) => { if (alive) setErr(e.message) })
    return () => { alive = false }
  }, [])

  const traditions = useMemo(() => {
    if (!docs) return [] as string[]
    const set = new Set<string>()
    for (const d of docs) if (d.tradition) set.add(d.tradition)
    return ['ALL', ...Array.from(set).sort()]
  }, [docs])

  const groups = useMemo(() => {
    if (!docs) return [] as { type: string; items: ConfessionDocument[] }[]
    const filt = tradition === 'ALL'
      ? docs
      : docs.filter((d) => (d.tradition || '').toLowerCase() === tradition.toLowerCase())
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
  }, [docs, tradition])

  if (err) return <div className="hymnal-empty">Could not load creeds: {err}</div>
  if (!docs) return <div className="hymnal-empty">Loading&hellip;</div>

  return (
    <div className="creeds-toc-wrap">
      <div className="chip-row" role="tablist" aria-label="Filter by tradition">
        {traditions.map((t) => (
          <button
            key={t}
            type="button"
            className={`chip${t === tradition ? ' on' : ''}`}
            onClick={() => setTradition(t)}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {groups.map((g) => {
        const lab = TYPE_LABEL[g.type] || { head: g.type, tail: '' }
        return (
          <section key={g.type}>
            <div className="hymnal-section-head">
              <span>{lab.head}</span>
              <span className="right">{lab.tail} &middot; {g.items.length}</span>
            </div>
            <div className="entry-list">
              {g.items.map((d) => (
                <Link key={d.id} href={`/hymnal/creeds/${d.id}`} className="entry-row">
                  <span className="n">{d.year ?? '\u2014'}</span>
                  <span className="body">
                    <span className="ttl">{d.title}</span>
                    <span className="meta">
                      {(d.tradition || '').toUpperCase()}
                      {d.country ? ` \u00B7 ${d.country.toUpperCase()}` : ''}
                    </span>
                  </span>
                  <span className="chev">&rsaquo;</span>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
