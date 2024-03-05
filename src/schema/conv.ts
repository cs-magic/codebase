import { appInDBSchema } from "@/schema/app"
import { Prisma, Response } from "@prisma/client"

export const convSummarySchema = Prisma.validator<Prisma.ConvDefaultArgs>()({
  select: {
    id: true,
    updatedAt: true,
    title: true,
  },
})
export type IConvSummary = Prisma.ConvGetPayload<typeof convSummarySchema>

export const requestSchema = Prisma.validator<Prisma.RequestDefaultArgs>()({
  include: {
    responses: {
      include: {
        app: appInDBSchema,
      },
    },
  },
})
export const convDetailSchema = Prisma.validator<Prisma.ConvDefaultArgs>()({
  include: {
    apps: appInDBSchema,
    requests: {
      ...requestSchema,
      orderBy: {
        updatedAt: "desc",
      },
    },
  },
})
export type IConvDetail = Prisma.ConvGetPayload<typeof convDetailSchema>

export type IUpdateResponse = (s: Response) => void
