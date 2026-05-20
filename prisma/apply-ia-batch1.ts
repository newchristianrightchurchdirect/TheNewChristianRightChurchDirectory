import { PrismaClient } from '@prisma/client'
const p = new PrismaClient()
const updates: { id: number; data: any }[] = [
  {
    id: 897,
    data: {
      phone: null,
      theologicalNotes: "Westminster Standards. PCA — covenantal theology rejects dispensationalism. Pastor George Edema."
    }
  },
  {
    id: 3280,
    data: {
      phone: "(515) 834-2626",
      zionistStance: "no",
      theologicalNotes: "Postmillennial. Pastor Grant Brown."
    }
  },
  {
    id: 3616,
    data: {
      phone: "(712) 439-6070",
      theologicalNotes: "Three Forms of Unity. Amillennial. Rejects common grace. Strongly anti-dispensationalist. Pastor Allen Brummel."
    }
  },
  {
    id: 3620,
    data: {
      phone: "(712) 726-3314",
      theologicalNotes: "Three Forms of Unity (Belgic Confession, Heidelberg Catechism, Canons of Dort). Covenant theology. Infant baptism. Amillennial. Pastor D. Kleyn."
    }
  },
  {
    id: 3622,
    data: {
      phone: "(712) 439-1630",
      city: "Hull",
      theologicalNotes: "Three Forms of Unity (Belgic Confession, Heidelberg Catechism, Canons of Dort). Covenant theology. Infant baptism. Amillennial. Pastor Pieter van der Hoek."
    }
  },
  {
    id: 3633,
    data: {
      city: "Garner",
      phone: "(641) 923-3060",
      theologicalNotes: "Three Forms of Unity (Belgic Confession, Heidelberg Catechism, Canons of Dort). Covenant theology. Infant baptism. Amillennial. Pastor Jason Van Wyk."
    }
  },
  {
    id: 3844,
    data: {
      phone: "(712) 439-1283",
      theologicalNotes: "Three Forms of Unity. Amillennial. Rejects common grace. Strongly anti-dispensationalist. Pastor James Laning."
    }
  },
  {
    id: 3869,
    data: {
      phone: "(712) 476-5844",
      theologicalNotes: "Reformed theology. Sovereign grace."
    }
  },
  {
    id: 3871,
    data: {
      phone: "(712) 722-2789",
      theologicalNotes: "Reformed theology. Sovereign grace. Pastor Herman Hofman."
    }
  },
  {
    id: 3904,
    data: {
      phone: "(712) 476-6050",
      theologicalNotes: "Three Forms of Unity (Belgic Confession, Heidelberg Catechism, Canons of Dort). Covenant theology. Infant baptism. Amillennial. Pastor Caleb Castro."
    }
  },
  {
    id: 3905,
    data: {
      phone: "(712) 726-3314",
      theologicalNotes: "Three Forms of Unity (Belgic Confession, Heidelberg Catechism, Canons of Dort). Covenant theology. Infant baptism. Amillennial. Pastor Daniel Hofland."
    }
  },
  {
    id: 3906,
    data: {
      phone: "(712) 722-1965",
      theologicalNotes: "Three Forms of Unity (Belgic Confession, Heidelberg Catechism, Canons of Dort). Covenant theology. Infant baptism. Amillennial. Pastor Jon Bushnell."
    }
  },
  {
    id: 3907,
    data: {
      phone: "(712) 737-8749",
      theologicalNotes: "Three Forms of Unity (Belgic Confession, Heidelberg Catechism, Canons of Dort). Covenant theology. Infant baptism. Amillennial. Pastor Todd De Rooy."
    }
  },
  {
    id: 3908,
    data: {
      phone: "(712) 729-3266",
      theologicalNotes: "Three Forms of Unity (Belgic Confession, Heidelberg Catechism, Canons of Dort). Covenant theology. Infant baptism. Amillennial. Pastor Dan Donovan."
    }
  },
  {
    id: 3910,
    data: {
      phone: "(515) 707-8022",
      theologicalNotes: "Reformed theology. Sovereign grace."
    }
  }
]
async function main() { for (const u of updates) { await p.church.update({ where: { id: u.id }, data: u.data }); console.log(`Updated ${u.id}`) } await p.$disconnect() }
main()
