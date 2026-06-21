import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
const p = new PrismaClient()
async function main(){
  const rows = JSON.parse(readFileSync('data/research-queue/resumed-batch-1-output.json','utf8'))
  for (const r of rows){
    const data: any = {
      leadership: r.leadership,
      theologicalNotes: r.theologicalNotes,
      zionistStance: r.zionistStance,
      abolitionStance: r.abolitionStance,
    }
    if (r.website) data.website = r.website
    const before = await p.church.findUnique({ where:{id:r.id}, select:{name:true, website:true, abolitionStance:true} })
    await p.church.update({ where:{id:r.id}, data })
    console.log(`#${r.id} ${r.name}: abolition ${before?.abolitionStance}->${r.abolitionStance}${r.website?`, website->${r.website}`:''}`)
  }
  await p.$disconnect()
}
main().catch(e=>{console.error(String(e).slice(0,400));process.exit(1)})
