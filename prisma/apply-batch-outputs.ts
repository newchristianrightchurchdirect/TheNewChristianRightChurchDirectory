// Apply subagent-generated batch output JSONs to the DB.
// Each batch output is an array of { id, description, leadership, abolitionStance, zionistStance }.
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()
const DRY_RUN = process.argv.includes('--dry')

type Update = {
  id: number
  description?: string | null
  leadership?: string | null
  abolitionStance?: 'pro_abolition' | 'incrementalist' | 'anti' | 'unknown'
  zionistStance?: 'yes' | 'no' | 'anti' | 'unknown'
}

const VALID_AB = new Set(['pro_abolition', 'incrementalist', 'anti', 'unknown'])
const VALID_Z = new Set(['yes', 'no', 'anti', 'unknown'])

function validate(u: Update): string | null {
  if (typeof u.id !== 'number') return 'no id'
  if (u.description != null) {
    const words = u.description.trim().split(/\s+/).length
    if (words < 60 || words > 140) return `desc ${words} words out of 60-140`
  }
  if (u.abolitionStance && !VALID_AB.has(u.abolitionStance)) return `bad abolition: ${u.abolitionStance}`
  if (u.zionistStance && !VALID_Z.has(u.zionistStance)) return `bad zionist: ${u.zionistStance}`
  return null
}

async function main() {
  const files = process.argv.slice(2).filter(a => !a.startsWith('--'))
  if (files.length === 0) {
    console.error('Usage: tsx apply-batch-outputs.ts <batch-output-1.json> [batch-output-2.json ...]')
    process.exit(1)
  }

  const all: Update[] = []
  for (const f of files) {
    const arr = JSON.parse(fs.readFileSync(f, 'utf-8'))
    if (!Array.isArray(arr)) { console.error(`${f} is not array`); continue }
    all.push(...arr)
    console.log(`Loaded ${arr.length} from ${f}`)
  }

  let ok = 0, skipped = 0, errors = 0
  for (const u of all) {
    const err = validate(u)
    if (err) {
      console.error(`#${u.id} INVALID: ${err}`)
      errors++
      continue
    }
    const data: any = {}
    if (u.description != null) data.description = u.description.trim()
    if (u.leadership != null) data.leadership = u.leadership.trim() || null
    if (u.abolitionStance) data.abolitionStance = u.abolitionStance
    if (u.zionistStance) data.zionistStance = u.zionistStance

    if (Object.keys(data).length === 0) { skipped++; continue }

    if (DRY_RUN) {
      console.log(`#${u.id} → ${Object.keys(data).join(', ')}`)
    } else {
      try {
        await prisma.church.update({ where: { id: u.id }, data })
      } catch (e: any) {
        console.error(`#${u.id} UPDATE FAILED: ${e.message}`)
        errors++
        continue
      }
    }
    ok++
  }

  console.log(`\n${DRY_RUN ? '[DRY] ' : ''}Applied: ${ok}, skipped: ${skipped}, errors: ${errors}`)
  await prisma.$disconnect()
}
main().catch(e => { console.error(e); process.exit(1) })
