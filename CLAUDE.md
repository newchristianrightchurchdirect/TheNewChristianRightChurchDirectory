# The New Christian Right Church Directory

A directory of roughly 4,000 churches with researched doctrinal and political stances, backed by Neon Postgres.

## Two things in this repo are not what they look like

- **`church directory website/`** (with spaces, tracked) is not application source. It's a design handoff — `design_handoff_directory_redesign/` holds standalone HTML and JSX prototypes for a redesign. Don't import from it, and don't refactor it as if it were part of the app. The space in the path also breaks naive shell globs; quote it.
- **The `hymnal_*.md` / `hymnal-review-checklist.md` files are unrelated to this project.** They're NXR Hymnal research that ended up living here. Leave them alone when working on the directory; if you're doing hymnal work, the actual project is `~/AndroidStudioProjects/NXRHymnal`.

## Research provenance

`church_research_log.md` is the record of how each church's stance was determined. **Any stance change needs a corresponding log entry** — the value of this directory is that its claims are traceable, and an unsourced stance is worse than a missing one.

**Known data gap:** roughly 400 rows in the PCA belt were populated with a denominational default rather than individually researched. Those defaults may be masking genuinely abolitionist or Zionist outliers. Treat that subset as unverified, and don't cite it as evidence of a regional pattern until it's been revisited with fuller equal-protection data.

## Pushing

Commits go up as the **newchristianrightchurchdirect** GitHub account. Multiple accounts exist in `gh`; check the active one first.

## Conventions

npm (`package-lock.json`), Next 15. Run `npm run build` before assuming a change is safe — this project generates a large number of static pages and build-time failures are common when data shape changes.
