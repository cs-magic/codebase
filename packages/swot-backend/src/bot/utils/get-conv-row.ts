import { prisma } from "@cs-magic/common/dist/db/prisma.js"

export const getConvRow = async (message: { convId: string }) => {
  return prisma.wechatConv.findUnique({
    where: { id: message.convId },
  })
}
