import { IWechatUserPreference } from "@/schema/wechat-user"
import { Message } from "wechaty"
import { prisma } from "../../common-db/providers/prisma"
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
