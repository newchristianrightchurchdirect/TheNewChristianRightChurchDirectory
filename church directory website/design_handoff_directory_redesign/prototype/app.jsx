/* global React, ReactDOM, L */
const { useState, useEffect, useMemo, useRef } = React;

// ----- Position metadata -----
const POSITIONS = [
  { key: "all",          label: "All",         count: 4030 },
  { key: "anti-zionist", label: "Anti-Zionist", count: 30 },
  { key: "non-zionist",  label: "Non-Zionist",  count: 3926 },
  { key: "unknown",      label: "Unknown",      count: 74 },
];

const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
const DENOMS = ["Reformed Baptist","PCA","OPC","URCNA","Bible Church","Independent","HRC"];

const Masthead = () => <window.SiteHeader active="directory" />;

// ----- Stats Strip -----
function StatsStrip({ filtered, total }) {
  return (
    <div className="stats-strip">
      <div className="stat">
        <div className="stat-label">Currently Showing</div>
        <div className="stat-value">
          {filtered.toLocaleString()}<span className="small">of {total.toLocaleString()} congregations</span>
        </div>
        <div className="stat-bar"><span style={{ width: `${(filtered / total * 100).toFixed(1)}%` }} /></div>
      </div>
      <div className="stat">
        <div className="stat-label">Anti-Zionist</div>
        <div className="stat-value"><span className="accent">30</span><span className="small">‖ 0.7%</span></div>
        <div className="stat-bar"><span className="oxblood" style={{ width: "0.74%" }} /></div>
      </div>
      <div className="stat">
        <div className="stat-label">Non-Zionist</div>
        <div className="stat-value"><span className="brass">3,926</span><span className="small">‖ 97.4%</span></div>
        <div className="stat-bar"><span className="brass" style={{ width: "97.4%" }} /></div>
      </div>
      <div className="stat">
        <div className="stat-label">Unverified</div>
        <div className="stat-value">74<span className="small">‖ 1.8%</span></div>
        <div className="stat-bar"><span style={{ width: "1.8%", background: "var(--ink-mute)" }} /></div>
      </div>
    </div>
  );
}

// ----- Map -----
function ChurchMap({ churches, activeId, onSelect }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (mapInstance.current) return;
    const map = L.map(mapRef.current, {
      center: [39.5, -98.5],
      zoom: 4,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
      attribution: "© OSM · Carto",
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png", {
      subdomains: "abcd",
      maxZoom: 19,
      pane: "shadowPane",
    }).addTo(map);

    mapInstance.current = map;
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    churches.forEach((c) => {
      const icon = L.divIcon({
        className: "",
        html: `<div class="church-marker ${c.position}" data-id="${c.id}"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      const marker = L.marker([c.lat, c.lng], { icon }).addTo(map);
      marker.bindPopup(`
        <div class="popup-name">${c.name}</div>
        <div class="popup-meta">${c.denomination} · ${c.city}, ${c.state}</div>
        <div class="popup-link">View Details →</div>
      `, { closeButton: false, offset: [0, -4] });
      marker.on("click", () => onSelect(c.id));
      markersRef.current[c.id] = marker;
    });
  }, [churches]);

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, m]) => {
      const el = m.getElement()?.querySelector(".church-marker");
      if (!el) return;
      if (Number(id) === activeId) el.classList.add("active");
      else el.classList.remove("active");
    });
  }, [activeId]);

  const zoom = (delta) => {
    const m = mapInstance.current;
    if (m) m.setZoom(m.getZoom() + delta);
  };

  return (
    <section className="map-region">
      <div className="map-frame">
        <div id="map" ref={mapRef}></div>
        <div className="map-corner tl">Fig. 01 · United States</div>
        <div className="map-corner tr">Mercator Projection</div>
        <div className="map-corner bl">Updated · MMXXVI</div>
        <div className="map-corner br">Scale ‖ Variable</div>

        <div className="map-zoom">
          <button onClick={() => zoom(1)} aria-label="Zoom in">+</button>
          <button onClick={() => zoom(-1)} aria-label="Zoom out">−</button>
        </div>

        <div className="map-legend">
          <div className="map-legend-title">Legend</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: "var(--oxblood)" }}></span>Anti-Zionist</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: "var(--brass)" }}></span>Non-Zionist</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: "var(--ink)" }}></span>Zionist</div>
          <div className="legend-item"><span className="legend-dot" style={{ background: "var(--ink-mute)" }}></span>Unverified</div>
        </div>
      </div>
    </section>
  );
}

// ----- Directory Sidebar -----
function Directory({ churches, allChurches, query, setQuery, stateFilter, setStateFilter, denomFilter, setDenomFilter, position, setPosition, sortKey, setSortKey, activeId, onSelect }) {
  return (
    <aside className="directory" data-screen-label="Directory">
      <div className="dir-header">
        <div className="dir-eyebrow">
          <span>§ II ‖ The Directory</span>
          <span>Browse · Sort · Filter</span>
        </div>
        <div className="dir-title">Faithful <em>Congregations</em></div>
      </div>

      <div className="filters">
        <div className="search-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/>
          </svg>
          <input
            placeholder="Search by name, city, or denomination…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="filter-row">
          <div className="filter-select">
            <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
              <option value="">All States</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="filter-select">
            <select value={denomFilter} onChange={(e) => setDenomFilter(e.target.value)}>
              <option value="">All Denominations</option>
              {DENOMS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="position-tabs">
          {POSITIONS.map((p) => (
            <button
              key={p.key}
              className={`position-tab ${position === p.key ? "active" : ""}`}
              onClick={() => setPosition(p.key)}
            >
              <span>{p.label}</span>
              <span className="count">{p.count.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="dir-results-bar">
        <span><strong>{churches.length}</strong> Churches Found</span>
        <span
          className="sort-toggle"
          onClick={() => setSortKey(sortKey === "name" ? "state" : sortKey === "state" ? "size" : "name")}
        >
          Sort ‖ {sortKey === "name" ? "A → Z" : sortKey === "state" ? "By State" : "By Size"} ↕
        </span>
      </div>

      <div className="church-list">
        {churches.length === 0 && (
          <div className="empty-state">No congregations match those filters.</div>
        )}
        {churches.map((c, i) => (
          <ChurchCard
            key={c.id}
            church={c}
            index={i + 1}
            active={c.id === activeId}
            onClick={() => onSelect(c.id)}
          />
        ))}
      </div>
    </aside>
  );
}

function ChurchCard({ church, index, active, onClick }) {
  return (
    <div
      className={`church-card ${active ? "active" : ""}`}
      onClick={onClick}
      data-screen-label={`Card ${index}`}
    >
      <div className="church-num">N°{String(index).padStart(2, "0")}</div>
      <div className="church-body">
        <div className="church-name">{church.name}</div>
        <div className="church-denom">{church.denomination}</div>
        <div className="church-loc">{church.city}, {church.state}</div>
        <div className="church-blurb">{church.blurb}</div>
        <div className="church-meta-row">
          {church.website && <span className="has-site">↗ Website</span>}
          <span>{church.phone}</span>
        </div>
      </div>
      <div className={`church-tag ${church.position}`}>
        {church.position === "anti-zionist" ? "† Anti-Zion" : church.position === "non-zionist" ? "Non-Zion" : "Unverified"}
      </div>
    </div>
  );
}

// ----- Detail Panel -----
function DetailPanel({ church, onClose }) {
  const open = !!church;
  return (
    <>
      <div className={`detail-overlay ${open ? "open" : ""}`} onClick={onClose}></div>
      <aside className={`detail-panel ${open ? "open" : ""}`} data-screen-label="Detail">
        {church && (
          <>
            <div className="detail-head">
              <div className="detail-eyebrow">
                <span>§ Congregation Profile</span>
                <button className="detail-close" onClick={onClose}>×</button>
              </div>
              <div className="detail-name">{church.name}</div>
              <div className="detail-loc">{church.city}, {church.state} · {church.denomination}</div>
            </div>
            <div className="detail-body">
              <div className="detail-section">
                <h4>Confession & Conviction</h4>
                <p>{church.blurb}</p>
              </div>
              <div className="detail-section">
                <h4>At a Glance</h4>
                <div className="detail-stat-grid">
                  <div className="detail-stat">
                    <div className="detail-stat-label">Founded</div>
                    <div className="detail-stat-value">{church.founded}</div>
                  </div>
                  <div className="detail-stat">
                    <div className="detail-stat-label">Avg. Attendance</div>
                    <div className="detail-stat-value">{church.attendance.toLocaleString()}</div>
                  </div>
                  <div className="detail-stat">
                    <div className="detail-stat-label">Position</div>
                    <div className="detail-stat-value" style={{ fontSize: 16, textTransform: "uppercase", fontFamily: "var(--mono)", letterSpacing: "0.1em" }}>
                      {church.position.replace("-", " ")}
                    </div>
                  </div>
                  <div className="detail-stat">
                    <div className="detail-stat-label">Pastor</div>
                    <div className="detail-stat-value" style={{ fontSize: 16 }}>{church.pastor}</div>
                  </div>
                </div>
              </div>
              <div className="detail-section">
                <h4>Contact</h4>
                <p style={{ fontFamily: "var(--mono)", fontSize: 12, lineHeight: 2 }}>
                  TELEPHONE ‖ {church.phone}<br/>
                  ADDRESS ‖ {church.city}, {church.state}<br/>
                  WEBSITE ‖ {church.website ? "available" : "not listed"}
                </p>
              </div>
              <div className="detail-section">
                <h4>Editor's Note</h4>
                <p style={{ fontStyle: "italic", fontFamily: "var(--serif)", fontSize: 15 }}>
                  This congregation has been verified by our editorial team through public confession statements and direct correspondence with church leadership.
                </p>
              </div>
            </div>
            <div className="detail-actions">
              <button className="btn">Save</button>
              <button className="btn">Share</button>
              <button className="btn primary">Visit Website ↗</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

// ----- Main App -----
function App() {
  const tweaks = window.useTweaks ? window.useTweaks(window.TWEAK_DEFAULTS) : [{}, () => {}];
  const [tw, setTw] = tweaks;

  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [denomFilter, setDenomFilter] = useState("");
  const [position, setPosition] = useState("anti-zionist");
  const [sortKey, setSortKey] = useState("name");
  const [activeId, setActiveId] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const allChurches = window.CHURCH_DATA;

  const filtered = useMemo(() => {
    let list = allChurches;
    if (position !== "all") list = list.filter((c) => c.position === position);
    if (stateFilter) list = list.filter((c) => c.state === stateFilter);
    if (denomFilter) list = list.filter((c) => c.denomination === denomFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.denomination.toLowerCase().includes(q) ||
        c.state.toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "state") return a.state.localeCompare(b.state) || a.name.localeCompare(b.name);
      if (sortKey === "size") return b.attendance - a.attendance;
      return 0;
    });
    return list;
  }, [allChurches, query, stateFilter, denomFilter, position, sortKey]);

  const handleSelect = (id) => {
    setActiveId(id);
    setDetailOpen(true);
  };

  const activeChurch = filtered.find((c) => c.id === activeId) || allChurches.find((c) => c.id === activeId);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Masthead />
      <StatsStrip filtered={filtered.length} total={allChurches.length} />
      <main className="main-grid">
        <ChurchMap
          churches={filtered}
          activeId={activeId}
          onSelect={handleSelect}
        />
        <Directory
          churches={filtered}
          allChurches={allChurches}
          query={query} setQuery={setQuery}
          stateFilter={stateFilter} setStateFilter={setStateFilter}
          denomFilter={denomFilter} setDenomFilter={setDenomFilter}
          position={position} setPosition={setPosition}
          sortKey={sortKey} setSortKey={setSortKey}
          activeId={activeId}
          onSelect={handleSelect}
        />
      </main>
      <DetailPanel
        church={detailOpen ? activeChurch : null}
        onClose={() => setDetailOpen(false)}
      />
      {window.AppTweaks && <window.AppTweaks tw={tw} setTw={setTw} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
