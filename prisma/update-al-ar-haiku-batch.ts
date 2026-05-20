import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const updates = [
  // === AL PCA Batch A (Haiku) ===
  { id: 22919, address: "10068 Renfroe Rd", zip: "35014", website: "https://salemchurchpca.org", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Alpine, AL." },
  { id: 22921, address: "445 Shelton Mill Rd", zip: "36830", website: "https://auburn-seum-church.weebly.com", theologicalNotes: "PCA. Korean-American congregation. Se Um means 'to build up' in Korean. Westminster Standards.", description: "A Korean PCA congregation sharing space at Covenant Presbyterian in Auburn, AL." },
  { id: 22880, address: "Collerine Rd", zip: "36785", website: "https://goodhopepres.org", theologicalNotes: "PCA. Pastor Rev. Lincoln Speece. Westminster Standards. Sunday School 10:00 AM, Morning Worship 11:00 AM.", description: "A PCA congregation in Benton, AL." },
  { id: 22830, address: "64 County Rd 76", zip: "35443", theologicalNotes: "PCA. Pastor Rev. Ronald Moore Smith. Established October 31, 1900. Historic church with corner tower and Eastlake style carvings. Westminster Standards.", description: "A historic PCA congregation established in 1900 in Boligee, AL." },
  { id: 22866, address: "Camden", zip: "36726", theologicalNotes: "PCA. Historic church chartered in 1845 as 'Old School Presbyterian Church.' Westminster Standards.", description: "A historic PCA congregation in Camden, AL, chartered in 1845." },
  { id: 22834, address: "15308 AL Highway 28 W", zip: "36728", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Catherine, AL." },
  { id: 22842, address: "Eufaula Ave", zip: "36016", website: "https://claytonpres.org", theologicalNotes: "PCA. Westminster Standards. Located downtown Clayton behind Clayton Cafe.", description: "A PCA congregation in downtown Clayton, AL." },
  { id: 22912, address: "36 Sid Bush Rd", zip: "36016", theologicalNotes: "PCA. Pastor Ray H. Cureton. Part of Southeast Alabama Presbytery. Westminster Standards.", description: "A PCA congregation near Clayton, AL." },
  { id: 22843, address: "79 S Valley Ave", zip: "35961", theologicalNotes: "PCA. Gothic Revival building. Congregation began 1904, relocated 1908. Westminster Standards.", description: "A historic PCA congregation in Collinsville, AL in a Gothic Revival building." },

  // === AL PCA Batch B (Haiku) ===
  { id: 22922, address: "4081 Rucker Blvd", city: "Enterprise", zip: "36330", phone: "(334) 308-9893", theologicalNotes: "PCA. Korean-American congregation. Westminster Standards.", description: "A Korean PCA congregation in Enterprise, AL." },
  { id: 22876, address: "Main St at Wilson Ave", city: "Eutaw", zip: "35462", theologicalNotes: "PCA. Pastor Ronald Moore Smith. Historic Greek Revival church built in 1851. Listed on National Register of Historic Places. Westminster Standards.", description: "A historic PCA congregation in Eutaw, AL housed in an 1851 Greek Revival building on the National Register." },
  { id: 22911, address: "21695 AL Highway 14", city: "Eutaw", zip: "35462", phone: "(205) 373-8700", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation near Eutaw, AL on Highway 14." },
  { id: 22860, address: "35305 AL Highway 25", city: "Faunsdale", zip: "36738", theologicalNotes: "PCA. Pastor Thomas G. Kay Jr. Established April 30, 1887. Westminster Standards.", description: "A PCA congregation established in 1887 in Faunsdale, AL." },
  { id: 22917, address: "977 Sardis Rd", city: "Gardendale", zip: "35071", phone: "(205) 514-0199", website: "https://www.redeemerpca.org", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA mission church in Gardendale, AL." },
  { id: 22889, address: "145 W Tuskeena St", city: "Hayneville", zip: "36040", theologicalNotes: "PCA. Pastor Lincoln Speece. Westminster Standards.", description: "A PCA congregation in Hayneville, AL." },
  { id: 22896, address: "316 N Main St", city: "Linden", zip: "36748", website: "https://www.lindenpres.org", theologicalNotes: "PCA. Interim Pastor David Myers. Westminster Standards.", description: "A PCA congregation in Linden, AL on North Main Street." },
  { id: 22897, address: "Lowndesboro", zip: "36752", theologicalNotes: "PCA. Pastor Lincoln Speece. Historic church built 1856. Westminster Standards.", description: "A historic PCA congregation in Lowndesboro, AL, church built in 1856." },

  // === AL PCA Batch C (Haiku) ===
  { id: 22898, address: "62 N Cypress St", city: "Loxley", zip: "36551", theologicalNotes: "PCA. Pastor Rev. Andrew Colbert. Westminster Standards.", description: "A PCA congregation in Loxley, AL." },
  { id: 22899, address: "502 Washington St", city: "Marion", zip: "36756", website: "https://marionpresbyterianchurch.com", theologicalNotes: "PCA. Built 1877. Listed on National Register of Historic Places. Westminster Standards.", description: "A historic PCA congregation in Marion, AL, built in 1877 and listed on the NRHP." },
  { id: 22905, address: "1404 Sand Rd", city: "Newbern", zip: "36765", theologicalNotes: "PCA. Organized 1844, church built 1848. Westminster Standards.", description: "A historic PCA congregation organized in 1844 in Newbern, AL." },
  { id: 22938, address: "7377 AL Highway 199", city: "Notasulga", zip: "36866", website: "https://woodlandpca.org", theologicalNotes: "PCA. Pastor Greg Pate. Westminster Standards.", description: "A PCA congregation in Notasulga, AL." },
  { id: 22904, address: "100 Crescent Hill Dr", city: "Selma", zip: "36701", website: "https://ncpcselma.org", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Selma, AL on Crescent Hill Drive." },
  { id: 22829, address: "11107 US Highway 29 S", city: "Union Springs", zip: "36089", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation south of Union Springs, AL on US Highway 29." },
  { id: 22870, address: "Water Ave", city: "Uniontown", zip: "36786", theologicalNotes: "PCA. Church built 1914. Listed on National Register of Historic Places. Westminster Standards.", description: "A historic PCA congregation in Uniontown, AL, built in 1914 and listed on the NRHP." },
  { id: 22925, address: "2374 Talucah Rd", city: "Valhermoso Springs", zip: "35775", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Valhermoso Springs, AL." },
  { id: 22933, address: "8780 Coosa County Rd 56", city: "Weogufka", zip: "35183", theologicalNotes: "PCA. Pastor Rev. Jim Shaw. Established 1858. Westminster Standards.", description: "A historic PCA congregation established in 1858 in Weogufka, AL." },
  { id: 22849, address: "500 Country Club Rd", city: "York", zip: "36925", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in York, AL." },

  // === AR Batch 1 (Haiku) ===
  { id: 22950, address: "836 Shady Grove Rd", city: "Hot Springs", zip: "71901", theologicalNotes: "PCA. Pastor Rev. Scott Davis. Westminster Standards.", description: "A PCA congregation in Hot Springs, AR (also listed as Bryant campus)." },
  { id: 22948, address: "220 N Main St", city: "Clarendon", zip: "72029", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Clarendon, AR." },
  { id: 22942, address: "1065 Clayton St", city: "Conway", zip: "72032", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Conway, AR." },
  { id: 22943, address: "227 W Dickson St", city: "Fayetteville", zip: "72701", theologicalNotes: "PCA. Pastor Dr. Hunter M. Bailey. Located on the downtown Fayetteville city square. Westminster Standards.", description: "A PCA congregation on the downtown square in Fayetteville, AR." },
  { id: 22944, address: "4511 W Wedington Dr", city: "Fayetteville", zip: "72704", theologicalNotes: "PCA. Pastor Dr. Paul Sagan (since 1986). Westminster Standards.", description: "A PCA congregation in Fayetteville, AR. Pastor Sagan has served since 1986." },
  { id: 22945, address: "120 N 9th St", city: "Fort Smith", zip: "72901", theologicalNotes: "PCA. Pastor Rev. John Clayton. Westminster Standards.", description: "A PCA congregation in Fort Smith, AR." },
  { id: 25798, address: "111 S Broadway St", city: "Heber Springs", zip: "72543", phone: "(501) 250-2600", theologicalNotes: "Reformed. Westminster Standards.", description: "A Reformed congregation in Heber Springs, AR." },

  // === AR Batch 2 (Haiku) ===
  { id: 22949, address: "836 Shady Grove Rd", city: "Hot Springs", zip: "71901", theologicalNotes: "PCA. Pastor Rev. Scott Davis. Westminster Standards.", description: "Hope Church Hot Springs campus in Hot Springs, AR." },
  { id: 22946, address: "1 Covenant Dr", city: "Little Rock", zip: "72211", theologicalNotes: "PCA. Pastor Tim J. Reed. Westminster Standards.", description: "A PCA congregation in Little Rock, AR on Covenant Drive." },
  { id: 22941, address: "1921 Arch St", city: "Little Rock", zip: "72202", theologicalNotes: "PCA. Mission church in historic Central Presbyterian building. Westminster Standards.", description: "A PCA mission church in Little Rock, AR." },
  { id: 22953, address: "5891 Bellview Rd", city: "Rogers", zip: "72758", theologicalNotes: "PCA. Pastor Rev. Christopher A. Miller. Westminster Standards.", description: "A PCA congregation in Rogers, AR." },
  { id: 22947, address: "2810 S Knoxville Ave", city: "Russellville", zip: "72802", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Russellville, AR." },
  { id: 22952, address: "398 Bear Paw Rd", city: "Sherwood", zip: "72120", theologicalNotes: "PCA. Pastor Rev. Brad DeVries. Westminster Standards.", description: "A PCA congregation in Sherwood, AR." },
  { id: 22951, address: "540 E Twin Springs St", city: "Siloam Springs", zip: "72761", theologicalNotes: "PCA. Pastor Rev. Theodore T. Wenger. Westminster Standards.", description: "A PCA congregation in Siloam Springs, AR." },
]

async function main() {
  let count = 0
  for (const update of updates) {
    const { id, ...data } = update
    try {
      await prisma.church.update({ where: { id }, data: data as any })
      count++
      console.log(`Updated ${id}: ${(update as any).city || ''} ${(update as any).address || ''}`)
    } catch (e: any) {
      console.error(`Failed ${id}: ${e.message}`)
    }
  }
  console.log(`\nUpdated ${count} churches`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
