"""Append a fully-standard-compliant church record.

    python record.py <<'JSON'
    { ... }
    JSON

Refuses to write unless all five steps are present, so a partial pass cannot be
filed as a complete one — which is the failure this exists to prevent.
"""
import json, sys, os

OUT = "standard_records.json"
REQUIRED = ["step1_site", "step2_church_socials", "step3_pastor_own",
            "step4_markers", "step5_notable"]
MARKERS = ["abolition", "christian_nationalism", "postmillennial",
           "theonomy", "patriarchy", "zionism"]

rec = json.load(sys.stdin)

missing = [k for k in REQUIRED if k not in rec]
if missing:
    sys.exit(f"REFUSED: missing steps {missing}")

# The id must be a REAL directory row whose city matches what is being filed.
# Eight of the first ten records were filed against guessed ids that belonged to
# other churches entirely. Nothing reached the database, but research attached to
# the wrong row is worse than no research, so the id is now checked, not trusted.
CHURCHES = "nj-churches.json"
if os.path.exists(CHURCHES):
    rows = {c["id"]: c for c in json.load(open(CHURCHES, encoding="utf-8"))}
    row = rows.get(rec["id"])
    if not row:
        sys.exit(f"REFUSED: id {rec['id']} is not a New Jersey row in the directory")
    filed_city = (rec.get("city") or "").split()[0].lower()
    if filed_city and filed_city not in (row.get("city") or "").lower():
        sys.exit(f"REFUSED: id {rec['id']} is {row['name']!r} in {row['city']!r}, "
                 f"but this record says {rec.get('name')!r} in {rec.get('city')!r}")
m = rec["step4_markers"]
missing_m = [k for k in MARKERS if k not in m]
if missing_m:
    sys.exit(f"REFUSED: step 4 missing markers {missing_m}")

# A step-4 query must actually NAME this church or its pastor. Twenty-four
# records were once filed citing a query that named five OTHER congregations,
# because they were generated in a batch — which turned "never searched" into
# "searched, no hit". That is the precise failure this file exists to stop, so
# it is now checked rather than trusted.
import re as _re
_q = (m["abolition"].get("query") or "").lower()
_generic = {"church", "presbyterian", "community", "reformed", "baptist",
            "congregation", "christ", "grace", "first", "covenant", "immanuel"}
_name_words = [w for w in _re.findall(r"[a-z]{4,}", (rec.get("name") or "").lower())
               if w not in _generic]
_surnames = [s.lower() for s in _re.findall(r"[A-Z][a-z]+", rec.get("pastor") or "")]
_named = any(w in _q for w in _name_words) or any(s in _q for s in _surnames)
if _q and not _named and rec.get("step4_complete", True):
    sys.exit("REFUSED: the step-4 query names neither this church nor its pastor. "
             "Either run the search for THIS church, or set step4_complete=false "
             "and mark every marker performed=false.")

all_recs = json.load(open(OUT, encoding="utf-8")) if os.path.exists(OUT) else []
all_recs = [r for r in all_recs if r["id"] != rec["id"]]
all_recs.append(rec)
json.dump(all_recs, open(OUT, "w", encoding="utf-8"), indent=1, ensure_ascii=False)

hits = [k for k, v in m.items() if v.get("hit")]
print(f"recorded #{rec['id']} {rec['name']} — 5/5 steps. "
      f"marker hits: {hits or 'none'}. total complete: {len(all_recs)}")
