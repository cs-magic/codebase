import { db } from "../packages/common/lib/db"

const initUsers = async () => {
  const res = await db.user.deleteMany()
  console.log({ res })
}

void initUsers()
