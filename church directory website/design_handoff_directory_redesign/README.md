# Handoff: New Christian Right — Church Directory Redesign

## Overview
A complete visual redesign of the church directory site (originally at `the-new-christian-right-church-dire.vercel.app`). Three pages — **Directory** (home, with map + filterable list), **About**, and **Submit a Church** — sharing one editorial newspaper aesthetic.

## About the Design Files
The files in `prototype/` are **design references created in HTML/JSX** — they show the intended look, layout, and behavior, but they are NOT production code to drop into your repo as-is. They use inline Babel + standalone React over CDN purely so the prototype runs from a static folder. Your task is to **recreate these designs in the existing codebase** (the live site appears to be a Next.js / React app on Vercel) using its established framework, component patterns, and routing.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are settled. Recreate pixel-perfectly, but feel free to use your codebase's component primitives (form fields, buttons, etc.) where the visual rules are translatable.

## Aesthetic Direction
**Editorial Ecclesiastical** — newspaper masthead meets old-world Bible publishing.
- Parchment background, ink-black type, brass/ochre accent, oxblood for emphasis
- Classical serif display (Cormorant Garamond) paired with modern sans (Inter Tight) and JetBrains Mono for metadata
- Roman numerals for section markers (§ I, § II, etc.)
- Italic byline rules, fleurons (❦), drop caps
- Subtle paper-grain noise overlay across the whole page

---

## Design Tokens

### Colors
```css
/* Parchment palette */
--bg:        #f4ede0;   /* page background */
--bg-soft:   #ebe2d1;   /* card hover, secondary surface */
--bg-deep:   #e2d6bd;
--paper:     #faf6ec;   /* card / panel background */
--ink:       #1a1814;   /* primary text + strong rules */
--ink-soft:  #3d3830;   /* secondary text */
--ink-mute:  #6b6357;   /* metadata, captions */
--rule:      #c8bda4;   /* light rule lines */
--rule-soft: #d8cdb4;

/* Accents */
--brass:      #a87c2f;  /* primary accent */
--brass-deep: #7d5a1f;  /* italic emphasis, links */
--oxblood:    #6e1f1a;  /* anti-zionist tag, required asterisks */
--moss:       #4a5238;
--teal:       #2c4a4a;

/* Tag/position colors */
--tag-anti: #6e1f1a;    /* oxblood */
--tag-non:  #a87c2f;    /* brass */
--tag-zio:  #2c2622;    /* near-black */
--tag-unk:  #8a8275;    /* warm grey */
```

### Typography
```css
--serif: "Cormorant Garamond", "EB Garamond", Georgia, serif;
--sans:  "Inter Tight", "Inter", system-ui, sans-serif;
--mono:  "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
```
Load from Google Fonts. Weights used: serif 400/500/600 + italic; sans 400/500/600; mono 400/500.

### Type Scale (page-level)
- Masthead title: `clamp(36px, 5vw, 64px)` serif 500, line-height 0.95
- Page H1 (Submit/About hero): `clamp(40px, 5.5vw, 72px)` serif 500
- About hero: `clamp(56px, 7vw, 96px)` serif 500
- Section title (form sections, about prose H2): 28-36px serif 500
- Body lede: 19-22px serif italic
- Body prose: 16-18px serif, line-height 1.5-1.6
- Card title (church): 19px serif 500
- Stat numbers: 32-56px serif 500
- Eyebrow / metadata: 10-11px mono uppercase, letter-spacing 0.16-0.24em
- Tags: 8.5-9px mono uppercase, letter-spacing 0.14em

### Spacing & Rules
- Page wrap max-width: 980px (forms), 1100px (about)
- Section padding: 36-48px vertical, separated by 1px `--rule` lines
- Major dividers: 1px `--ink` (top/bottom of stat strips, page hero)
- Cards: 18-24px internal padding, 1px `--rule` between items, no border-radius (sharp corners throughout)

### Shadows
```css
--shadow-sm: 0 1px 0 rgba(26,24,20,.04), 0 1px 2px rgba(26,24,20,.04);
--shadow-md: 0 1px 0 rgba(26,24,20,.04), 0 8px 24px -10px rgba(26,24,20,.18);
```
Used sparingly — mostly for the detail drawer and the floating map legend.

### Paper-grain overlay
Applied to `body::before`, fixed full-screen, `mix-blend-mode: multiply`, opacity 0.35. SVG turbulence noise — see `styles.css` for the data-URI.

---

## Pages

### 1. Directory (home)  —  `index.html` / `app.jsx`
**Purpose:** Browse and filter all listed churches; explore them on a map.

**Layout (top → bottom):**
1. **Masthead** (shared) — see Header section below
2. **Stats strip** — 4 columns (1.6fr 1fr 1fr 1fr): "Currently Showing" / "Anti-Zionist" / "Non-Zionist" / "Unverified", each with a thin proportion bar at the bottom. Border-bottom: 1px ink.
3. **Main grid** — two columns: map left (1fr), directory sidebar right (420px fixed). On <1100px stack vertically.

**Map region:**
- Inset 16px parchment frame with a 1px ink border + inner 1px rule offset 6px
- Four corner annotations (mono caption text): "Fig. 01 · United States", "Mercator Projection", "Updated · MMXXVI", "Scale ‖ Variable"
- Custom zoom controls (top-left): vertical stack of two paper buttons with serif "+" / "−"
- Floating legend (bottom-center): paper card with "LEGEND" eyebrow and 4 colored dots + labels
- Tile layer: Carto `light_nolabels` + `light_only_labels` (placed in shadow pane so labels stay above markers)
- Markers: 12×12 colored circles via `L.divIcon`, classed by position (`anti-zionist` / `non-zionist` / `zionist` / `unknown`). Hover/active scales 1.6×.
- Popups: parchment card, square corners, serif church name, mono metadata, brass "View Details →" link

**Directory sidebar** (sticky, full-height):
- Header block: eyebrow ("§ II ‖ The Directory" · "Browse · Sort · Filter") + serif title "Faithful *Congregations*"
- Filters: search (serif italic placeholder, magnifier icon, ink underline border), then 2-col select row (states / denominations) — selects styled mono uppercase
- Position tabs: 4-button segmented control (All / Anti-Zionist / Non-Zionist / Unknown) with mono label + serif count beneath; active state swaps to ink background, paper text
- Results bar: bg-soft strip with "**N** Churches Found" left, click-to-cycle "Sort ‖ A→Z / By State / By Size ↕" right
- Church list (scrollable):
  - Each card: 28px / 1fr / auto grid → numeral N°01 (mono) / body / position tag
  - Body: serif name, mono denomination eyebrow, italic location with brass dot, 2-line clamped blurb, mono website/phone row
  - Hover: bg-soft. Active: bg-soft + 3px brass inset on left.
  - Position tag: outlined mono uppercase pill (oxblood / brass / ink / grey)

**Detail drawer** (overlay + right slide-in 540px wide):
- Triggered by click on map marker or list card
- Sections: Confession & Conviction · At a Glance (2×2 stat grid with brass left-border) · Contact (mono metadata block) · Editor's Note (italic serif)
- Footer actions strip: Save / Share / Visit Website (primary, ink fill, brass on hover)

### 2. About  —  `about.html` / `about.jsx`
**Purpose:** Mission, methodology, and FAQ.

**Sections:**
1. Hero — 1.1fr / 1fr grid: large display H1 left, italic lede right with **drop cap T** (serif, 66px, line-height 1, brass-deep, float-left, 2px top margin, 10px right — sized so it occupies exactly two body lines and line 3 wraps under it)
2. Three pillars — full-bleed 3-column grid bordered top+bottom in ink: Roman numeral (italic serif brass-deep) + serif title + sans description
3. Mission section — 200px label gutter / 680px prose. Includes a **pull-quote**: italic serif 28px, padded 48px top / 56px left, with a giant brass `“` glyph absolutely positioned at top-left, ink rules top + bottom
4. Stats strip — 4-column full-bleed (4,030 churches / 50 states / 12 bodies / ∞ cost), border-bordered ink top+bottom
5. Editorial method — same 200/680 split, ordered criteria list with 60px Roman numeral gutter, serif text + mono small caps below
6. FAQ — 4 items, each: serif question with mono "Q.0N" right-aligned, italic serif answer below, divided by rule lines
7. Footer CTA — full-bleed ink card with brass inner border (8px inset), serif headline + italic subtext + two buttons (solid brass + outlined brass)

### 3. Submit a Church  —  `submit.html` / `submit.jsx`
**Purpose:** Community submission form, editor-reviewed.

**Sections:**
1. Page intro — centered: brass-bordered "COMMUNITY SUBMISSION" eyebrow, serif H1 "Submit a *Church*", italic lede. Fleuron (❦) on rule-bottom.
2. Four form sections (§ I–IV), each with sticky 280px label column on left:
   - **§ I Church Information** — Name (req), Denomination, Description (textarea)
   - **§ II Where it Gathers** — Street (req), 2fr/1fr/1fr row: City (req) / State select (req) / ZIP
   - **§ III Means of Contact** — Website / Telephone (2-col), Pastor full-width
   - **§ IV Theological Stance** — 4-card stance picker (Anti-Zionist † / Non-Zionist ✦ / Zionist ⚑ / Unknown ?), Confessional Notes, Source/Reference
3. Submit bar — 2px ink top border, italic note left + ink primary button right ("Submit Church for Review →"). Disabled until name + stance set.
4. "← Back to Directory" link at bottom.

**Field styling:**
- Underline-style: no border except 1px bottom (ink), serif 18px, italic placeholder mute
- Focus: bottom border thickens to 2px brass-deep, -1px margin-bottom to keep layout
- Labels above: mono 10px uppercase tracking 0.18em with `*` in oxblood for required, italic "optional" lowercase right-aligned

**Stance picker:**
- 4-column grid in ink-bordered container, 1px rule between cards
- Each card: 22px top / 16px / 20px bottom padding, min-height 140px, `text-align: center`
  - Mark glyph: serif 32px line-height 1, fixed 36px height
  - Name: serif 18px 500
  - Description: sans 11px ink-mute
- Selected: solid color fill (anti = oxblood, non = brass-deep, zio = ink, unk = ink-mute), paper text, brass mark

**Success state:**
- Replaces form on submit. Centered framed card (1px ink border + 8px-inset rule), giant brass fleuron (❦), "Submission *Received*" headline, italic confirmation message including church name in non-italic ink, "Return to Directory" button.

---

## Shared Header (Masthead)
Used on all three pages. `header.jsx`.

- **Top bar:** mono 11px tracking 0.12em — "No. CDXVII · Vol. III" left; Directory / About / Submit a Church links right. Active link is brass-deep with a 1px brass underline 12px below baseline.
- **Main:** 3-column grid (1fr / auto / 1fr), align-items: end, padding 28px 32px 24px:
  - Left: italic mono caption "Established · MMXXIV · ‖ Independent"
  - Center: H1 "The New *Christian* Right" (italic word in brass-deep) with a small "— A Directory of Faithful Churches —" subtitle 8px below
  - Right: today's date · "50 States" · "‖ Confessional"
- **Rule:** italic serif byline "Identifying anti-Zionist, Bible-believing churches across America" centered between two horizontal rules (left ink, right paper-rule). Use `flex: 1 1 60px; min-width: 40px` on rule pseudo-elements so they never collapse.

---

## Interactions & Behavior

### Directory
- Search: live-filter on name / city / denomination / state (case-insensitive substring)
- State + denomination: AND-combined dropdown filters
- Position tabs: replace whole list (default `anti-zionist`)
- Sort cycle: `name` → `state` → `size` (by attendance desc) → `name`
- Click church card OR map marker:
  - Sets `activeId`
  - Marker scales up + gets `.active` class
  - Detail drawer slides in from right (transform translateX 100% → 0, 320ms cubic-bezier(.4,0,.2,1))
  - Overlay fades in (250ms) with 4px backdrop-filter blur
- Drawer close: × button (top-right, 28×28 ink-bordered) OR overlay click — reverses animation

### Submit form
- Required fields: Church Name, Street Address, City, State, Stance
- Submit button is disabled until name + stance are present (extend to all required in production)
- On submit: `preventDefault`, swap to success state, scroll to top
- Stance card click: visual selection state, store key

### About
- Static (no JS interactions). All anchors link to other pages.

### Hover / focus / motion
- All transitions 0.15s ease unless noted
- Buttons invert on hover (paper background → ink fill)
- `.btn.primary:hover` swaps ink to brass-deep
- Map marker hover: `transform: scale(1.6)` + `z-index: 1000`
- Detail panel: 0.32s slide-in
- No bouncing, no parallax, no scroll-triggered animations — restrained and editorial

### Responsive
- 1100px: directory grid stacks (map above list, map = 60vh)
- 900px: form sections collapse sticky labels; about stats / pillars collapse to 1-2 columns
- 720px: masthead byline rule wraps and shrinks to 14px; rule lines remain
- 700px: stats strip becomes 2×2; detail panel goes full-width

---

## State Management (Directory)
```ts
const [query, setQuery] = useState("");
const [stateFilter, setStateFilter] = useState("");        // "" | state code
const [denomFilter, setDenomFilter] = useState("");        // "" | denomination name
const [position, setPosition] = useState("anti-zionist");  // "all" | "anti-zionist" | "non-zionist" | "unknown"
const [sortKey, setSortKey] = useState("name");            // "name" | "state" | "size"
const [activeId, setActiveId] = useState(null);            // church id
const [detailOpen, setDetailOpen] = useState(false);
```

Filter pipeline (memoized): position → state → denomination → query → sort.

Replace the sample `CHURCH_DATA` in `data.js` with your real backend query — each row needs:
```ts
{ id, name, denomination, city, state, lat, lng, position, phone, website, founded, attendance, blurb, pastor }
```

---

## Map (Leaflet)
- CDN: `leaflet@1.9.4` (CSS + JS, with integrity hashes — see `index.html`)
- Tiles: Carto basemaps (`light_nolabels` + `light_only_labels`), subdomains `abcd`, max zoom 19
- Initial view: `[39.5, -98.5]`, zoom 4 (continental US)
- `zoomControl: false` (we render our own), `attributionControl: true`, `scrollWheelZoom: true`
- See `app.jsx` `ChurchMap` component for marker creation, popup binding, and click → onSelect wiring

If your stack uses `react-leaflet`, the same logic translates 1:1 — just swap imperative `L.marker` calls for `<Marker>` JSX.

---

## Assets
- **Fonts:** Google Fonts — Cormorant Garamond, Inter Tight, JetBrains Mono (Playfair Display, EB Garamond, DM Serif Display loaded only on directory page for the Tweaks panel — drop those imports if you don't keep the Tweaks UI)
- **Map tiles:** Carto Light (open) — keep their attribution per their license
- **Icons:** Inline SVG (search magnifier in directory). Otherwise typographic glyphs (†, ✦, ⚑, ❦, “, →, ↗, ←, ×)
- **No imagery / photos** in the design. Resist adding stock imagery — the editorial aesthetic is type-only.

---

## Files in `prototype/`
| File | Role |
|---|---|
| `index.html` | Directory page entry — loads Leaflet, fonts, all scripts |
| `about.html` | About page entry |
| `submit.html` | Submit form page entry |
| `styles.css` | Global tokens, masthead, stats strip, map, directory list, detail drawer |
| `pages.css` | Submit + About specific styles, drop cap, pull-quote, stance grid |
| `header.jsx` | Shared `<SiteHeader>` masthead component |
| `app.jsx` | Directory page (Masthead, StatsStrip, ChurchMap, Directory list, DetailPanel) |
| `about.jsx` | About page composition |
| `submit.jsx` | Submit form composition |
| `data.js` | Sample church + state-count data — replace with real DB query |
| `tweaks.jsx`, `tweaks-panel.jsx` | Prototype-only theme picker. **Do not port.** |

---

## Notes for the Implementing Developer
- **Sharp corners everywhere.** No `border-radius` anywhere except on the round map markers. Editorial = rectilinear.
- **Don't add hover scale on cards.** This is a directory, not a marketing site. Background-color shift only.
- **Type weights:** Cormorant Garamond at 400/500 — never 600+ for the display use cases (it loses the elegance).
- **Drop cap T:** 66px serif, line-height 1, +2px top margin, 10px right margin against a 22px / 1.5lh body. If you change the body lede size, recompute so the T's height equals exactly `2 × line-height`.
- **Pull-quote left gutter:** 56px padding-left holds space for the giant `“` — do not let it overlap the text.
- **Position tag colors:** anti-zionist = oxblood, non-zionist = brass-deep, zionist = ink, unknown = ink-mute. These are semantic, not decorative — match them in the map markers, list tags, and any future place a position is shown.
- **Required asterisks** are oxblood. **Editorial italic emphasis** (in display headlines) is brass-deep.

---

## Out of Scope / Skipped
- Sign-in / authentication (per user direction, removed entirely)
- Mobile-first hamburger menu (current responsive is desktop-down; consider adding for production)
- The Tweaks panel (`tweaks.jsx` / `tweaks-panel.jsx`) is design-tooling only — do not ship
