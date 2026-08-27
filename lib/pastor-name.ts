// The church page's Pastor stat used to be regex-scraped out of `theologicalNotes`, which is prose
// and was never meant to be parsed. Directory-wide that fired on 914 approved rows and printed a
// name absent from the `leadership` column on 385 of them — Del Cerro Baptist displayed "Dustin
// Saunders" over a record naming Dustin Rudolph, Faith Baptist displayed "Kyle Hauck" over Ron Wood
// — and it swallowed the following sentence's first word ("Marc Brashear. Listed"), because the
// capture takes two to four capitalised tokens and a full stop does not stop it.
//
// `leadership` is the field of record and the one a research pass actually maintains. Read that
// first; fall back to the note only when leadership yields nothing usable.
//
// This lives outside the component so it can be run against the whole table, which is how the bugs
// in its first draft were found: middle initials truncated ("Warren R. Bennett II" -> "Warren R"),
// role words survived ("Church Planting Pastor Dale White"), and one row's leadership field is
// worse data than its note ("Other Pastor/Elder: Alan").

// Leading words that are a role rather than a name. Applied repeatedly, so "Founding & Teaching
// Pastor Tim Rice" peels down to "Tim Rice".
const ROLE_LEAD =
  /^(?:senior|lead|leading|head|primary|main|new|founder|founding|teaching|preaching|shepherding|associate|assistant|interim|organizing|other|acting|co|and|the|church|planting|planter|plant|bi-?vocational|visiting|supply|stated|ruling|ordained|licensed|pastoral|executive|campus|worship|youth|family|discipleship|em)\b[\s/&+,-]*/i
const ROLE_NOUN =
  /^(?:pastors?|elders?|ministers?|preachers?|reverend|shepherds?|bishops?|rectors?|vicars?|overseers?|chaplains?|evangelists?|directors?)\b[\s/&+,-]*/i
const PUNCT_LEAD = /^[\s/&+,.;:-]+/
// "Planted 2008 by Danny Jang" — a founding clause wrapped round a real name.
const FOUNDED_LEAD = /^(?:planted|established|organi[sz]ed|founded|started)\b[\s,-]*/i
const YEAR_LEAD = /^(?:\d{4}|in\s+\d{4})\b[\s,-]*/i
const BY_LEAD = /^by\b[\s,-]*/i

// Abbreviations whose full stop does not end a sentence.
const ABBREV = String.raw`Dr|Mr|Mrs|Ms|Rev|Jr|Sr|St|Fr|Prof|Hon|Th|Ph`

// A sentence-ending period: not one closing a single initial ("Warren R. Bennett") and not one
// closing a known abbreviation ("Dr. Joel"). Note "II." IS a sentence end here — the second I is
// not at a word boundary, so the initial guard does not fire, which is the behaviour we want.
const SENTENCE_BREAK = new RegExp(String.raw`(?<!\b[A-Z])(?<!\b(?:${ABBREV}))\.\s`, 'i')

// A trailing period worth keeping, because it belongs to an abbreviation or an initial.
const KEEP_TRAILING_DOT = new RegExp(String.raw`\b(?:${ABBREV}|[A-Z])\.$`, 'i')

const NOT_A_NAME =
  /^(?:vacant|vacancy|pulpit|without|currently|conducting|none|n\/?a|unknown|tbd|tba|pending|search|searching|unconfirmed|we\b|in\s|not\s|no\s)/i

// A role appended after the name rather than before it ("Ron Starcher/Preaching Pastor").
const ROLE_TRAIL =
  /[\s/&+,-]+(?:senior|lead|head|teaching|preaching|associate|assistant|interim|executive|emeritus)?[\s/&+,-]*(?:pastors?|elders?|ministers?|emeritus)\s*$/i

function clean(raw: string): string | null {
  let s = raw.trim()

  // "Pastor: Jane Doe; Elders: ..." — everything before the first colon is the role.
  const colon = s.indexOf(':')
  if (colon > -1 && colon <= 40) s = s.slice(colon + 1)

  // No colon, so peel role words off the front until a name is exposed.
  let prev: string
  do {
    prev = s
    s = s
      .replace(PUNCT_LEAD, '')
      .replace(FOUNDED_LEAD, '')
      .replace(YEAR_LEAD, '')
      .replace(BY_LEAD, '')
      .replace(ROLE_LEAD, '')
      .replace(ROLE_NOUN, '')
  } while (s !== prev)

  // Stop at a parenthetical, an em-dash aside, the next clause, a predicate, or a line break...
  s = s.split(/\s[—–]\s|[(;,]|\sis\s|\swho\s|\n/)[0]
  // ...then at the first real sentence end.
  const brk = s.search(SENTENCE_BREAK)
  if (brk > -1) s = s.slice(0, brk)

  s = s.replace(ROLE_TRAIL, '').trim().replace(/[,;:]+$/, '')
  if (/\.$/.test(s) && !KEEP_TRAILING_DOT.test(s)) s = s.replace(/\.$/, '')

  if (!s || s.length > 60 || !/[A-Za-z]/.test(s)) return null
  if (NOT_A_NAME.test(s)) return null
  if (s.split(/\s+/).length > 6) return null
  return s
}

export function pastorName(leadership?: string | null, notes?: string | null): string | null {
  const fromLeadership = leadership?.trim() ? clean(leadership) : null

  // A bare first name is not a useful thing to print under "Pastor" — a number of Founders-directory
  // rows carry exactly that ("Other Pastor/Elder: Alan"). Prefer the note when it offers a surname.
  const usable = fromLeadership && fromLeadership.split(/\s+/).length > 1 ? fromLeadership : null
  if (usable) return usable

  const m = notes?.match(/Pastor\s+([A-Z][A-Za-z'.\-]+(?:\s+[A-Z][A-Za-z'.\-]+){1,3})/)
  const fromNotes = m ? clean(m[1]) : null
  return fromNotes || fromLeadership || null
}
