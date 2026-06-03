import CreedsToc from '@/components/hymnal/CreedsToc'
import { Footer } from '@/components/hymnal/Ornament'

export const metadata = { title: 'Creeds & Confessions' }

export default function CreedsHome() {
  return (
    <div>
      <section className="hymnal-hero">
        <div className="hymnal-eyebrow">Symbola Fidei</div>
        <h1 className="hymnal-h1">Creeds &amp; <em>Confessions</em></h1>
        <p className="hymnal-dek">the historic faith, plainly stated</p>
      </section>

      <CreedsToc />

      <Footer quote={<>&ldquo;Hold fast the form of sound words.&rdquo; &mdash; II Tim.&nbsp;i.&nbsp;13</>} />
    </div>
  )
}
