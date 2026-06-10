import InstallClient from '@/components/hymnal/InstallClient'
import HymnalChrome from '@/components/hymnal/HymnalChrome'
import BackBar from '@/components/hymnal/BackBar'
import '../hymnal.css'

export const metadata = { title: 'Install' }

export default function InstallPage() {
  return (
    <HymnalChrome>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <BackBar />
        <InstallClient />
      </div>
    </HymnalChrome>
  )
}
