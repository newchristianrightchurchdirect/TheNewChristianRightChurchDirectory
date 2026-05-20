import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const updates: any[] = [
  // === FL Batch 2 ===
  { id: 23135, address: "4295 Garden St", zip: "32796", theologicalNotes: "PCA. Pastor Daniel Levi. Westminster Standards.", description: "A PCA congregation in Titusville, FL." },
  { id: 23136, address: "1603 SW 122nd St", zip: "32607", theologicalNotes: "PCA. Pastor Tim Hayse. Westminster Standards.", description: "A PCA congregation in Gainesville, FL." },
  { id: 23137, address: "10101 Barefoot Lake Dr", zip: "33449", theologicalNotes: "PCA. Pastor Rev. Peter A. Bartuska. Westminster Standards.", description: "A PCA congregation in Wellington, FL (Palm Beach area)." },
  { id: 23138, address: "2310 Nursery Rd", zip: "33764", theologicalNotes: "PCA. Pastor Bob Brubaker. Westminster Standards.", description: "A PCA congregation in Clearwater, FL." },
  { id: 23139, address: "6565 S Florida Ave", zip: "33813", theologicalNotes: "PCA. Pastor Lyle Caswell. Westminster Standards.", description: "A PCA congregation in Lakeland, FL." },
  { id: 23140, address: "4700 SW 188th Ave", zip: "33332", theologicalNotes: "PCA. Pastor Rev. Brian L. Kelso. Westminster Standards.", description: "A PCA congregation in Southwest Ranches, FL." },
  { id: 23141, address: "601 Woodbury Rd", zip: "32828", theologicalNotes: "PCA. Pastor Rev. Michael Scott Puckett. Westminster Standards.", description: "A PCA congregation in Orlando, FL." },
  { id: 23142, address: "5400 Seminole Blvd", zip: "33776", theologicalNotes: "PCA. Pastor Samuel Lee Brewer Jr. (installed October 2024). Westminster Standards.", description: "A PCA congregation in Seminole, FL." },
  { id: 23143, address: "4050 77th Street", zip: "32967", theologicalNotes: "PCA. Pastor Glenn Grevengoed. Westminster Standards.", description: "A PCA congregation in Vero Beach, FL." },
  { id: 23144, address: "1204 SW Del Rio Blvd", zip: "34953", theologicalNotes: "PCA. Pastor Jason Paugh. Westminster Standards.", description: "A PCA congregation in Port St Lucie, FL." },

  // === GA Batch 2 ===
  { id: 23295, address: "4241 Central Church Road", zip: "30135", theologicalNotes: "PCA. Pastor Rev. Thomas L. Myers. Westminster Standards.", description: "A PCA congregation in Douglasville, GA." },
  { id: 23296, address: "93 Main Street", zip: "31408", theologicalNotes: "PCA. Pastor Daren L. Russell. Westminster Standards.", description: "A PCA congregation in Garden City, GA (Savannah area)." },
  { id: 23297, address: "3800 Lenora Church Road", zip: "30039", theologicalNotes: "PCA. Pastor Robert Thompson. Westminster Standards.", description: "A PCA congregation in Snellville, GA." },
  { id: 23298, address: "3371 Chattanooga Valley Road", zip: "30725", theologicalNotes: "PCA. Pastor Eric Irwin. Westminster Standards.", description: "A PCA congregation in Flintstone, GA (Chattanooga Valley)." },
  { id: 23299, address: "1498 Johnson Brady Road", zip: "30115", theologicalNotes: "PCA. Pastor Clif Daniell. Westminster Standards.", description: "A PCA congregation in Canton, GA." },
  { id: 23300, address: "4675 Winder Highway", zip: "30542", theologicalNotes: "PCA. Pastor Steven Clark. Westminster Standards.", description: "A PCA congregation in Flowery Branch, GA." },
  { id: 23301, address: "4201 Southern Pines Drive", zip: "30809", theologicalNotes: "PCA. Pastor Rev. Robbie Hendrick. Westminster Standards.", description: "A PCA congregation in Evans, GA (Augusta area)." },
  { id: 23302, address: "1410 Flat Shoals Road", zip: "30013", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Conyers, GA." },
  { id: 23303, address: "4255 Wade Green Road NW, Suite 515", zip: "30144", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Kennesaw, GA." },
  { id: 23304, address: "890 Boulevard", zip: "30606", theologicalNotes: "PCA. Pastor Matt Adair. Westminster Standards.", description: "A PCA congregation in Athens, GA." },

  // === CA Batch 2 ===
  { id: 22980, address: "9015 S Gale Ridge Rd", zip: "94582", theologicalNotes: "PCA. Pastor Travis Marsh. Westminster Standards.", description: "A PCA congregation in San Ramon, CA." },
  // 22981 skipped - could not be located
  { id: 22982, address: "12500 Sand Canyon Ave", zip: "92618", theologicalNotes: "PCA. Pastor Rev. Michael Preciado. Westminster Standards.", description: "A PCA congregation in Irvine, CA." },
  { id: 22983, address: "4098 Calle Tesoro, Suite D", city: "Camarillo", zip: "93012", theologicalNotes: "PCA. Westminster Standards. Church meets in Camarillo.", description: "A PCA congregation meeting in Camarillo, CA (Ventura County)." },
  { id: 22984, address: "26109 Ynez Rd", city: "Temecula", zip: "92591", theologicalNotes: "PCA. Pastor Rev. Robert Recio. Westminster Standards.", description: "A PCA congregation in Temecula, CA (Murrieta area)." },
  { id: 22985, address: "36 E Victoria St", theologicalNotes: "PCA. Assistant Pastor Nick Whitaker. Westminster Standards.", description: "A PCA congregation in Santa Barbara, CA." },
  { id: 22986, address: "4235 Las Virgenes Rd", zip: "91302", theologicalNotes: "PCA. Currently seeking Senior Pastor. Westminster Standards.", description: "A PCA congregation in Calabasas, CA." },
  // 22987 skipped - City Light Church closed October 2025
  { id: 22988, address: "2958 59th St", zip: "95817", theologicalNotes: "PCA. Pastors Brad Carpenter and Daniel Yoon. Westminster Standards.", description: "A PCA congregation in Sacramento, CA." },
  { id: 22989, address: "18100 Dumont Ave", zip: "90703", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Cerritos, CA." },

  // === NC Batch 2 ===
  { id: 23819, address: "3646 Central Avenue", zip: "28205", theologicalNotes: "PCA. Senior Pastor Tony Myles. Westminster Standards.", description: "A PCA congregation in Charlotte, NC." },
  { id: 23820, address: "1004 N Mangum Street", zip: "27701", theologicalNotes: "PCA. Pastoral team: Daniel Mason, Rev. Dr. Evan Marbury, Timothy Price. Westminster Standards.", description: "A PCA congregation in Durham, NC." },
  { id: 23821, address: "901 E Catawba Street", zip: "28012", theologicalNotes: "PCA. Pastor Rev. Raymond E. Kruntorad. Westminster Standards.", description: "A PCA congregation in Belmont, NC." },
  { id: 23822, address: "421 W Smith Street", zip: "27401", theologicalNotes: "PCA. Senior Pastor Jeff Miller. Westminster Standards.", description: "A PCA congregation in Greensboro, NC." },
  { id: 23823, address: "200 S Elliott Road", zip: "27514", theologicalNotes: "PCA. Pastor Byron Peters. Founded 2005. Meets at Blue Hill Event Center. Westminster Standards.", description: "A PCA congregation in Chapel Hill, NC, meeting at Blue Hill Event Center." },
  { id: 23824, address: "800 Fullwood Lane", zip: "28105", theologicalNotes: "PCA. Senior Pastor Dr. Kevin DeYoung. Westminster Standards.", description: "A PCA congregation in Matthews, NC. Pastor Kevin DeYoung is a well-known Reformed author and theologian." },
  { id: 23825, address: "203 Capcom Avenue, Suite 114", zip: "27587", theologicalNotes: "PCA. Associate Pastor Rev. Tim Sharpe. Westminster Standards.", description: "A PCA congregation in Wake Forest, NC." },
  { id: 23826, address: "2172 N Salem Street", zip: "27523", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Apex, NC." },
  { id: 23827, address: "4889 Old Tar Road", city: "Winterville", zip: "28590", theologicalNotes: "PCA. Lead Pastor Dave Osborne. Westminster Standards.", description: "A PCA congregation in Winterville, NC (serving Greenville area)." },
  { id: 23828, address: "500 Kenwood Avenue", zip: "28405", theologicalNotes: "PCA. Pastor Rev. Jim Petty. Westminster Standards.", description: "A PCA congregation in Wilmington, NC." },

  // === SC Batch 1 ===
  { id: 22776, address: "408 Coker Ave", zip: "29550", theologicalNotes: "Reformed Baptist. Pastor Brad Jordan.", description: "A Reformed Baptist congregation in Hartsville, SC." },
  { id: 24188, address: "245 South Means Street", zip: "29130", theologicalNotes: "PCA. Pastor Erwin Threatt. Westminster Standards.", description: "A PCA congregation in Ridgeway, SC." },
  { id: 24189, address: "104 S Rosemary Ave", zip: "29510", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Andrews, SC." },
  { id: 24190, address: "3600 SC-417", zip: "29388", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Woodruff, SC." },
  { id: 24191, address: "1403 Beech Street", zip: "29340", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Gaffney, SC." },
  { id: 24192, address: "2445 Hwy 557", zip: "29710", theologicalNotes: "PCA. Pastor Rev. Chris Donnelly. Westminster Standards.", description: "A PCA congregation in Clover, SC." },
  { id: 24193, address: "2094 N Highway 101", zip: "29651", theologicalNotes: "PCA. Pastor Dr. Renton Rathbun. Westminster Standards.", description: "A PCA congregation in Greer, SC." },
  { id: 24194, address: "441 Rimer Pond Rd", zip: "29016", theologicalNotes: "PCA. Pastor Frank Rhett Sanders Jr. Westminster Standards.", description: "A PCA congregation in Blythewood, SC." },
  { id: 24195, address: "7386 Lockhart Rd", zip: "29745", theologicalNotes: "PCA. Westminster Standards.", description: "A PCA congregation in Sharon, SC." },
  { id: 24196, address: "9201 Old White Horse Rd", zip: "29617", theologicalNotes: "PCA. Pastor Rev. Stevens Decherd. Westminster Standards.", description: "A PCA congregation in Greenville, SC." },
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
