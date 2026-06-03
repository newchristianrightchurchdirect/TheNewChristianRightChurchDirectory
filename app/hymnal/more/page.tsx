import Link from 'next/link'
import MoreSettings from '@/components/hymnal/MoreSettings'

export const metadata = { title: 'More' }

export default function MorePage() {
  return (
    <div>
      <header className="hymnal-section-head">
        <div className="hymnal-eyebrow">Settings &amp; About</div>
        <h1 className="hymnal-h1"><em>More</em></h1>
      </header>
      <MoreSettings />
      <div style={{ marginTop: 32, borderTop: '1px solid var(--rule)', paddingTop: 20 }}>
        <h2 className="hymnal-eyebrow" style={{ marginBottom: 10 }}>About</h2>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.55, color: 'var(--ink-soft)', marginBottom: 12 }}>
          NXR Hymnal is a Reformed worship companion: six bundled psalters and hymnals, five Bible translations, and forty-two creeds and confessions, all available offline once installed.
        </p>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.55, color: 'var(--ink-soft)' }}>
          Part of <Link href="/" style={{ color: 'var(--brass-deep)' }}>The New Christian Right Church Directory</Link>.
        </p>
        <div style={{ marginTop: 16 }}>
          <Link href="/install" className="install-cta">Install to Home Screen</Link>
        </div>
      </div>
    </div>
  )
}
