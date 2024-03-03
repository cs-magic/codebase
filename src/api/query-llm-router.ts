import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../packages/common/lib/trpc/trpc"
import { db } from "../../packages/common/lib/db"
import { z } from "zod"
import { modelViewSchema } from "@/schema/model"
import { convDetailViewSchema, convListViewSchema } from "@/schema/conv"
import { AppInDBSchema } from "@/schema/app"

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
      ...AppInDBSchema,
      orderBy: {
        // todo: by hot or so
        updatedAt: "desc",
      },
    }),
  ),

  listQueryConv: protectedProcedure.query(() =>
    db.queryConv.findMany({
      orderBy: { updatedAt: "desc" },
      ...convListViewSchema,
    }),
  ),

  getQueryConv: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) =>
      db.queryConv.findUniqueOrThrow({
        where: { id: input.id },
        ...convDetailViewSchema,
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
        ...convDetailViewSchema,
      }),
    ),

  deleteQueryConvs: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => db.queryConv.delete({ where: input })),

  deleteAllQueryConvs: protectedProcedure.mutation(({ ctx }) =>
    db.queryConv.deleteMany({ where: { fromUserId: ctx.user.id } }),
  ),
})
