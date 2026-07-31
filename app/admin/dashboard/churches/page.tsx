'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { parseFlags, RECORD_FLAGS } from '@/lib/record-flags'

type Church = Record<string, any>

const STANCE_FIELDS: Array<{ key: string; label: string; options: string[] }> = [
  { key: 'culturalEngagement', label: 'Cultural engagement', options: ['unknown', 'transformationalist', 'single_issue', 'limited_mission', 'quietist'] },
  { key: 'zionistStance', label: 'Zionism', options: ['unknown', 'anti', 'no', 'yes'] },
  { key: 'abolitionStance', label: 'Abolition', options: ['unknown', 'pro_abolition', 'incrementalist', 'anti'] },
  { key: 'christianNationalism', label: 'Christian nationalism', options: ['unknown', 'affirm', 'sympathetic', 'critical'] },
  { key: 'eschatology', label: 'Eschatology', options: ['unknown', 'postmill', 'amill', 'premill', 'dispensational'] },
  { key: 'theonomy', label: 'Theonomy', options: ['unknown', 'theonomic', 'sympathetic', 'non_theonomic'] },
  { key: 'federalVision', label: 'Federal Vision', options: ['unknown', 'affirm', 'sympathetic', 'critical'] },
  { key: 'socialJusticeStance', label: 'Social justice', options: ['unknown', 'anti_crt', 'mixed', 'affirming'] },
  { key: 'sexualityStance', label: 'Sexuality', options: ['unknown', 'traditional', 'side_b', 'affirming'] },
  { key: 'genderStance', label: 'Gender', options: ['unknown', 'complementarian', 'patriarchal', 'egalitarian'] },
]

const TEXT_FIELDS = [
  ['name', 'Name'], ['denomination', 'Denomination'], ['address', 'Address'], ['city', 'City'],
  ['state', 'State'], ['zip', 'Zip'], ['website', 'Website'], ['phone', 'Phone'],
  ['email', 'Email'], ['leadership', 'Leadership'], ['recordFlag', 'Record flag'],
  ['researchStatus', 'Research status'], ['stanceBasis', 'Stance basis'], ['sourceUrls', 'Source URLs (; separated)'],
] as const

const GAPS = [
  ['', 'No filter'], ['not_researched', 'Not researched'], ['no_sources', 'No sources'],
  ['denom_default', 'Denominational default'], ['ce_unknown', 'Engagement unknown'],
  ['no_description', 'No description'], ['no_coords', 'No coordinates'],
  ['flagged', 'Flagged'], ['urc', '"URC" bulk import'],
]

function ChurchesInner() {
  const sp = useSearchParams()
  const [q, setQ] = useState('')
  const [gap, setGap] = useState(sp.get('gap') || '')
  const [state, setState] = useState(sp.get('state') || '')
  const [flag, setFlag] = useState(sp.get('flag') || '')
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState<Church[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Church | null>(null)
  const [history, setHistory] = useState<any[]>([])
  const [draft, setDraft] = useState<Church>({})
  const [changeNote, setChangeNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ q, gap, state, flag, page: String(page) })
    const res = await fetch(`/api/admin/churches?${params}`)
    if (res.ok) {
      const d = await res.json()
      setRows(d.rows); setTotal(d.total)
    }
    setLoading(false)
  }, [q, gap, state, flag, page])

  useEffect(() => { load() }, [load])

  const openEdit = async (id: number) => {
    setError('')
    setChangeNote('')
    const res = await fetch(`/api/admin/churches/${id}`)
    if (!res.ok) return
    const d = await res.json()
    setEditing(d.church); setDraft({ ...d.church }); setHistory(d.history || [])
  }

  const stanceEdits = editing
    ? STANCE_FIELDS.filter(f => draft[f.key] !== editing[f.key])
    : []

  const save = async () => {
    if (!editing) return
    setSaving(true); setError('')
    const body: Record<string, unknown> = { changeNote }
    for (const [k] of TEXT_FIELDS) if (draft[k] !== editing[k]) body[k] = draft[k]
    for (const f of STANCE_FIELDS) if (draft[f.key] !== editing[f.key]) body[f.key] = draft[f.key]
    for (const k of ['description', 'theologicalNotes', 'notablePeople', 'researchNote']) {
      if (draft[k] !== editing[k]) body[k] = draft[k]
    }
    const res = await fetch(`/api/admin/churches/${editing.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    })
    const d = await res.json()
    setSaving(false)
    if (!res.ok) { setError(d.error || 'Save failed'); return }
    setEditing(null); load()
  }

  const totalPages = Math.max(1, Math.ceil(total / 25))

  return (
    <div>
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Churches</h1>
          <div className="admin-sub">{loading ? 'Loading…' : `${total.toLocaleString()} matching`}</div>
        </div>
      </div>

      <div className="admin-form-grid">
        <div className="admin-field">
          <label>Search</label>
          <input value={q} onChange={e => { setQ(e.target.value); setPage(1) }} placeholder="name, city, denomination" />
        </div>
        <div className="admin-field">
          <label>Gap filter</label>
          <select value={gap} onChange={e => { setGap(e.target.value); setPage(1) }}>
            {GAPS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div className="admin-field">
          <label>State</label>
          <input value={state} onChange={e => { setState(e.target.value.toUpperCase()); setPage(1) }} placeholder="MI" maxLength={2} />
        </div>
        <div className="admin-field">
          <label>Flag contains</label>
          <input value={flag} onChange={e => { setFlag(e.target.value); setPage(1) }} placeholder="duplicate_of" />
        </div>
      </div>

      <div className="admin-scroll-x">
        <table className="admin-table">
          <thead><tr><th>Church</th><th>Where</th><th>Research</th><th>Flags</th><th /></tr></thead>
          <tbody>
            {rows.map(c => (
              <tr key={c.id}>
                <td>
                  <strong style={{ fontFamily: 'var(--serif)', fontSize: 16 }}>{c.name}</strong>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-mute)' }}>
                    #{c.id} · {c.denomination || '—'}
                  </div>
                </td>
                <td>{c.city}, {c.state}</td>
                <td style={{ fontFamily: 'var(--mono)', fontSize: 10 }}>
                  {c.researchStatus}<br />
                  <span style={{ color: c.sourceUrls ? 'var(--ink-mute)' : 'var(--oxblood)' }}>
                    {c.sourceUrls ? 'sourced' : 'no sources'}
                  </span>
                </td>
                <td>
                  {parseFlags(c.recordFlag).map(f => (
                    <span key={f.raw} className={`admin-chip${f.held ? ' held' : ''}${f.known ? '' : ' unknown'}`}>{f.label}</span>
                  ))}
                </td>
                <td><button className="btn" onClick={() => openEdit(c.id)}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination" style={{ marginTop: 16 }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>&larr; Prev</button>
          <span style={{ color: 'var(--ink-soft)' }}>Page {page} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next &rarr;</button>
        </div>
      )}

      {editing && (
        <>
          <div className="detail-overlay open" onClick={() => setEditing(null)} />
          <aside className="detail-panel open" style={{ padding: 24, overflowY: 'auto' }}>
            <button className="detail-close" onClick={() => setEditing(null)} aria-label="Close">&times;</button>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 26, marginBottom: 4 }}>{editing.name}</h2>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-mute)', marginBottom: 18 }}>
              #{editing.id} · {editing.city}, {editing.state}
            </div>

            <div className="admin-form-grid">
              {TEXT_FIELDS.map(([k, label]) => (
                <div className="admin-field" key={k}>
                  <label>{label}</label>
                  <input value={draft[k] ?? ''} onChange={e => setDraft({ ...draft, [k]: e.target.value })} />
                </div>
              ))}
            </div>

            {(['description', 'theologicalNotes', 'notablePeople', 'researchNote'] as const).map(k => (
              <div className="admin-field" key={k}>
                <label>{k}</label>
                <textarea value={draft[k] ?? ''} onChange={e => setDraft({ ...draft, [k]: e.target.value })} />
              </div>
            ))}

            <div className="admin-section-label" style={{ marginTop: 24 }}>Stances</div>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink-soft)', margin: '10px 0 14px' }}>
              Changing any of these is recorded permanently, with your reason. An unsourced stance
              is worse than a missing one.
            </p>
            <div className="admin-form-grid">
              {STANCE_FIELDS.map(f => (
                <div className="admin-field" key={f.key}>
                  <label>{f.label}</label>
                  <select
                    value={draft[f.key] ?? 'unknown'}
                    onChange={e => setDraft({ ...draft, [f.key]: e.target.value })}
                    style={draft[f.key] !== editing[f.key] ? { borderColor: 'var(--oxblood)', borderWidth: 2 } : undefined}
                  >
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>

            {stanceEdits.length > 0 && (
              <div className="admin-field">
                <label style={{ color: 'var(--oxblood)' }}>
                  Reason for {stanceEdits.length} stance change{stanceEdits.length > 1 ? 's' : ''} (required)
                </label>
                <textarea
                  value={changeNote}
                  onChange={e => setChangeNote(e.target.value)}
                  placeholder="What is the evidence? Cite a source."
                />
              </div>
            )}

            {error && <p style={{ color: 'var(--oxblood)', fontFamily: 'var(--mono)', fontSize: 12 }}>{error}</p>}

            <div style={{ display: 'flex', gap: 8, margin: '18px 0' }}>
              <button className="btn primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
              <button className="btn" onClick={() => setEditing(null)}>Cancel</button>
            </div>

            {history.length > 0 && (
              <>
                <div className="admin-section-label">Stance history</div>
                <table className="admin-table" style={{ marginTop: 10 }}>
                  <tbody>
                    {history.map(h => (
                      <tr key={h.id}>
                        <td style={{ fontFamily: 'var(--mono)', fontSize: 10 }}>
                          {new Date(h.createdAt).toLocaleDateString()}<br />{h.actor}
                        </td>
                        <td>
                          <strong>{h.field}</strong>: {h.oldValue || '—'} &rarr; {h.newValue || '—'}
                          {h.note && <div className="admin-note" style={{ fontSize: 13 }}>{h.note}</div>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </aside>
        </>
      )}

      <div className="admin-section-label" style={{ marginTop: 40 }}>Flag vocabulary</div>
      <div className="admin-scroll-x" style={{ marginTop: 12 }}>
        <table className="admin-table">
          <thead><tr><th>Flag</th><th>Meaning</th><th>Held?</th></tr></thead>
          <tbody>
            {RECORD_FLAGS.map(f => (
              <tr key={f.key}>
                <td style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>{f.key}</td>
                <td>{f.description}</td>
                <td>{f.held ? <span className="admin-chip held">kept off site</span> : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function ChurchesPage() {
  return (
    <Suspense fallback={<div className="admin-empty">Loading&hellip;</div>}>
      <ChurchesInner />
    </Suspense>
  )
}
