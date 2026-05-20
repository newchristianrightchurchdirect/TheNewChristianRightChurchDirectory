import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const updates: { id: number; data: any }[] = [
  { id: 115, data: { theologicalNotes: "1689 London Baptist Confession. Covenant theology, Reformed soteriology. Rejects dispensationalism. Pastor Joel Vancil." } },
  { id: 117, data: { theologicalNotes: "1689 London Baptist Confession. Covenant theology, Reformed soteriology. Rejects dispensationalism. Pastor Doug Campbell." } },
  { id: 2177, data: { theologicalNotes: "Westminster Standards. OPC — covenantal theology rejects dispensationalism. Pastor Robert Tarullo." } },
  { id: 2179, data: { theologicalNotes: "Westminster Standards. OPC — covenantal theology rejects dispensationalism. Pastor Bruce Hollister." } },
  { id: 2190, data: { theologicalNotes: "Westminster Standards. OPC — covenantal theology rejects dispensationalism. Pastor Terry E. Dowds." } },
  { id: 2192, data: { theologicalNotes: "Westminster Standards. OPC — covenantal theology rejects dispensationalism. Pastor James R. Megchelsen." } },
  { id: 2390, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Jason Shults." } },
  { id: 2459, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Phil Howell." } },
  { id: 2460, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Marty Ellsworth." } },
  { id: 2491, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Cliff Davis." } },
  { id: 2536, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Bryan Heller." } },
  { id: 2634, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Dale Smith." } },
  { id: 2667, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Geoff Ingrum." } },
  { id: 2680, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Greg Lee." } },
  { id: 2693, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Jose Salgado." } },
  { id: 2695, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Keith Throop." } },
  { id: 2697, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Nathan Carter." } },
  { id: 2717, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Mike." } },
  { id: 2730, data: { theologicalNotes: "1689 London Baptist Confession. Covenantal theology rejects dispensationalism. Pastor Michael." } }
]
async function main() { for (const u of updates) { await p.church.update({ where: { id: u.id }, data: u.data }); console.log(`Updated ${u.id}`) } await p.$disconnect() }
main()
