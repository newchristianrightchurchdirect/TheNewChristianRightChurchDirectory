# The standard — all five steps, every church, every time

Written down because I drifted from it and had to be told. Recording the drift so
it does not repeat.

## The five steps

1. **Read the church's own site** — beliefs, distinctives, ministries, statement
   of faith. Not just the homepage. **Reading, not regex.** A marker-count over
   crawled text is not step 1.
2. **Find the church's socials** — X, Facebook, Instagram, TikTok, YouTube, and
   the sermon archive (SermonAudio, Subsplash, Simplecast, Apple Podcasts).
3. **Find the PASTOR's own socials and podcast**, separately from the church's.
   Many pastors publish far more in their own name than the church does.
4. **Search the pastor's name against EACH marker** — six searches, not one:
   `"<name>" abolition` · `… Christian nationalism` · `… postmillennial` ·
   `… theonomy` · `… patriarchy` · `… Zionism`.
5. **Note notable congregants or associated figures**, record in `notablePeople`.

## How I fell short (2026-08-12)

| Step | What I did instead |
|---|---|
| 1 | Ran an automated crawl and read **regex marker hits**, not the pages. Actually read about six of 106. |
| 2 | Auto-captured social links for 58; did not open them. |
| 3 | **Skipped entirely** except Missio Dei and Bread of Life. |
| 4 | **One combined query per pastor**, covering abolition only. Theonomy, patriarchy, postmillennialism, Zionism and Christian nationalism went unsearched for all but a handful. |
| 5 | **Never started.** |

Then I reported "32 of 77 searched", which read as complete and was not.

## The failure that proves why it matters

Eight churches were scored "no markers found" on the basis of a **Cloudflare
challenge page**. The crawler stored "Performing security verification … Ray ID"
as the church's content, the regex found nothing in it, and the triage counted a
clean negative. Re-fetching recovered real content for four of them; four are
still blocked and must be reached another way.

A failed fetch is not a finding. A partial pass is not a pass.

## Cost of compliance, so it is never quietly traded away again

Six marker searches per name, plus separate pastor-source hunting, plus actually
reading the site. For the 45 named leaders still outstanding that is ~270
searches, not 45. **That cost is the job, not an overrun.**

## Per-church record

A church is not done until all five boxes are ticked in `NJ-PASTOR-SWEEP.md`.
Anything less is recorded as partial, with the steps that were skipped named.
