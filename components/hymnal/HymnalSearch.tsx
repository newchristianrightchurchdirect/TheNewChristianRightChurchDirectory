'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { loadHymnal, loadBible, loadConfessions } from '@/lib/hymnal/loader'
import { HYMNALS, BIBLES } from '@/lib/hymnal/sources'

type Result =
  | { kind: 'hymn'; hymnal: string; hymnalShort: string; number: number; title: string; snippet: string }
  | { kind: 'verse'; translation: string; translationShort: string; book: string; bookName: string; chapter: number; number: number; snippet: string }
  | { kind: 'creed'; id: string; title: string; snippet: string }

function snip(text: string, q: string, len = 140): string {
  if (!text) return ''
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i < 0) return text.slice(0, len)
  const start = Math.max(0, i - 40)
  const end = Math.min(text.length, i + q.length + len - 40)
  return (start > 0 ? '\u2026' : '') + text.slice(start, end) + (end < text.length ? '\u2026' : '')
}

export default function HymnalSearch() {
  const [q, setQ] = useState('')
  const [scope, setScope] = useState<'all' | 'hymns' | 'bible' | 'creeds'>('all')
  const [results, setResults] = useState<Result[]>([])
  const [busy, setBusy] = useState(false)
  const [count, setCount] = useState(0)

  // Only run when user explicitly searches (avoids loading 30MB on type)
  async function run() {
    const query = q.trim()
    if (query.length < 2) { setResults([]); setCount(0); return }
    setBusy(true)
    const out: Result[] = []
    const max = 80

    try {
      if (scope === 'all' || scope === 'hymns') {
        for (const src of HYMNALS) {
          const doc = await loadHymnal(src.slug)
          for (const h of doc.hymns) {
            const hay = [
              h.title || '', h.firstLine || '', h.tune || '', h.author || '',
              ...h.verses.map((v) => v.text || ''),
            ].join('\n')
            if (hay.toLowerCase().includes(query.toLowerCase())) {
              out.push({
                kind: 'hymn',
                hymnal: src.slug,
                hymnalShort: src.short,
                number: h.number,
                title: h.title,
                snippet: snip(hay, query),
              })
              if (out.length >= max) break
            }
          }
          if (out.length >= max) break
        }
      }
      if (out.length < max && (scope === 'all' || scope === 'creeds')) {
        const cf = await loadConfessions()
        for (const d of cf.documents) {
          const parts: string[] = [d.title]
          if (d.content) parts.push(d.content)
          for (const g of d.groups || []) {
            if (g.title) parts.push(g.title)
            for (const e of g.entries || []) {
              if (e.question) parts.push(e.question)
              if (e.answer) parts.push(e.answer)
            }
          }
          const hay = parts.join('\n')
          if (hay.toLowerCase().includes(query.toLowerCase())) {
            out.push({ kind: 'creed', id: d.id, title: d.title, snippet: snip(hay, query) })
            if (out.length >= max) break
          }
        }
      }
      if (out.length < max && (scope === 'all' || scope === 'bible')) {
        // Default to the user's chosen Bible to keep this fast.
        const src = BIBLES[0]
        const doc = await loadBible(src.slug)
        outer: for (const b of doc.books) {
          for (const c of b.chapters) {
            for (const v of c.verses) {
              if (v.text && v.text.toLowerCase().includes(query.toLowerCase())) {
                out.push({
                  kind: 'verse',
                  translation: src.slug,
                  translationShort: src.short,
                  book: b.id,
                  bookName: b.name,
                  chapter: c.number,
                  number: v.number,
                  snippet: snip(v.text, query),
                })
                if (out.length >= max) break outer
              }
            }
          }
        }
      }
    } catch { /* surface as empty */ }

    setResults(out)
    setCount(out.length)
    setBusy(false)
  }

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); run() }} style={{ display: 'grid', gridTemplateColumns: '1fr 160px auto', gap: 8, marginBottom: 12 }}>
        <input
          className="hymn-search"
          type="search"
          placeholder="e.g. amazing, easter, sabbath, justification"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ marginBottom: 0 }}
          aria-label="Search query"
        />
        <select className="hymn-search" value={scope} onChange={(e) => setScope(e.target.value as typeof scope)} style={{ marginBottom: 0 }}>
          <option value="all">All</option>
          <option value="hymns">Hymns only</option>
          <option value="bible">Bible (ESV)</option>
          <option value="creeds">Creeds only</option>
        </select>
        <button className="install-cta" style={{ marginTop: 0 }} type="submit">{busy ? 'Searching\u2026' : 'Search'}</button>
      </form>
      {!busy && q.trim().length >= 2 && (
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)', margin: '4px 0 16px' }}>
          {count} match{count === 1 ? '' : 'es'}
        </div>
      )}

      {results.map((r, i) => {
        if (r.kind === 'hymn') {
          return (
            <Link key={i} href={`/hymnal/library/${r.hymnal}/${r.number}`} className="hymn-row" style={{ display: 'block' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--brass-deep)' }}>{r.hymnalShort} #{r.number}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 18, marginTop: 2 }}>{r.title}</div>
              <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-mute)', fontSize: 14, marginTop: 4 }}>{r.snippet}</div>
            </Link>
          )
        }
        if (r.kind === 'verse') {
          return (
            <Link key={i} href={`/hymnal/bible/${r.translation}/${r.book}/${r.chapter}`} className="hymn-row" style={{ display: 'block' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--brass-deep)' }}>{r.translationShort} &middot; {r.bookName} {r.chapter}:{r.number}</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 16, marginTop: 4, color: 'var(--ink-soft)' }}>{r.snippet}</div>
            </Link>
          )
        }
        return (
          <Link key={i} href={`/hymnal/creeds/${r.id}`} className="hymn-row" style={{ display: 'block' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', color: 'var(--brass-deep)' }}>{r.id}</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 18, marginTop: 2 }}>{r.title}</div>
            <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-mute)', fontSize: 14, marginTop: 4 }}>{r.snippet}</div>
          </Link>
        )
      })}
    </div>
  )
}
