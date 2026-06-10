import { notFound } from 'next/navigation'
import { findHymnal } from '@/lib/hymnal/sources'
import HymnDetail from '@/components/hymnal/HymnDetail'

type Params = Promise<{ slug: string; number: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug, number } = await params
  const src = findHymnal(slug)
  if (!src) return { title: 'Hymn' }
  const decodedNumber = decodeURIComponent(number)
  return {
    title: `Hymn #${decodedNumber} \u00B7 ${src.short}`,
    description: `Hymn No. ${decodedNumber} from ${src.title}${src.year ? ` (${src.year})` : ''}.`,
  }
}

export default async function HymnDetailPage({ params }: { params: Params }) {
  const { slug, number } = await params
  const src = findHymnal(slug)
  if (!src || !number) return notFound()

  return <HymnDetail slug={slug} number={decodeURIComponent(number)} />
}
