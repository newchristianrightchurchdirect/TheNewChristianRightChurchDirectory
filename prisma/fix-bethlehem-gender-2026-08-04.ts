// #15 Bethlehem Baptist, Minneapolis carried genderStance = unknown while being flagged for its
// denomination's permissive position — the single most misleading combination in that batch, since
// Bethlehem is one of the most emphatically complementarian congregations in the country.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

async function main() {
  const c = await prisma.church.findUnique({ where: { id: 15 } })
  if (!c) { console.log('#15 not found'); return }

  await updateStances(prisma, 15, { genderStance: 'complementarian' }, {
    actor: 'fix-bethlehem-gender-2026-08-04.ts',
    note: 'Bethlehem holds that only men serve as elders; recorded from the congregation’s own position, which contradicts the denominational flag it now carries.',
    alsoSet: {
      lastResearchedAt: new Date(),
      notablePeople: [c.notablePeople, 'John Piper — senior pastor 1980–2013, 33 years at Bethlehem; founder of Desiring God, chancellor of Bethlehem College and Seminary, and co-founder with Wayne Grudem of the Council on Biblical Manhood and Womanhood, whose Danvers Statement defined the complementarian position.'].filter(Boolean).join(' '),
      theologicalNotes: `${c.theologicalNotes || ''}\n\n**CORRECTION appended 2026-08-04, immediately after the flag above — read the two together.**

Bethlehem's own position is that **"God raises up a few qualified men to lead in local churches, with only males serving as elders,"** following the Pastoral Epistles. It is not a church that ordains women; **it is one of the most emphatically complementarian congregations in America.**

**John Piper** was senior pastor here for **33 years (1980–2013)** and **co-founded the Council on Biblical Manhood and Womanhood** with Wayne Grudem — the organisation that produced the Danvers Statement and effectively defined the complementarian position for modern evangelicalism.

**The flag above therefore records Converge's denominational latitude and nothing about this congregation's practice.** It is retained because the affiliation is the standard being applied, but on the substance the record is unambiguous and points the other way.`,
    },
  })
  console.log('#15 Bethlehem Baptist — genderStance set to complementarian, correction appended')
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
