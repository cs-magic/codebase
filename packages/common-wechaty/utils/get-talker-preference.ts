import { IWechatUserPreference } from "@/schema/wechat-user"
import { Message } from "wechaty"
import { prisma } from "../../common-db/providers/prisma"

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
  return (
    talker.preference ?? {
      lang: "en",
      model: "gpt-3.5-turbo",
      backend: "nodejs",
      chatEnabled: false,
      parserEnabled: false,
    }
  )
}
