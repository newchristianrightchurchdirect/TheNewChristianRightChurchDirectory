'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

type Report = {
  id: number; churchId: number; reason: string; details: string | null
  createdAt: string; status: string; adminNote: string | null
  church: { id: number; name: string; city: string; state: string; denomination: string | null } | null
}

const REASON_LABEL: Record<string, string> = {
  wrong_stance: 'Cultural-engagement position is incorrect',
  wrong_zionist: 'Zionist stance is incorrect',
  wrong_info: 'Other information is wrong',
  closed: 'Church is permanently closed',
  duplicate: 'Duplicate listing',
  other: 'Other',
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [status, setStatus] = useState('open')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<number | null>(null)
  const [notes, setNotes] = useState<Record<number, string>>({})

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/reports?status=${status}`)
    if (res.ok) { const d = await res.json(); setReports(d.reports); setCounts(d.counts) }
    setLoading(false)
  }, [status])

  useEffect(() => { load() }, [load])

  const setReportStatus = async (id: number, next: string) => {
    setBusy(id)
    const res = await fetch('/api/admin/reports', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: next, adminNote: notes[id] || undefined }),
    })
    setBusy(null)
    if (res.ok) load()
  }

  return (
    <div>
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Reports</h1>
          <div className="admin-sub">
            {counts.open ?? 0} open · {counts.resolved ?? 0} resolved · {counts.dismissed ?? 0} dismissed
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['open', 'resolved', 'dismissed', 'all'].map(s => (
            <button key={s} className="btn" onClick={() => setStatus(s)}
              style={status === s ? { borderColor: 'var(--brass-deep)', color: 'var(--brass-deep)' } : undefined}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-soft)', marginBottom: 20 }}>
        Visitors have been able to report bad data from every church page. Until now nothing read
        these, so they accumulated unseen.
      </p>

      {loading ? (
        <div className="admin-empty">Loading&hellip;</div>
      ) : reports.length === 0 ? (
        <div className="admin-empty">Nothing here.</div>
      ) : (
        reports.map(r => (
          <div key={r.id} className="admin-card">
            <div className="admin-card-name">
              {r.church
                ? <Link href={`/church/${r.churchId}`} target="_blank" style={{ borderBottom: '1px solid var(--rule)' }}>{r.church.name}</Link>
                : <span style={{ color: 'var(--oxblood)' }}>Church #{r.churchId} no longer exists</span>}
            </div>
            <div className="admin-card-denom">{REASON_LABEL[r.reason] || r.reason}</div>
            <div className="admin-card-meta">
              {r.church ? `${r.church.city}, ${r.church.state}` : ''} · filed {new Date(r.createdAt).toLocaleDateString()} · status {r.status}
            </div>
            {r.details && <div className="admin-note">{r.details}</div>}
            {r.adminNote && (
              <div className="admin-card-meta">Admin note: {r.adminNote}</div>
            )}

            {r.status === 'open' && (
              <>
                <div className="admin-field" style={{ marginTop: 12 }}>
                  <label>Note (optional)</label>
                  <input value={notes[r.id] || ''} onChange={e => setNotes({ ...notes, [r.id]: e.target.value })}
                    placeholder="What did you find?" />
                </div>
                <div className="admin-card-actions">
                  <button className="btn primary" disabled={busy === r.id} onClick={() => setReportStatus(r.id, 'resolved')}>
                    {busy === r.id ? 'Working…' : 'Mark resolved'}
                  </button>
                  <button className="btn" disabled={busy === r.id} onClick={() => setReportStatus(r.id, 'dismissed')}>
                    Dismiss
                  </button>
                  <Link className="btn" href={`/admin/dashboard/churches?q=${encodeURIComponent(r.church?.name || '')}`}>
                    Edit church
                  </Link>
                </div>
              </>
            )}
            {r.status !== 'open' && (
              <div className="admin-card-actions">
                <button className="btn" disabled={busy === r.id} onClick={() => setReportStatus(r.id, 'open')}>Reopen</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}
