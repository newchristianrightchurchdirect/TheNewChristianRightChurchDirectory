import InstallClient from '@/components/hymnal/InstallClient'
import '../hymnal.css'

export const metadata = { title: 'Install' }

export default function InstallPage() {
  return (
    <div className="hymnal-shell">
      <div className="hymnal-page" style={{ maxWidth: 720 }}>
        <InstallClient />
      </div>
    </div>
  )
}
