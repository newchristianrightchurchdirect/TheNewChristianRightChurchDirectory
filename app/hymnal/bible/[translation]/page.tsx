import { notFound } from 'next/navigation'
import { findBible } from '@/lib/hymnal/sources'
import BibleToc from '@/components/hymnal/BibleToc'

type Params = Promise<{ translation: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { translation } = await params
  const src = findBible(translation)
  return { title: src ? src.short : 'Bible' }
}

export default async function BibleTranslationPage({ params }: { params: Params }) {
  const { translation } = await params
  const src = findBible(translation)
  if (!src) return notFound()

  return (
    <div>
      <header className="hymnal-section-head">
        <div className="hymnal-eyebrow">{src.short}</div>
        <h1 className="hymnal-h1">{src.title}</h1>
      </header>
      <BibleToc translation={translation} />
    </div>
  )
}
