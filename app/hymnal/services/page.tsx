import ServicesIndex from '@/components/hymnal/ServicesIndex'
import { Footer } from '@/components/hymnal/Ornament'

export const metadata = { title: 'Order of Service' }

export default function ServicesPage() {
  return (
    <div>
      <section className="hymnal-hero">
        <div className="hymnal-eyebrow">For the Lord&rsquo;s Day</div>
        <h1 className="hymnal-h1">Service <em>Builder</em></h1>
        <p className="hymnal-dek">string hymns into an order</p>
      </section>

      <ServicesIndex />

      <Footer />
    </div>
  )
}
