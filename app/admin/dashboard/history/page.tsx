'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

type Change = {
  id: number; churchId: number; churchName: string | null; field: string
  oldValue: string | null; newValue: string | null; actor: string | null
  note: string | null; createdAt: string
}

export default function HistoryPage() {
  const [changes, setChanges] = useState<Change[]>([])
  const [byField, setByField] = useState<Array<{ field: string; n: number }>>([])
  const [total, setTotal] = useState(0)
  const [field, setField] = useState('')
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/history?field=${encodeURIComponent(field)}`)
    if (res.ok) { const d = await res.json(); setChanges(d.changes); setByField(d.byField); setTotal(d.total) }
    setLoading(false)
  }, [field])

  useEffect(() => { load() }, [load])

  return (
    <div>
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Stance History</h1>
          <div className="admin-sub">{total} recorded change{total === 1 ? '' : 's'}</div>
        </div>
      </div>

      <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-soft)', marginBottom: 20 }}>
        Every stance edit made through the admin is recorded here with its reason. Batch changes
        made by scripts are still written up in church_research_log.md — this covers what happens
        through the dashboard, where it would otherwise depend on memory.
      </p>

      {byField.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
          <button className="btn" onClick={() => setField('')}
            style={!field ? { borderColor: 'var(--brass-deep)', color: 'var(--brass-deep)' } : undefined}>
            All
          </button>
          {byField.map(f => (
            <button key={f.field} className="btn" onClick={() => setField(f.field)}
              style={field === f.field ? { borderColor: 'var(--brass-deep)', color: 'var(--brass-deep)' } : undefined}>
              {f.field} ({f.n})
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="admin-empty">Loading&hellip;</div>
      ) : changes.length === 0 ? (
        <div className="admin-empty">
          No stance changes recorded yet. Edits made from the Churches screen will appear here.
        </div>
      ) : (
        <div className="admin-scroll-x">
          <table className="admin-table">
            <thead><tr><th>When</th><th>Church</th><th>Field</th><th>Change</th><th>Reason</th></tr></thead>
            <tbody>
              {changes.map(c => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: 10, whiteSpace: 'nowrap' }}>
                    {new Date(c.createdAt).toLocaleDateString()}<br />
                    <span style={{ color: 'var(--ink-mute)' }}>{c.actor || '—'}</span>
                  </td>
                  <td>
                    <Link href={`/church/${c.churchId}`} target="_blank" style={{ borderBottom: '1px solid var(--rule)' }}>
                      {c.churchName || `#${c.churchId}`}
                    </Link>
                  </td>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>{c.field}</td>
                  <td style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>
                    {c.oldValue || '—'} &rarr; <strong>{c.newValue || '—'}</strong>
                  </td>
                  <td style={{ maxWidth: 320 }}>{c.note || <span style={{ color: 'var(--ink-mute)' }}>—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
