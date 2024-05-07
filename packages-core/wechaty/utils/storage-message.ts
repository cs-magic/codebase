import { formatError } from "@cs-magic/common/utils/format-error"
import omit from "lodash/omit"
import { prisma } from "../../../packages-to-classify/db/providers/prisma"
import { Message, types } from "wechaty"

export const storageMessage = async (message: Message) => {
  const talker = message.talker()
  const room = message.room()
  const listener = message.listener()

  const type = message.type()
  const payload = omit(message.payload, ["talkerId", "roomId", "listenerId"])

  // we can use `this.bot.Image.create(mid) to create an Image, but with image in the cache (after bot starts)`
  if (type === types.Message.Image) payload.text = `<Image id="${payload.id}"/>`

  try {
    await prisma.wechatMessage.create({
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
    formatError(e)
  }
}
