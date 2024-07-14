import { wechatMessageDetailSchema } from "@cs-magic/common"
import { prisma } from "@cs-magic/os"

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
      // todo: 这里是错的， listenerId, talkerId 应该要成对
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
            gt: lastUserSetCommand.createdAt,
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
    ...wechatMessageDetailSchema,
    where: {
      // AND, ref: https://chat.openai.com/c/895c1452-c3bd-4d5b-ba9f-c23c7750f412
      AND: [
        // 1. filter conv
        {
          OR: [
            { roomId: convId },
            { listenerId: convId },
            { talkerId: convId },
          ],
        },

        // todo: 因为基于任意command，所以这里的筛选没有意义了，之后换meta信息吧
        // 2. filter ai context
        // {
        //   OR: [
        //     // valid bot is cued
        //     {
        //       // bot is cued
        //       OR: [
        //         // in contact
        //         {
        //           listenerId: botWxid,
        //         },
        //
        //         // in room
        //         {
        //           OR: [
        //             {
        //               mentionIdList: {
        //                 has: botWxid,
        //               },
        //             },
        //             {
        //               text: {
        //                 startsWith: "!",
        //               },
        //             },
        //             {
        //               text: {
        //                 startsWith: "！",
        //               },
        //             },
        //           ],
        //         },
        //       ],
        //
        //       // but not command
        //       text: {
        //         not: {
        //           startsWith: "/",
        //         },
        //       },
        //     },
        //     //  valid bot replies
        //     {
        //       // bot replies
        //       talkerId: botWxid,
        //       // but not command
        //       text: {
        //         not: {
        //           startsWith: SEPARATOR_BOX,
        //         },
        //       },
        //     },
        //   ],
        // },

        // 3. filter time
        {
          createdAt: lastUserStartChat
            ? {
                gte: lastUserStartChat.createdAt,
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

  while (messages.length) {
    // ensure first message is from user
    if (messages[0]!.talkerId === botWxid) messages.splice(0, 1)
    else break
  }

  // logger.info({
  //   lastUserSetCommand,
  //   lastUserStartChat,
  //   messagesLen: messages.length,
  // })
  // logger.info("context: " + formatString(JSON.stringify(messages)))

  return messages
}
