'use client'

import { useState } from 'react'
import Link from 'next/link'
import { loadHymnal, loadBible, loadConfessions } from '@/lib/hymnal/loader'
import { HYMNALS, BIBLES } from '@/lib/hymnal/sources'
import { useHymnalStore } from '@/store/hymnal'

type Result =
  | { kind: 'hymn'; hymnal: string; hymnalShort: string; number: string; title: string; snippet: string }
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
  const [searched, setSearched] = useState(false)

  const history = useHymnalStore((s) => s.searchHistory)
  const addTerm = useHymnalStore((s) => s.addSearchTerm)
  const removeTerm = useHymnalStore((s) => s.removeSearchTerm)
  const clearHistory = useHymnalStore((s) => s.clearSearchHistory)

  async function run(query: string = q) {
    const trimmed = query.trim()
    if (trimmed.length < 2) { setResults([]); setCount(0); setSearched(false); return }
    setBusy(true)
    addTerm(trimmed)
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
            if (hay.toLowerCase().includes(trimmed.toLowerCase())) {
              out.push({ kind: 'hymn', hymnal: src.slug, hymnalShort: src.short, number: h.number, title: h.title, snippet: snip(hay, trimmed) })
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
          if (hay.toLowerCase().includes(trimmed.toLowerCase())) {
            out.push({ kind: 'creed', id: d.id, title: d.title, snippet: snip(hay, trimmed) })
            if (out.length >= max) break
          }
        }
      }
      if (out.length < max && (scope === 'all' || scope === 'bible')) {
        const src = BIBLES[0]
        const doc = await loadBible(src.slug)
        outer: for (const b of doc.books) {
          for (const c of b.chapters) {
            for (const v of c.verses) {
              if (v.text && v.text.toLowerCase().includes(trimmed.toLowerCase())) {
                out.push({ kind: 'verse', translation: src.slug, translationShort: src.short, book: b.id, bookName: b.name, chapter: c.number, number: v.number, snippet: snip(v.text, trimmed) })
                if (out.length >= max) break outer
              }
            }
          }
        }
      }
    } catch { /* surface as empty */ }

    setResults(out)
    setCount(out.length)
    setSearched(true)
    setBusy(false)
  }

  const showHistory = !searched && q.trim().length < 2 && history.length > 0
  const showEmpty = !searched && q.trim().length < 2 && history.length === 0

  return (
    <div className="search-page">
      <h1 className="search-h1">Search</h1>

      <form onSubmit={(e) => { e.preventDefault(); run() }} className="search-input-wrap" role="search">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          autoFocus
          placeholder="Find hymns, scripture, creeds&hellip;"
          value={q}
          onChange={(e) => { setQ(e.target.value); if (e.target.value.trim().length < 2) setSearched(false) }}
          aria-label="Search query"
        />
      </form>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        {(['all', 'hymns', 'bible', 'creeds'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setScope(s)}
            style={{
              background: 'transparent', cursor: 'pointer', padding: '6px 12px',
              border: `1px solid ${scope === s ? 'var(--nxr-brass)' : 'var(--nxr-rule)'}`,
              color: scope === s ? 'var(--nxr-brass)' : 'var(--nxr-ink-soft)',
              fontFamily: 'var(--serif)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {busy && (
        <div className="hymnal-empty" style={{ padding: '40px 0' }}>Searching&hellip;</div>
      )}

      {searched && !busy && (
        <>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--nxr-ink-mute)', margin: '4px 0 16px' }}>
            {count} match{count === 1 ? '' : 'es'} for &ldquo;{q.trim()}&rdquo;
          </div>
          {results.length === 0 ? (
            <div className="search-empty-state">
              <svg className="ic" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              No matches.
            </div>
          ) : (
            results.map((r, i) => <ResultRow key={i} r={r} />)
          )}
        </>
      )}

      {showHistory && (
        <>
          <div className="search-history-head">
            <span>Recent Searches</span>
            <button onClick={clearHistory}>Clear All</button>
          </div>
          {history.map((t) => (
            <div key={t} className="search-history-row">
              <span className="ic">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <button
                onClick={() => { setQ(t); run(t) }}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'inherit', font: 'inherit', padding: 0 }}
              >
                {t}
              </button>
              <button className="del" onClick={() => removeTerm(t)} aria-label={`Remove ${t}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </>
      )}

      {showEmpty && (
        <div className="search-empty-state">
          <svg className="ic" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Start typing to search across hymnals, scripture, and creeds.
        </div>
      )}
    </div>
  )
}

function ResultRow({ r }: { r: Result }) {
  if (r.kind === 'hymn') {
    return (
      <Link href={`/hymnal/library/${r.hymnal}/${encodeURIComponent(r.number)}`} className="hymn-row" style={{ display: 'block' }}>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 11, letterSpacing: '0.10em', color: 'var(--nxr-brass-deep)', textTransform: 'uppercase' }}>{r.hymnalShort} #{r.number}</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 18, marginTop: 2 }}>{r.title}</div>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--nxr-ink-mute)', fontSize: 14, marginTop: 4 }}>{r.snippet}</div>
      </Link>
    )
  }
  if (r.kind === 'verse') {
    return (
      <Link href={`/hymnal/bible/${r.translation}/${r.book}/${r.chapter}`} className="hymn-row" style={{ display: 'block' }}>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 11, letterSpacing: '0.10em', color: 'var(--nxr-brass-deep)', textTransform: 'uppercase' }}>{r.translationShort} &middot; {r.bookName} {r.chapter}:{r.number}</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 16, marginTop: 4, color: 'var(--nxr-ink-soft)' }}>{r.snippet}</div>
      </Link>
    )
  }
  return (
    <Link href={`/hymnal/creeds/${r.id}`} className="hymn-row" style={{ display: 'block' }}>
      <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 11, letterSpacing: '0.10em', color: 'var(--nxr-brass-deep)', textTransform: 'uppercase' }}>{r.id}</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 18, marginTop: 2 }}>{r.title}</div>
      <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--nxr-ink-mute)', fontSize: 14, marginTop: 4 }}>{r.snippet}</div>
    </Link>
  )
}
