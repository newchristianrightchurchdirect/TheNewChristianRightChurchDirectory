import { notFound } from 'next/navigation'
import Link from 'next/link'
import { findBible } from '@/lib/hymnal/sources'
import BibleChapter from '@/components/hymnal/BibleChapter'

type Params = Promise<{ translation: string; book: string; chapter: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { translation, book, chapter } = await params
  const src = findBible(translation)
  return { title: src ? `${book.toUpperCase()} ${chapter} \u00B7 ${src.short}` : 'Bible' }
}

export default async function BibleChapterPage({ params }: { params: Params }) {
  const { translation, book, chapter } = await params
  const n = Number(chapter)
  const src = findBible(translation)
  if (!src || !Number.isFinite(n)) return notFound()

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Link href={`/hymnal/bible/${translation}/${book}`} style={{ fontFamily: 'var(--serif)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--nxr-ink-mute)' }}>
          &larr; {book.toUpperCase()}
        </Link>
      </div>
      <BibleChapter translation={translation} book={book} chapter={n} />
    </div>
  )
}
