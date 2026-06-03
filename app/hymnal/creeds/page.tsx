import CreedsToc from '@/components/hymnal/CreedsToc'

export const metadata = { title: 'Creeds & Confessions' }

export default function CreedsHome() {
  return (
    <div>
      <header className="hymnal-section-head">
        <div className="hymnal-eyebrow">Forty-two Documents</div>
        <h1 className="hymnal-h1">Creeds &amp; <em>Confessions</em></h1>
        <p className="hymnal-dek">The historic ecumenical creeds, the Reformed confessions, and catechisms.</p>
      </header>
      <CreedsToc />
    </div>
  )
}
