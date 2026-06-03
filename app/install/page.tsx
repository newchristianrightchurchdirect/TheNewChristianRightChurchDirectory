import InstallClient from '@/components/hymnal/InstallClient'

export const metadata = { title: 'Install' }

export default function InstallPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 96px', fontFamily: 'var(--serif)' }}>
      <InstallClient />
    </div>
  )
}
