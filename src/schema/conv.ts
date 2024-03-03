import { Prisma } from "@prisma/client"

import { AppInDBSchema } from "@/schema/app"

export const convListViewSchema = Prisma.validator<Prisma.ConvDefaultArgs>()({
  select: {
    id: true,
    updatedAt: true,
    title: true,
  },
})
export type IConvListView = Prisma.ConvGetPayload<typeof convListViewSchema>
export const convDetailViewSchema = Prisma.validator<Prisma.ConvDefaultArgs>()({
  include: {
    requests: {
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        responses: {
          include: {
            app: AppInDBSchema,
          },
        },
      },
    },
  },
})
export type IConvDetailView = Prisma.ConvGetPayload<typeof convDetailViewSchema>

/**
 * 动态更新
 */
export type IConvClient = IConvListView | IConvDetailView
