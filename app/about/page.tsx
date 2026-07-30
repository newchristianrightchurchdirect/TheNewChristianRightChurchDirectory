import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Mission, methodology, and editorial method behind The New Christian Right Church Directory.',
}

export const revalidate = 3600

export default async function AboutPage() {
  const [total, states, denominations, qualifying, examinedNo, unverified] = await Promise.all([
    prisma.church.count({ where: { approved: true } }),
    prisma.church.findMany({ where: { approved: true }, select: { state: true }, distinct: ['state'] }),
    prisma.church.findMany({ where: { approved: true, denomination: { not: null } }, select: { denomination: true }, distinct: ['denomination'] }),
    prisma.church.count({ where: { approved: true, culturalEngagement: 'transformationalist' } }),
    prisma.church.count({ where: { approved: true, culturalEngagement: { in: ['limited_mission', 'quietist'] } } }),
    prisma.church.count({ where: { approved: true, culturalEngagement: 'unknown' } }),
  ])

  return (
    <div className="page-wrap" style={{ maxWidth: 1100 }}>
      <section className="about-hero">
        <h1>A directory of churches that <em>contend</em>.</h1>
        <p className="lede" style={{ textAlign: 'left' }}>
          <span className="dropcap">T</span>he New Christian Right exists to identify, map, and document Bible-believing churches across America that confess Christ&apos;s lordship over more than the sanctuary — congregations that take up public questions as churches, rather than leaving the field to the individual conscience.
        </p>
        <p className="lede" style={{ textAlign: 'left', marginTop: 18 }}>
          <strong>Being listed here is not an endorsement.</strong> Of the {total.toLocaleString()} congregations
          documented, <strong>{qualifying}</strong> presently meet that standard. {examinedNo} have been
          examined and do not. The remaining {unverified.toLocaleString()} have not been researched
          closely enough to say either way. A listing means we have looked into a church — not that
          it belongs to this movement.
        </p>
      </section>

      <section className="about-pillars">
        <div className="pillar">
          <div className="pillar-num">I.</div>
          <div className="pillar-title">Identify</div>
          <div className="pillar-body">
            We catalogue congregations across all fifty states, classifying each by denomination, confessional standard, and — above all — whether the church acts corporately on the questions of the age.
          </div>
        </div>
        <div className="pillar">
          <div className="pillar-num">II.</div>
          <div className="pillar-title">Verify</div>
          <div className="pillar-body">
            Every listing is read against the church&apos;s published statement of faith, recent sermons, and — where helpful — direct correspondence with elders and pastors.
          </div>
        </div>
        <div className="pillar">
          <div className="pillar-num">III.</div>
          <div className="pillar-title">Publish</div>
          <div className="pillar-body">
            The directory is freely available, perpetually updated, and reader-supported. No advertising. No paid placements. No denominational allegiance.
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-label">&sect; Mission</div>
        <div className="about-prose">
          <h2>Why this <em>directory</em> exists.</h2>
          <p>
            For the better part of a century, American evangelicalism has been taught that the church&apos;s business stops at the church door — that the pulpit preaches, and whatever follows in law, court, and legislature is a matter for private citizens acting alone. Whole confessions of faith are held sincerely and applied nowhere.
          </p>
          <p>
            A growing number of Bible-believing congregations reject that settlement. They hold that Christ&apos;s crown rights extend over magistrates as well as members, and they act accordingly — as churches. On abortion above all, but also on the education of children, the ordering of the family, and the claims the state makes on the conscience. These churches are scattered, often small, and genuinely difficult to find.
          </p>
          <p>
            <strong>This directory makes them findable.</strong>
          </p>

          <div className="pull-quote">
            We are not building a movement. We are drawing a map of one that already exists — so those who mean to contend might find one another.
            <cite>— The Editors</cite>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="about-stat">
          <div className="about-stat-num"><em>{qualifying}</em></div>
          <div className="about-stat-label">Meet the Standard</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">{total.toLocaleString()}</div>
          <div className="about-stat-label">Congregations Documented</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">{states.length}</div>
          <div className="about-stat-label">States Represented</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">{denominations.length}</div>
          <div className="about-stat-label">Denominational Bodies</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">&infin;</div>
          <div className="about-stat-label">Cost to the Reader</div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-label">&sect; Editorial Method</div>
        <div className="about-prose">
          <h2>How a church is <em>classified</em>.</h2>
          <p>
            Classification is not assumed. Each congregation is evaluated against the following criteria, in this order:
          </p>
          <ol className="criteria-list">
            <li>
              <span className="num">I.</span>
              <span className="text">
                <strong>Published statement of faith.</strong>
                <small>Does the church confess Christ&apos;s authority over the civil sphere, or expressly limit its mission to word and sacrament?</small>
              </span>
            </li>
            <li>
              <span className="num">II.</span>
              <span className="text">
                <strong>Recent preaching.</strong>
                <small>Have the pastor&apos;s last twelve months of sermons been consistent with that confession?</small>
              </span>
            </li>
            <li>
              <span className="num">III.</span>
              <span className="text">
                <strong>Denominational affiliation.</strong>
                <small>Is the congregation a member of a confessional body — PCA, OPC, URCNA, or comparable association?</small>
              </span>
            </li>
            <li>
              <span className="num">IV.</span>
              <span className="text">
                <strong>Direct correspondence.</strong>
                <small>Where the public record is unclear, an editor writes to the church&apos;s leadership before publication.</small>
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-label">&sect; Frequently Asked</div>
        <div className="about-prose">
          <h2>Questions we are <em>asked often</em>.</h2>

          <div className="faq-item">
            <div className="faq-q"><span>Are you affiliated with a denomination?</span><span className="q-num">Q.01</span></div>
            <div className="faq-a">No. The directory is editorially independent. We list congregations across many bodies — PCA, OPC, URCNA, Reformed Baptist, independent Bible churches — without preferring one over the others.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q"><span>What does &ldquo;transformationalist&rdquo; mean here?</span><span className="q-num">Q.02</span></div>
            <div className="faq-a">That the congregation believes Christ&apos;s lordship covers law, politics, and culture, and says so <em>as a church</em> rather than leaving it to members acting privately. <strong>This is the standard, and only these {qualifying} churches meet it.</strong> A church marked <em>Limited Mission</em> holds that the institutional church should not take up such causes; a <em>Quietist</em> church treats political engagement as worldly. Many in both groups are thoroughly orthodox and entirely sincere — but they are not what this directory exists to find, and they are listed to record that they were examined, not to commend them. Zionist stance and abolition commitment are recorded as separate indicators.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q"><span>My church is listed — does that mean you endorse it?</span><span className="q-num">Q.03</span></div>
            <div className="faq-a">No. Most listings are records of research, not recommendations. A congregation is only being held up as part of this movement if it is marked <strong>Transformational</strong>. <em>Unverified</em> means exactly that — we have not yet done the work to classify it, and no judgement either way should be read into it.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q"><span>How can I correct a listing?</span><span className="q-num">Q.04</span></div>
            <div className="faq-a">Use the submission form to flag any listing that misrepresents your congregation. Editorial corrections are typically reviewed within seven days.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q"><span>Do you charge for inclusion?</span><span className="q-num">Q.05</span></div>
            <div className="faq-a">Never. The directory is free for both the listed church and the searching reader. There is no premium tier, no sponsored placement, and no advertising.</div>
          </div>
        </div>
      </section>

      <section className="about-footer-cta">
        <h3>Know a church that <em>contends</em>?</h3>
        <p>If a congregation belongs in this directory and is not yet listed, send it our way. The work belongs to the whole body.</p>
        <div className="cta-row">
          <Link href="/submit" className="btn-cta solid">Submit a Church &rarr;</Link>
          <Link href="/" className="btn-cta">Browse Directory</Link>
        </div>
      </section>
    </div>
  )
}
