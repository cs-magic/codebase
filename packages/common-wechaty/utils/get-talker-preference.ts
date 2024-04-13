import { IWechatUserPreference } from "@/schema/wechat-user"
import { Message } from "wechaty"
import { prisma } from "../../common-db/providers/prisma"
import { getConv } from "./get-conv"
import { getRobustPreference } from "./get-robust-preference"

export const getTalker = async (message: Message) => {
  return prisma.wechatUser.findUniqueOrThrow({
    where: { id: message.talker().id },
    include: {},
  })
}

export const getTalkerPreference = async (
  message: Message,
): Promise<IWechatUserPreference> => {
  const talker = await getTalker(message)
  return getRobustPreference(talker)
}

export const getConvPreference = async (
  message: Message,
): Promise<IWechatUserPreference> => {
  const conv = await getConv(message)
  return getRobustPreference(conv)
}
