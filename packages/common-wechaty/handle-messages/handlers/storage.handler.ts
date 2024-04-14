import omit from "lodash/omit"
import { type MessageInterface } from "wechaty/impls"
import { prettyError } from "../../../common-common/pretty-error"
import { prisma } from "../../../common-db/providers/prisma"
import { BaseHandler } from "./base.handler"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

export class StorageHandler extends BaseHandler {
  public async onMessage(message: MessageInterface) {
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
      prettyError(e)
    }
  }
}
