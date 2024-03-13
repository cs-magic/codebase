import { prisma } from "../packages/common-db"

const deleteUser = async () => {
  const userId = process.argv[2]
  if (!userId) return

  const result = await prisma.user.delete({ where: { id: userId } })
  console.log("result: ", result)
}

void deleteUser()
