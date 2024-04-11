import { MessageInterface } from "wechaty/impls"
import { prisma } from "../../common-db/providers/prisma"
import { IBotContext } from "../schema"
import { BaseMessageHandler } from "./_base"

export class StorageMessageHandler extends BaseMessageHandler<IBotContext> {
  name = "storage"

  public async onMessage(message: MessageInterface) {
    const room = message.room()
    const talker = message.talker()

    const { talkerId, roomId, ...messageData } = message.payload!

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

        room: room
          ? {
              connectOrCreate: {
                where: {
                  id: room?.id,
                },
                create: room?.payload,
              },
            }
          : undefined,
      },
    })

    return true
  }
}
