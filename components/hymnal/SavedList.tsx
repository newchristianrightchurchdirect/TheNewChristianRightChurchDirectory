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

  const empty =
    favHymns.length === 0 && bookmarks.length === 0 && favConf.length === 0

  if (empty) {
    return (
      <div className="hymnal-empty">
        No saved items yet. Tap the star on any hymn, chapter, or creed to save it here.
      </div>
    )
  }

  return (
    <div>
      {favHymns.length > 0 && (
        <section style={{ marginBottom: 28 }}>
          <h2 className="hymnal-eyebrow" style={{ marginBottom: 8 }}>Favorite Hymns</h2>
          <div className="hymn-list">
            {favHymns.map((r, i) => {
              const h = findHymnal(r.hymnal)
              return (
                <div key={i} className="hymn-row">
                  <span className="num">{r.number}</span>
                  <Link className="ttl" href={`/hymnal/library/${r.hymnal}/${r.number}`}>
                    {h?.title || r.hymnal}
                    <span className="firstline">#{r.number}</span>
                  </Link>
                  <button className="fav on" onClick={() => toggleHymn(r)} aria-label="Remove">{'\u2605'}</button>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {bookmarks.length > 0 && (
        <section style={{ marginBottom: 28 }}>
          <h2 className="hymnal-eyebrow" style={{ marginBottom: 8 }}>Bookmarked Chapters</h2>
          <div className="hymn-list">
            {bookmarks.map((r, i) => {
              const b = findBible(r.translation)
              return (
                <div key={i} className="hymn-row">
                  <span className="num">{(b?.short || r.translation).toUpperCase()}</span>
                  <Link className="ttl" href={`/hymnal/bible/${r.translation}/${r.book}/${r.chapter}`}>
                    {r.book.toUpperCase()} {r.chapter}
                  </Link>
                  <button className="fav on" onClick={() => toggleChapter(r)} aria-label="Remove">{'\u2605'}</button>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {favConf.length > 0 && (
        <section style={{ marginBottom: 28 }}>
          <h2 className="hymnal-eyebrow" style={{ marginBottom: 8 }}>Favorite Creeds &amp; Confessions</h2>
          <div className="hymn-list">
            {favConf.map((r, i) => (
              <div key={i} className="hymn-row">
                <span className="num">&mdash;</span>
                <Link className="ttl" href={`/hymnal/creeds/${r.id}`}>{r.id}</Link>
                <button className="fav on" onClick={() => toggleConf(r)} aria-label="Remove">{'\u2605'}</button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
