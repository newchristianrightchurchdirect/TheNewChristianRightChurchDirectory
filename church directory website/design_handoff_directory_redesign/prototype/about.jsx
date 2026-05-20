/* global React */

function AboutPage() {
  return (
    <div className="page-wrap" style={{ maxWidth: 1100 }}>
      <section className="about-hero">
        <h1>A directory for the <em>faithful</em>.</h1>
        <p className="lede" style={{ textAlign: "left" }}>
          <span className="dropcap">T</span>he New Christian Right exists to identify, map, and document Bible-believing churches across America that reject Christian Zionism — congregations whose theology rests on the historic Reformed and confessional tradition rather than on dispensationalist political alignments.
        </p>
      </section>

      <section className="about-pillars">
        <div className="pillar">
          <div className="pillar-num">I.</div>
          <div className="pillar-title">Identify</div>
          <div className="pillar-body">
            We catalogue congregations across all fifty states, classifying each by denomination, confessional standard, and theological stance toward Christian Zionism.
          </div>
        </div>
        <div className="pillar">
          <div className="pillar-num">II.</div>
          <div className="pillar-title">Verify</div>
          <div className="pillar-body">
            Every listing is read against the church's published statement of faith, recent sermons, and — where helpful — direct correspondence with elders and pastors.
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
        <div className="about-section-label">§ Mission</div>
        <div className="about-prose">
          <h2>Why this <em>directory</em> exists.</h2>
          <p>
            For nearly a century, large segments of American evangelicalism have been shaped by a theological framework that treats the modern political state of Israel as the focal point of biblical prophecy. That framework — generally called <strong>Christian Zionism</strong> — is widely assumed but rarely scrutinised by the people who fill its pews each Sunday.
          </p>
          <p>
            A growing number of Bible-believing congregations reject this framework. They read the Scriptures within the historic Reformed and confessional tradition, hold to covenantal hermeneutics, and refuse to confuse a political nation with the people of God. These churches are scattered, often quiet, and difficult to find.
          </p>
          <p>
            <strong>This directory makes them findable.</strong>
          </p>

          <div className="pull-quote">
            We are not building a movement. We are drawing a map of one that already exists — so the faithful might find one another.
            <cite>— The Editors</cite>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="about-stat">
          <div className="about-stat-num"><em>4,030</em></div>
          <div className="about-stat-label">Churches Indexed</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">50</div>
          <div className="about-stat-label">States Represented</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">12</div>
          <div className="about-stat-label">Denominational Bodies</div>
        </div>
        <div className="about-stat">
          <div className="about-stat-num">∞</div>
          <div className="about-stat-label">Cost to the Reader</div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-label">§ Editorial Method</div>
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
                <small>Does the church publicly articulate a covenantal, non-dispensational reading of Scripture?</small>
              </span>
            </li>
            <li>
              <span className="num">II.</span>
              <span className="text">
                <strong>Recent preaching.</strong>
                <small>Have the pastor's last twelve months of sermons been consistent with that confession?</small>
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
                <small>Where the public record is unclear, an editor writes to the church's leadership before publication.</small>
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-label">§ Frequently Asked</div>
        <div className="about-prose">
          <h2>Questions we are <em>asked often</em>.</h2>

          <div className="faq-item">
            <div className="faq-q"><span>Are you affiliated with a denomination?</span><span className="q-num">Q.01</span></div>
            <div className="faq-a">No. The directory is editorially independent. We list congregations across many bodies — PCA, OPC, URCNA, Reformed Baptist, independent Bible churches — without preferring one over the others.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q"><span>Is "anti-Zionist" a political label?</span><span className="q-num">Q.02</span></div>
            <div className="faq-a">In this directory it is a strictly theological one. It marks a church's rejection of dispensational Christian Zionism — not a position on any contemporary political question.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q"><span>How can I correct a listing?</span><span className="q-num">Q.03</span></div>
            <div className="faq-a">Use the submission form to flag any listing that misrepresents your congregation. Editorial corrections are typically reviewed within seven days.</div>
          </div>

          <div className="faq-item">
            <div className="faq-q"><span>Do you charge for inclusion?</span><span className="q-num">Q.04</span></div>
            <div className="faq-a">Never. The directory is free for both the listed church and the searching reader. There is no premium tier, no sponsored placement, and no advertising.</div>
          </div>
        </div>
      </section>

      <section className="about-footer-cta">
        <h3>Know a faithful <em>congregation</em>?</h3>
        <p>If a church belongs in this directory and is not yet listed, send it our way. The work belongs to the whole body.</p>
        <div className="cta-row">
          <a href="submit.html" className="btn-cta solid">Submit a Church →</a>
          <a href="index.html" className="btn-cta">Browse Directory</a>
        </div>
      </section>
    </div>);

}

function App() {
  return (
    <>
      <window.SiteHeader active="about" />
      <AboutPage />
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);