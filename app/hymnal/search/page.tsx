import HymnalSearch from '@/components/hymnal/HymnalSearch'

export const metadata = { title: 'Search' }

export default function SearchPage() {
  return (
    <div>
      <header className="hymnal-section-head">
        <div className="hymnal-eyebrow">Find Anything</div>
        <h1 className="hymnal-h1"><em>Search</em></h1>
        <p className="hymnal-dek">Across every hymnal, every translation, and every confession at once.</p>
      </header>
      <HymnalSearch />
    </div>
  )
}
