'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { loadBible } from '@/lib/hymnal/loader'
import type { BibleBook } from '@/types/hymnal'

export default function BibleToc({ translation }: { translation: string }) {
  const [books, setBooks] = useState<BibleBook[] | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    loadBible(translation)
      .then((d) => { if (alive) setBooks(d.books) })
      .catch((e) => { if (alive) setErr(e.message) })
    return () => { alive = false }
  }, [translation])

  if (err) return <div className="hymnal-empty">Could not load Bible: {err}</div>
  if (!books) return <div className="hymnal-empty">Loading&hellip;</div>

  const ot = books.filter((b) => (b.testament || '').toLowerCase().startsWith('o'))
  const nt = books.filter((b) => (b.testament || '').toLowerCase().startsWith('n'))
  const other = books.filter((b) => !((b.testament || '').toLowerCase().startsWith('o') || (b.testament || '').toLowerCase().startsWith('n')))

  function Section({ title, items }: { title: string; items: BibleBook[] }) {
    if (!items.length) return null
    return (
      <>
        <h3>{title}</h3>
        {items.map((b) => (
          <Link key={b.id} href={`/hymnal/bible/${translation}/${b.id}`}>
            {b.name}
            <span className="ab">{b.abbreviation} &middot; {b.chapters.length} ch.</span>
          </Link>
        ))}
      </>
    )
  }

  return (
    <div className="bible-toc">
      <Section title="Old Testament" items={ot} />
      <Section title="New Testament" items={nt} />
      <Section title="Other" items={other} />
    </div>
  )
}
