'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loadHymnal, toRoman } from '@/lib/hymnal/loader'
import { findHymnal } from '@/lib/hymnal/sources'
import { useHymnalStore } from '@/store/hymnal'
import type { Hymn } from '@/types/hymnal'

const PdfViewer = dynamic(() => import('./PdfViewer'), {
  ssr: false,
  loading: () => <div className="sheet-empty">Loading sheet music…</div>,
})

export default function HymnDetail({ slug, number }: { slug: string; number: string }) {
  const router = useRouter()
  const [hymn, setHymn] = useState<Hymn | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [prev, setPrev] = useState<string | null>(null)
  const [next, setNext] = useState<string | null>(null)
  const [modal, setModal] = useState<null | 'info' | 'share' | 'order'>(null)

  const isFav = useHymnalStore((s) => s.isHymnFavorite({ hymnal: slug, number }))
  const toggleFav = useHymnalStore((s) => s.toggleHymnFavorite)
  const textScale = useHymnalStore((s) => s.textScale)
  const setTextScale = useHymnalStore((s) => s.setTextScale)
  const showRoman = useHymnalStore((s) => s.showRomanNumerals)
  const showDrop = useHymnalStore((s) => s.showDropCaps)
  const setLastOpened = useHymnalStore((s) => s.setLastOpenedHymn)
  const tab = useHymnalStore((s) => s.hymnDetailTab)
  const setTab = useHymnalStore((s) => s.setHymnDetailTab)

  useEffect(() => { setLastOpened(slug, number) }, [slug, number, setLastOpened])

  const src = findHymnal(slug)
  const hymnalLabel = src?.short?.toUpperCase() ?? slug.toUpperCase()

  useEffect(() => {
    let alive = true
    loadHymnal(slug)
      .then((doc) => {
        if (!alive) return
        const idx = doc.hymns.findIndex((h) => h.number === number)
        if (idx < 0) { setErr('Hymn not found'); return }
        setHymn(doc.hymns[idx])
        setPrev(idx > 0 ? doc.hymns[idx - 1].number : null)
        setNext(idx < doc.hymns.length - 1 ? doc.hymns[idx + 1].number : null)
      })
      .catch((e) => { if (alive) setErr(e.message) })
    return () => { alive = false }
  }, [slug, number])

  const verseFontSize = useMemo(() => `${Math.round(19 * textScale)}px`, [textScale])

  if (err) return <div className="hymnal-empty">{err}</div>
  if (!hymn) return <div className="hymnal-empty">Loading&hellip;</div>

  const credit = [
    hymn.author ? `Words: ${hymn.author}` : null,
    hymn.composer ? `Music: ${hymn.composer}` : null,
  ].filter(Boolean).join('  \u00B7  ')

  return (
    <article className="hymn-detail">
      <DetailChrome
        label={hymnalLabel}
        onBack={() => router.push(`/hymnal/library/${slug}`)}
        isFav={isFav}
        onFav={() => toggleFav({ hymnal: slug, number })}
        onShare={() => setModal('share')}
        onInfo={() => setModal('info')}
        onAdd={() => setModal('order')}
      />

      <header className="hymn-detail-head">
        <div className="num-band">Hymn No. {hymn.number}</div>
        <h1 className="ttl">{hymn.title}</h1>
        {(hymn.tune || hymn.meter || hymn.key) && (
          <div className="meta">
            {[hymn.tune, hymn.meter, hymn.key].filter(Boolean).join('  \u00B7  ')}
          </div>
        )}
      </header>

      <div className="hymn-tabs" role="tablist">
        <button role="tab" aria-selected={tab === 'lyrics'} className={tab === 'lyrics' ? 'on' : ''} onClick={() => setTab('lyrics')}>Lyrics</button>
        <button role="tab" aria-selected={tab === 'music'} className={tab === 'music' ? 'on' : ''} onClick={() => setTab('music')}>Music</button>
      </div>

      {tab === 'lyrics' ? (
        <>
          <div className="verses" style={{ fontSize: verseFontSize }}>
            {hymn.verses.map((v, i) => {
              if (v.isChorus) {
                return (
                  <div key={`${v.number}-c-${i}`} className="verse chorus">
                    <div className="marker">Chorus</div>
                    <div className="text">{v.text}</div>
                  </div>
                )
              }
              const marker = showRoman ? toRoman(v.number) : String(v.number)
              const showDC = showDrop && i === 0 && v.text && v.text.trim().length > 0
              let body: React.ReactNode = v.text
              if (showDC) {
                const trimmed = v.text.replace(/^\s+/, '')
                const head = trimmed.charAt(0)
                const tail = trimmed.slice(1)
                body = (<><span className="dropcap">{head}</span>{tail}</>)
              }
              return (
                <div key={`${v.number}-${i}`} className="verse">
                  <div className="marker">{marker}</div>
                  <div className="text">{body}</div>
                </div>
              )
            })}
          </div>
          {credit && <div className="hymn-stamp-foot">{credit}</div>}
        </>
      ) : (
        <div className="sheet-card">
          <div className="tune-name">{hymn.tune ?? hymn.title}</div>
          {(hymn.composer || hymn.meter) && (
            <div className="composer">
              {[hymn.composer, hymn.meter].filter(Boolean).join('  \u00B7  ')}
            </div>
          )}
          {hymn.sheetMusicUrl ? (
            <SheetMusic url={hymn.sheetMusicUrl} title={hymn.title} />
          ) : (
            <div className="sheet-empty">Sheet music not yet available for this hymn.</div>
          )}
        </div>
      )}

      <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 28, marginBottom: 140, fontFamily: 'var(--serif)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--nxr-ink-mute)' }}>
        <div>
          {prev != null && <Link href={`/hymnal/library/${slug}/${encodeURIComponent(prev)}`}>&larr; #{prev}</Link>}
        </div>
        <div>
          {next != null && <Link href={`/hymnal/library/${slug}/${encodeURIComponent(next)}`}>#{next} &rarr;</Link>}
        </div>
      </nav>

      <AudioBar
        src={hymn.audioUrl}
        label={`Hymn No. ${hymn.number}`}
        onPrev={prev != null ? () => router.push(`/hymnal/library/${slug}/${encodeURIComponent(prev)}`) : undefined}
        onNext={next != null ? () => router.push(`/hymnal/library/${slug}/${encodeURIComponent(next)}`) : undefined}
        textScale={textScale}
        onScale={setTextScale}
      />

      {modal === 'info' && (
        <HymnInfoModal hymn={hymn} hymnalShort={src?.short ?? ''} onClose={() => setModal(null)} />
      )}
      {modal === 'share' && (
        <ShareModal hymn={hymn} hymnalShort={src?.short ?? ''} slug={slug} onClose={() => setModal(null)} />
      )}
      {modal === 'order' && (
        <AddToOrderModal hymnal={slug} number={hymn.number} title={hymn.title} onClose={() => setModal(null)} />
      )}
    </article>
  )
}

/* ---------------- sheet music renderer ---------------- */

const PROXY_HOSTS = new Set([
  'hymnary.org',
  'www.hymnary.org',
  'media.hymnary.org',
  'christkirk.com',
  'www.christkirk.com',
])

function shouldProxy(url: string): boolean {
  try { return PROXY_HOSTS.has(new URL(url).hostname) } catch { return false }
}

function SheetMusic({ url, title }: { url: string; title: string }) {
  const [isPdf, setIsPdf] = useState<boolean | null>(null)
  const lower = url.toLowerCase().split('?')[0].split('#')[0]
  const extPdf = lower.endsWith('.pdf')
  const extImg = /\.(png|jpe?g|gif|webp|svg)$/i.test(lower)
  const proxied = shouldProxy(url) ? `/api/pdf-proxy?url=${encodeURIComponent(url)}` : url

  useEffect(() => {
    if (extPdf) { setIsPdf(true); return }
    if (extImg) { setIsPdf(false); return }
    let alive = true
    fetch(proxied, { method: 'HEAD' })
      .then((r) => {
        if (!alive) return
        const ct = (r.headers.get('content-type') || '').toLowerCase()
        setIsPdf(ct.includes('pdf'))
      })
      .catch(() => { if (alive) setIsPdf(true) })
    return () => { alive = false }
  }, [proxied, extPdf, extImg])

  if (isPdf === null) {
    return <div className="sheet-empty">Loading sheet music\u2026</div>
  }
  if (isPdf) {
    return <PdfViewer src={proxied} title={title} />
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={proxied} alt={`Sheet music for ${title}`} />
}

/* ---------------- chrome ---------------- */

function DetailChrome({
  label,
  onBack,
  isFav,
  onFav,
  onShare,
  onInfo,
  onAdd,
}: {
  label: string
  onBack: () => void
  isFav: boolean
  onFav: () => void
  onShare: () => void
  onInfo: () => void
  onAdd: () => void
}) {
  return (
    <div className="detail-chrome">
      <button className="back-btn" onClick={onBack} aria-label="Back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div className="label">{label}</div>
      <div className="actions">
        <button onClick={onFav} aria-label={isFav ? 'Remove favorite' : 'Add favorite'} className={isFav ? 'fav-heart on' : 'fav-heart'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <button onClick={onShare} aria-label="Share">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
        <button onClick={onInfo} aria-label="Info">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </button>
        <button onClick={onAdd} aria-label="Add to service">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <rect x="5" y="3" width="14" height="18" rx="1" /><path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ---------------- audio bar ---------------- */

function AudioBar({
  src,
  label,
  onPrev,
  onNext,
  textScale,
  onScale,
}: {
  src?: string | null
  label: string
  onPrev?: () => void
  onNext?: () => void
  textScale: number
  onScale: (n: number) => void
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)
  const [dur, setDur] = useState(0)
  const [looping, setLooping] = useState(false)
  const hasAudio = !!src

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setT(a.currentTime)
    const onMeta = () => setDur(a.duration || 0)
    const onEnd = () => setPlaying(false)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onMeta)
    a.addEventListener('ended', onEnd)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onMeta)
      a.removeEventListener('ended', onEnd)
    }
  }, [src])

  useEffect(() => {
    const a = audioRef.current
    if (a) a.loop = looping
  }, [looping])

  function toggle() {
    const a = audioRef.current
    if (!a) return
    if (playing) { a.pause(); setPlaying(false) }
    else { a.play().then(() => setPlaying(true)).catch(() => setPlaying(false)) }
  }
  function restart() {
    const a = audioRef.current
    if (!a) return
    a.currentTime = 0
    if (!playing) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }
  function fmt(s: number) {
    if (!Number.isFinite(s)) return '0:00'
    const m = Math.floor(s / 60)
    const ss = Math.floor(s % 60).toString().padStart(2, '0')
    return `${m}:${ss}`
  }
  function cycleScale() {
    const steps = [0.85, 1, 1.15, 1.3, 1.5]
    const idx = steps.findIndex((x) => Math.abs(x - textScale) < 0.01)
    const nextIdx = idx < 0 ? 1 : (idx + 1) % steps.length
    onScale(steps[nextIdx])
  }
  const pct = dur > 0 ? Math.min(100, (t / dur) * 100) : 0

  return (
    <div className="audio-bar">
      {hasAudio && <audio ref={audioRef} src={src ?? undefined} preload="metadata" />}
      <div className="audio-bar-inner">
        <div className="meta-row">
          <span>{label}</span>
          {hasAudio && <span>{fmt(t)} / {fmt(dur)}</span>}
        </div>
        {hasAudio && (
          <div className="progress"><div className="fill" style={{ width: `${pct}%` }} /></div>
        )}
        <div className="controls">
          <button onClick={onPrev} disabled={!onPrev} aria-label="Previous hymn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" />
            </svg>
          </button>
          {hasAudio && (
            <button className={looping ? 'on' : ''} onClick={() => setLooping((v) => !v)} aria-label={looping ? 'Disable loop' : 'Enable loop'} aria-pressed={looping}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            </button>
          )}
          {hasAudio && (
            <button onClick={restart} aria-label="Restart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </button>
          )}
          {hasAudio && (
            <button className="play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
          )}
          <button onClick={cycleScale} aria-label="Text size">
            <span style={{ fontFamily: 'var(--serif)', fontSize: 14, letterSpacing: '0.04em' }}>Aa</span>
          </button>
          <button onClick={onNext} disabled={!onNext} aria-label="Next hymn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------------- info modal ---------------- */

function HymnInfoModal({ hymn, hymnalShort, onClose }: { hymn: Hymn; hymnalShort: string; onClose: () => void }) {
  const rows: Array<[string, React.ReactNode]> = []
  rows.push(['HYMNAL', hymnalShort || '\u2014'])
  rows.push(['NUMBER', `${hymn.number}`])
  rows.push(['TITLE', hymn.title])
  if (hymn.firstLine) rows.push(['FIRST LINE', hymn.firstLine])
  if (hymn.tune) rows.push(['TUNE', hymn.tune])
  if (hymn.meter) rows.push(['METER', hymn.meter])
  if (hymn.key) rows.push(['KEY', hymn.key])
  if (hymn.author) rows.push(['AUTHOR', hymn.author])
  if (hymn.composer) rows.push(['COMPOSER', hymn.composer])
  if (hymn.year != null && hymn.year !== '') rows.push(['FIRST PUB.', String(hymn.year)])
  if (hymn.scriptureReference) rows.push(['SCRIPTURE', hymn.scriptureReference])
  if (hymn.copyright) rows.push(['COPYRIGHT', hymn.copyright])
  if (hymn.notes) rows.push(['NOTES', hymn.notes])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-shell colophon" onClick={(e) => e.stopPropagation()}>
        <div className="colophon-head">
          <span className="eyebrow">COLOPHON</span>
          <button onClick={onClose} aria-label="Close" className="x">&times;</button>
        </div>
        <hr className="colophon-rule" />
        <h2 className="colophon-title">Hymn <em>Info</em></h2>
        <div className="colophon-sub">&mdash; a brief notation &mdash;</div>
        <dl className="colophon-list">
          {rows.map(([k, v]) => (
            <div key={k} className="row">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="colophon-foot">
          <button className="close-btn" onClick={onClose}>CLOSE</button>
        </div>
      </div>
    </div>
  )
}

/* ---------------- share modal ---------------- */

function ShareModal({ hymn, hymnalShort, slug, onClose }: { hymn: Hymn; hymnalShort: string; slug: string; onClose: () => void }) {
  const [copied, setCopied] = useState<string | null>(null)
  const link = typeof window !== 'undefined' ? `${window.location.origin}/hymnal/library/${slug}/${encodeURIComponent(hymn.number)}` : ''
  const plain = useMemo(() => {
    const head = `${hymn.title}\n${hymnalShort ? `${hymnalShort} \u00B7 ` : ''}No. ${hymn.number}\n\n`
    const body = hymn.verses.map((v) => (v.isChorus ? `Chorus\n${v.text}` : `${v.number}.\n${v.text}`)).join('\n\n')
    return head + body
  }, [hymn, hymnalShort])

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(label)
      setTimeout(() => setCopied(null), 1400)
    } catch {
      setCopied('Copy failed')
      setTimeout(() => setCopied(null), 1400)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-shell centered" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head" style={{ borderBottom: 'none', marginBottom: 0 }}>
          <span>Share</span>
          <button onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="hd">Share <em>{hymn.title}</em></div>
        <div className="dek">No. {hymn.number}</div>
        <button className="opt" onClick={() => copy(plain, 'Text copied')}>
          <span className="lbl">Copy as Text</span>
          <span className="dk">Full lyrics with title &amp; number</span>
        </button>
        <button className="opt" onClick={() => copy(link, 'Link copied')}>
          <span className="lbl">Copy Link</span>
          <span className="dk">{link.replace(/^https?:\/\//, '')}</span>
        </button>
        <button className="opt" onClick={() => {
          if (navigator.share) navigator.share({ title: hymn.title, text: `${hymn.title} \u2014 No. ${hymn.number}`, url: link }).catch(() => {})
          else copy(link, 'Link copied')
        }}>
          <span className="lbl">System Share</span>
          <span className="dk">Open the OS share sheet</span>
        </button>
        {copied && (
          <div style={{ textAlign: 'center', marginTop: 14, fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--nxr-brass)' }}>{copied}</div>
        )}
      </div>
    </div>
  )
}

/* ---------------- add-to-order modal ---------------- */

function AddToOrderModal({ hymnal, number, title, onClose }: { hymnal: string; number: string; title: string; onClose: () => void }) {
  const services = useHymnalStore((s) => s.services)
  const create = useHymnalStore((s) => s.createService)
  const addItem = useHymnalStore((s) => s.addServiceItem)
  const [added, setAdded] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  function add(id: string, label: string) {
    addItem(id, { kind: 'hymn', ref: { hymnal, number } })
    setAdded(`Added to ${label}`)
    setTimeout(() => onClose(), 900)
  }
  function makeNew() {
    const t = newTitle.trim() || `Service \u2014 ${new Date().toLocaleDateString()}`
    const id = create(t)
    add(id, t)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-shell" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <span>Add to Service</span>
          <button onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--nxr-ink-mute)', fontSize: 13, marginBottom: 8 }}>
          {title} &middot; No. {number}
        </div>
        {services.length === 0 && !creating && (
          <div style={{ padding: '12px 0', color: 'var(--nxr-ink-soft)', fontFamily: 'var(--serif)', fontStyle: 'italic' }}>
            No services yet.
          </div>
        )}
        {services.map((s) => (
          <button key={s.id} className="opt" onClick={() => add(s.id, s.title)}>
            <span className="lbl">{s.title}</span>
            <span className="dk">{s.items.length} item{s.items.length === 1 ? '' : 's'}{s.date ? `  \u00B7  ${s.date}` : ''}</span>
          </button>
        ))}
        {creating ? (
          <div style={{ paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              autoFocus
              placeholder="Service title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ background: 'transparent', border: '1px solid var(--nxr-rule)', padding: '10px 12px', color: 'var(--nxr-ink)', fontFamily: 'var(--serif)', fontSize: 15 }}
            />
            <button className="opt" onClick={makeNew}>
              <span className="lbl" style={{ color: 'var(--nxr-brass)' }}>+ Create &amp; Add</span>
            </button>
          </div>
        ) : (
          <button className="opt" onClick={() => setCreating(true)}>
            <span className="lbl" style={{ color: 'var(--nxr-brass)' }}>+ New Service</span>
            <span className="dk">Create a service and add this hymn</span>
          </button>
        )}
        {added && (
          <div style={{ textAlign: 'center', marginTop: 14, fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--nxr-brass)' }}>{added}</div>
        )}
      </div>
    </div>
  )
}
