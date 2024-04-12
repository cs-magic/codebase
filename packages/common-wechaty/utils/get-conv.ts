import { Prisma } from "@prisma/client"
import { Message } from "wechaty"
import { prisma } from "../../common-db/providers/prisma"

export const getConvTable = (
  message: Message,
): Prisma.WechatUserDelegate & Prisma.WechatRoomDelegate =>
  prisma[
    message.room() ? "wechatRoom" : "wechatUser"
  ] as Prisma.WechatUserDelegate & Prisma.WechatRoomDelegate

export const getConv = async (message: Message) => {
  const table = getConvTable(message)

  const convId = message.conversation().id

  const conv = await table.findUnique({
    where: { id: convId },
  })

  return conv
}
