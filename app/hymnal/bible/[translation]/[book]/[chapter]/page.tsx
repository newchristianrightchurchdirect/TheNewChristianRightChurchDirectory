import { notFound } from 'next/navigation'
import { findBible } from '@/lib/hymnal/sources'
import BibleChapter from '@/components/hymnal/BibleChapter'

type Params = Promise<{ translation: string; book: string; chapter: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { translation, book, chapter } = await params
  const src = findBible(translation)
  const title = src ? `${book.toUpperCase()} ${chapter} \u00B7 ${src.short}` : 'Bible'
  const description = src
    ? `Read ${book.toUpperCase()} chapter ${chapter} in ${src.title}.`
    : 'Read the Bible online.'
  return { title, description }
}

export default async function BibleChapterPage({ params }: { params: Params }) {
  const { translation, book, chapter } = await params
  const n = Number(chapter)
  const src = findBible(translation)
  if (!src || !Number.isFinite(n)) return notFound()
  return <BibleChapter translation={translation} book={book} chapter={n} />
}
