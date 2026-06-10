import MoreSettings from '@/components/hymnal/MoreSettings'
import { Footer } from '@/components/hymnal/Ornament'

export const metadata = { title: 'Settings' }

export default function MorePage() {
  return (
    <div>
      <section className="hymnal-hero" style={{ paddingTop: 8 }}>
        <div className="hymnal-eyebrow">House Settings</div>
        <h1 className="hymnal-h1"><em>Settings</em></h1>
      </section>

      <div className="hymnal-hero-meta" style={{ marginTop: 0 }}>
        <span>Editor&rsquo;s Preferences</span>
        <span>v. 1.4</span>
      </div>

      <MoreSettings />

      <Footer quote={<>&ldquo;Let the word of Christ dwell in you richly.&rdquo; &mdash; Col.&nbsp;3:16</>} />
    </div>
  )
}
