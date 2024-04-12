import { SEPARATOR_2 } from "../../common-common/pretty-query"
import { prisma } from "../../common-db/providers/prisma"
import { parseCommand } from "./parse-command"
export const listMessagesOfSpecificTopic = async (
  botWxid: string,
  convId: string,
  topic: string,
) => {
  const firstUserSetCommand = await prisma.wechatMessage.findFirst({
    where: {
      // 三者任一即可
      OR: [{ roomId: convId }, { listenerId: convId }, { talkerId: convId }],
      text: {
        startsWith: "/new-topic ",
        contains: topic,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  })
  if (!firstUserSetCommand) throw new Error("no lastUserSetCommand")

  const nextUserSetCommand = await prisma.wechatMessage.findFirst({
    where: {
      // 三者任一即可
      OR: [{ roomId: convId }, { listenerId: convId }, { talkerId: convId }],
      text: {
        startsWith: "/new-topic ",
      },
      createdAt: {
        gt: firstUserSetCommand.createdAt!,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  })
  if (!nextUserSetCommand) throw new Error("no nextUserSetCommand")

  const messages = await prisma.wechatMessage.findMany({
    where: {
      // AND, ref: https://chat.openai.com/c/895c1452-c3bd-4d5b-ba9f-c23c7750f412
      AND: [
        {
          OR: [
            { roomId: convId },
            { listenerId: convId },
            { talkerId: convId },
          ],
        },
        {
          OR: [
            { talkerId: botWxid },
            {
              mentionIdList: {
                has: botWxid,
              },
            },
          ],
          createdAt: {
            gt: firstUserSetCommand.createdAt!,
            lt: nextUserSetCommand.createdAt!,
          },
        },
        {
          text: {
            not: {
              startsWith: SEPARATOR_2,
            },
          },
        },
      ],
    },
    orderBy: { createdAt: "asc" },
    include: {
      talker: true,
    },
  })

  // console.log({
  //   lastUserSetCommand,
  //   lastUserStartChat,
  //   messagesLen: messages.length,
  // })

  return messages
}

/**
 * 获取最后一次
 * @param convId
 */
export const listMessagesOfLatestTopic = async (
  convId: string,
  botWxid?: string,
) => {
  const lastUserSetCommand = await prisma.wechatMessage.findFirst({
    where: {
      // 三者任一即可
      OR: [{ roomId: convId }, { listenerId: convId }, { talkerId: convId }],
      text: {
        // 不能用 contains 否则会误包含
        startsWith: "/new-topic",
        // todo: /new-topic /set-topic /start-chat
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  if (!lastUserSetCommand) throw new Error("no lastUserSetCommand")

  const lastUserStartChat = await prisma.wechatMessage.findFirst({
    where: {
      OR: [{ roomId: convId }, { listenerId: convId }, { talkerId: convId }],
      createdAt: lastUserSetCommand
        ? {
            gt: lastUserSetCommand.createdAt!,
          }
        : undefined,
      talkerId: {
        not: botWxid,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  })
  if (!lastUserStartChat) throw new Error("no lastUserStartChat")

  const messages = await prisma.wechatMessage.findMany({
    where: {
      // AND, ref: https://chat.openai.com/c/895c1452-c3bd-4d5b-ba9f-c23c7750f412
      AND: [
        {
          OR: [
            { roomId: convId },
            { listenerId: convId },
            { talkerId: convId },
          ],
        },
        {
          OR: [
            { talkerId: botWxid },
            {
              mentionIdList: {
                has: botWxid,
              },
            },
          ],
          createdAt: {
            gte: lastUserStartChat.createdAt!,
          },
        },
      ],
    },
    orderBy: { createdAt: "asc" },
  })

  // console.log({
  //   lastUserSetCommand,
  //   lastUserStartChat,
  //   messagesLen: messages.length,
  // })

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

export const listTopics = async (convId: string) => {
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
