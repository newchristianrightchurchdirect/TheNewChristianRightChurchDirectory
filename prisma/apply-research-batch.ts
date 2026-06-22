import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
const p = new PrismaClient()
async function main(){
  const file = process.argv[2]
  if(!file){ console.error('usage: tsx apply-research-batch.ts <output.json>'); process.exit(1) }
  const rows = JSON.parse(readFileSync(file,'utf8'))
  for (const r of rows){
    const data: any = { researchStatus: r.researchStatus || 'researched' }
    for (const k of ['leadership','theologicalNotes','zionistStance','abolitionStance','website','description','phone','email','researchNote','recordFlag'])
      if (r[k] !== undefined && r[k] !== null) data[k] = r[k]
    await p.church.update({ where:{id:r.id}, data })
    console.log(`#${r.id} ${r.name}: ${data.researchStatus}, abolition=${r.abolitionStance||'(unchanged)'}`)
  }
  await p.$disconnect()
}
main().catch(e=>{console.error(String(e).slice(0,400));process.exit(1)})
