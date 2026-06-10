'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loadConfessions } from '@/lib/hymnal/loader'
import { useHymnalStore } from '@/store/hymnal'
import type { ConfessionDocument, ConfessionEntry, ConfessionGroup } from '@/types/hymnal'

const BOOK_ALIASES: Record<string, string> = {
  gen: 'genesis', ge: 'genesis', genesis: 'genesis',
  ex: 'exodus', exo: 'exodus', exod: 'exodus', exodus: 'exodus',
  lev: 'leviticus', le: 'leviticus', leviticus: 'leviticus',
  num: 'numbers', nu: 'numbers', numb: 'numbers', numbers: 'numbers',
  deut: 'deuteronomy', deu: 'deuteronomy', dt: 'deuteronomy', deuteronomy: 'deuteronomy',
  josh: 'joshua', jos: 'joshua', joshua: 'joshua',
  judg: 'judges', jdg: 'judges', judges: 'judges',
  ruth: 'ruth', ru: 'ruth',
  '1sam': '1samuel', '1sa': '1samuel', isa: 'isaiah', '1samuel': '1samuel',
  '2sam': '2samuel', '2sa': '2samuel', '2samuel': '2samuel',
  '1kgs': '1kings', '1ki': '1kings', '1kings': '1kings',
  '2kgs': '2kings', '2ki': '2kings', '2kings': '2kings',
  '1chr': '1chronicles', '1ch': '1chronicles', '1chronicles': '1chronicles',
  '2chr': '2chronicles', '2ch': '2chronicles', '2chronicles': '2chronicles',
  ezra: 'ezra', ezr: 'ezra',
  neh: 'nehemiah', nehemiah: 'nehemiah',
  est: 'esther', esther: 'esther',
  job: 'job',
  ps: 'psalms', psa: 'psalms', psalm: 'psalms', psalms: 'psalms',
  prov: 'proverbs', pr: 'proverbs', pro: 'proverbs', proverbs: 'proverbs',
  ecc: 'ecclesiastes', eccl: 'ecclesiastes', ecclesiastes: 'ecclesiastes', qoh: 'ecclesiastes',
  song: 'songofsolomon', songofsolomon: 'songofsolomon', sos: 'songofsolomon', cant: 'songofsolomon',
  is: 'isaiah', isaiah: 'isaiah',
  jer: 'jeremiah', jeremiah: 'jeremiah',
  lam: 'lamentations', lamentations: 'lamentations',
  ezek: 'ezekiel', eze: 'ezekiel', ezekiel: 'ezekiel',
  dan: 'daniel', daniel: 'daniel', dn: 'daniel',
  hos: 'hosea', hosea: 'hosea',
  joel: 'joel',
  amos: 'amos', am: 'amos',
  obad: 'obadiah', obadiah: 'obadiah',
  jon: 'jonah', jonah: 'jonah',
  mic: 'micah', micah: 'micah',
  nah: 'nahum', nahum: 'nahum',
  hab: 'habakkuk', habakkuk: 'habakkuk',
  zeph: 'zephaniah', zephaniah: 'zephaniah',
  hag: 'haggai', haggai: 'haggai',
  zech: 'zechariah', zec: 'zechariah', zechariah: 'zechariah',
  mal: 'malachi', malachi: 'malachi',
  matt: 'matthew', mt: 'matthew', matthew: 'matthew',
  mark: 'mark', mk: 'mark', mr: 'mark',
  luke: 'luke', lk: 'luke', luk: 'luke',
  john: 'john', jn: 'john', joh: 'john',
  acts: 'acts', ac: 'acts',
  rom: 'romans', romans: 'romans',
  '1cor': '1corinthians', '1corinthians': '1corinthians', '1co': '1corinthians',
  '2cor': '2corinthians', '2corinthians': '2corinthians', '2co': '2corinthians',
  gal: 'galatians', galatians: 'galatians',
  eph: 'ephesians', ephesians: 'ephesians',
  phil: 'philippians', philippians: 'philippians', php: 'philippians',
  col: 'colossians', colossians: 'colossians',
  '1thess': '1thessalonians', '1thes': '1thessalonians', '1thessalonians': '1thessalonians', '1th': '1thessalonians',
  '2thess': '2thessalonians', '2thes': '2thessalonians', '2thessalonians': '2thessalonians', '2th': '2thessalonians',
  '1tim': '1timothy', '1timothy': '1timothy', '1ti': '1timothy',
  '2tim': '2timothy', '2timothy': '2timothy', '2ti': '2timothy',
  titus: 'titus', tit: 'titus',
  philem: 'philemon', philemon: 'philemon', phm: 'philemon',
  heb: 'hebrews', hebrews: 'hebrews',
  jas: 'james', james: 'james', jam: 'james',
  '1pet': '1peter', '1peter': '1peter', '1pe': '1peter',
  '2pet': '2peter', '2peter': '2peter', '2pe': '2peter',
  '1john': '1john', '1jn': '1john', '1jo': '1john',
  '2john': '2john', '2jn': '2john', '2jo': '2john',
  '3john': '3john', '3jn': '3john', '3jo': '3john',
  jude: 'jude',
  rev: 'revelation', revelation: 'revelation', re: 'revelation',
}

// Matches: "John 3:16", "1 Cor. 13:1-3", "Rom. 8", "Ps. 23:1", "1Pet 1:5", "Heb 11:6", "Gen 1:1—2:3"
const REF_RE = /\b(\d?\s?[A-Z][a-z]+\.?)\s+(\d+)(?::(\d+(?:[-\u2013\u2014]\d+)?))?/g

function resolveBook(raw: string): string | null {
  const key = raw.toLowerCase().replace(/[\s.]+/g, '')
  return BOOK_ALIASES[key] || null
}

function linkifyScripture(text: string, key = ''): React.ReactNode {
  if (!text) return text
  const out: React.ReactNode[] = []
  let cursor = 0
  let m: RegExpExecArray | null
  let k = 0
  REF_RE.lastIndex = 0
  while ((m = REF_RE.exec(text)) !== null) {
    const [full, bookRaw, chapter, verse] = m
    const slug = resolveBook(bookRaw)
    if (!slug) continue
    if (m.index > cursor) out.push(text.slice(cursor, m.index))
    const display = verse ? `${bookRaw} ${chapter}:${verse}` : `${bookRaw} ${chapter}`
    out.push(
      <Link
        key={`${key}-${k++}`}
        href={`/hymnal/bible/kjv/${slug}/${chapter}`}
        className="scripture-link"
        prefetch={false}
      >
        {display}
      </Link>
    )
    cursor = m.index + full.length
  }
  if (cursor === 0) return text
  if (cursor < text.length) out.push(text.slice(cursor))
  return <>{out}</>
}

const TYPE_ORDER = ['creed', 'confession', 'catechism', 'declaration', 'other']

function typeRank(t: string | undefined): number {
  const i = TYPE_ORDER.indexOf((t || 'other').toLowerCase())
  return i < 0 ? TYPE_ORDER.length : i
}

function sortedDocs(docs: ConfessionDocument[]): ConfessionDocument[] {
  return [...docs].sort((a, b) => {
    const r = typeRank(a.type) - typeRank(b.type)
    if (r !== 0) return r
    const ay = a.year ?? 9999
    const by = b.year ?? 9999
    if (ay !== by) return ay - by
    return a.title.localeCompare(b.title)
  })
}

const PAGINATE_THRESHOLD = 3
const CHAPTER_MAX_ENTRIES = 8
const CHAPTER_MAX_CHARS = 9000
const ENTRY_MAX_CHARS = 6000

type RuntimeEntry = ConfessionEntry & {
  _continuation?: boolean
  _hasMore?: boolean
  _origIdx: number
}

type VirtualChapter = {
  title?: string
  number?: string | number
  entries: RuntimeEntry[]
  origGroupIdx: number
  partLabel?: string
}

function entryLen(e: ConfessionEntry): number {
  return (e.question?.length || 0) + (e.answer?.length || 0)
}

function chunkAnswer(text: string, max: number): string[] {
  if (text.length <= max) return [text]
  const paras = text.split(/\n\s*\n/)
  const out: string[] = []
  let buf = ''
  for (const p of paras) {
    if (buf && buf.length + p.length + 2 > max) {
      out.push(buf)
      buf = p
    } else {
      buf = buf ? buf + '\n\n' + p : p
    }
  }
  if (buf) out.push(buf)
  const final: string[] = []
  for (const c of out) {
    if (c.length <= max * 1.4) { final.push(c); continue }
    const sentences = c.split(/(?<=[.!?])\s+/)
    let sb = ''
    for (const s of sentences) {
      if (sb && sb.length + s.length + 1 > max) {
        final.push(sb); sb = s
      } else {
        sb = sb ? sb + ' ' + s : s
      }
    }
    if (sb) final.push(sb)
  }
  return final.length ? final : [text]
}

function expandEntries(entries: ConfessionEntry[]): RuntimeEntry[] {
  const out: RuntimeEntry[] = []
  entries.forEach((e, origIdx) => {
    const a = e.answer || ''
    if (a.length <= ENTRY_MAX_CHARS) {
      out.push({ ...e, _origIdx: origIdx })
      return
    }
    const chunks = chunkAnswer(a, ENTRY_MAX_CHARS)
    chunks.forEach((c, i) => {
      const isFirst = i === 0
      const isLast = i === chunks.length - 1
      out.push({
        ...e,
        label: isFirst ? e.label : undefined,
        question: isFirst ? e.question : undefined,
        answer: c,
        proofs: isLast ? e.proofs : undefined,
        _continuation: !isFirst,
        _hasMore: !isLast,
        _origIdx: origIdx,
      })
    })
  })
  return out
}

function buildVirtualChapters(groups: ConfessionGroup[] | undefined): VirtualChapter[] {
  if (!groups || groups.length === 0) return []
  const out: VirtualChapter[] = []
  groups.forEach((g, gi) => {
    const expanded = expandEntries(g.entries || [])
    const total = expanded.reduce((s, e) => s + entryLen(e), 0)
    if (expanded.length <= CHAPTER_MAX_ENTRIES && total <= CHAPTER_MAX_CHARS) {
      out.push({
        title: g.title,
        number: g.number ?? undefined,
        entries: expanded,
        origGroupIdx: gi,
      })
      return
    }
    const parts: RuntimeEntry[][] = []
    let cur: RuntimeEntry[] = []
    let chars = 0
    for (const e of expanded) {
      const eChars = entryLen(e)
      if (cur.length > 0 && (cur.length >= CHAPTER_MAX_ENTRIES || chars + eChars > CHAPTER_MAX_CHARS)) {
        parts.push(cur)
        cur = []
        chars = 0
      }
      cur.push(e)
      chars += eChars
    }
    if (cur.length) parts.push(cur)
    parts.forEach((p, pi) => {
      const totalParts = parts.length
      const partLabel = totalParts > 1 ? ` (Part ${pi + 1} of ${totalParts})` : ''
      out.push({
        title: g.title ? `${g.title}${partLabel}` : (totalParts > 1 ? `Part ${pi + 1} of ${totalParts}` : undefined),
        number: g.number ?? undefined,
        entries: p,
        origGroupIdx: gi,
        partLabel: totalParts > 1 ? `${pi + 1}/${totalParts}` : undefined,
      })
    })
  })
  return out
}

export default function CreedReader({ id }: { id: string }) {
  const router = useRouter()
  const [doc, setDoc] = useState<ConfessionDocument | null>(null)
  const [prev, setPrev] = useState<ConfessionDocument | null>(null)
  const [next, setNext] = useState<ConfessionDocument | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [activeChapter, setActiveChapter] = useState(0)
  const [quizOpen, setQuizOpen] = useState(false)

  const textScale = useHymnalStore((s) => s.textScale)
  const isFav = useHymnalStore((s) => s.isConfessionFavorite({ id }))
  const toggleFav = useHymnalStore((s) => s.toggleConfessionFavorite)
  const isEntryFav = useHymnalStore((s) => s.isConfessionEntryBookmarked)
  const toggleEntryFav = useHymnalStore((s) => s.toggleConfessionEntryBookmark)

  useEffect(() => {
    let alive = true
    loadConfessions()
      .then((d) => {
        if (!alive) return
        const ordered = sortedDocs(d.documents)
        const idx = ordered.findIndex((x) => x.id === id)
        if (idx < 0) { setErr('Document not found'); return }
        setDoc(ordered[idx])
        setPrev(idx > 0 ? ordered[idx - 1] : null)
        setNext(idx < ordered.length - 1 ? ordered[idx + 1] : null)
      })
      .catch((e) => { if (alive) setErr(e.message) })
    return () => { alive = false }
  }, [id])

  useEffect(() => { setActiveChapter(0); setQuizOpen(false) }, [id])

  const isCatechism = (doc?.type || '').toLowerCase() === 'catechism'
  const quizEntries = useMemo<ConfessionEntry[]>(() => {
    if (!doc?.groups) return []
    const out: ConfessionEntry[] = []
    for (const g of doc.groups) {
      for (const e of g.entries || []) {
        const q = (e.question || e.label || '').trim()
        const a = (e.answer || '').trim()
        if (q && a && a.length >= 25) out.push({ ...e, question: q, answer: a })
      }
    }
    return out
  }, [doc])

  const baseSize = useMemo(() => `${Math.round(18 * textScale)}px`, [textScale])
  const chapters = useMemo(() => buildVirtualChapters(doc?.groups ?? undefined), [doc])
  const paginated = chapters.length > PAGINATE_THRESHOLD
  const totalChapters = chapters.length
  const chapterIdx = Math.min(Math.max(0, activeChapter), Math.max(0, totalChapters - 1))

  if (err) return <div className="hymnal-empty">{err}</div>
  if (!doc) return <div className="hymnal-empty">Loading&hellip;</div>

  const chromeLabel = (doc.type || 'CREED').toUpperCase()

  return (
    <article>
      <div className="detail-chrome">
        <button className="back-btn" onClick={() => router.push('/hymnal/creeds')} aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="label">{chromeLabel}{doc.year ? `  \u00B7  ${doc.year}` : ''}</div>
        <div className="actions">
          {isCatechism && quizEntries.length > 0 && (
            <button
              onClick={() => setQuizOpen((v) => !v)}
              aria-label={quizOpen ? 'Exit quiz' : 'Start quiz'}
              className={quizOpen ? 'quiz-btn on' : 'quiz-btn'}
              title={quizOpen ? 'Exit quiz' : 'Start quiz'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </button>
          )}
          <button onClick={() => toggleFav({ id })} aria-label={isFav ? 'Remove favorite' : 'Add favorite'} className={isFav ? 'fav-heart on' : 'fav-heart'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="creed-pager top" aria-label="Document navigation">
        <button
          type="button"
          className="creed-pager-btn"
          onClick={() => prev && router.push(`/hymnal/creeds/${prev.id}`)}
          disabled={!prev}
          aria-label={prev ? `Previous: ${prev.title}` : 'No previous'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="lbl">{prev ? prev.title : '\u2014'}</span>
        </button>
        <button
          type="button"
          className="creed-pager-btn right"
          onClick={() => next && router.push(`/hymnal/creeds/${next.id}`)}
          disabled={!next}
          aria-label={next ? `Next: ${next.title}` : 'No next'}
        >
          <span className="lbl">{next ? next.title : '\u2014'}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </nav>

      <header style={{ textAlign: 'center', padding: '4px 0 22px' }}>
        <h1 className="hymnal-h1" style={{ margin: '0 0 6px' }}>{doc.title}</h1>
        {(doc.authors && doc.authors.length > 0) && (
          <div className="creed-head-meta">By {doc.authors.join(', ')}</div>
        )}
        {(doc.alternativeTitles && doc.alternativeTitles.length > 0) && (
          <div className="creed-head-meta"><span className="alt">Also known as: {doc.alternativeTitles.join('; ')}</span></div>
        )}
        {doc.tradition && (
          <div style={{ fontFamily: 'var(--serif)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--nxr-ink-mute)', marginTop: 12 }}>
            {doc.tradition}
          </div>
        )}
      </header>

      {quizOpen && isCatechism && (
        <QuizPanel entries={quizEntries} onExit={() => setQuizOpen(false)} />
      )}

      {!quizOpen && paginated && (
        <div className="creed-chapter-strip" role="tablist" aria-label="Chapters">
          {chapters.map((c, ci) => {
            const baseNum = c.number != null ? String(c.number) : String(c.origGroupIdx + 1)
            const num = c.partLabel ? `${baseNum}.${c.partLabel.split('/')[0]}` : baseNum
            const title = c.title || ''
            const on = ci === chapterIdx
            return (
              <button
                key={ci}
                type="button"
                role="tab"
                aria-selected={on}
                className={on ? 'chip on' : 'chip'}
                onClick={() => setActiveChapter(ci)}
                title={title || `Chapter ${num}`}
              >
                <em>{num}</em>
                {title && <span className="t">{title}</span>}
              </button>
            )
          })}
        </div>
      )}

      {!quizOpen && (
        <div className="creed-prose" style={{ fontSize: baseSize }}>
          {chapters.length > 0 ? (
            paginated ? (
              <Group
                key={chapterIdx}
                docId={doc.id}
                group={{
                  title: chapters[chapterIdx].title,
                  number: chapters[chapterIdx].number,
                  entries: chapters[chapterIdx].entries,
                }}
                groupIndex={chapters[chapterIdx].origGroupIdx}
                isBmk={isEntryFav}
                toggleBmk={toggleEntryFav}
              />
            ) : (
              chapters.map((c, ci) => (
                <Group
                  key={ci}
                  docId={doc.id}
                  group={{ title: c.title, number: c.number, entries: c.entries }}
                  groupIndex={c.origGroupIdx}
                  isBmk={isEntryFav}
                  toggleBmk={toggleEntryFav}
                />
              ))
            )
          ) : doc.content ? (
            <div className="creed-body-text">{linkifyScripture(doc.content, 'content')}</div>
          ) : null}
        </div>
      )}

      {!quizOpen && paginated && (
        <nav className="creed-chapter-nav" aria-label="Chapter navigation">
          <button
            type="button"
            className="creed-pager-btn"
            onClick={() => setActiveChapter((i) => Math.max(0, i - 1))}
            disabled={chapterIdx === 0}
            aria-label="Previous chapter"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="lbl">Prev chapter</span>
          </button>
          <span className="creed-chapter-mark">
            Chapter {chapterIdx + 1} of {totalChapters}
          </span>
          <button
            type="button"
            className="creed-pager-btn right"
            onClick={() => setActiveChapter((i) => Math.min(totalChapters - 1, i + 1))}
            disabled={chapterIdx >= totalChapters - 1}
            aria-label="Next chapter"
          >
            <span className="lbl">Next chapter</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </nav>
      )}

      <nav className="creed-pager bottom" aria-label="Document navigation">
        <button
          type="button"
          className="creed-pager-btn"
          onClick={() => prev && router.push(`/hymnal/creeds/${prev.id}`)}
          disabled={!prev}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="lbl">{prev ? prev.title : '\u2014'}</span>
        </button>
        <button
          type="button"
          className="creed-pager-btn right"
          onClick={() => next && router.push(`/hymnal/creeds/${next.id}`)}
          disabled={!next}
        >
          <span className="lbl">{next ? next.title : '\u2014'}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </nav>
    </article>
  )
}

function Group({
  docId,
  group,
  groupIndex,
  isBmk,
  toggleBmk,
}: {
  docId: string
  group: { title?: string; number?: string | number; entries: RuntimeEntry[] | ConfessionEntry[] }
  groupIndex: number
  isBmk: (ref: { docId: string; key: string }) => boolean
  toggleBmk: (ref: { docId: string; key: string }) => void
}) {
  const entries = group.entries as RuntimeEntry[]
  return (
    <section style={{ marginBottom: 28 }}>
      {(group.title || group.number != null) && (
        <h2 className="creed-section-num">
          {group.number != null && <em>{String(group.number)}</em>}
          {group.title}
        </h2>
      )}
      {entries.map((e, ei) => {
        const realIdx = e._origIdx ?? ei
        const isCont = !!e._continuation
        return (
          <Card
            key={ei}
            entry={e}
            bookmarked={isBmk({ docId, key: `${groupIndex}.${realIdx}` })}
            onToggle={() => toggleBmk({ docId, key: `${groupIndex}.${realIdx}` })}
            isContinuation={isCont}
          />
        )
      })}
    </section>
  )
}

function renderProofs(proofs: unknown): string | null {
  if (proofs == null) return null
  if (typeof proofs === 'string') return proofs.trim() || null
  if (!Array.isArray(proofs)) return null
  const parts: string[] = []
  for (const p of proofs) {
    if (p == null) continue
    if (typeof p === 'string') { if (p.trim()) parts.push(p.trim()); continue }
    if (typeof p === 'object') {
      const obj = p as Record<string, unknown>
      const refs = obj.refs
      if (Array.isArray(refs)) {
        for (const r of refs) {
          if (r && typeof r === 'object') {
            const rec = r as Record<string, unknown>
            const d = rec.display ?? rec.osis
            if (typeof d === 'string' && d.trim()) parts.push(d.trim())
          } else if (typeof r === 'string' && r.trim()) {
            parts.push(r.trim())
          }
        }
      } else if (typeof obj.display === 'string' && obj.display.trim()) {
        parts.push(obj.display.trim())
      } else if (typeof obj.reference === 'string' && obj.reference.trim()) {
        parts.push(obj.reference.trim())
      }
    }
  }
  return parts.length ? parts.join(', ') : null
}

function Card({
  entry,
  bookmarked,
  onToggle,
  isContinuation = false,
}: {
  entry: ConfessionEntry
  bookmarked: boolean
  onToggle: () => void
  isContinuation?: boolean
}) {
  const hasQ = !!(entry.question && entry.question.length > 0)
  const hasA = !!(entry.answer && entry.answer.length > 0)
  const proofsText = renderProofs(entry.proofs)
  return (
    <div className={isContinuation ? 'creed-card creed-card-cont' : 'creed-card'}>
      <div>
        {entry.label && <div className="label-l">{entry.label}</div>}
        {hasQ && <div className="qt">{linkifyScripture(entry.question || '', 'q')}</div>}
        {hasA && <div className="at">{linkifyScripture(entry.answer || '', 'a')}</div>}
        {proofsText && <div className="pf">{linkifyScripture(proofsText, 'pf')}</div>}
      </div>
      {!isContinuation && (
        <button className={bookmarked ? 'bmk on' : 'bmk'} onClick={onToggle} aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}
    </div>
  )
}

function shuffleArr<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function QuizPanel({ entries, onExit }: { entries: ConfessionEntry[]; onExit: () => void }) {
  const [shuffle, setShuffle] = useState(false)
  const [order, setOrder] = useState<number[]>(() => entries.map((_, i) => i))
  const [pos, setPos] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [missed, setMissed] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const base = entries.map((_, i) => i)
    setOrder(shuffle ? shuffleArr(base) : base)
    setPos(0); setRevealed(false); setCorrect(0); setMissed(0); setDone(false)
  }, [shuffle, entries])

  const total = order.length
  const entry = total > 0 ? entries[order[pos]] : null
  const answered = correct + missed

  const advance = (mark: 'correct' | 'missed' | 'skip') => {
    if (mark === 'correct') setCorrect((n) => n + 1)
    else if (mark === 'missed') setMissed((n) => n + 1)
    if (pos + 1 >= total) { setDone(true); return }
    setPos((p) => p + 1)
    setRevealed(false)
  }

  const restart = () => {
    const base = entries.map((_, i) => i)
    setOrder(shuffle ? shuffleArr(base) : base)
    setPos(0); setRevealed(false); setCorrect(0); setMissed(0); setDone(false)
  }

  if (!entry) {
    return (
      <div className="quiz-panel">
        <div className="quiz-empty">No question/answer entries available.</div>
        <button type="button" className="quiz-exit" onClick={onExit}>Exit quiz</button>
      </div>
    )
  }

  if (done) {
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0
    return (
      <div className="quiz-panel">
        <div className="quiz-header">
          <span className="quiz-mark">Quiz complete</span>
          <button type="button" className="quiz-exit" onClick={onExit} aria-label="Exit quiz">Exit</button>
        </div>
        <div className="quiz-summary">
          <div className="score">{correct} / {total}</div>
          <div className="pct">{pct}% correct</div>
          <div className="meta">{missed} missed</div>
        </div>
        <div className="quiz-acts">
          <button type="button" className="qbtn primary" onClick={restart}>Restart</button>
          <button type="button" className="qbtn" onClick={onExit}>Back to text</button>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-panel">
      <div className="quiz-header">
        <span className="quiz-mark">Question {pos + 1} of {total}</span>
        <div className="quiz-meta">
          <label className="quiz-shuffle">
            <input type="checkbox" checked={shuffle} onChange={(e) => setShuffle(e.target.checked)} />
            Shuffle
          </label>
          <span className="quiz-score">{correct}/{answered}</span>
          <button type="button" className="quiz-exit" onClick={onExit} aria-label="Exit quiz">Exit</button>
        </div>
      </div>

      {entry.label && <div className="quiz-label">{entry.label}</div>}
      <div className="quiz-q">{entry.question}</div>

      {revealed ? (
        <>
          <div className="quiz-a">{entry.answer}</div>
          <div className="quiz-acts">
            <button type="button" className="qbtn miss" onClick={() => advance('missed')}>Missed it</button>
            <button type="button" className="qbtn primary" onClick={() => advance('correct')}>Got it</button>
          </div>
        </>
      ) : (
        <div className="quiz-acts">
          <button type="button" className="qbtn" onClick={() => advance('skip')}>Skip</button>
          <button type="button" className="qbtn primary" onClick={() => setRevealed(true)}>Show answer</button>
        </div>
      )}
    </div>
  )
}
