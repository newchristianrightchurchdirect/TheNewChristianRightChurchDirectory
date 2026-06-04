"""Apply hand-curated Baptist -> TH1961 audio overrides for hymns where the
title differs (refrain vs first line, OCR garbage, etc.) but the underlying
hymn is the same. Verified against hymn analysis."""
import json, re

BASE = r'C:\Users\Dustina\Websites\church-directory'
BAPTIST_JSON = BASE + r'\public\hymnal-data\trinity_hymnal_baptist.json'
TH1961_JSON = BASE + r'\public\hymnal-data\trinity_hymnal_1961.json'

# Each entry: baptist_num -> th1961_num (where to copy audio from).
# Most are same-number (Baptist title is OCR garbage or uses refrain as title);
# some entries left out where Baptist genuinely replaced the hymn.
OVERRIDES = {
    # OCR garbage in Baptist title — same hymn as TH1961 same #
    308: 308,  # "Lo! God is here: let us adore"
    452: 452,  # "Saviour, blessed Saviour, while we sing"
    477: 477,  # "Stand up, stand up for Jesus"
    638: 638,  # "Holy Spirit, hear us"
    715: 715,  # "Jesus, I come" (refrain of "Out of my bondage")
    719: 719,  # "A Shelter in the Time of Storm" (= TH "The Lord's our Rock")
    # Baptist uses refrain/chorus title — same hymn
    636: 636,  # "All Things Bright and Beautiful" = "Each little flower"
    684: 684,  # "Bring Them In" = "Hark! 'tis the Shepherd's voice"
    687: 687,  # "He Is Coming Again" = "Lift up your heads"
    698: 698,  # "Only a Sinner" = "Naught have I gotten"
    718: 718,  # "Leaning on the Everlasting Arms" = "What a fellowship"
    726: 726,  # "Saved by Grace" = "Some day the silver cord will break"
    673: 673,  # "He Was Wounded For Our Transgressions" = "Who hath believed"
    # Left intentionally unwired (Baptist may have replaced these — different hymns):
    # 29, 97, 350, 352, 354, 511
}

def base_num(h):
    m = re.match(r'(\d+)', str(h['number']))
    return int(m.group(1)) if m else None

with open(BAPTIST_JSON, encoding='utf-8') as f:
    b = json.load(f)
with open(TH1961_JSON, encoding='utf-8') as f:
    t = json.load(f)

t_by_num = {}
for h in t['hymns']:
    n = base_num(h)
    if n is not None and n not in t_by_num:
        t_by_num[n] = h

applied = 0
skipped = []
for h in b['hymns']:
    n = base_num(h)
    if n in OVERRIDES:
        src_n = OVERRIDES[n]
        src = t_by_num.get(src_n)
        if src and src.get('audioUrl'):
            h['audioUrl'] = src['audioUrl']
            applied += 1
        else:
            skipped.append((n, src_n, 'no TH audio'))

with open(BAPTIST_JSON, 'w', encoding='utf-8') as f:
    json.dump(b, f, ensure_ascii=False, indent=2)

print(f'Applied {applied} overrides')
for n, src, why in skipped:
    print(f'  skipped #{n} -> TH#{src}: {why}')

audio = sum(1 for h in b['hymns'] if h.get('audioUrl'))
print(f'\nBaptist audio coverage: {audio}/{len(b["hymns"])} ({100*audio/len(b["hymns"]):.1f}%)')
