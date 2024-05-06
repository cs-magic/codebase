import { Message } from "wechaty"
import { prisma } from "../../../packages-to-classify/db/providers/prisma"

export const getConvRow = async (message: Message) => {
  return prisma.wechatConv.findUnique({
    where: { id: message.conversation().id },
  })
}
