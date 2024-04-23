import { Message } from "wechaty"
import { prisma } from "../../../packages-to-classify/db/providers/prisma"

// export const listUserTodo = async (talkerId: string) =>
//   prisma.task.findMany({
//     where: {
//       ownerId: talkerId,
//     },
//     orderBy: { createdAt: "asc" },
//   })

export const listConvTodo = async (message: Message) => {
  return prisma.task.findMany({
    where: !!message.room()
      ? {
          roomId: message.room()?.id,
        }
      : {
          ownerId: message.talker().id,
          roomId: null,
        },
    orderBy: { createdAt: "asc" },
  })
}

// export const listConvTodo = listConvTodo
