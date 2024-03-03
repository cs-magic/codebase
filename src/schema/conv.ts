import { Prisma } from "@prisma/client"

import { AppInDBSchema } from "@/schema/app"

export const convListViewSchema =
  Prisma.validator<Prisma.QueryConvDefaultArgs>()({
    select: {
      id: true,
      updatedAt: true,
      title: true,
    },
  })
export type IConvListView = Prisma.QueryConvGetPayload<
  typeof convListViewSchema
>
export const convDetailViewSchema =
  Prisma.validator<Prisma.QueryConvDefaultArgs>()({
    include: {
      queries: {
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          responses: {
            include: {
              config: AppInDBSchema,
            },
          },
        },
      },
    },
  })
export type IConvDetailView = Prisma.QueryConvGetPayload<
  typeof convDetailViewSchema
>

/**
 * 动态更新
 */
export type IConvClient = IConvListView | IConvDetailView
