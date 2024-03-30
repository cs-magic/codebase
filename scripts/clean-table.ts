import { prisma } from "../packages/common-db/providers/prisma"

const cleanTable = async () => {
  const tableName = process.argv[2]
  console.log("cleaning table: ", tableName)
  if (!tableName) return

  //@ts-ignore
  const result = await prisma[tableName].deleteMany()
  console.log("cleaned result: ", result)
}

void cleanTable().finally(async () => {
  await prisma.$disconnect()
})
