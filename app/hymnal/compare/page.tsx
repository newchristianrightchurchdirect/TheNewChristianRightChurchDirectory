import HymnalCompare from '@/components/hymnal/HymnalCompare'

export const metadata = {
  title: 'Compare Hymnals',
  description: 'Side-by-side comparison of any two hymnals: shared hymns, unique to each, and overlap analysis by title or tune.',
}

export default function CompareHymnalsPage() {
  return (
    <div>
      <header className="hymnal-hero">
        <div className="hymnal-eyebrow">Cross-Hymnal Analysis</div>
        <h1 className="hymnal-h1">Compare <em>Hymnals</em></h1>
        <p className="hymnal-dek">Overlap and differences between two volumes.</p>
      </header>
      <HymnalCompare />
    </div>
  )
}
