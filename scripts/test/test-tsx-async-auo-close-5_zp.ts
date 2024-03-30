import { prisma } from "../../packages/common-db/providers/prisma"

void prisma.wechatArticle.findFirst().then(async () => {
  console.log("disconnecting")
  await prisma.$disconnect()
  console.log("disconnected")

  // 添加更多的调试信息
  console.log("Active handles:")
  // @ts-ignore
  process._getActiveHandles().forEach((handle) => {
    console.log(handle.name)
  })
  console.log("Active requests:")
  // @ts-ignore
  process._getActiveRequests().forEach((request) => {
    console.log(request)
  })
})

process.on("beforeExit", (code) => {
  console.log(`Process beforeExit event with code: ${code}`)
})

// 如果您想强制退出，可以添加以下代码
// setTimeout(() => {
//   process.exit(0);
// }, 5000);
