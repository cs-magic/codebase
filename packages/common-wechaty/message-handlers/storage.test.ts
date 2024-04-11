import { prisma } from "../../common-db/providers/prisma"

const f = async () => {
  console.log("-- querying prisma")
  const message = await prisma.wechatMessage.findMany()
  console.log({ message })
}

void f()
