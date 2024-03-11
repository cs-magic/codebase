import { Prisma } from "@prisma/client"
import { appDetailSchema } from "./app.detail"

import { requestSchema } from "./request"

export const convDetailSchema = Prisma.validator<Prisma.ConvDefaultArgs>()({
  include: {
    titleResponse: true,
    apps: {
      ...appDetailSchema,
      // 不要加这个，否则本地初始化后会乱序
      // orderBy: {
      //   createdAt: "asc",
      // },
    },
    requests: {
      ...requestSchema,
      orderBy: {
        updatedAt: "asc", // 增序
      },
    },
  },
})
export type IConvDetail = Prisma.ConvGetPayload<typeof convDetailSchema>
