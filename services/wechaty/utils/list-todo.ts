import { prisma } from "../../../packages/db/providers/prisma"

export const listTodo = async (talkerId: string) =>
  prisma.task.findMany({
    where: {
      ownerId: talkerId,
    },
    orderBy: { createdAt: "asc" },
  })
