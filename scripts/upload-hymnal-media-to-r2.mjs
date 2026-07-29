/**
 * Upload public/hymnal-media (~8.9 GB, ~13,677 files) to a Cloudflare R2 bucket.
 *
 * Prereqs (one-time):
 *   npm i -D @aws-sdk/client-s3 @aws-sdk/lib-storage
 *
 * Env (put in .env.local, do NOT commit):
 *   R2_ACCOUNT_ID=...
 *   R2_ACCESS_KEY_ID=...
 *   R2_SECRET_ACCESS_KEY=...
 *   R2_BUCKET=nxr-hymnal-media
 *
 * Run:
 *   node scripts/upload-hymnal-media-to-r2.mjs           # upload everything missing
 *   node scripts/upload-hymnal-media-to-r2.mjs --dry-run # list what would upload
 *
 * Safe to re-run: it HEADs each key first and skips objects whose size already matches,
 * so an interrupted run resumes instead of re-uploading 8.9 GB.
 */
import { readdirSync, statSync, createReadStream } from 'fs'
import { join, relative, sep, extname } from 'path'
import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

const ROOT = join(process.cwd(), 'public', 'hymnal-media')
const DRY = process.argv.includes('--dry-run')
const CONCURRENCY = 8

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET } = process.env
for (const [k, v] of Object.entries({ R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET })) {
  if (!v && !DRY) { console.error(`Missing env ${k}`); process.exit(1) }
}

const MIME = {
  '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.ogg': 'audio/ogg', '.wav': 'audio/wav',
  '.mid': 'audio/midi', '.midi': 'audio/midi',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp',
  '.pdf': 'application/pdf', '.json': 'application/json', '.txt': 'text/plain',
}

const client = DRY ? null : new S3Client({
  region: 'auto',
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
})

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(p)
    else if (entry.isFile()) yield p
  }
}

const files = [...walk(ROOT)]
const totalBytes = files.reduce((n, f) => n + statSync(f).size, 0)
console.log(`${files.length} files, ${(totalBytes / 1073741824).toFixed(2)} GB under public/hymnal-media`)
if (DRY) { files.slice(0, 10).forEach(f => console.log(`  would upload -> ${relative(ROOT, f).split(sep).join('/')}`)); process.exit(0) }

let done = 0, uploaded = 0, skipped = 0, failed = 0, bytesUp = 0

async function handle(file) {
  const key = relative(ROOT, file).split(sep).join('/')
  const size = statSync(file).size
  try {
    const head = await client.send(new HeadObjectCommand({ Bucket: R2_BUCKET, Key: key })).catch(() => null)
    if (head && head.ContentLength === size) { skipped++; return }
    await new Upload({
      client,
      params: {
        Bucket: R2_BUCKET, Key: key, Body: createReadStream(file),
        ContentType: MIME[extname(file).toLowerCase()] || 'application/octet-stream',
        CacheControl: 'public, max-age=31536000, immutable',
      },
      queueSize: 4, partSize: 8 * 1024 * 1024,
    }).done()
    uploaded++; bytesUp += size
  } catch (e) {
    failed++
    console.error(`FAIL ${key}: ${String(e).slice(0, 160)}`)
  } finally {
    if (++done % 200 === 0) console.log(`  ${done}/${files.length}  up:${uploaded} skip:${skipped} fail:${failed}  ${(bytesUp / 1073741824).toFixed(2)} GB sent`)
  }
}

const queue = [...files]
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) await handle(queue.pop())
}))

console.log(`\nDONE  uploaded:${uploaded}  skipped(already present):${skipped}  failed:${failed}`)
if (failed) { console.error('Some uploads failed - re-run to retry only the missing keys.'); process.exit(1) }
