import { prisma } from "@cs-magic/common/dist/server.js"

export const getConvRow = async (message: { convId: string }) => {
  return prisma.wechatConv.findUnique({
    where: { id: message.convId },
  })
}
