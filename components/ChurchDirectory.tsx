'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import dynamic from 'next/dynamic'
import ChurchCard from './ChurchCard'

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <section className="map-region">
      <div className="map-frame">
        <div className="map-canvas" style={{ display: 'grid', placeItems: 'center', color: 'var(--ink-mute)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
          Loading map&hellip;
        </div>
      </div>
    </section>
  ),
})

interface Church {
  id: number
  name: string
  denomination: string | null
  address: string
  city: string
  state: string
  zip: string | null
  latitude: number | null
  longitude: number | null
  website: string | null
  phone: string | null
  email: string | null
  zionistStance: string
  theologicalNotes: string | null
  description: string | null
  upvotes: number
}

type Position = 'all' | 'anti' | 'no' | 'yes' | 'unknown'
type SortKey = 'name' | 'state' | 'upvotes'

const POSITION_TABS: Array<{ key: Position; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'anti', label: 'Anti-Zionist' },
  { key: 'no', label: 'Non-Zionist' },
  { key: 'unknown', label: 'Unknown' },
]

function extractPastor(notes: string | null): string | null {
  if (!notes) return null
  const m = notes.match(/Pastor\s+([A-Z][A-Za-z'.\-]+(?:\s+[A-Z][A-Za-z'.\-]+){1,3})/)
  return m ? m[1] : null
}

const PER_PAGE = 60

export default function ChurchDirectory() {
  const [churches, setChurches] = useState<Church[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [stateFilter, setStateFilter] = useState('')
  const [denomFilter, setDenomFilter] = useState('')
  const [position, setPosition] = useState<Position>('anti')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [activeId, setActiveId] = useState<number | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('/api/churches')
      .then(r => r.json())
      .then((data: Church[]) => { setChurches(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => { setPage(1) }, [query, stateFilter, denomFilter, position, sortKey])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && detailOpen) setDetailOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [detailOpen])

  const states = useMemo(() => [...new Set(churches.map(c => c.state))].sort(), [churches])
  const denominations = useMemo(
    () => [...new Set(churches.map(c => c.denomination).filter(Boolean) as string[])].sort(),
    [churches]
  )

  const filtered = useMemo(() => {
    let list = churches
    if (position !== 'all') list = list.filter(c => c.zionistStance === position)
    if (stateFilter) list = list.filter(c => c.state === stateFilter)
    if (denomFilter) list = list.filter(c => c.denomination === denomFilter)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q) ||
        (c.denomination?.toLowerCase().includes(q) ?? false)
      )
    }
    list = [...list].sort((a, b) => {
      if (sortKey === 'name') return a.name.localeCompare(b.name)
      if (sortKey === 'state') return a.state.localeCompare(b.state) || a.name.localeCompare(b.name)
      if (sortKey === 'upvotes') return b.upvotes - a.upvotes
      return 0
    })
    return list
  }, [churches, query, stateFilter, denomFilter, position, sortKey])

  const total = churches.length
  const counts = useMemo(() => ({
    anti: churches.filter(c => c.zionistStance === 'anti').length,
    no: churches.filter(c => c.zionistStance === 'no').length,
    yes: churches.filter(c => c.zionistStance === 'yes').length,
    unknown: churches.filter(c => c.zionistStance === 'unknown').length,
  }), [churches])

  const tabCounts: Record<Position, number> = {
    all: total,
    anti: counts.anti,
    no: counts.no,
    yes: counts.yes,
    unknown: counts.unknown,
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSelect = useCallback((id: number) => {
    setActiveId(id)
    setDetailOpen(true)
  }, [])

  const activeChurch = activeId != null ? churches.find(c => c.id === activeId) || null : null

  const cycleSort = () => {
    setSortKey(k => k === 'name' ? 'state' : k === 'state' ? 'upvotes' : 'name')
  }

  const sortLabel = sortKey === 'name' ? 'A → Z' : sortKey === 'state' ? 'By State' : 'By Upvotes'

  const fmt = (n: number) => n.toLocaleString()
  const pct = (n: number) => total > 0 ? ((n / total) * 100) : 0

  return (
    <div>
      <div className="stats-strip">
        <div className="stat">
          <div className="stat-label">Currently Showing</div>
          <div className="stat-value">
            {fmt(filtered.length)}<span className="small">of {fmt(total)} congregations</span>
          </div>
          <div className="stat-bar"><span style={{ width: total > 0 ? `${(filtered.length / total * 100).toFixed(1)}%` : '0%' }} /></div>
        </div>
        <div className="stat">
          <div className="stat-label">Anti-Zionist</div>
          <div className="stat-value"><span className="accent">{fmt(counts.anti)}</span><span className="small">&Vert; {pct(counts.anti).toFixed(1)}%</span></div>
          <div className="stat-bar"><span className="oxblood" style={{ width: `${pct(counts.anti).toFixed(2)}%` }} /></div>
        </div>
        <div className="stat">
          <div className="stat-label">Non-Zionist</div>
          <div className="stat-value"><span className="brass">{fmt(counts.no)}</span><span className="small">&Vert; {pct(counts.no).toFixed(1)}%</span></div>
          <div className="stat-bar"><span className="brass" style={{ width: `${pct(counts.no).toFixed(2)}%` }} /></div>
        </div>
        <div className="stat">
          <div className="stat-label">Unverified</div>
          <div className="stat-value">{fmt(counts.unknown)}<span className="small">&Vert; {pct(counts.unknown).toFixed(1)}%</span></div>
          <div className="stat-bar"><span style={{ width: `${pct(counts.unknown).toFixed(2)}%`, background: 'var(--ink-mute)' }} /></div>
        </div>
      </div>

      <main className="main-grid">
        <MapView
          churches={filtered}
          activeId={activeId}
          onSelect={handleSelect}
        />

        <aside className="directory">
          <div className="dir-header">
            <div className="dir-eyebrow">
              <span>&sect; II &Vert; The Directory</span>
              <span>Browse &middot; Sort &middot; Filter</span>
            </div>
            <div className="dir-title">Faithful <em>Congregations</em></div>
          </div>

          <div className="filters">
            <div className="search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" />
              </svg>
              <input
                placeholder="Search by name, city, or denomination&hellip;"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <div className="filter-row">
              <div className="filter-select">
                <select value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
                  <option value="">All States</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="filter-select">
                <select value={denomFilter} onChange={e => setDenomFilter(e.target.value)}>
                  <option value="">All Denominations</option>
                  {denominations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="position-tabs">
              {POSITION_TABS.map(p => (
                <button
                  key={p.key}
                  className={`position-tab${position === p.key ? ' active' : ''}`}
                  onClick={() => setPosition(p.key)}
                  type="button"
                >
                  <span>{p.label}</span>
                  <span className="count">{fmt(tabCounts[p.key])}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="dir-results-bar">
            <span><strong>{fmt(filtered.length)}</strong> Churches Found</span>
            <span className="sort-toggle" onClick={cycleSort} role="button" tabIndex={0}>
              Sort &Vert; {sortLabel} &updownarrow;
            </span>
          </div>

          <div className="church-list">
            {loading && <div className="empty-state">Loading directory&hellip;</div>}
            {!loading && filtered.length === 0 && (
              <div className="empty-state">No congregations match those filters.</div>
            )}
            {!loading && paginated.map((c, i) => (
              <ChurchCard
                key={c.id}
                church={c}
                index={(page - 1) * PER_PAGE + i + 1}
                active={c.id === activeId}
                onClick={() => handleSelect(c.id)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>&larr; Prev</button>
              <span style={{ color: 'var(--ink-soft)' }}>Page {page} / {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next &rarr;</button>
            </div>
          )}
        </aside>
      </main>

      <DetailPanel church={detailOpen ? activeChurch : null} onClose={() => setDetailOpen(false)} />
    </div>
  )
}

function DetailPanel({ church, onClose }: { church: Church | null; onClose: () => void }) {
  const open = !!church
  const pastor = extractPastor(church?.theologicalNotes ?? null)
  const positionLabel = church
    ? church.zionistStance === 'anti' ? 'Anti-Zionist'
      : church.zionistStance === 'no' ? 'Non-Zionist'
      : church.zionistStance === 'yes' ? 'Zionist'
      : 'Unverified'
    : ''

  return (
    <>
      <div className={`detail-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <aside className={`detail-panel${open ? ' open' : ''}`} aria-hidden={!open}>
        {church && (
          <>
            <div className="detail-head">
              <div className="detail-eyebrow">
                <span>&sect; Congregation Profile</span>
                <button className="detail-close" onClick={onClose} aria-label="Close">&times;</button>
              </div>
              <div className="detail-name">{church.name}</div>
              <div className="detail-loc">
                {church.city}, {church.state}{church.denomination ? ` · ${church.denomination}` : ''}
              </div>
            </div>
            <div className="detail-body">
              {(church.description || church.theologicalNotes) && (
                <div className="detail-section">
                  <h4>Confession &amp; Conviction</h4>
                  <p>{church.description || church.theologicalNotes}</p>
                </div>
              )}

              <div className="detail-section">
                <h4>At a Glance</h4>
                <div className="detail-stat-grid">
                  <div className="detail-stat">
                    <div className="detail-stat-label">Position</div>
                    <div className="detail-stat-value" style={{ fontSize: 16, textTransform: 'uppercase', fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}>
                      {positionLabel}
                    </div>
                  </div>
                  <div className="detail-stat">
                    <div className="detail-stat-label">Denomination</div>
                    <div className="detail-stat-value" style={{ fontSize: 16 }}>{church.denomination || '—'}</div>
                  </div>
                  <div className="detail-stat">
                    <div className="detail-stat-label">Pastor</div>
                    <div className="detail-stat-value" style={{ fontSize: 16 }}>{pastor || '—'}</div>
                  </div>
                  <div className="detail-stat">
                    <div className="detail-stat-label">Upvotes</div>
                    <div className="detail-stat-value">{church.upvotes}</div>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Contact</h4>
                <p style={{ fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 2 }}>
                  TELEPHONE &Vert; {church.phone || 'not listed'}<br />
                  EMAIL &Vert; {church.email || 'not listed'}<br />
                  ADDRESS &Vert; {church.address}, {church.city}, {church.state}{church.zip ? ` ${church.zip}` : ''}<br />
                  WEBSITE &Vert; {church.website ? 'available' : 'not listed'}
                </p>
              </div>

              {church.theologicalNotes && church.theologicalNotes !== church.description && (
                <div className="detail-section">
                  <h4>Editor's Note</h4>
                  <p style={{ fontStyle: 'italic', fontFamily: 'var(--serif)', fontSize: 15 }}>
                    {church.theologicalNotes}
                  </p>
                </div>
              )}
            </div>
            <div className="detail-actions">
              <button className="btn" type="button" onClick={onClose}>Close</button>
              {church.phone && <a className="btn" href={`tel:${church.phone}`}>Call</a>}
              {church.website ? (
                <a className="btn primary" href={church.website} target="_blank" rel="noopener noreferrer">Visit Website &rarr;</a>
              ) : (
                <button className="btn primary" type="button" disabled>No Website</button>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  )
}
