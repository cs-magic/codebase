import { prisma } from "@cs-magic/common/server"

export const getConvRow = async (message: { convId: string }) => {
  return prisma.wechatConv.findUnique({
    where: { id: message.convId },
  })
}
