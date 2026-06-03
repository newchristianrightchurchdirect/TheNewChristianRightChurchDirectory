'use client'

import Link from 'next/link'
import { useHymnalStore } from '@/store/hymnal'
import { findHymnal, findBible } from '@/lib/hymnal/sources'

export default function SavedList() {
  const favHymns = useHymnalStore((s) => s.favoriteHymns)
  const bookmarks = useHymnalStore((s) => s.bookmarkedChapters)
  const favConf = useHymnalStore((s) => s.favoriteConfessions)
  const toggleHymn = useHymnalStore((s) => s.toggleHymnFavorite)
  const toggleChapter = useHymnalStore((s) => s.toggleChapterBookmark)
  const toggleConf = useHymnalStore((s) => s.toggleConfessionFavorite)

  const total = favHymns.length + bookmarks.length + favConf.length

  if (total === 0) {
    return (
      <>
        <div className="hymnal-hero-meta" style={{ marginTop: 0 }}>
          <span>A Personal Index</span>
          <span>0 Entries</span>
        </div>
        <div className="hymnal-empty" style={{ marginTop: 24 }}>
          No saved items yet. Tap the heart on any hymn, chapter, or creed to keep it here.
        </div>
      </>
    )
  }

  return (
    <div>
      <div className="hymnal-hero-meta" style={{ marginTop: 0 }}>
        <span>A Personal Index</span>
        <span>{total} {total === 1 ? 'Entry' : 'Entries'}</span>
      </div>

      {favHymns.length > 0 && (
        <section>
          <div className="hymnal-section-head" style={{ marginTop: 14 }}>
            <span>Hymns</span>
            <span className="right">{favHymns.length}</span>
          </div>
          <div className="entry-list">
            {favHymns.map((r, i) => {
              const h = findHymnal(r.hymnal)
              return (
                <div key={i} className="entry-row">
                  <span className="n">{r.number}</span>
                  <Link className="body" href={`/hymnal/library/${r.hymnal}/${r.number}`} style={{ color: 'inherit' }}>
                    <span className="ttl">{h?.title || r.hymnal}</span>
                    <span className="meta">
                      {h?.short || r.hymnal.toUpperCase()}
                    </span>
                  </Link>
                  <button
                    className="fav"
                    aria-label="Remove favorite"
                    onClick={() => toggleHymn(r)}
                  >&hearts;</button>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {bookmarks.length > 0 && (
        <section>
          <div className="hymnal-section-head" style={{ marginTop: 14 }}>
            <span>Scripture</span>
            <span className="right">{bookmarks.length}</span>
          </div>
          <div className="entry-list">
            {bookmarks.map((r, i) => {
              const b = findBible(r.translation)
              return (
                <div key={i} className="entry-row">
                  <span className="n">{r.chapter}</span>
                  <Link className="body" href={`/hymnal/bible/${r.translation}/${r.book}/${r.chapter}`} style={{ color: 'inherit' }}>
                    <span className="ttl">{r.book.toUpperCase()} {r.chapter}</span>
                    <span className="meta">{(b?.short || r.translation).toUpperCase()}</span>
                  </Link>
                  <button className="fav" aria-label="Remove bookmark" onClick={() => toggleChapter(r)}>&hearts;</button>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {favConf.length > 0 && (
        <section>
          <div className="hymnal-section-head" style={{ marginTop: 14 }}>
            <span>Creeds &amp; Confessions</span>
            <span className="right">{favConf.length}</span>
          </div>
          <div className="entry-list">
            {favConf.map((r, i) => (
              <div key={i} className="entry-row">
                <span className="n">&mdash;</span>
                <Link className="body" href={`/hymnal/creeds/${r.id}`} style={{ color: 'inherit' }}>
                  <span className="ttl">{r.id}</span>
                  <span className="meta">Confessional</span>
                </Link>
                <button className="fav" aria-label="Remove favorite" onClick={() => toggleConf(r)}>&hearts;</button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
