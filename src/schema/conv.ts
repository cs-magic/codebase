import { appDetailSchema } from "@/schema/app"
import { Prisma, Response } from "@prisma/client"

export const convSummarySchema = Prisma.validator<Prisma.ConvDefaultArgs>()({
  select: {
    id: true,
    updatedAt: true,
    title: true,
  },
})
export type IConvSummary = Prisma.ConvGetPayload<typeof convSummarySchema>

export const responseSchema = Prisma.validator<Prisma.ResponseDefaultArgs>()({
  include: {
    app: appDetailSchema,
  },
})
export type IResponse = Prisma.ResponseGetPayload<typeof responseSchema>

export const requestSchema = Prisma.validator<Prisma.RequestDefaultArgs>()({
  include: {
    responses: {
      ...responseSchema,
      orderBy: {
        app: {
          createdAt: "asc",
        },
      },
    },
  },
})
export type IRequest = Prisma.RequestGetPayload<typeof requestSchema>

export const convDetailSchema = Prisma.validator<Prisma.ConvDefaultArgs>()({
  include: {
    apps: {
      ...appDetailSchema,
      orderBy: {
        createdAt: "asc",
      },
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

export type IUpdateResponse = (s: Response) => void
