import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const updates: any[] = [
  // === AZ Batch 1 ===
  { id: 22958, address: "4265 S Arizona Ave", zip: "85248", theologicalNotes: "PCA. Pastor Kelley Hand. Founded 1988. Biblically balanced sermons with traditional hymns and contemporary music. Westminster Standards.", description: "A PCA congregation in Chandler, AZ founded in 1988." },
  { id: 24887, address: "79 Commercial Dr", zip: "85924", website: "https://conchovalleyopc.org", theologicalNotes: "OPC. Pastor Stephen Larson. Westminster Standards. Sunday School 10:00 AM, Worship 11:00 AM. Bilingual Bible studies.", description: "An Orthodox Presbyterian Church congregation in Concho, AZ with bilingual ministries." },
  { id: 22955, address: "740 W University Heights Dr S", zip: "86005", theologicalNotes: "PCA. Pastor Joshua Walker. Particularized November 2010. Confessional church committed to Westminster Confession. Westminster Standards.", description: "A PCA congregation in Flagstaff, AZ, particularized in 2010." },
  { id: 22964, address: "3095 N 140th Ave", zip: "85395", theologicalNotes: "PCA. Pastor Josh Harp. Reformed, theologically confessional. Westminster Standards. Sunday worship 10:00 AM.", description: "A PCA congregation in Goodyear, AZ." },
  { id: 22963, address: "1763 N Gilbert Rd", zip: "85203", theologicalNotes: "PCA. Diverse congregation. Westminster Standards. Weekly Bible studies and small groups.", description: "A diverse PCA congregation in Mesa, AZ." },
  { id: 22960, address: "7825 W Deer Valley Rd", zip: "85382", theologicalNotes: "PCA. Pastor Jonathan Foster. Reformed church in the NW Phoenix Valley. Westminster Standards. Sunday service 10:30 AM.", description: "A PCA congregation in Peoria, AZ." },
  { id: 22965, address: "7656 W Spur Dr", zip: "85383", theologicalNotes: "PCA. Korean-American congregation. Established 1974. Westminster Standards.", description: "A Korean-American PCA mission church in Peoria, AZ, established in 1974." },
  { id: 22966, address: "Phoenix", zip: "85003", theologicalNotes: "PCA. Pastor Dave Bennett. Also known as Barrio Nuevo Phoenix. Multicultural church plant with bilingual services. Community development focus. Westminster Standards.", description: "A multicultural PCA church plant in Phoenix, AZ with bilingual services, also known as Barrio Nuevo." },
  { id: 22967, address: "101 E Comstock Dr", city: "Chandler", zip: "85225", theologicalNotes: "PCA. Pastor Scott Brown. Established 2003-2004. Confessional church. Mix of contemporary and traditional music. Westminster Standards.", description: "A PCA congregation in Chandler, AZ established in 2003." },

  // === AR Reformed Baptist Batch 1 ===
  { id: 25253, address: "1702 Forest Hills Blvd", phone: "(540) 841-2039", website: "https://lbcofnwa.com", theologicalNotes: "Reformed Baptist. Elder-led (no single senior pastor). Adheres to Doctrines of Grace. Confessional.", description: "An elder-led Reformed Baptist congregation in Bella Vista, AR." },
  { id: 25764, address: "6259 AR-9", zip: "72019", phone: "(501) 794-5696", website: "https://gravelhillbaptist.com", theologicalNotes: "Southern Baptist Convention affiliated. Pastor Duncan Collins.", description: "A Baptist congregation in Benton, AR." },
  { id: 22615, address: "1400 S Pine St", zip: "72023", phone: "(501) 843-6717", website: "https://biblechurchofcabot.com", theologicalNotes: "Reformed Baptist. Pastor Rob Davis. Expository verse-by-verse preaching, Scripture-driven worship.", description: "A Reformed Baptist congregation in Cabot, AR." },
  { id: 25037, address: "322 S Main St", zip: "72718", phone: "(479) 248-7398", website: "https://fbccavesprings.com", theologicalNotes: "Baptist. Pastor Michael Battenfield. Established 1880. Christ-centered, focus on redemption and discipleship.", description: "A Baptist congregation in Cave Springs, AR established in 1880." },
  { id: 25379, address: "997 E Centerton Blvd", zip: "72719", phone: "(479) 310-5554", website: "https://reformationbaptist.com", theologicalNotes: "Reformed Baptist. Elder-led. Lead Pastor Cole. Associates Chad and Josh.", description: "An elder-led Reformed Baptist congregation in Centerton, AR." },
  { id: 22618, address: "1689 Middle Rd", zip: "72034", phone: "(501) 499-9832", website: "https://gbcconway.com", theologicalNotes: "Reformed Baptist. Founder/Pastor Jeff Johnson. Founded 2000. Faithful Scripture exposition, Christ-centered worship.", description: "A Reformed Baptist congregation in Conway, AR founded in 2000 by Pastor Jeff Johnson." },
  { id: 25303, address: "3701 S Gary St", zip: "72903", phone: "(479) 646-3891", website: "https://oakcliffbaptist.com", theologicalNotes: "Southern Baptist Convention affiliated. Pastor Dr. Kent E. Sweatman.", description: "An SBC-affiliated Baptist congregation in Fort Smith, AR." },
  { id: 25248, address: "5963 Central Ave", zip: "71913", phone: "(501) 525-8339", website: "https://lakehamiltonbaptist.com", theologicalNotes: "Reformed Baptist. Pastor Dr. Chuck DeVane.", description: "A Reformed Baptist congregation in Hot Springs, AR." },

  // === AR Reformed Baptist Batch 2 ===
  { id: 25695, address: "411 W Washington Ave", zip: "72401", phone: "(870) 351-7830", website: "https://twelve5church.com", theologicalNotes: "Reformed Baptist. 1689 London Baptist Confession. Pastor Nathan Hargrave. Confessionally Reformed Baptist. Founded September 2020.", description: "A confessional Reformed Baptist church in Jonesboro, AR founded in 2020." },
  { id: 25369, address: "11512 W David O Dodd Rd", zip: "72204", phone: "(501) 771-6581", website: "https://redeemerlr.org", theologicalNotes: "Non-denominational. Pastor Bob Lepine. Gospel-focused. Founded February 2008.", description: "A gospel-focused non-denominational congregation in Little Rock, AR founded in 2008." },
  { id: 22617, address: "2904 Fairview Rd", zip: "72450", phone: "(870) 243-5646", website: "https://gracebaptistchurchparagould.com", theologicalNotes: "Southern Baptist Convention affiliated.", description: "An SBC-affiliated Baptist congregation in Paragould, AR." },
  { id: 25541, name: "Providence Baptist Church", address: "1520 N Fourche Ave", zip: "72126", phone: "(501) 889-3340", website: "https://providencebaptistar.com", theologicalNotes: "Reformed Baptist. Pastor Allen S. Nelson IV. Formerly Perryville Second Baptist Church.", description: "A Reformed Baptist congregation in Perryville, AR, formerly known as Perryville Second Baptist Church." },
  { id: 25220, address: "2300 S 13th St", zip: "72758", phone: "(479) 636-2457", website: "https://hopecbc.org", theologicalNotes: "Independent Bible Church / Evangelical Free Church of America affiliated.", description: "An independent Bible church in Rogers, AR." },
  { id: 24997, address: "1010 N Rochester Ave", zip: "72802", phone: "(479) 747-9337", website: "https://crossliferuss.com", theologicalNotes: "Baptist. Pastor Shane Wooten. Founded 2011. Meets at Pope County Senior Activity Center.", description: "A Baptist church plant in Russellville, AR founded in 2011." },
  { id: 22619, address: "2379 S Barrington Rd", zip: "72762", website: "https://gracecovenantnwa.com", theologicalNotes: "Reformed Baptist. 1689 Second London Baptist Confession. Pastors Josh Rice and Bart Hodgson. New church plant launched February 2, 2025.", description: "A confessional Reformed Baptist church plant in Springdale/Tontitown, AR launched in 2025." },
  { id: 25467, address: "1801 S State Line Ave", zip: "71854", phone: "(870) 773-0531", website: "https://texarkanarbc.org", theologicalNotes: "Particular Reformed Baptist. 1689 Second London Baptist Confession. Pastor Matthew Smart. Organized 1978. Plurality of Elders.", description: "A confessional Particular Reformed Baptist congregation in Texarkana, AR organized in 1978." },
  { id: 24929, address: "873 Main St", zip: "72173", phone: "(501) 796-3911", website: "https://berylbaptist.com", theologicalNotes: "Southern Baptist Convention affiliated. Pastor Wade Lentz. Conservative Bible-believing Baptist Church.", description: "A conservative SBC-affiliated Baptist congregation in Vilonia, AR." },

  // === AK + DC (from small states agent) ===
  // These need ID lookups - skip for now, will handle separately
]

async function main() {
  let count = 0
  for (const update of updates) {
    const { id, ...data } = update
    try {
      await prisma.church.update({ where: { id }, data })
      count++
      console.log(`Updated ${id}`)
    } catch (e: any) {
      console.error(`Failed ${id}: ${e.message}`)
    }
  }
  console.log(`\nUpdated ${count} churches`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
