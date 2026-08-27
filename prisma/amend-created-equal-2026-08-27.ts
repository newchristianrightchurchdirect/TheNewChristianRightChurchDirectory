// Dustin asked the right question about #4392: is Created Equal abolitionist, or just pro-life?
//
// It matters because this directory ranks on abolition, and "vice president of Created Equal" could
// be read as an abolition credential. It is not one. Recording the distinction on the row so no
// later pass mistakes the organisation for an abolitionist body.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'
const prisma = new PrismaClient()

const ACTOR = 'amend-created-equal-2026-08-27.ts'

const NOTE = `**AMENDMENT 2026-08-27 — Created Equal is PRO-LIFE, not abolitionist, and this row should not be read as though it were.**

Dustin asked the question directly, and it is worth answering in the record because this directory
**ranks on abolition** and "vice president of Created Equal" reads like an abolition credential. **It
is not one.**

**Created Equal is a pro-life organisation in the technical sense the abolitionist movement uses:**

- **Its own self-description uses the label abolitionists reject.** Created Equal exists for
  "equipping **pro-life** individuals with photographic evidence and conversational skills needed to
  save babies from abortion," and it presents itself publicly as "Created Equal — Pro-Life."
  **Abolitionists deliberately refuse that word**: Free the States and Abolitionists Rising both
  publish essays titled **"Abolitionist, Not Pro-Life"** precisely to mark the division.
- **It takes no published position on the three questions that define abolitionism** — incrementalism
  versus immediate abolition, equal-protection legislation, and whether women who obtain abortions
  should bear criminal liability. An abolitionist organisation states these; they are the identity.
- **Its method is persuasion and outreach**, in the Center for Bio-Ethical Reform tradition — graphic
  imagery, Justice Rides, campus apologetics, mobile ultrasound units — rather than legislative
  abolition.
- **No Created Equal position on H.B. 370 could be found at all**, which is itself evidence. **End
  Abortion Ohio backed that bill; Ohio Right to Life opposed it** for penalising mothers. A
  Columbus-headquartered abolitionist organisation saying nothing publicly about its own state's
  equal-protection bill would be extraordinary.

**It is not mainstream-incrementalist either, and the record should not flatten that.** Created Equal
argues for "equal protection between the born and the preborn" and frames abortion as **age-based
discrimination** — abolitionist-adjacent language. It sits nearer abolition than National Right to
Life does, without taking abolition's defining positions.

**What this changes: nothing about the stance, and nothing about the promotion.**

- \`abolitionStance\` stays **pro_abolition**, because it rests on **Seth Drayer's own signature on the
  H.B. 370 pastoral petition** — a bill that criminalises abortion as homicide and that **Ohio Right
  to Life opposed** because it penalises mothers. That is an abolitionist act **by the man**,
  independent of his employer's institutional position.
- The **transformationalist** promotion stands. It rested on action across three public questions —
  abortion, gender and classical education — and **cultural engagement is the qualifier while
  abolition is only a ranking marker.** Whether his employer is abolitionist or pro-life does not
  touch the question of whether this church acts in the public square.

**The general rule this establishes for the rest of the directory: an activist's EMPLOYER is not a
stance. Read the man's own acts.**`

async function main() {
  const c = await prisma.church.findUnique({ where: { id: 4392 } })
  if (!c) { console.log('#4392 NOT FOUND'); return }
  await updateStances(prisma, 4392, {}, {
    actor: ACTOR,
    note: 'Recorded that Created Equal is pro-life rather than abolitionist; stance and promotion unchanged.',
    alsoSet: {
      notablePeople: (c.notablePeople || '').replace(
        'the Columbus-based national pro-life education and outreach organisation founded by Mark Harrington.',
        'the Columbus-based national pro-life education and outreach organisation founded by Mark Harrington. NOTE: Created Equal is PRO-LIFE, not abolitionist — it uses equal-protection language but takes no published position on incrementalism, equal-protection legislation, or criminal liability for women. Drayer\'s own abolition stance rests on his signature on the H.B. 370 pastoral petition, not on his employer.',
      ),
      theologicalNotes: `${c.theologicalNotes || ''}\n\n---\n\n${NOTE}`,
    },
  })
  console.log('#4392 amended — Created Equal recorded as pro-life, not abolitionist.')
  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
