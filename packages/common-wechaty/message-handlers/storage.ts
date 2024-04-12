import { MessageInterface } from "wechaty/impls"
import { prisma } from "../../common-db/providers/prisma"
import { BaseMessageHandler } from "./_base"
import { omit } from "lodash"

export class StorageMessageHandler extends BaseMessageHandler {
  name = "storage"

  public async onMessage(message: MessageInterface) {
    const talker = message.talker()
    const room = message.room()
    const listener = message.listener()

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

    return false // continue
  }
}
