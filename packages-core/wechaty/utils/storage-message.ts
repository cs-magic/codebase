import { formatError } from "@cs-magic/common/utils/format-error"
import omit from "lodash/omit"
import { prisma } from "../../../packages-to-classify/db/providers/prisma"
import { Message } from "wechaty"

export const storageMessage = async (message: Message) => {
  const talker = message.talker()
  const room = message.room()
  const listener = message.listener()

  try {
    await prisma.wechatMessage.create({
      data: {
        ...omit(message.payload, ["talkerId", "roomId", "listenerId"]),

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
