import SavedList from '@/components/hymnal/SavedList'
import { Footer } from '@/components/hymnal/Ornament'

export const metadata = { title: 'Saved' }

export default function SavedPage() {
  return (
    <div>
      <section className="hymnal-hero">
        <div className="hymnal-eyebrow">Bookmarked</div>
        <h1 className="hymnal-h1"><em>Favorites</em></h1>
        <p className="hymnal-dek">what your soul keeps near</p>
      </section>

      <SavedList />

      <Footer />
    </div>
  )
}
