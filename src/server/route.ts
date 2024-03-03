import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/common/lib/trpc/trpc"
import { db } from "@/common/lib/db"
import { z } from "zod"
import { modelViewSchema } from "@/schema/query-model"
import {
  queryConvDetailViewSchema,
  queryConvListViewSchema,
} from "@/schema/query-conv"
import { queryConfigInDBSchema } from "@/schema/query-config"

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
      ...queryConfigInDBSchema,
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
