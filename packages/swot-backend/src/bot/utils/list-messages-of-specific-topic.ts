import { SEPARATOR_BOX } from "@cs-magic/common"
import { prisma } from "@cs-magic/common/dist/server.js"

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
              startsWith: SEPARATOR_BOX,
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

  // logger.info({
  //   lastUserSetCommand,
  //   lastUserStartChat,
  //   messagesLen: messages.length,
  // })

  return messages
}
