import { prisma } from "../../../packages/common-db/providers/prisma"

export const listTodo = async (talkerId: string) =>
  prisma.task.findMany({
    where: {
      ownerId: talkerId,
    },
    orderBy: { createdAt: "asc" },
  })
