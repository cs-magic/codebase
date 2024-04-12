import { prisma } from "../../common-db/providers/prisma"
import { parseCommand } from "./parse-command"

/**
 * 获取最后一次
 * @param convId
 */
export const listMessagesForTopic = async (convId: string, botId?: string) => {
  // console.log({ convId, botId })

  const lastUserSetCommand = await prisma.wechatMessage.findFirst({
    where: {
      // 三者任一即可
      OR: [{ roomId: convId }, { listenerId: convId }, { talkerId: convId }],
      text: {
        // todo: /new-topic /set-topic /start-chat
        contains: "/new-topic",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const lastUserStartChat = await prisma.wechatMessage.findFirst({
    where: {
      OR: [{ roomId: convId }, { listenerId: convId }, { talkerId: convId }],
      createdAt: lastUserSetCommand
        ? {
            gt: lastUserSetCommand.createdAt!,
          }
        : undefined,
      talkerId: {
        not: botId,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  const messages = await prisma.wechatMessage.findMany({
    where: {
      // 三者任一即可
      OR: [{ roomId: convId }, { listenerId: convId }, { talkerId: convId }],
      createdAt: lastUserStartChat
        ? {
            gte: lastUserStartChat.createdAt!,
          }
        : undefined,
    },
    orderBy: { createdAt: "asc" },
  })
  return messages
}

export const listMessages = async (convId: string, take?: number) => {
  const messages = await prisma.wechatMessage.findMany({
    where: {
      // 三者任一即可
      OR: [{ roomId: convId }, { listenerId: convId }, { talkerId: convId }],
    },
    orderBy: { createdAt: "asc" },
    take,
  })
  return messages
}

export const uniChatterListTopics = async (convId: string) => {
  const messages = await listMessages(convId)

  const topicDict: Record<string, number> = {}
  let lastTopic: string | null = null
  const started = true // todo: switch
  messages.forEach((row) => {
    const parsed = parseCommand(row.text ?? "", ["new-topic"])
    if (parsed) {
      switch (parsed?.command) {
        case "new-topic":
          lastTopic = parsed?.args ?? "默认"
          if (!(lastTopic in topicDict)) topicDict[lastTopic] = 0
          break
      }
    } else if (started && lastTopic !== null && !row.text?.startsWith("/")) {
      ++topicDict[lastTopic]
    } else {
      // don't do anything
    }
  })

  return topicDict
}
