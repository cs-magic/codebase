import { db } from "../packages/common/lib/db"

const cleanTable = async () => {
  const tableName = process.argv[2]
  console.log("cleaning table: ", tableName)
  if (!tableName) return

  //@ts-ignore
  const result = await db[tableName].deleteMany()
  console.log("cleaned result: ", result)
}

cleanTable()
