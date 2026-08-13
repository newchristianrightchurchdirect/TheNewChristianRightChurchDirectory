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
m = rec["step4_markers"]
missing_m = [k for k in MARKERS if k not in m]
if missing_m:
    sys.exit(f"REFUSED: step 4 missing markers {missing_m}")

all_recs = json.load(open(OUT, encoding="utf-8")) if os.path.exists(OUT) else []
all_recs = [r for r in all_recs if r["id"] != rec["id"]]
all_recs.append(rec)
json.dump(all_recs, open(OUT, "w", encoding="utf-8"), indent=1, ensure_ascii=False)

hits = [k for k, v in m.items() if v.get("hit")]
print(f"recorded #{rec['id']} {rec['name']} — 5/5 steps. "
      f"marker hits: {hits or 'none'}. total complete: {len(all_recs)}")
