import { type Prisma } from "@prisma/client"
import { type Message } from "wechaty"
import { prisma } from "../../common-db/providers/prisma"

export const getConvTable = (
  message: Message,
): Prisma.WechatUserDelegate & Prisma.WechatRoomDelegate =>
  prisma[
    message.room() ? "wechatRoom" : "wechatUser"
  ] as Prisma.WechatUserDelegate & Prisma.WechatRoomDelegate
