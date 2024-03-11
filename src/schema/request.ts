import { Prisma } from "@prisma/client"
import { responseSchema } from "./response"

export const requestSchema = Prisma.validator<Prisma.RequestDefaultArgs>()({
  include: {
    responses: {
      ...responseSchema,
      // 这个要加，否则回答问题的时候会乱序
      // orderBy: {
      //   config: {
      //     createdAt: "asc",
      //   },
      // },
    },
  },
})
export type IRequest = Prisma.RequestGetPayload<typeof requestSchema>
