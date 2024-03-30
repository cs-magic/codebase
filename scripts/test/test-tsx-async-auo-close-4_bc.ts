import { prisma } from "../../packages/common-db/providers/prisma"

void prisma.wechatArticle.findFirst().then(async () => {
  console.log("disconnecting")
  await prisma.$disconnect()
  console.log("disconnected")
})
