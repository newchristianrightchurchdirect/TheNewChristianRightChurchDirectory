'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { HYMNALS } from '@/lib/hymnal/sources'
import { loadHymnal } from '@/lib/hymnal/loader'
import type { Hymn } from '@/types/hymnal'

type Loaded = { slug: string; title: string; short: string; hymns: Hymn[] }

function normalizeTitle(t: string | null | undefined): string {
  if (!t) return ''
  return t
    .toLowerCase()
    .replace(/[\u2018\u2019\u201C\u201D'"]/g, '')
    .replace(/^(?:the|a|an|o)\s+/i, '')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tuneKey(t: string | null | undefined): string {
  if (!t) return ''
  let s = t
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\b(CMD|CM|LMD|LM|SMD|SM|HM|D)\b/g, ' ')
    .replace(/[\d.]+/g, ' ')
    .replace(/^\s*THE\s+/i, '')
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

type Mode = 'pair' | 'matrix'

export default function HymnalCompare() {
  const [mode, setMode] = useState<Mode>('pair')
  const [slugA, setSlugA] = useState<string>(HYMNALS[0]?.slug || '')
  const [slugB, setSlugB] = useState<string>(HYMNALS[1]?.slug || '')
  const [a, setA] = useState<Loaded | null>(null)
  const [b, setB] = useState<Loaded | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const [matchBy, setMatchBy] = useState<'title' | 'tune' | 'either'>('title')
  const [all, setAll] = useState<Loaded[] | null>(null)
  const [allLoading, setAllLoading] = useState(false)

  useEffect(() => {
    if (mode !== 'pair') return
    let alive = true
    setLoading(true); setErr(null)
    Promise.all([
      slugA ? loadHymnal(slugA).then((d) => {
        const src = HYMNALS.find((h) => h.slug === slugA)
        return { slug: slugA, title: src?.title || slugA, short: src?.short || slugA, hymns: d.hymns }
      }) : Promise.resolve(null),
      slugB ? loadHymnal(slugB).then((d) => {
        const src = HYMNALS.find((h) => h.slug === slugB)
        return { slug: slugB, title: src?.title || slugB, short: src?.short || slugB, hymns: d.hymns }
      }) : Promise.resolve(null),
    ])
      .then(([la, lb]) => {
        if (!alive) return
        setA(la); setB(lb); setLoading(false)
      })
      .catch((e) => { if (alive) { setErr(e.message); setLoading(false) } })
    return () => { alive = false }
  }, [slugA, slugB, mode])

  useEffect(() => {
    if (mode !== 'matrix' || all) return
    let alive = true
    setAllLoading(true); setErr(null)
    Promise.all(
      HYMNALS.map((src) =>
        loadHymnal(src.slug).then((d) => ({
          slug: src.slug,
          title: src.title,
          short: src.short || src.slug,
          hymns: d.hymns,
        })),
      ),
    )
      .then((list) => { if (alive) { setAll(list); setAllLoading(false) } })
      .catch((e) => { if (alive) { setErr(e.message); setAllLoading(false) } })
    return () => { alive = false }
  }, [mode, all])

  const analysis = useMemo(() => {
    if (!a || !b) return null
    const keyOf = (h: Hymn): string => {
      if (matchBy === 'tune') return tuneKey(h.tune)
      if (matchBy === 'either') return normalizeTitle(h.title) || tuneKey(h.tune)
      return normalizeTitle(h.title)
    }
    const mapA = new Map<string, Hymn[]>()
    for (const h of a.hymns) {
      const k = keyOf(h); if (!k) continue
      const arr = mapA.get(k) || []; arr.push(h); mapA.set(k, arr)
    }
    const mapB = new Map<string, Hymn[]>()
    for (const h of b.hymns) {
      const k = keyOf(h); if (!k) continue
      const arr = mapB.get(k) || []; arr.push(h); mapB.set(k, arr)
    }
    const shared: { key: string; a: Hymn; b: Hymn }[] = []
    const onlyA: Hymn[] = []
    const onlyB: Hymn[] = []
    for (const [k, arr] of mapA.entries()) {
      const bArr = mapB.get(k)
      if (bArr && bArr.length > 0) {
        shared.push({ key: k, a: arr[0], b: bArr[0] })
      } else {
        for (const h of arr) onlyA.push(h)
      }
    }
    for (const [k, arr] of mapB.entries()) {
      if (!mapA.has(k)) for (const h of arr) onlyB.push(h)
    }
    shared.sort((x, y) => (x.a.title || '').localeCompare(y.a.title || ''))
    onlyA.sort((x, y) => (x.title || '').localeCompare(y.title || ''))
    onlyB.sort((x, y) => (x.title || '').localeCompare(y.title || ''))
    return { shared, onlyA, onlyB, totalA: a.hymns.length, totalB: b.hymns.length }
  }, [a, b, matchBy])

  const matrix = useMemo(() => {
    if (mode !== 'matrix' || !all) return null
    const keyOf = (h: Hymn): string => {
      if (matchBy === 'tune') return tuneKey(h.tune)
      if (matchBy === 'either') return normalizeTitle(h.title) || tuneKey(h.tune)
      return normalizeTitle(h.title)
    }
    const sets = all.map((L) => {
      const s = new Set<string>()
      for (const h of L.hymns) { const k = keyOf(h); if (k) s.add(k) }
      return s
    })
    const rows = all.map((rowL, i) =>
      all.map((colL, j) => {
        if (i === j) return sets[i].size
        let n = 0
        for (const k of sets[i]) if (sets[j].has(k)) n++
        return n
      }),
    )
    return { rows, labels: all.map((L) => L.short), titles: all.map((L) => L.title), totals: sets.map((s) => s.size) }
  }, [mode, all, matchBy])

  return (
    <div className="hymnal-compare">
      <div className="cmp-mode" role="radiogroup" aria-label="Compare mode">
        {(['pair', 'matrix'] as const).map((m) => (
          <label key={m} className={`cm-opt${mode === m ? ' on' : ''}`}>
            <input type="radio" name="cmpmode" checked={mode === m} onChange={() => setMode(m)} />
            <span>{m === 'pair' ? 'Two hymnals' : 'All hymnals (matrix)'}</span>
          </label>
        ))}
      </div>

      {mode === 'pair' && (
        <div className="cmp-pickers">
          <label className="cmp-picker">
            <span className="lbl">Hymnal A</span>
            <select value={slugA} onChange={(e) => setSlugA(e.target.value)}>
              {HYMNALS.map((h) => <option key={h.slug} value={h.slug}>{h.short || h.title}</option>)}
            </select>
          </label>
          <div className="cmp-vs">vs.</div>
          <label className="cmp-picker">
            <span className="lbl">Hymnal B</span>
            <select value={slugB} onChange={(e) => setSlugB(e.target.value)}>
              {HYMNALS.map((h) => <option key={h.slug} value={h.slug}>{h.short || h.title}</option>)}
            </select>
          </label>
        </div>
      )}

      <div className="cmp-match-mode" role="radiogroup" aria-label="Match by">
        <span className="lbl">Match by:</span>
        {(['title', 'tune', 'either'] as const).map((m) => (
          <label key={m} className={`cm-opt${matchBy === m ? ' on' : ''}`}>
            <input type="radio" name="match" checked={matchBy === m} onChange={() => setMatchBy(m)} />
            <span>{m}</span>
          </label>
        ))}
      </div>

      {err && <div className="hymnal-empty">{err}</div>}
      {mode === 'matrix' && allLoading && <div className="hymnal-empty">Loading all hymnals&hellip;</div>}
      {mode === 'pair' && loading && <div className="hymnal-empty">Loading&hellip;</div>}

      {mode === 'matrix' && matrix && (
        <section className="cmp-matrix-wrap">
          <p className="cmp-matrix-hint">
            Each cell shows the number of hymns shared between the row and column.
            Diagonal cells show the row hymnal&rsquo;s unique-{matchBy === 'tune' ? 'tune' : 'title'} count.
            Percentages are of the row hymnal.
          </p>
          <div className="cmp-matrix-scroll">
            <table className="cmp-matrix">
              <thead>
                <tr>
                  <th></th>
                  {matrix.labels.map((L, j) => (
                    <th key={j} title={matrix.titles[j]}>{L}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.rows.map((row, i) => (
                  <tr key={i}>
                    <th title={matrix.titles[i]}>{matrix.labels[i]}</th>
                    {row.map((n, j) => {
                      const diag = i === j
                      const pct = !diag && matrix.totals[i] > 0
                        ? Math.round((n / matrix.totals[i]) * 100)
                        : null
                      return (
                        <td key={j} className={diag ? 'diag' : n > 0 ? 'has' : 'zero'}>
                          <span className="n">{n}</span>
                          {pct !== null && <span className="pct">{pct}%</span>}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {mode === 'pair' && !loading && analysis && a && b && (
        <>
          <div className="cmp-summary">
            <div className="cs-card shared">
              <div className="n">{analysis.shared.length}</div>
              <div className="t">Shared</div>
            </div>
            <div className="cs-card">
              <div className="n">{analysis.onlyA.length}</div>
              <div className="t">Only in {a.short}</div>
              <div className="sub">{a.hymns.length} total</div>
            </div>
            <div className="cs-card">
              <div className="n">{analysis.onlyB.length}</div>
              <div className="t">Only in {b.short}</div>
              <div className="sub">{b.hymns.length} total</div>
            </div>
          </div>

          {slugA === slugB && (
            <div className="hymnal-empty" style={{ marginTop: 16 }}>Pick two different hymnals.</div>
          )}

          {slugA !== slugB && (
            <>
              <CompareList
                title={`Shared (${analysis.shared.length})`}
                items={analysis.shared.map((s) => ({
                  key: s.key,
                  left: { hymnal: a.slug, number: s.a.number, label: s.a.title || `No. ${s.a.number}`, sub: `${a.short} No. ${s.a.number}${s.a.tune ? ` \u00B7 ${s.a.tune}` : ''}` },
                  right: { hymnal: b.slug, number: s.b.number, label: s.b.title || `No. ${s.b.number}`, sub: `${b.short} No. ${s.b.number}${s.b.tune ? ` \u00B7 ${s.b.tune}` : ''}` },
                }))}
              />
              <CompareList
                title={`Only in ${a.short} (${analysis.onlyA.length})`}
                items={analysis.onlyA.map((h) => ({
                  key: `${h.number}-${h.title}`,
                  left: { hymnal: a.slug, number: h.number, label: h.title || `No. ${h.number}`, sub: `No. ${h.number}${h.tune ? ` \u00B7 ${h.tune}` : ''}` },
                }))}
              />
              <CompareList
                title={`Only in ${b.short} (${analysis.onlyB.length})`}
                items={analysis.onlyB.map((h) => ({
                  key: `${h.number}-${h.title}`,
                  left: { hymnal: b.slug, number: h.number, label: h.title || `No. ${h.number}`, sub: `No. ${h.number}${h.tune ? ` \u00B7 ${h.tune}` : ''}` },
                }))}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}

type Side = { hymnal: string; number: string; label: string; sub: string }
type Row = { key: string; left: Side; right?: Side }

function CompareList({ title, items }: { title: string; items: Row[] }) {
  const [open, setOpen] = useState(true)
  const [filter, setFilter] = useState('')
  const filtered = items.filter((r) => {
    if (!filter) return true
    const f = filter.toLowerCase()
    return r.left.label.toLowerCase().includes(f) || (r.right?.label.toLowerCase().includes(f) ?? false)
  })
  return (
    <section className="cmp-section">
      <button type="button" className="cmp-head" onClick={() => setOpen((o) => !o)}>
        <span className="lbl">{title}</span>
        <span className="arr">{open ? '\u25BC' : '\u25B6'}</span>
      </button>
      {open && (
        <>
          {items.length > 12 && (
            <input
              type="search"
              placeholder="Filter list\u2026"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="cmp-filter"
            />
          )}
          <ul className="cmp-list">
            {filtered.slice(0, 500).map((r) => (
              <li key={r.key}>
                <Link className="cm-cell" href={`/hymnal/library/${r.left.hymnal}/${encodeURIComponent(r.left.number)}`}>
                  <span className="t">{r.left.label}</span>
                  <span className="s">{r.left.sub}</span>
                </Link>
                {r.right && (
                  <Link className="cm-cell right" href={`/hymnal/library/${r.right.hymnal}/${encodeURIComponent(r.right.number)}`}>
                    <span className="t">{r.right.label}</span>
                    <span className="s">{r.right.sub}</span>
                  </Link>
                )}
              </li>
            ))}
            {filtered.length > 500 && (
              <li className="cm-more">&hellip; and {filtered.length - 500} more (filter to narrow)</li>
            )}
            {filtered.length === 0 && (
              <li className="cm-empty">No matches.</li>
            )}
          </ul>
        </>
      )}
    </section>
  )
}
