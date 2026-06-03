import { notFound } from 'next/navigation'
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
  return <BibleBookToc translation={translation} book={book} />
}
