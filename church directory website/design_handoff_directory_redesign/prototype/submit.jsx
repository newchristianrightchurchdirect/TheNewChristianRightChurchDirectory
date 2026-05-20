/* global React */
const { useState: useStateSubmit } = React;

const STANCE_OPTIONS = [
  { key: "anti-zionist", mark: "†", name: "Anti-Zionist", desc: "Opposes Christian Zionism" },
  { key: "non-zionist",  mark: "✦", name: "Non-Zionist",  desc: "No Zionist theology" },
  { key: "zionist",      mark: "⚑", name: "Zionist",      desc: "Pro-Zionist views" },
  { key: "unknown",      mark: "?", name: "Unknown",      desc: "Stance not yet clear" },
];

const STATES_LIST = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

function Field({ label, required, optional, children }) {
  return (
    <div className="field">
      <div className="field-label">
        <span>{label}{required && <span className="req"> *</span>}</span>
        {optional && <span className="opt">optional</span>}
      </div>
      {children}
    </div>
  );
}

function FormSection({ num, title, titleEm, help, children }) {
  return (
    <section className="form-section">
      <div className="form-section-head">
        <div className="form-section-num">§ {num}</div>
        <div className="form-section-title">{title} <em>{titleEm}</em></div>
        <div className="form-section-help">{help}</div>
      </div>
      <div className="form-fields">{children}</div>
    </section>
  );
}

function SubmitForm() {
  const [stance, setStance] = useStateSubmit("");
  const [submitted, setSubmitted] = useStateSubmit(false);
  const [name, setName] = useStateSubmit("");

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <div className="page-wrap">
        <div className="success-card">
          <div className="success-mark">❦</div>
          <div className="success-title">Submission <em>Received</em></div>
          <div className="success-msg">
            Thank you for contributing to the directory. Our editorial team will review {name ? <><strong style={{ color: "var(--ink)", fontStyle: "normal" }}>{name}</strong> </> : "your submission "}
            and verify the church's confession before publication. Expect a response within seven days.
          </div>
          <a href="index.html" className="btn-submit" style={{ display: "inline-block", textDecoration: "none" }}>
            Return to Directory
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="page-wrap" onSubmit={onSubmit}>
      <div className="page-intro">
        <span className="page-eyebrow">Community Submission</span>
        <h1 className="page-h1">Submit a <em>Church</em></h1>
        <p className="page-lede">
          Help us build the directory. Submit a congregation and tell us its theological stance.
          All entries are reviewed by our editors before being published.
        </p>
      </div>

      <FormSection
        num="I"
        title="Church"
        titleEm="Information"
        help="The basic identifying details — name, denominational affiliation, and a short description for fellow seekers."
      >
        <Field label="Church Name" required>
          <input type="text" placeholder="e.g. Grace Community Church" value={name} onChange={(e) => setName(e.target.value)} required />
        </Field>
        <Field label="Denomination" optional>
          <input type="text" placeholder="e.g. Reformed Baptist · PCA · OPC · Independent" />
        </Field>
        <Field label="Description" optional>
          <textarea placeholder="A brief portrait of the congregation — its history, distinctives, and community character…"></textarea>
        </Field>
      </FormSection>

      <FormSection
        num="II"
        title="Where it"
        titleEm="Gathers"
        help="Physical address. We use this to place the congregation on the map and verify its presence."
      >
        <Field label="Street Address" required>
          <input type="text" placeholder="123 Main Street" required />
        </Field>
        <div className="field-row cols-3">
          <Field label="City" required>
            <input type="text" placeholder="Nashville" required />
          </Field>
          <Field label="State" required>
            <select required defaultValue="">
              <option value="" disabled>Select…</option>
              {STATES_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="ZIP" optional>
            <input type="text" placeholder="37201" />
          </Field>
        </div>
      </FormSection>

      <FormSection
        num="III"
        title="Means of"
        titleEm="Contact"
        help="Public contact information — only what is already published by the church."
      >
        <div className="field-row cols-2">
          <Field label="Website" optional>
            <input type="url" placeholder="https://" />
          </Field>
          <Field label="Telephone" optional>
            <input type="tel" placeholder="(555) 123-4567" />
          </Field>
        </div>
        <Field label="Pastor or Elder" optional>
          <input type="text" placeholder="Rev. John Smith" />
        </Field>
      </FormSection>

      <FormSection
        num="IV"
        title="Theological"
        titleEm="Stance"
        help="The defining question — does this congregation hold to a Christian Zionist or pro-Israel theological position?"
      >
        <Field label="Zionist Position" required>
          <div className="stance-grid">
            {STANCE_OPTIONS.map((s) => (
              <div
                key={s.key}
                data-stance={s.key}
                className={`stance-card ${stance === s.key ? "selected" : ""}`}
                onClick={() => setStance(s.key)}
              >
                <div className="stance-mark">{s.mark}</div>
                <div className="stance-name">{s.name}</div>
                <div className="stance-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </Field>
        <Field label="Confessional Notes" optional>
          <textarea placeholder="e.g. Covenantal amillennial · Holds to the Westminster Standards · Rejects dispensationalism · 1689 LBCF…"></textarea>
        </Field>
        <Field label="Source or Reference" optional>
          <input type="text" placeholder="Statement of faith URL · sermon citation · published article" />
        </Field>
      </FormSection>

      <div className="submit-bar">
        <div className="submit-note">
          Submissions are reviewed manually. We verify the church's confession before publication and may correspond with leadership.
        </div>
        <button type="submit" className="btn-submit" disabled={!stance || !name}>
          Submit Church for Review →
        </button>
      </div>

      <a href="index.html" className="back-link">← Back to Directory</a>
    </form>
  );
}

function App() {
  return (
    <>
      <window.SiteHeader active="submit" />
      <SubmitForm />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
