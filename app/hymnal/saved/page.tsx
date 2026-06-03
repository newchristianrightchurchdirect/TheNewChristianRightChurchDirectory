import SavedList from '@/components/hymnal/SavedList'

export const metadata = { title: 'Saved' }

export default function SavedPage() {
  return (
    <div>
      <header className="hymnal-section-head">
        <div className="hymnal-eyebrow">Your Library</div>
        <h1 className="hymnal-h1">Saved &amp; <em>Bookmarked</em></h1>
      </header>
      <SavedList />
    </div>
  )
}
