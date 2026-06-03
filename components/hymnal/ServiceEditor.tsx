'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useHymnalStore, type Service, type ServiceItem } from '@/store/hymnal'
import { HYMNALS, BIBLES, findHymnal, findBible } from '@/lib/hymnal/sources'
import { loadHymnal, toRoman } from '@/lib/hymnal/loader'
import type { Hymn } from '@/types/hymnal'

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
              onOpen={() => {
                if (it.kind === 'hymn') router.push(`/hymnal/library/${it.ref.hymnal}/${encodeURIComponent(it.ref.number)}`)
                else if (it.kind === 'scripture') router.push(`/hymnal/bible/${it.ref.translation}/${it.ref.book}/${it.ref.chapter}`)
                else if (it.kind === 'confession') router.push(`/hymnal/creeds/${it.ref.id}`)
              }}
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
          service={service}
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

function Row({ index, total, item, dragOver, onOpen, onUp, onDown, onRemove, onDragStart, onDragEnter, onDragEnd }: {
  index: number
  total: number
  item: ServiceItem
  dragOver: boolean
  onOpen: () => void
  onUp: () => void
  onDown: () => void
  onRemove: () => void
  onDragStart: () => void
  onDragEnter: () => void
  onDragEnd: () => void
}) {
  const roman = toRoman(index + 1)
  const navigable = item.kind === 'hymn' || item.kind === 'scripture' || item.kind === 'confession'
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
      <button
        type="button"
        className="body"
        onClick={navigable ? onOpen : undefined}
        disabled={!navigable}
        style={{ background: 'transparent', border: 'none', padding: 0, textAlign: 'left', cursor: navigable ? 'pointer' : 'default', color: 'inherit', font: 'inherit', width: '100%' }}
      >
        <div className="ln1">{renderLine(item)}</div>
        <div className="meta">{kindLabel(item.kind)}</div>
      </button>
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

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

async function buildBookletHtml(service: Service): Promise<string> {
  const hymnalCache = new Map<string, Promise<{ hymn: Hymn | null }>>()
  function getHymn(slug: string, number: string): Promise<{ hymn: Hymn | null }> {
    const key = `${slug}|${number}`
    let p = hymnalCache.get(key)
    if (!p) {
      p = loadHymnal(slug)
        .then((doc) => ({ hymn: doc.hymns.find((h) => h.number === number) || null }))
        .catch(() => ({ hymn: null }))
      hymnalCache.set(key, p)
    }
    return p
  }

  const sections: string[] = []
  for (let i = 0; i < service.items.length; i++) {
    const it = service.items[i]
    const r = toRoman(i + 1)
    if (it.kind === 'hymn') {
      const h = findHymnal(it.ref.hymnal)
      const { hymn } = await getHymn(it.ref.hymnal, it.ref.number)
      const head = `<div class="rom">${r}</div><div class="kind">Hymn</div>`
      const ttl = hymn?.title ? escapeHtml(hymn.title) : `No. ${escapeHtml(it.ref.number)}`
      const meta = `${escapeHtml(h?.short || it.ref.hymnal)} &middot; No. ${escapeHtml(it.ref.number)}${hymn?.tune ? ` &middot; ${escapeHtml(hymn.tune)}` : ''}`
      let body = ''
      if (hymn) {
        const verses = (hymn.verses || []).map((v) => {
          const label = v.isChorus ? 'Chorus' : String(v.number)
          return `<div class="verse"><div class="vm">${escapeHtml(label)}</div><div class="vt">${escapeHtml(v.text || '')}</div></div>`
        }).join('')
        body = `<div class="verses">${verses}</div>`
        if (hymn.sheetMusicUrl) {
          body += `<div class="sheet"><img src="${escapeHtml(hymn.sheetMusicUrl)}" alt="Sheet music"/></div>`
        }
      } else {
        body = '<div class="missing">Hymn not available.</div>'
      }
      sections.push(`<section class="sect">${head}<h2 class="ttl">${ttl}</h2><div class="meta">${meta}</div>${body}</section>`)
    } else if (it.kind === 'scripture') {
      const b = findBible(it.ref.translation)
      sections.push(`<section class="sect"><div class="rom">${r}</div><div class="kind">Scripture Reading</div><h2 class="ttl">${escapeHtml(it.ref.book.toUpperCase())} ${escapeHtml(String(it.ref.chapter))}</h2><div class="meta">${escapeHtml(b?.short || it.ref.translation)}</div></section>`)
    } else if (it.kind === 'confession') {
      sections.push(`<section class="sect"><div class="rom">${r}</div><div class="kind">Confession</div><h2 class="ttl">${escapeHtml(it.ref.id)}</h2></section>`)
    } else {
      sections.push(`<section class="sect"><div class="rom">${r}</div><div class="kind">Spoken</div><div class="note">${escapeHtml(it.text)}</div></section>`)
    }
  }

  const css = `
    @page { margin: 0.6in; }
    * { box-sizing: border-box; }
    body { font-family: Georgia, "Times New Roman", serif; color: #1d160d; margin: 0; }
    .cover { text-align: center; padding: 24px 0 32px; border-bottom: 1px solid #b5a273; margin-bottom: 24px; }
    .cover .eyebrow { font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase; color: #8a6c2a; margin-bottom: 8px; }
    .cover h1 { font-weight: 400; font-size: 32px; line-height: 1.1; margin: 0 0 6px; }
    .cover .date { font-style: italic; color: #5a4d2c; font-size: 14px; }
    .sect { page-break-inside: avoid; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid #d8c997; }
    .sect:last-child { border-bottom: none; }
    .rom { font-style: italic; color: #8a6c2a; font-size: 16px; margin-bottom: 2px; }
    .kind { font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: #6b5a35; margin-bottom: 6px; }
    .ttl { font-weight: 400; font-size: 22px; line-height: 1.15; margin: 0 0 4px; }
    .meta { font-style: italic; color: #6b5a35; font-size: 13px; margin-bottom: 14px; }
    .verses { max-width: 480px; margin: 0 auto; }
    .verse { display: grid; grid-template-columns: 28px 1fr; gap: 12px; margin-bottom: 14px; align-items: baseline; }
    .vm { font-style: italic; color: #8a6c2a; font-size: 13px; text-align: right; }
    .vt { white-space: pre-wrap; line-height: 1.55; font-size: 15px; }
    .sheet { margin-top: 16px; text-align: center; }
    .sheet img { max-width: 100%; height: auto; }
    .note { font-style: italic; color: #41372a; font-size: 15px; }
    .missing { color: #a04545; font-style: italic; font-size: 13px; }
  `
  const dateLine = service.date ? `<div class="date">${escapeHtml(service.date)}</div>` : ''
  return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(service.title)}</title><style>${css}</style></head><body>
    <div class="cover">
      <div class="eyebrow">Order of Service</div>
      <h1>${escapeHtml(service.title)}</h1>
      ${dateLine}
    </div>
    ${sections.join('\n')}
    <script>window.onload = function(){ setTimeout(function(){ window.focus(); window.print(); }, 250); };<\/script>
  </body></html>`
}

function ExportModal({ service, text, filename, title, message, setMessage, onClose }: {
  service: Service
  text: string; filename: string; title: string
  message: string | null; setMessage: (s: string | null) => void
  onClose: () => void
}) {
  const [building, setBuilding] = useState(false)

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
  async function printBooklet() {
    setBuilding(true)
    try {
      const html = await buildBookletHtml(service)
      const win = window.open('', '_blank')
      if (!win) { setMessage('Pop-up blocked'); setTimeout(() => setMessage(null), 1500); return }
      win.document.open()
      win.document.write(html)
      win.document.close()
    } catch (e) {
      setMessage(`Build failed: ${(e as Error).message}`)
      setTimeout(() => setMessage(null), 2000)
    } finally {
      setBuilding(false)
    }
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
        <button className="opt" onClick={printBooklet} disabled={building}>
          <span className="lbl">{building ? 'Building\u2026' : 'Download PDF (lyrics & sheet music)'}</span>
          <span className="dk">Full booklet with every hymn</span>
        </button>
        <button className="opt" onClick={copy}>
          <span className="lbl">Copy as Text</span>
          <span className="dk">Full order to clipboard</span>
        </button>
        <button className="opt" onClick={download}>
          <span className="lbl">Download .txt</span>
          <span className="dk">{filename}</span>
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
