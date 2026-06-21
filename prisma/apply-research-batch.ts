import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
const p = new PrismaClient()
async function main(){
  const file = process.argv[2]
  if(!file){ console.error('usage: tsx apply-research-batch.ts <output.json>'); process.exit(1) }
  const rows = JSON.parse(readFileSync(file,'utf8'))
  for (const r of rows){
    const data: any = {}
    for (const k of ['leadership','theologicalNotes','zionistStance','abolitionStance','website','description','phone','email'])
      if (r[k] !== undefined && r[k] !== null) data[k] = r[k]
    const before = await p.church.findUnique({ where:{id:r.id}, select:{abolitionStance:true, website:true} })
    await p.church.update({ where:{id:r.id}, data })
    console.log(`#${r.id} ${r.name}: abolition ${before?.abolitionStance}->${r.abolitionStance}${r.website?', website fixed':''}`)
  }
  await p.$disconnect()
}
main().catch(e=>{console.error(String(e).slice(0,400));process.exit(1)})
