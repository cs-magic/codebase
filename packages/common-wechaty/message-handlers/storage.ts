import { MessageInterface } from "wechaty/impls"
import { prisma } from "../../common-db/providers/prisma"
import { BaseMessageHandler } from "./_base"

export class StorageMessageHandler extends BaseMessageHandler {
  name = "storage"

  public async onMessage(message: MessageInterface) {
    const room = message.room()
    const talker = message.talker()
    const listener = message.listener()

    const { talkerId, roomId, listenerId, ...messageData } = message.payload!

    await prisma.wechatMessage.create({
      data: {
        ...messageData,

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
          : undefined,

        room: room
          ? {
              connectOrCreate: {
                where: {
                  id: room.id,
                },
                create: room.payload!,
              },
            }
          : undefined,
      },
    })

    return false // continue
  }
}
