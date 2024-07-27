import { logger } from "@cs-magic/common"
import { prisma } from "@cs-magic/common/server"
import omit from "lodash/omit.js"
import { Message, types } from "wechaty"

/**
 * 存储信息
 * 并用于后续的读取
 *
 * @param message
 */
export const storageMessage = async (message: Message) => {
  const talker = message.talker()
  const room = message.room()
  const listener = message.listener()

  const type = message.type()

  const rawPayload = message.payload
  // console.log("rawPayload: ", rawPayload)

  const payload = omit(rawPayload, ["talkerId", "roomId", "listenerId"]) as {
    id: string
    timestamp: number
    type: types.Message
    text?: string
  }

  // we can use `this.bot.Image.create(mid) to create an Image, but with image in the cache (after bot starts)`
  if (type === types.Message.Image) payload.text = `<Image id="${payload.id}"/>`

  try {
    await prisma.wechatMessage.create({
      // todo: augmentation
      data: {
        ...payload,

        talker: {
          connectOrCreate: {
            where: {
              id: talker.id,
            },
            create: talker.payload!,
          },
        },

        listener: listener
          ? {
              connectOrCreate: {
                where: {
                  id: listener.id,
                },
                create: listener.payload!,
              },
            }
          : {},

        room: room
          ? {
              connectOrCreate: {
                where: {
                  id: room.id,
                },
                create: room.payload!,
              },
            }
          : {},
      },
    })
  } catch (e) {
    logger.debug(`skipped message storaging`)
    // formatError(e)
  }
}
