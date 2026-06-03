'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useHymnalStore, type ServiceItem } from '@/store/hymnal'
import { HYMNALS, BIBLES, findHymnal, findBible } from '@/lib/hymnal/sources'

export default function ServiceEditor({ id }: { id: string }) {
  const router = useRouter()
  const service = useHymnalStore((s) => s.services.find((x) => x.id === id))
  const rename = useHymnalStore((s) => s.renameService)
  const setDate = useHymnalStore((s) => s.setServiceDate)
  const addItem = useHymnalStore((s) => s.addServiceItem)
  const removeItem = useHymnalStore((s) => s.removeServiceItem)
  const moveItem = useHymnalStore((s) => s.moveServiceItem)
  const setNote = useHymnalStore((s) => s.setServiceItemNote)
  const deleteService = useHymnalStore((s) => s.deleteService)

  const [kind, setKind] = useState<'hymn' | 'scripture' | 'confession' | 'note'>('hymn')
  const [hymnal, setHymnal] = useState(HYMNALS[0].slug)
  const [hymnNum, setHymnNum] = useState('')
  const [translation, setTranslation] = useState(BIBLES[0].slug)
  const [book, setBook] = useState('')
  const [chapter, setChapter] = useState('')
  const [confId, setConfId] = useState('')
  const [noteText, setNoteText] = useState('')

  if (!service) return <div className="hymnal-empty">Service not found. <button onClick={() => router.push('/hymnal/services')} style={{ color: 'var(--nxr-brass-deep)' }}>Back</button></div>

  function add() {
    let item: ServiceItem | null = null
    if (kind === 'hymn' && hymnNum.trim()) {
      const n = Number(hymnNum)
      if (Number.isFinite(n)) item = { kind: 'hymn', ref: { hymnal, number: n } }
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
  }

  function itemLabel(it: ServiceItem): string {
    if (it.kind === 'hymn') {
      const h = findHymnal(it.ref.hymnal)
      return `${h?.short || it.ref.hymnal} #${it.ref.number}`
    }
    if (it.kind === 'scripture') {
      return `${it.ref.book.toUpperCase()} ${it.ref.chapter} (${(findBible(it.ref.translation)?.short || it.ref.translation).toUpperCase()})`
    }
    if (it.kind === 'confession') return it.ref.id
    return it.text
  }

  return (
    <div>
      <input
        className="hymn-search"
        type="text"
        value={service.title}
        onChange={(e) => rename(id, e.target.value)}
        style={{ fontFamily: 'var(--serif)', fontSize: 28, marginBottom: 8 }}
      />
      <input
        className="hymn-search"
        type="date"
        value={service.date || ''}
        onChange={(e) => setDate(id, e.target.value || undefined)}
        style={{ maxWidth: 220, marginBottom: 24 }}
      />

      <h3 className="hymnal-eyebrow">Add Item</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr auto', gap: 8, marginBottom: 24 }}>
        <select className="hymn-search" value={kind} onChange={(e) => setKind(e.target.value as typeof kind)} style={{ marginBottom: 0 }}>
          <option value="hymn">Hymn</option>
          <option value="scripture">Scripture</option>
          <option value="confession">Confession</option>
          <option value="note">Note</option>
        </select>
        <div style={{ display: 'grid', gap: 8 }}>
          {kind === 'hymn' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 8 }}>
              <select className="hymn-search" value={hymnal} onChange={(e) => setHymnal(e.target.value)} style={{ marginBottom: 0 }}>
                {HYMNALS.map((h) => <option key={h.slug} value={h.slug}>{h.title}</option>)}
              </select>
              <input className="hymn-search" type="number" min="1" placeholder="No." value={hymnNum} onChange={(e) => setHymnNum(e.target.value)} style={{ marginBottom: 0 }} />
            </div>
          )}
          {kind === 'scripture' && (
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 100px', gap: 8 }}>
              <select className="hymn-search" value={translation} onChange={(e) => setTranslation(e.target.value)} style={{ marginBottom: 0 }}>
                {BIBLES.map((b) => <option key={b.slug} value={b.slug}>{b.short}</option>)}
              </select>
              <input className="hymn-search" type="text" placeholder="book id (e.g. john)" value={book} onChange={(e) => setBook(e.target.value)} style={{ marginBottom: 0 }} />
              <input className="hymn-search" type="number" min="1" placeholder="ch." value={chapter} onChange={(e) => setChapter(e.target.value)} style={{ marginBottom: 0 }} />
            </div>
          )}
          {kind === 'confession' && (
            <input className="hymn-search" type="text" placeholder="confession id (e.g. apostles-creed)" value={confId} onChange={(e) => setConfId(e.target.value)} style={{ marginBottom: 0 }} />
          )}
          {kind === 'note' && (
            <input className="hymn-search" type="text" placeholder="Spoken word, prayer, announcement&hellip;" value={noteText} onChange={(e) => setNoteText(e.target.value)} style={{ marginBottom: 0 }} />
          )}
        </div>
        <button className="install-cta" style={{ marginTop: 0 }} onClick={add}>Add</button>
      </div>

      <h3 className="hymnal-eyebrow">Items</h3>
      {service.items.length === 0 ? (
        <div className="hymnal-empty">No items yet.</div>
      ) : (
        <div>
          {service.items.map((it, i) => (
            <div key={i} className="svc-item">
              <div className="kind">{it.kind}</div>
              <div>
                <span className="ttl">{itemLabel(it)}</span>
                {('note' in it) && it.note && <span className="note">{it.note}</span>}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="hymnal-icon-btn" onClick={() => moveItem(id, i, i - 1)} disabled={i === 0} aria-label="Move up">&uarr;</button>
                <button className="hymnal-icon-btn" onClick={() => moveItem(id, i, i + 1)} disabled={i === service.items.length - 1} aria-label="Move down">&darr;</button>
                <button className="hymnal-icon-btn" onClick={() => removeItem(id, i)} aria-label="Remove">&times;</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 36, paddingTop: 18, borderTop: '1px solid var(--nxr-rule)' }}>
        <button
          className="install-cta"
          style={{ background: 'transparent', borderColor: 'var(--nxr-brass-deep)', color: 'var(--nxr-brass)' }}
          onClick={() => {
            if (confirm(`Delete "${service.title}"? This cannot be undone.`)) {
              deleteService(id)
              router.push('/hymnal/services')
            }
          }}
        >
          Delete service
        </button>
      </div>
    </div>
  )
}
