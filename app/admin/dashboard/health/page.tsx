'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Health = {
  totals: Record<string, number>
  byState: Array<{ state: string; total: number; done: number }>
  flagCounts: Array<{ flag: string; n: number }>
}

// Each metric links to the churches screen pre-filtered, so a number is a worklist and not
// just a statistic. These gaps previously lived only in church_research_log.md.
const METRICS: Array<{ key: string; label: string; gap?: string; warn?: boolean; note?: string }> = [
  { key: 'total', label: 'Churches' },
  { key: 'unapproved', label: 'Awaiting / held', gap: 'flagged' },
  { key: 'notResearched', label: 'Not researched', gap: 'not_researched', warn: true },
  { key: 'noSources', label: 'No sources', gap: 'no_sources', warn: true, note: 'traceability is the point' },
  { key: 'denomDefault', label: 'Denominational default', gap: 'denom_default', warn: true, note: 'stance is a guess' },
  { key: 'ceUnknown', label: 'Engagement unknown', gap: 'ce_unknown', note: 'the site’s primary axis' },
  { key: 'noDescription', label: 'No description', gap: 'no_description' },
  { key: 'noCoords', label: 'No coordinates', gap: 'no_coords' },
  { key: 'flagged', label: 'Flagged rows', gap: 'flagged' },
  { key: 'urcBulk', label: '"URC" bulk import', gap: 'urc', warn: true, note: 'label not trusted' },
  { key: 'openReports', label: 'Open reports' },
  { key: 'recentChanges', label: 'Stance edits (30d)' },
]

export default function HealthPage() {
  const [data, setData] = useState<Health | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/health')
      .then(r => (r.ok ? r.json() : null))
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="admin-empty">Loading&hellip;</div>
  if (!data) return <div className="admin-empty">Could not load health data.</div>

  const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0)

  return (
    <div>
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Data Health</h1>
          <div className="admin-sub">Where the directory is thin — click a number to work it</div>
        </div>
      </div>

      <div className="admin-grid">
        {METRICS.map(m => {
          const v = data.totals[m.key] ?? 0
          const body = (
            <>
              <div className="admin-metric-label">{m.label}</div>
              <div className={`admin-metric-value${m.warn && v > 0 ? ' warn' : ''}`}>{v.toLocaleString()}</div>
              {m.note && <div className="admin-metric-sub">{m.note}</div>}
            </>
          )
          return m.gap ? (
            <Link key={m.key} className="admin-metric" href={`/admin/dashboard/churches?gap=${m.gap}`}>{body}</Link>
          ) : (
            <div key={m.key} className="admin-metric">{body}</div>
          )
        })}
      </div>

      <div className="admin-section-label">Research coverage by state</div>
      <div className="admin-scroll-x" style={{ marginTop: 12 }}>
        <table className="admin-table">
          <thead>
            <tr><th>State</th><th>Researched</th><th>Total</th><th>Coverage</th></tr>
          </thead>
          <tbody>
            {data.byState.map(s => (
              <tr key={s.state}>
                <td>
                  <Link href={`/admin/dashboard/churches?state=${s.state}`} style={{ borderBottom: '1px solid var(--rule)' }}>
                    {s.state}
                  </Link>
                </td>
                <td>{s.done.toLocaleString()}</td>
                <td>{s.total.toLocaleString()}</td>
                <td>
                  <span style={{ color: pct(s.done, s.total) < 50 ? 'var(--oxblood)' : 'var(--ink)' }}>
                    {pct(s.done, s.total)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-section-label">Flags in use</div>
      <div className="admin-scroll-x" style={{ marginTop: 12 }}>
        <table className="admin-table">
          <thead><tr><th>Flag</th><th>Rows</th></tr></thead>
          <tbody>
            {data.flagCounts.map(f => (
              <tr key={f.flag}>
                <td>
                  <Link href={`/admin/dashboard/churches?flag=${encodeURIComponent(f.flag)}`} style={{ borderBottom: '1px solid var(--rule)' }}>
                    {f.flag}
                  </Link>
                </td>
                <td>{f.n}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
