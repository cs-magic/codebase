import { Prisma } from "@prisma/client"

import { queryConfigInDBSchema } from "@/schema/query-config"

export const queryConvListViewSchema =
  Prisma.validator<Prisma.QueryConvDefaultArgs>()({
    select: {
      id: true,
      updatedAt: true,
      title: true,
    },
  })
export type IQueryConvListView = Prisma.QueryConvGetPayload<
  typeof queryConvListViewSchema
>
export const queryConvDetailViewSchema =
  Prisma.validator<Prisma.QueryConvDefaultArgs>()({
    include: {
      queries: {
        include: {
          responses: {
            include: {
              config: queryConfigInDBSchema,
            },
          },
        },
      },
    },
  })
export type IQueryConvDetailView = Prisma.QueryConvGetPayload<
  typeof queryConvDetailViewSchema
>
