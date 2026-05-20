/* global React */
const { useState: useStateMast } = React;

window.SiteHeader = function SiteHeader({ active }) {
  const date = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  return (
    <header className="masthead">
      <div className="masthead-top">
        <div className="left">No. CDXVII · Vol. III</div>
        <div className="right">
          <a href="index.html" className={active === "directory" ? "active" : ""}>Directory</a>
          <a href="about.html" className={active === "about" ? "active" : ""}>About</a>
          <a href="submit.html" className={active === "submit" ? "active" : ""}>Submit a Church</a>
        </div>
      </div>
      <div className="masthead-main">
        <div className="masthead-meta-l">
          Established<br/>
          MMXXIV<br/>
          ‖ Independent
        </div>
        <h1 className="masthead-title">
          The New <em>Christian</em> Right<br/>
          <span style={{ fontSize: "0.5em", letterSpacing: "0.04em", display: "inline-block", marginTop: "8px" }}>
            — A Directory of Faithful Churches —
          </span>
        </h1>
        <div className="masthead-meta-r">
          {date}<br/>
          50 States<br/>
          ‖ Confessional
        </div>
      </div>
      <div className="masthead-rule">
        <span className="masthead-rule-text">Identifying anti-Zionist, Bible-believing churches across America</span>
      </div>
    </header>
  );
};
