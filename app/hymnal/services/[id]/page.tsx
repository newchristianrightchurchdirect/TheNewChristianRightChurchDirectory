import Link from 'next/link'
import ServiceEditor from '@/components/hymnal/ServiceEditor'

type Params = Promise<{ id: string }>

export default async function ServiceEditorPage({ params }: { params: Params }) {
  const { id } = await params
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Link href="/hymnal/services" style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-mute)' }}>
          &larr; Services
        </Link>
      </div>
      <ServiceEditor id={id} />
    </div>
  )
}
