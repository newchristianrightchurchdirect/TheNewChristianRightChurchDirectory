"""Step 1 via the Internet Archive, for churches whose live site cannot be read.

Dead domains, expired certificates and bot challenges all stop a live fetch.
None of them stop an archived snapshot. This is the method I named as necessary
and then failed to use, so it is used here rather than described.

A snapshot is dated evidence, not current evidence, and every record says so.
"""
import json, os, re, sys, urllib.parse, urllib.request
from playwright.sync_api import sync_playwright

MARKERS = re.compile(
    r"\b(abolition\w*|abolish\w*|equal protection|sanctity of (?:human )?life|"
    r"pro-?life|abortion\w*|preborn|unborn|personhood|sidewalk counsel\w*|"
    r"crisis pregnancy|theonom\w*|postmillennial\w*|christian nationalis\w*|"
    r"patriarch\w*|zionis\w*)", re.I)
PASTOR = re.compile(r"(?:Pastor|Rev\.?|Minister|Elder)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z\.']+){1,2})")


import time


def snapshot(url):
    """Newest archived capture.

    Returns (url, timestamp) on success, (None, 'NONE') when the archive really
    holds nothing, and (None, 'ERROR') when the lookup FAILED. The three must
    never be collapsed: the first version of this function swallowed a 429 and
    reported it as 'no snapshot', which turned a rate limit into a finding about
    26 churches. Archive.org throttles hard, so this backs off and says so.
    """
    api = "https://archive.org/wayback/available?url=" + urllib.parse.quote(url, safe="")
    for attempt in range(5):
        try:
            req = urllib.request.Request(api, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=60) as r:
                d = json.loads(r.read().decode())
            snap = (d.get("archived_snapshots") or {}).get("closest") or {}
            if snap.get("available"):
                return (snap.get("url"), snap.get("timestamp"))
            return (None, "NONE")
        except Exception as e:
            if "429" in str(e) and attempt < 4:
                time.sleep(30 * (attempt + 1))
                continue
            if attempt == 4:
                return (None, "ERROR")
            time.sleep(8)
    return (None, "ERROR")


def main(ids):
    churches = {c["id"]: c for c in json.load(open("nj-churches.json", encoding="utf-8"))}
    out = {}
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(ignore_https_errors=True, user_agent=(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"))
        for cid in ids:
            c = churches.get(cid)
            url = (c or {}).get("website") or ""
            if not url.startswith("http"):
                print(f"{cid:>5} {c['name'][:32]:32} no URL on record")
                continue
            snap_url, ts = snapshot(url)
            if not snap_url:
                why = ("archive holds no capture" if ts == "NONE"
                       else "LOOKUP FAILED (rate limit or error) — NOT a finding")
                print(f"{cid:>5} {c['name'][:32]:32} {why}")
                out[cid] = {"snapshot": None, "captured": ts, "chars": 0,
                            "markerHits": [], "pastors": [], "text": ""}
                time.sleep(6)
                continue
            time.sleep(6)
            page = ctx.new_page()
            try:
                page.goto(snap_url, wait_until="domcontentloaded", timeout=60000)
                page.wait_for_timeout(4000)
                t = page.evaluate("""() => {
                    for (const s of document.querySelectorAll('script,style,noscript')) s.remove();
                    return (document.body ? document.body.innerText : '') || '';
                }""")
            except Exception as e:
                t = ""
                print(f"{cid:>5} {c['name'][:32]:32} fetch failed {str(e)[:40]}")
            finally:
                page.close()
            hits = sorted({m.group(0).lower() for m in MARKERS.finditer(t)})
            names = sorted({n for n in PASTOR.findall(t)})[:3]
            date = f"{ts[:4]}-{ts[4:6]}-{ts[6:8]}" if ts else "?"
            out[cid] = {"snapshot": snap_url, "captured": date, "chars": len(t),
                        "markerHits": hits, "pastors": names, "text": t[:9000]}
            print(f"{cid:>5} {c['name'][:32]:32} captured {date} chars={len(t):>6} "
                  f"pastors={names} markers={hits or '-'}")
    json.dump(out, open("wayback.json", "w", encoding="utf-8"), indent=1, ensure_ascii=False)
    print(f"\nrecovered readable archives for {sum(1 for v in out.values() if v['chars']>1500)} of {len(ids)}")


if __name__ == "__main__":
    main([int(x) for x in sys.argv[1:]])
