'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useHymnalStore, type Service, type ServiceItem } from '@/store/hymnal'
import { HYMNALS, BIBLES, findHymnal, findBible } from '@/lib/hymnal/sources'
import { toRoman } from '@/lib/hymnal/loader'

function serviceToText(svc: Service): string {
  const lines: string[] = []
  lines.push(svc.title)
  if (svc.date) lines.push(svc.date)
  lines.push('')
  svc.items.forEach((it, i) => {
    const r = toRoman(i + 1)
    let body = ''
    if (it.kind === 'hymn') {
      const h = findHymnal(it.ref.hymnal)
      body = `Hymn  \u2014  ${h?.short || it.ref.hymnal} No. ${it.ref.number}`
    } else if (it.kind === 'scripture') {
      const b = findBible(it.ref.translation)
      body = `Scripture  \u2014  ${it.ref.book.toUpperCase()} ${it.ref.chapter} (${b?.short || it.ref.translation})`
    } else if (it.kind === 'confession') {
      body = `Confession  \u2014  ${it.ref.id}`
    } else {
      body = it.text
    }
    lines.push(`${r}.  ${body}`)
    if (it.kind !== 'note' && it.note) lines.push(`     ${it.note}`)
  })
  return lines.join('\n')
}

export default function ServiceEditor({ id }: { id: string }) {
  const router = useRouter()
  const service = useHymnalStore((s) => s.services.find((x) => x.id === id))
  const rename = useHymnalStore((s) => s.renameService)
  const setDate = useHymnalStore((s) => s.setServiceDate)
  const addItem = useHymnalStore((s) => s.addServiceItem)
  const removeItem = useHymnalStore((s) => s.removeServiceItem)
  const moveItem = useHymnalStore((s) => s.moveServiceItem)
  const deleteService = useHymnalStore((s) => s.deleteService)

  const [adding, setAdding] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [exportMsg, setExportMsg] = useState<string | null>(null)
  const dragFrom = useRef<number | null>(null)
  const [dragOver, setDragOver] = useState<number | null>(null)
  const [kind, setKind] = useState<'hymn' | 'scripture' | 'confession' | 'note'>('hymn')
  const [hymnal, setHymnal] = useState(HYMNALS[0].slug)
  const [hymnNum, setHymnNum] = useState('')
  const [translation, setTranslation] = useState(BIBLES[0].slug)
  const [book, setBook] = useState('')
  const [chapter, setChapter] = useState('')
  const [confId, setConfId] = useState('')
  const [noteText, setNoteText] = useState('')

  if (!service) {
    return (
      <div className="hymnal-empty">
        Service not found.{' '}
        <button onClick={() => router.push('/hymnal/services')} style={{ color: 'var(--nxr-brass)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
          Back
        </button>
      </div>
    )
  }

  function add() {
    let item: ServiceItem | null = null
    if (kind === 'hymn' && hymnNum.trim()) {
      item = { kind: 'hymn', ref: { hymnal, number: hymnNum.trim() } }
    } else if (kind === 'scripture' && book.trim() && chapter.trim()) {
      const c = Number(chapter)
      if (Number.isFinite(c)) item = { kind: 'scripture', ref: { translation, book: book.trim().toLowerCase(), chapter: c } }
    } else if (kind === 'confession' && confId.trim()) {
      item = { kind: 'confession', ref: { id: confId.trim() } }
    } else if (kind === 'note' && noteText.trim()) {
      item = { kind: 'note', text: noteText.trim() }
    }
    if (!item) return
    addItem(id, item)
    setHymnNum(''); setBook(''); setChapter(''); setConfId(''); setNoteText('')
    setAdding(false)
  }

  return (
    <article>
      <div className="detail-chrome">
        <button className="back-btn" onClick={() => router.push('/hymnal/services')} aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="label">Order of Service</div>
        <div className="actions">
          <button onClick={() => setExporting(true)} aria-label="Export service" disabled={service.items.length === 0}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
          <button onClick={() => setAdding((v) => !v)} aria-label="Add item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      <header style={{ textAlign: 'center', padding: '4px 0 22px' }}>
        <input
          value={service.title}
          onChange={(e) => rename(id, e.target.value)}
          aria-label="Service title"
          style={{
            background: 'transparent', border: 'none', textAlign: 'center', width: '100%',
            fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 32, lineHeight: 1.05, color: 'var(--nxr-ink)',
            outline: 'none',
          }}
        />
        <input
          type="date"
          value={service.date || ''}
          onChange={(e) => setDate(id, e.target.value || undefined)}
          aria-label="Service date"
          style={{
            background: 'transparent', border: 'none', textAlign: 'center', marginTop: 6,
            fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--nxr-ink-mute)', fontSize: 14,
            outline: 'none', colorScheme: 'dark',
          }}
        />
      </header>

      {adding && (
        <AddItemForm
          kind={kind} setKind={setKind}
          hymnal={hymnal} setHymnal={setHymnal} hymnNum={hymnNum} setHymnNum={setHymnNum}
          translation={translation} setTranslation={setTranslation}
          book={book} setBook={setBook} chapter={chapter} setChapter={setChapter}
          confId={confId} setConfId={setConfId}
          noteText={noteText} setNoteText={setNoteText}
          onAdd={add} onCancel={() => setAdding(false)}
        />
      )}

      {service.items.length === 0 ? (
        <div className="hymnal-empty" style={{ padding: '40px 0' }}>
          No items yet. Tap + to add one.
        </div>
      ) : (
        <div>
          {service.items.map((it, i) => (
            <Row
              key={i}
              index={i}
              total={service.items.length}
              item={it}
              dragOver={dragOver === i}
              onUp={() => moveItem(id, i, i - 1)}
              onDown={() => moveItem(id, i, i + 1)}
              onRemove={() => removeItem(id, i)}
              onDragStart={() => { dragFrom.current = i }}
              onDragEnter={() => setDragOver(i)}
              onDragEnd={() => {
                const from = dragFrom.current
                const to = dragOver
                dragFrom.current = null
                setDragOver(null)
                if (from != null && to != null && from !== to) moveItem(id, from, to)
              }}
            />
          ))}
        </div>
      )}

      {exporting && (
        <ExportModal
          text={serviceToText(service)}
          filename={`${service.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase() || 'service'}.txt`}
          title={service.title}
          message={exportMsg}
          setMessage={setExportMsg}
          onClose={() => { setExporting(false); setExportMsg(null) }}
        />
      )}

      <div style={{ marginTop: 36, paddingTop: 18, borderTop: '1px solid var(--nxr-rule)', textAlign: 'center' }}>
        <button
          onClick={() => {
            if (confirm(`Delete "${service.title}"? This cannot be undone.`)) {
              deleteService(id)
              router.push('/hymnal/services')
            }
          }}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--serif)', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase',
            color: '#c25b66',
          }}
        >
          Delete service
        </button>
      </div>
    </article>
  )
}

function Row({ index, total, item, dragOver, onUp, onDown, onRemove, onDragStart, onDragEnter, onDragEnd }: {
  index: number
  total: number
  item: ServiceItem
  dragOver: boolean
  onUp: () => void
  onDown: () => void
  onRemove: () => void
  onDragStart: () => void
  onDragEnter: () => void
  onDragEnd: () => void
}) {
  const roman = toRoman(index + 1)
  return (
    <div
      className={`svc-roman-row${dragOver ? ' drag-over' : ''}`}
      draggable
      onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; onDragStart() }}
      onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move' }}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDrop={(e) => { e.preventDefault(); onDragEnd() }}
    >
      <div className="roman" aria-hidden style={{ cursor: 'grab' }}>{roman}</div>
      <div className="body">
        <div className="ln1">{renderLine(item)}</div>
        <div className="meta">{kindLabel(item.kind)}</div>
      </div>
      <div className="actions">
        <div className="row-icons">
          <button onClick={onUp} disabled={index === 0} aria-label="Move up">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <button onClick={onDown} disabled={index === total - 1} aria-label="Move down">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button className="x" onClick={onRemove} aria-label="Remove">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function ExportModal({ text, filename, title, message, setMessage, onClose }: {
  text: string; filename: string; title: string
  message: string | null; setMessage: (s: string | null) => void
  onClose: () => void
}) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setMessage('Copied to clipboard')
      setTimeout(() => setMessage(null), 1500)
    } catch {
      setMessage('Copy failed')
      setTimeout(() => setMessage(null), 1500)
    }
  }
  function download() {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setMessage('Downloaded')
    setTimeout(() => setMessage(null), 1500)
  }
  function print() {
    const win = window.open('', '_blank')
    if (!win) { setMessage('Pop-up blocked'); setTimeout(() => setMessage(null), 1500); return }
    win.document.write(`<!doctype html><html><head><title>${title}</title><style>body{font-family:Georgia,serif;max-width:640px;margin:48px auto;padding:0 24px;line-height:1.6;color:#211a10}pre{white-space:pre-wrap;font-family:inherit;font-size:15px}</style></head><body><pre>${text.replace(/</g, '&lt;')}</pre></body></html>`)
    win.document.close()
    win.focus()
    win.print()
  }
  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, text })
      } catch { /* user cancelled */ }
    } else {
      copy()
    }
  }
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-shell centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head" style={{ borderBottom: 'none', marginBottom: 0 }}>
          <span>Export Order</span>
          <button onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="hd">Export <em>{title}</em></div>
        <button className="opt" onClick={copy}>
          <span className="lbl">Copy as Text</span>
          <span className="dk">Full order to clipboard</span>
        </button>
        <button className="opt" onClick={download}>
          <span className="lbl">Download .txt</span>
          <span className="dk">{filename}</span>
        </button>
        <button className="opt" onClick={print}>
          <span className="lbl">Print / Save PDF</span>
          <span className="dk">Open the print dialog</span>
        </button>
        <button className="opt" onClick={share}>
          <span className="lbl">System Share</span>
          <span className="dk">Open the OS share sheet</span>
        </button>
        {message && (
          <div style={{ textAlign: 'center', marginTop: 14, fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--nxr-brass)' }}>{message}</div>
        )}
      </div>
    </div>
  )
}

function renderLine(item: ServiceItem): React.ReactNode {
  if (item.kind === 'hymn') {
    const h = findHymnal(item.ref.hymnal)
    return (
      <>
        <span className="num-tag">No. {item.ref.number}</span>
        <span className="ttl-it">{h?.short || item.ref.hymnal}</span>
      </>
    )
  }
  if (item.kind === 'scripture') {
    const b = findBible(item.ref.translation)
    return (
      <>
        <span className="num-tag">{item.ref.book.toUpperCase()} {item.ref.chapter}</span>
        <span className="ttl-it">{b?.short || item.ref.translation}</span>
      </>
    )
  }
  if (item.kind === 'confession') {
    return <span className="ttl-it">{item.ref.id}</span>
  }
  return <span>{item.text}</span>
}

function kindLabel(k: ServiceItem['kind']): string {
  switch (k) {
    case 'hymn': return 'Hymn'
    case 'scripture': return 'Scripture Reading'
    case 'confession': return 'Confession'
    case 'note': return 'Spoken'
  }
}

type AddProps = {
  kind: 'hymn' | 'scripture' | 'confession' | 'note'
  setKind: (k: 'hymn' | 'scripture' | 'confession' | 'note') => void
  hymnal: string; setHymnal: (s: string) => void
  hymnNum: string; setHymnNum: (s: string) => void
  translation: string; setTranslation: (s: string) => void
  book: string; setBook: (s: string) => void
  chapter: string; setChapter: (s: string) => void
  confId: string; setConfId: (s: string) => void
  noteText: string; setNoteText: (s: string) => void
  onAdd: () => void; onCancel: () => void
}

function AddItemForm(p: AddProps) {
  const fieldStyle: React.CSSProperties = {
    background: 'transparent', border: '1px solid var(--nxr-rule)', padding: '10px 12px',
    color: 'var(--nxr-ink)', fontFamily: 'var(--serif)', fontSize: 14, outline: 'none',
  }
  return (
    <div style={{ background: 'var(--nxr-surface-lift)', border: '1px solid var(--nxr-rule)', padding: 16, marginBottom: 18 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        {(['hymn', 'scripture', 'confession', 'note'] as const).map((k) => (
          <button
            key={k}
            onClick={() => p.setKind(k)}
            style={{
              background: 'transparent', cursor: 'pointer', padding: '6px 12px',
              border: `1px solid ${p.kind === k ? 'var(--nxr-brass)' : 'var(--nxr-rule)'}`,
              color: p.kind === k ? 'var(--nxr-brass)' : 'var(--nxr-ink-soft)',
              fontFamily: 'var(--serif)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
            }}
          >
            {k}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
        {p.kind === 'hymn' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 8 }}>
            <select value={p.hymnal} onChange={(e) => p.setHymnal(e.target.value)} style={fieldStyle}>
              {HYMNALS.map((h) => <option key={h.slug} value={h.slug}>{h.title}</option>)}
            </select>
            <input type="number" min="1" placeholder="No." value={p.hymnNum} onChange={(e) => p.setHymnNum(e.target.value)} style={fieldStyle} />
          </div>
        )}
        {p.kind === 'scripture' && (
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 80px', gap: 8 }}>
            <select value={p.translation} onChange={(e) => p.setTranslation(e.target.value)} style={fieldStyle}>
              {BIBLES.map((b) => <option key={b.slug} value={b.slug}>{b.short}</option>)}
            </select>
            <input type="text" placeholder="book (e.g. john)" value={p.book} onChange={(e) => p.setBook(e.target.value)} style={fieldStyle} />
            <input type="number" min="1" placeholder="ch." value={p.chapter} onChange={(e) => p.setChapter(e.target.value)} style={fieldStyle} />
          </div>
        )}
        {p.kind === 'confession' && (
          <input type="text" placeholder="confession id (e.g. apostles-creed)" value={p.confId} onChange={(e) => p.setConfId(e.target.value)} style={fieldStyle} />
        )}
        {p.kind === 'note' && (
          <input type="text" placeholder="Spoken word, prayer, announcement&hellip;" value={p.noteText} onChange={(e) => p.setNoteText(e.target.value)} style={fieldStyle} />
        )}
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <button onClick={p.onCancel} style={{ background: 'transparent', border: '1px solid var(--nxr-rule)', cursor: 'pointer', padding: '8px 18px', fontFamily: 'var(--serif)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--nxr-ink-soft)' }}>Cancel</button>
        <button onClick={p.onAdd} style={{ background: 'var(--nxr-brass)', border: '1px solid var(--nxr-brass)', cursor: 'pointer', padding: '8px 18px', fontFamily: 'var(--serif)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--nxr-bg)' }}>Add</button>
      </div>
    </div>
  )
}
