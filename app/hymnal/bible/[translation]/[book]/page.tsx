import { notFound } from 'next/navigation'
import Link from 'next/link'
import { findBible } from '@/lib/hymnal/sources'
import BibleBookToc from '@/components/hymnal/BibleBookToc'

type Params = Promise<{ translation: string; book: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { translation, book } = await params
  const src = findBible(translation)
  return { title: src ? `${book.toUpperCase()} \u00B7 ${src.short}` : 'Bible' }
}

export default async function BibleBookPage({ params }: { params: Params }) {
  const { translation, book } = await params
  const src = findBible(translation)
  if (!src) return notFound()

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Link href={`/hymnal/bible/${translation}`} style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
          &larr; {src.short}
        </Link>
      </div>
      <BibleBookToc translation={translation} book={book} />
    </div>
  )
}
