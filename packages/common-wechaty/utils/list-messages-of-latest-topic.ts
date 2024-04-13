import { prisma } from "../../common-db/providers/prisma"

/**
 * 获取最后一次
 * @param convId
 */
export const listMessagesOfLatestTopic = async (
  botWxid: string,
  convId: string,
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
  // if (!lastUserSetCommand) throw new Error("no lastUserSetCommand")

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
  // if (!lastUserStartChat) throw new Error("no lastUserStartChat")

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
          createdAt: lastUserStartChat
            ? {
                gte: lastUserStartChat.createdAt!,
              }
            : undefined,
        },
      ],
    },
    orderBy: { createdAt: "asc" },
    // 微信内一般一条文本200字左右，取20条就是4k，比较合适
    // todo: 根据模型同进行控制
    take: -20,
  })

  // console.log({
  //   lastUserSetCommand,
  //   lastUserStartChat,
  //   messagesLen: messages.length,
  // })

  return messages
}
