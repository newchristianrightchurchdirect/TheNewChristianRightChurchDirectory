import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const churches = [
  // ALABAMA
  { name: "Christ Church Branchville", denomination: "Non-Denominational", address: "Odenville", city: "Odenville", state: "AL", zip: "35120", latitude: 33.6773, longitude: -86.3961, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastors/Elders: Keith Diamond, Ted Phillips.", description: "A postmillennial church in Odenville, AL.", approved: true },

  // ALASKA
  { name: "Covenant Bible Church", denomination: "Non-Denominational", address: "Palmer", city: "Palmer", state: "AK", zip: "99645", latitude: 61.5994, longitude: -149.1127, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Jack Phelps.", description: "A covenant Bible church in Palmer, AK.", approved: true },
  { name: "Valley Fellowship", denomination: "Non-Denominational", address: "Wasilla", city: "Wasilla", state: "AK", zip: "99654", latitude: 61.5814, longitude: -149.4394, zionistStance: "unknown", theologicalNotes: "Postmillennial. Listed on postmillennial church directory.", description: "A postmillennial fellowship in Wasilla, AK.", approved: true },

  // ARIZONA
  { name: "Grace Christian Fellowship", denomination: "Non-Denominational", address: "Queen Creek", city: "Queen Creek", state: "AZ", zip: "85142", latitude: 33.2487, longitude: -111.6343, zionistStance: "unknown", theologicalNotes: "Postmillennial. Elder Mike Schlauder.", description: "A postmillennial church in Queen Creek, AZ.", approved: true },

  // ARKANSAS
  { name: "Covenant Reformed Church", denomination: "Reformed", address: "Heber Springs", city: "Heber Springs", state: "AR", zip: "72543", latitude: 35.4915, longitude: -92.0310, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Bran Sneed.", description: "A Reformed church in Heber Springs, AR.", approved: true },

  // CALIFORNIA
  { name: "Hinkley Bible Church", denomination: "Non-Denominational", address: "Hinkley", city: "Hinkley", state: "CA", zip: "92347", latitude: 34.9414, longitude: -117.2044, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Robert McDonell.", description: "A Bible church in Hinkley, CA.", approved: true },
  { name: "Los Angeles Reformed Presbyterian Church", denomination: "RPCNA", address: "Los Angeles", city: "Los Angeles", state: "CA", zip: "90001", latitude: 34.0522, longitude: -118.2437, zionistStance: "unknown", theologicalNotes: "RPCNA. Pastor Nathan Eshelman. Postmillennial.", description: "An RPCNA congregation in Los Angeles, CA.", approved: true },
  { name: "Reformed Heritage Church", denomination: "Reformed", address: "Los Gatos", city: "Los Gatos", state: "CA", zip: "95030", latitude: 37.2266, longitude: -121.9746, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Gary Wagner.", description: "A Reformed church in Los Gatos, CA.", approved: true },
  { name: "Covenant Church", denomination: "Non-Denominational", address: "Mentone", city: "Mentone", state: "CA", zip: "92359", latitude: 34.0702, longitude: -117.1256, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Aaron Hebbard.", description: "A covenant church in Mentone, CA.", approved: true },
  { name: "St. Elijah's Reformed Worship", denomination: "Reformed", address: "Newark", city: "Newark", state: "CA", zip: "94560", latitude: 37.5297, longitude: -122.0402, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Troy Martin.", description: "A Reformed worship community in Newark, CA.", approved: true },
  { name: "Grace Presbyterian Church of Redding", denomination: "Presbyterian", address: "Redding", city: "Redding", state: "CA", zip: "96001", latitude: 40.5865, longitude: -122.3917, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor David Stark.", description: "A Presbyterian church in Redding, CA.", approved: true },
  { name: "Covenant Reformed Presbyterian Church", denomination: "RPCGA", address: "Sacramento", city: "Sacramento", state: "CA", zip: "95814", latitude: 38.5816, longitude: -121.4944, zionistStance: "unknown", theologicalNotes: "RPCGA. Postmillennial. Pastor Jim West.", description: "A Reformed Presbyterian church in Sacramento, CA.", approved: true },
  { name: "Christ Covenant Church Somis", denomination: "Reformed", address: "Somis", city: "Somis", state: "CA", zip: "93066", latitude: 34.2747, longitude: -119.0095, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Ben Alexander.", description: "A Reformed church in Somis, CA.", approved: true },
  { name: "Trinity Covenant Church", denomination: "Non-Denominational", address: "Terra Bella", city: "Terra Bella", state: "CA", zip: "93270", latitude: 35.9621, longitude: -119.0443, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Jim Steed.", description: "A covenant church in Terra Bella, CA.", approved: true },
  { name: "Iglesia Bautista Nueva Esperanza", denomination: "Baptist", address: "Woodland", city: "Woodland", state: "CA", zip: "95695", latitude: 38.6785, longitude: -121.7733, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor William Garcia. Spanish-speaking Reformed Baptist.", description: "A Spanish-speaking Baptist church in Woodland, CA.", approved: true },

  // COLORADO
  { name: "L2 Church", denomination: "Non-Denominational", address: "Denver", city: "Denver", state: "CO", zip: "80202", latitude: 39.7392, longitude: -104.9903, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Dr. Russ McKendry.", description: "A postmillennial church in Denver, CO.", approved: true },
  { name: "Redemption Church Denver", denomination: "Non-Denominational", address: "Denver", city: "Denver", state: "CO", zip: "80202", latitude: 39.7392, longitude: -104.9903, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor James Rathmann.", description: "A postmillennial church in Denver, CO.", approved: true },
  { name: "Trinity Church Denver", denomination: "Non-Denominational", address: "Denver", city: "Denver", state: "CO", zip: "80202", latitude: 39.7392, longitude: -104.9903, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Brian Brown.", description: "A postmillennial church in Denver, CO.", approved: true },
  { name: "Providence Reformed Evangelical Church", denomination: "Reformed", address: "Grand Junction", city: "Grand Junction", state: "CO", zip: "81501", latitude: 39.0639, longitude: -108.5506, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Michael Denna.", description: "A Reformed church in Grand Junction, CO.", approved: true },

  // FLORIDA
  { name: "Christ Church Lakeland", denomination: "Reformed", address: "Lakeland", city: "Lakeland", state: "FL", zip: "33801", latitude: 28.0395, longitude: -81.9498, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Steven Wedgeworth.", description: "A Reformed church in Lakeland, FL.", approved: true },
  { name: "Sharon Orthodox Presbyterian Church", denomination: "OPC", address: "Miami Lakes", city: "Miami Lakes", state: "FL", zip: "33014", latitude: 25.9087, longitude: -80.3209, zionistStance: "unknown", theologicalNotes: "OPC. Pastor Dr. Jeffrey K. Boer. Postmillennial directory listed.", description: "An OPC congregation in Miami Lakes, FL.", approved: true },
  { name: "Solid Rock Worship Center", denomination: "Non-Denominational", address: "Mount Dora", city: "Mount Dora", state: "FL", zip: "32757", latitude: 28.8025, longitude: -81.6445, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Larry Stutzman.", description: "A postmillennial church in Mount Dora, FL.", approved: true },

  // GEORGIA
  { name: "Atlanta Presbyterian Fellowship", denomination: "RPCNA", address: "Atlanta", city: "Atlanta", state: "GA", zip: "30301", latitude: 33.7490, longitude: -84.3880, zionistStance: "unknown", theologicalNotes: "RPCNA. Pastor Dr. Frank Smith. Postmillennial.", description: "An RPCNA fellowship in Atlanta, GA.", approved: true },
  { name: "Chalcedon Presbyterian Church", denomination: "Presbyterian", address: "Cumming", city: "Cumming", state: "GA", zip: "30040", latitude: 34.2073, longitude: -84.1402, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Tim Price. Named after R.J. Rushdoony's Chalcedon Foundation — Christian Reconstructionist.", description: "A Presbyterian church in Cumming, GA with Reconstructionist roots.", approved: true },
  { name: "Heritage Presbyterian Church", denomination: "Presbyterian", address: "Cumming", city: "Cumming", state: "GA", zip: "30040", latitude: 34.2073, longitude: -84.1402, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Joe Morecraft III — prominent Christian Reconstructionist, theonomist.", description: "A Presbyterian church in Cumming, GA led by Joe Morecraft III.", approved: true },
  { name: "Bethany Baptist Church", denomination: "Baptist", address: "Tennille", city: "Tennille", state: "GA", zip: "31089", latitude: 32.9360, longitude: -82.8110, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor/Elder Brant Kennedy.", description: "A Baptist church in Tennille, GA.", approved: true },

  // IDAHO
  { name: "Vertical Church", denomination: "Non-Denominational", address: "Boise", city: "Boise", state: "ID", zip: "83702", latitude: 43.6150, longitude: -116.2023, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Matt.", description: "A postmillennial church in Boise, ID.", approved: true },
  { name: "The Well", denomination: "Non-Denominational", address: "Boise", city: "Boise", state: "ID", zip: "83702", latitude: 43.6150, longitude: -116.2023, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Josh Bales.", description: "A postmillennial church in Boise, ID.", approved: true },
  { name: "The Potter's Clay Church", denomination: "Non-Denominational", address: "Hazelton", city: "Hazelton", state: "ID", zip: "83335", latitude: 42.5938, longitude: -114.1368, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor J Mark Johnson.", description: "A postmillennial church in Hazelton, ID.", approved: true },

  // IOWA
  { name: "Crossroad Church", denomination: "Non-Denominational", address: "Earlham", city: "Earlham", state: "IA", zip: "50072", latitude: 41.4917, longitude: -94.1241, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Grant Brown.", description: "A postmillennial church in Earlham, IA.", approved: true },

  // ILLINOIS
  { name: "Christ Covenant Church CRPC", denomination: "CRPC", address: "Durand", city: "Durand", state: "IL", zip: "61024", latitude: 42.4367, longitude: -89.3315, zionistStance: "unknown", theologicalNotes: "CRPC. Postmillennial. Pastor Dan Gibson.", description: "A CRPC church in Durand, IL.", approved: true },
  { name: "Fox Lake Community Church", denomination: "Non-Denominational", address: "Fox Lake", city: "Fox Lake", state: "IL", zip: "60020", latitude: 42.3967, longitude: -88.1834, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Wayne Christensen.", description: "A postmillennial church in Fox Lake, IL.", approved: true },
  { name: "Princeville Presbyterian Church", denomination: "Presbyterian", address: "Princeville", city: "Princeville", state: "IL", zip: "61559", latitude: 40.9298, longitude: -89.7579, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Nathan Riese.", description: "A Presbyterian church in Princeville, IL.", approved: true },

  // INDIANA
  { name: "Trinity Evangelical Church", denomination: "Evangelical", address: "Larwill", city: "Larwill", state: "IN", zip: "46764", latitude: 41.1717, longitude: -85.6261, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Nate Harlan.", description: "An evangelical church in Larwill, IN.", approved: true },

  // KANSAS
  { name: "Christ Church Leavenworth", denomination: "Reformed", address: "Leavenworth", city: "Leavenworth", state: "KS", zip: "66048", latitude: 39.3112, longitude: -94.9224, zionistStance: "unknown", theologicalNotes: "Postmillennial. Elder Daniel Spratt.", description: "A Reformed church in Leavenworth, KS.", approved: true },

  // LOUISIANA
  { name: "The Parish of the Redeemer", denomination: "Anglican", address: "Calhoun", city: "Calhoun", state: "LA", zip: "71225", latitude: 32.5096, longitude: -92.3482, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Trey Fisher.", description: "An Anglican parish in Calhoun, LA.", approved: true },

  // MAINE
  { name: "Christ Reformed Church", denomination: "Reformed", address: "Oakland", city: "Oakland", state: "ME", zip: "04963", latitude: 44.5401, longitude: -69.7220, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Chris Boland.", description: "A Reformed church in Oakland, ME.", approved: true },

  // MISSISSIPPI
  { name: "Sunrise Baptist Church", denomination: "Baptist", address: "Petal", city: "Petal", state: "MS", zip: "39465", latitude: 31.3496, longitude: -89.2606, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Blake McDaniel.", description: "A Baptist church in Petal, MS.", approved: true },

  // MISSOURI
  { name: "Sadler Chapel Church", denomination: "Non-Denominational", address: "Dexter", city: "Dexter", state: "MO", zip: "63841", latitude: 36.7959, longitude: -89.9579, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Joseph Myers.", description: "A postmillennial church in Dexter, MO.", approved: true },
  { name: "Hope Baptist Church", denomination: "Baptist", address: "Springfield", city: "Springfield", state: "MO", zip: "65802", latitude: 37.2090, longitude: -93.2923, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Joshua Jenkins.", description: "A Baptist church in Springfield, MO.", approved: true },

  // MONTANA
  { name: "Cornerstone Bible Church", denomination: "Non-Denominational", address: "Great Falls", city: "Great Falls", state: "MT", zip: "59401", latitude: 47.5002, longitude: -111.3008, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Joseph Moyer.", description: "A Bible church in Great Falls, MT.", approved: true },

  // NEW MEXICO
  { name: "Immanuel Baptist Church", denomination: "Baptist", address: "Tucumcari", city: "Tucumcari", state: "NM", zip: "88401", latitude: 35.1717, longitude: -103.7250, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Gordan Runyan.", description: "A Baptist church in Tucumcari, NM.", approved: true },

  // NEW YORK
  { name: "Fellowship Baptist Church", denomination: "Baptist", address: "Brooklyn", city: "Brooklyn", state: "NY", zip: "11201", latitude: 40.6782, longitude: -73.9442, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Robert Rubino.", description: "A Baptist church in Brooklyn, NY.", approved: true },
  { name: "Grace Bible Fellowship", denomination: "Non-Denominational", address: "Canastota", city: "Canastota", state: "NY", zip: "13032", latitude: 43.0795, longitude: -75.7507, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Mark Wilson.", description: "A Bible fellowship in Canastota, NY.", approved: true },
  { name: "Christ Covenant Church Copiague", denomination: "Reformed", address: "Copiague", city: "Copiague", state: "NY", zip: "11726", latitude: 40.6815, longitude: -73.3998, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Brian L. Penney.", description: "A Reformed church in Copiague, NY.", approved: true },
  { name: "East Syracuse House Church", denomination: "Non-Denominational", address: "East Syracuse", city: "East Syracuse", state: "NY", zip: "13057", latitude: 43.0654, longitude: -76.0785, zionistStance: "unknown", theologicalNotes: "Postmillennial. Overseer John Giordano. House church model.", description: "A postmillennial house church in East Syracuse, NY.", approved: true },

  // NORTH CAROLINA
  { name: "Christ Reformed Fellowship", denomination: "Reformed", address: "Garner", city: "Garner", state: "NC", zip: "27529", latitude: 35.7113, longitude: -78.6142, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Ken Cheeseman.", description: "A Reformed fellowship in Garner, NC.", approved: true },
  { name: "Covenant Reformed Presbyterian Church", denomination: "RPCGA", address: "Graham", city: "Graham", state: "NC", zip: "27253", latitude: 36.0690, longitude: -79.4006, zionistStance: "unknown", theologicalNotes: "RPCGA. Postmillennial. Pastor John M. Otis.", description: "An RPCGA church in Graham, NC.", approved: true },
  { name: "Mint Hill Presbyterian Church", denomination: "Presbyterian", address: "Mint Hill", city: "Mint Hill", state: "NC", zip: "28227", latitude: 35.1796, longitude: -80.6462, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Aaron Opgenorth.", description: "A Presbyterian church in Mint Hill, NC.", approved: true },

  // OHIO
  { name: "Knox Presbyterian Church", denomination: "Presbyterian", address: "Mt. Vernon", city: "Mount Vernon", state: "OH", zip: "43050", latitude: 40.3934, longitude: -82.4857, zionistStance: "unknown", theologicalNotes: "Postmillennial. Listed on postmillennial church directory.", description: "A Presbyterian church in Mount Vernon, OH.", approved: true },

  // OREGON
  { name: "Christ The King Church Coburg", denomination: "Non-Denominational", address: "Coburg", city: "Coburg", state: "OR", zip: "97408", latitude: 44.1376, longitude: -123.0667, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor John Dekker.", description: "A postmillennial church in Coburg, OR.", approved: true },
  { name: "Myrtle Creek Church of the Nazarene", denomination: "Church of the Nazarene", address: "Myrtle Creek", city: "Myrtle Creek", state: "OR", zip: "97457", latitude: 42.9687, longitude: -123.2937, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Guy Cooksey.", description: "A Church of the Nazarene in Myrtle Creek, OR.", approved: true },
  { name: "Christ Covenant Church Rogue River", denomination: "Reformed", address: "Rogue River", city: "Rogue River", state: "OR", zip: "97537", latitude: 42.4360, longitude: -123.1720, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Kenny Anderson.", description: "A Reformed church in Rogue River, OR.", approved: true },

  // PENNSYLVANIA
  { name: "All Saints' Church", denomination: "Reformed", address: "Brownstown", city: "Brownstown", state: "PA", zip: "17508", latitude: 40.1240, longitude: -76.2152, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Gregg Strawbridge.", description: "A Reformed church in Brownstown, PA.", approved: true },
  { name: "St. John's Reformed Church", denomination: "Reformed", address: "Friedensburg", city: "Friedensburg", state: "PA", zip: "17933", latitude: 40.6076, longitude: -76.2463, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Matt Kenitzer.", description: "A Reformed church in Friedensburg, PA.", approved: true },

  // SOUTH CAROLINA
  { name: "Reedy River Presbyterian Church", denomination: "Presbyterian", address: "Conestee", city: "Conestee", state: "SC", zip: "29636", latitude: 34.7573, longitude: -82.3579, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Dr. Charles Roberts.", description: "A Presbyterian church in Conestee, SC.", approved: true },
  { name: "Foothills Christian Assembly", denomination: "Non-Denominational", address: "Edgefield", city: "Edgefield", state: "SC", zip: "29824", latitude: 33.7896, longitude: -81.9296, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Matthew Clark.", description: "A postmillennial church in Edgefield, SC.", approved: true },

  // TENNESSEE
  { name: "Columbia Bible Assembly", denomination: "Non-Denominational", address: "Columbia", city: "Columbia", state: "TN", zip: "38401", latitude: 35.6151, longitude: -87.0353, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastors Perry Coghlan, Dan Eby.", description: "A Bible assembly in Columbia, TN.", approved: true },
  { name: "Christ Reformed Presbyterian Mission", denomination: "Reformed Presbyterian", address: "Paris", city: "Paris", state: "TN", zip: "38242", latitude: 36.3020, longitude: -88.3268, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Paul McDade.", description: "A Reformed Presbyterian mission in Paris, TN.", approved: true },

  // TEXAS
  { name: "Christ Covenant Church Alvin", denomination: "Reformed", address: "Alvin", city: "Alvin", state: "TX", zip: "77511", latitude: 29.4239, longitude: -95.2441, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Russell Traweek.", description: "A Reformed church in Alvin, TX.", approved: true },
  { name: "Church on the Square", denomination: "Non-Denominational", address: "Georgetown", city: "Georgetown", state: "TX", zip: "78626", latitude: 30.6327, longitude: -97.6770, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Bradley Helgerson.", description: "A postmillennial church in Georgetown, TX.", approved: true },
  { name: "Saint David's Church of Hockley", denomination: "Non-Denominational", address: "Hockley", city: "Hockley", state: "TX", zip: "77447", latitude: 30.0202, longitude: -95.8141, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Adam McIntosh.", description: "A postmillennial church in Hockley, TX.", approved: true },
  { name: "Christ Fellowship Church Taylor", denomination: "Non-Denominational", address: "Taylor", city: "Taylor", state: "TX", zip: "76574", latitude: 30.5708, longitude: -97.4092, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Jeff Ripple.", description: "A postmillennial church in Taylor, TX.", approved: true },

  // VIRGINIA
  { name: "Reformed Bible Church in Central Virginia", denomination: "Reformed", address: "Appomattox", city: "Appomattox", state: "VA", zip: "24522", latitude: 37.3768, longitude: -78.8253, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Paul Michael Raymond. Christian Reconstructionist.", description: "A Reformed church in Appomattox, VA.", approved: true },
  { name: "Warm Springs Presbyterian Church", denomination: "EPC", address: "Warm Springs", city: "Warm Springs", state: "VA", zip: "24484", latitude: 38.0460, longitude: -79.7898, zionistStance: "unknown", theologicalNotes: "EPC. Postmillennial. Pastor Rev. Marty Fields.", description: "An EPC church in Warm Springs, VA.", approved: true },
  { name: "Providence Reformed Presbyterian Church Wytheville", denomination: "Reformed Presbyterian", address: "Wytheville", city: "Wytheville", state: "VA", zip: "24382", latitude: 36.9487, longitude: -81.0848, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Rev. Jeff Black.", description: "A Reformed Presbyterian church in Wytheville, VA.", approved: true },
  { name: "Trinity Presbyterian Church Tazewell", denomination: "Presbyterian", address: "Tazewell", city: "Tazewell", state: "VA", zip: "24651", latitude: 37.1146, longitude: -81.5198, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Rev. Henry Johnson.", description: "A Presbyterian church in Tazewell, VA.", approved: true },

  // WASHINGTON
  { name: "Trinitas Presbyterian Church", denomination: "Presbyterian", address: "Mill Creek", city: "Mill Creek", state: "WA", zip: "98012", latitude: 47.8601, longitude: -122.2043, zionistStance: "unknown", theologicalNotes: "Postmillennial. Pastor Brant Bosserman.", description: "A Presbyterian church in Mill Creek, WA.", approved: true },
]

async function main() {
  let added = 0
  let skipped = 0
  for (const church of churches) {
    const existing = await prisma.church.findFirst({
      where: { name: church.name, state: church.state },
    })
    if (existing) {
      console.log(`SKIP: "${church.name}" (${church.state}) — already exists (id: ${existing.id})`)
      skipped++
      continue
    }
    const created = await prisma.church.create({ data: church })
    console.log(`ADD: "${created.name}" — ${created.city}, ${created.state} (id: ${created.id})`)
    added++
  }
  console.log(`\nDone. Added: ${added}, Skipped: ${skipped}`)
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
