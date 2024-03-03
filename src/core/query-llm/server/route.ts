import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/lib/trpc/trpc"
import { db } from "@/lib/db"
import { Prisma } from "@prisma/client"
import { z } from "zod"

export const userListViewSchema = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    image: true,
    name: true,
  },
})
export type IUserListView = Prisma.UserGetPayload<typeof userListViewSchema>

export const modelViewSchema = Prisma.validator<Prisma.ModelDefaultArgs>()({
  include: {
    company: true,
  },
})
export type IModelView = Prisma.ModelGetPayload<typeof modelViewSchema>

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

export const queryConfigSchema =
  Prisma.validator<Prisma.QueryConfigDefaultArgs>()({
    include: {
      fromUser: userListViewSchema,
      model: modelViewSchema, // model虽然在系统里已经事先获取了一份，但可能不全
    },
  })
export type IQueryConfigInDB = Prisma.QueryConfigGetPayload<
  typeof queryConfigSchema
>

export const queryConvDetailViewSchema =
  Prisma.validator<Prisma.QueryConvDefaultArgs>()({
    include: {
      queries: {
        include: {
          responses: {
            include: {
              config: queryConfigSchema,
            },
          },
        },
      },
    },
  })
export type IQueryConvDetailView = Prisma.QueryConvGetPayload<
  typeof queryConvDetailViewSchema
>

export const queryLLMRouter = createTRPCRouter({
  listModels: publicProcedure.query(() =>
    db.model.findMany({
      ...modelViewSchema,
      orderBy: {
        // todo: by hot or so
        updatedAt: "desc",
      },
    }),
  ),

  listQueryConfigs: publicProcedure.query(() =>
    db.queryConfig.findMany({
      ...queryConfigSchema,
      orderBy: {
        // todo: by hot or so
        updatedAt: "desc",
      },
    }),
  ),

  listQueryConv: protectedProcedure.query(() =>
    db.queryConv.findMany({
      orderBy: { updatedAt: "desc" },
      ...queryConvListViewSchema,
    }),
  ),

  getQueryConv: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) =>
      db.queryConv.findUniqueOrThrow({
        where: { id: input.id },
        ...queryConvDetailViewSchema,
      }),
    ),

  addQueryConv: protectedProcedure
    // 不用加 queryConfig，这是后续本地生成，再上传的，在query的时候才会触发
    .input(
      z.object({ id: z.string().optional(), title: z.string().optional() }),
    )
    .mutation(({ input, ctx }) =>
      db.queryConv.create({
        data: { ...input, fromUserId: ctx.user.id },
        ...queryConvDetailViewSchema,
      }),
    ),

  deleteAllQueryConvs: protectedProcedure.mutation(({ ctx }) =>
    db.queryConv.deleteMany({ where: { fromUserId: ctx.user.id } }),
  ),
})
