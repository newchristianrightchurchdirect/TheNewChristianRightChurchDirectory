// NOTE: stance changes made through this script are NOT recorded in the StanceChange
// audit trail. For per-church stance edits prefer `updateStances` from lib/stance-audit.ts,
// which requires a reason and writes the trail. Batch runs still need a
// church_research_log.md entry either way.
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
const p = new PrismaClient()
async function main(){
  const file = process.argv[2]
  if(!file){ console.error('usage: tsx apply-research-batch.ts <output.json>'); process.exit(1) }
  const rows = JSON.parse(readFileSync(file,'utf8'))
  for (const r of rows){
    const data: any = { researchStatus: r.researchStatus || 'researched' }
    for (const k of ['denomination','leadership','theologicalNotes','zionistStance','abolitionStance','christianNationalism','eschatology','theonomy','federalVision','socialJusticeStance','sexualityStance','genderStance','culturalEngagement','notablePeople','website','phone','email','description','researchNote','recordFlag','stanceBasis','sourceUrls','address','city','zip'])
      if (r[k] !== undefined && r[k] !== null) data[k] = r[k]
    if (Array.isArray((r as any).sources) && (r as any).sources.length) data.sourceUrls = (r as any).sources.join(';')
    if ((data.researchStatus === 'researched') && r.lastResearchedAt === undefined) data.lastResearchedAt = new Date()
    await p.church.update({ where:{id:r.id}, data })
    console.log(`#${r.id} ${r.name}: ${data.researchStatus}, abolition=${r.abolitionStance||'(unchanged)'}`)
  }
  await p.$disconnect()
}
main().catch(e=>{console.error(String(e).slice(0,400));process.exit(1)})
