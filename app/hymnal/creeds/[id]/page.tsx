import Link from 'next/link'
import CreedReader from '@/components/hymnal/CreedReader'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params
  return { title: id }
}

export default async function CreedPage({ params }: { params: Params }) {
  const { id } = await params
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Link href="/hymnal/creeds" style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
          &larr; Creeds
        </Link>
      </div>
      <CreedReader id={id} />
    </div>
  )
}
