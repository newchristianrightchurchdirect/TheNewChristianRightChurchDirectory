import ServicesIndex from '@/components/hymnal/ServicesIndex'

export const metadata = { title: 'Order of Service' }

export default function ServicesPage() {
  return (
    <div>
      <header className="hymnal-section-head">
        <div className="hymnal-eyebrow">Worship Planning</div>
        <h1 className="hymnal-h1">Order of <em>Service</em></h1>
        <p className="hymnal-dek">Compose and reorder hymns, scripture readings, and creeds for the Lord&rsquo;s Day.</p>
      </header>
      <ServicesIndex />
    </div>
  )
}
