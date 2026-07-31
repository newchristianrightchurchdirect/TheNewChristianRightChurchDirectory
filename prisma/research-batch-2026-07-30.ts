// Individually researched congregations, per the standard: site, church socials, pastor socials
// and podcast, then the pastor's name searched against each marker.
import { PrismaClient } from '@prisma/client'
import { updateStances } from '../lib/stance-audit'

const prisma = new PrismaClient()
const DRY = process.argv.includes('--dry-run')

async function main() {
  // ---- #66 Sovereign King Church, Jeffersonville IN — Pastor Joseph Spurgeon ----
  // Church's own founding story: Spurgeon met men "doing evangelism work at the abortion mill
  // in Louisville, Kentucky" and the plant grew out of that. He is "deeply committed to ending
  // abortion". On X: "Christianity should be twisted in with national constitutions, that the
  // kingdoms of the world should become Christ's kingdoms." Hosts *The Patriarchy Podcast*.
  // Evangel Presbytery. Abolition, Christian nationalism and patriarchy all first-hand.
  const notes66 =
    'INDEPENDENTLY VERIFIED 2026-07-30. Pastor Joseph Spurgeon. The congregation grew directly out of ' +
    'abortion-mill evangelism: the plant began in 2016 around men doing that work at the Louisville ' +
    'abortion facility, and the church describes Spurgeon as "deeply committed to ending abortion, ' +
    'defending the unborn". On Christian nationalism he has written that "Christianity should be twisted ' +
    'in with national constitutions, that the kingdoms of the world should become Christ\u2019s kingdoms". ' +
    'He hosts *The Patriarchy Podcast*. Particularised in Evangel Presbytery 2021. Listed on the ' +
    'postmillennialworldview.com directory.'

  if (!DRY) {
    await updateStances(prisma, 66, {
      culturalEngagement: 'transformationalist',
      abolitionStance: 'pro_abolition',
      christianNationalism: 'affirm',
      genderStance: 'patriarchal',
      eschatology: 'postmill',
    }, {
      actor: 'research-batch-2026-07-30.ts',
      note: 'Read the church site, socials and the pastor\u2019s own publishing. Abortion-mill evangelism is in the church\u2019s founding story; explicit Christian-nationalist writing; hosts The Patriarchy Podcast.',
      alsoSet: {
        stanceBasis: 'evidenced',
        recordFlag: null, // verification complete
        theologicalNotes: notes66,
        leadership: 'Pastor: Joseph Spurgeon',
        sourceUrls: 'https://www.sovereignkingchurch.com/about;https://www.sovereignkingchurch.com/who-are-our-leaders;https://x.com/joseph_spurgeon;https://evangelpresbytery.com/blog/2021/06/02/sovereign-king-church-is-particularized-in-evangel-presbytery/;https://postmillennialworldview.com/postmill-churches/',
        researchNote: '2026-07-30: independently verified via church site, pastor X account and Evangel Presbytery. Abolition/CN/patriarchy all first-hand.',
      },
    })
    console.log('#66 Sovereign King — verified, stanceBasis=evidenced, 4 markers set')
  }

  // ---- Colwood Church, Caro MI — the postmill directory is STALE ----
  // It credits Jason Garwood as pastor, but Garwood resigned from Colwood effective
  // 13 Sept 2017. Colwood is a United Brethren in Christ congregation. Garwood is a
  // reconstructionist (Reconstructionist Radio, "Setting the Record Straight").
  const colwood = await prisma.church.findFirst({
    where: { state: 'MI', city: { contains: 'Caro', mode: 'insensitive' }, name: { contains: 'Colwood', mode: 'insensitive' } },
  })
  if (colwood) {
    console.log(`Colwood found as #${colwood.id} — flagging stale pastor attribution`)
    if (!DRY) {
      await prisma.church.update({
        where: { id: colwood.id },
        data: {
          recordFlag: [...new Set([...(colwood.recordFlag || '').split(';').filter(Boolean), 'verify_stance', 'denom_verify'])].join(';'),
          theologicalNotes: (colwood.theologicalNotes || '') +
            '\n\n**PASTOR ATTRIBUTION IS STALE.** The postmillennialworldview.com directory credits Jason Garwood as pastor here, but Garwood resigned from Colwood effective 13 September 2017. Colwood is a United Brethren in Christ congregation. Garwood himself is a reconstructionist (Reconstructionist Radio) and appears to have moved on — the postmill classification may belong to him rather than to this church. Verify before relying on it.',
          researchNote: '2026-07-30: third-party postmill listing rests on a pastor who left in 2017. Do not treat as verified.',
        },
      })
    }
  } else {
    console.log('Colwood Church (Caro MI) not present in the directory')
  }

  await prisma.$disconnect()
}
main().catch(async e => { console.error(e); await prisma.$disconnect(); process.exit(1) })
