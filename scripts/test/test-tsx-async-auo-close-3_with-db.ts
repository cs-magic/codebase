import wtfnode from "wtfnode" // Put this at the very top of your entry script

import { prisma } from "../../packages/common-db/providers/prisma"

void prisma.wechatArticle.findFirst().finally(async () => {
  console.log("disconnecting")
  // await prisma.$disconnect()
  console.log("disconnected")

  wtfnode.dump()
})
