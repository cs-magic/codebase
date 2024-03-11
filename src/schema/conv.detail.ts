import { Prisma } from "@prisma/client"

import { requestSchema } from "./request"

export const convDetailSchema = Prisma.validator<Prisma.ConvDefaultArgs>()({
  include: {
    titleResponse: true,

    requests: {
      ...requestSchema,
      orderBy: {
        updatedAt: "asc", // 增序
      },
    },
  },
})
export type IConvDetail = Prisma.ConvGetPayload<typeof convDetailSchema>
