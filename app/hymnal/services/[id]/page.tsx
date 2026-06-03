import Link from 'next/link'
import ServiceEditor from '@/components/hymnal/ServiceEditor'

type Params = Promise<{ id: string }>

export default async function ServiceEditorPage({ params }: { params: Params }) {
  const { id } = await params
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Link href="/hymnal/services" style={{ fontFamily: 'var(--serif)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--nxr-ink-mute)' }}>
          &larr; Services
        </Link>
      </div>
      <ServiceEditor id={id} />
    </div>
  )
}
