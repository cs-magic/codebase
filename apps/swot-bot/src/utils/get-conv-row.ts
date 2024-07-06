import { prisma } from "@cs-magic/common/db/providers/prisma/connection"

export const getConvRow = async (message: { convId: string }) => {
  return prisma.wechatConv.findUnique({
    where: { id: message.convId },
  })
}
