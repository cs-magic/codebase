import { z } from "zod"
import { db } from "../../../../packages/common/lib/db"
import {
  convProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../../../packages/common/lib/trpc/trpc"
import { UserUpdateInputSchema } from "../../../../prisma/generated/zod"
import { appDetailSchema, createAppSchema } from "../../../schema/app"
import {
  convDetailSchema,
  convSummarySchema,
  requestSchema,
} from "../../../schema/conv"
import { llmMessageSchema } from "../../../schema/message"
import { modelViewSchema } from "../../../schema/model"
import { userDetailSchema } from "../../../schema/user.detail"
import { triggerLLM } from "../llm/llm-triggle"

export const coreRouter = createTRPCRouter({
  updateSelf: protectedProcedure
    .input(UserUpdateInputSchema)
    .mutation(({ ctx, input }) => {
      console.log("update self")
      return db.user.update({
        where: { id: ctx.user.id },
        data: input,
      })
    }),

  getSelf: protectedProcedure.query(async ({ ctx }) =>
    db.user.findUniqueOrThrow({
      where: { id: ctx.user.id },
      ...userDetailSchema,
    }),
  ),

  listModels: publicProcedure.query(() =>
    db.model.findMany({
      ...modelViewSchema,
      orderBy: {
        // todo: by hot or so
        updatedAt: "desc",
      },
    }),
  ),

  listApps: publicProcedure.query(() =>
    db.app.findMany({
      where: { granted: true },
      ...appDetailSchema,
      orderBy: {
        // todo: by hot or so
        updatedAt: "desc",
      },
    }),
  ),

  listConv: protectedProcedure.query(({ ctx }) =>
    db.conv.findMany({
      where: { fromUserId: ctx.user.id },
      orderBy: { updatedAt: "desc" },
      ...convSummarySchema,
    }),
  ),

  getConv: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) =>
      db.conv.findUniqueOrThrow({
        where: {
          id: input.id,
          fromUserId: ctx.user.id,
        },
        ...convDetailSchema,
      }),
    ),

  addConv: protectedProcedure
    // 不用加 queryConfig，这是后续本地生成，再上传的，在query的时候才会触发
    .input(
      z.object({
        id: z.string().optional(),
        title: z.string().optional(),
        apps: createAppSchema.array(),
      }),
    )
    .mutation(({ input, ctx }) =>
      db.conv.create({
        data: {
          ...input,
          fromUserId: ctx.user.id,
          apps: {
            connectOrCreate: input.apps.map((app) => ({
              where: { id: app.id },
              create: { ...app, user: ctx.user.id },
            })),
          },
        },
        ...convDetailSchema,
      }),
    ),

  delConv: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      db.conv.delete({
        where: {
          id: input.id,
          fromUserId: ctx.user.id,
        },
      }),
    ),

  delAllConvs: protectedProcedure.mutation(({ ctx }) =>
    db.conv.deleteMany({ where: { fromUserId: ctx.user.id } }),
  ),

  query: convProcedure
    .input(
      z.object({
        context: llmMessageSchema.array(),
        apps: createAppSchema.array(),
        llmDelay: z.number().default(0),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const context = input.context
      const request = await db.request.create({
        ...requestSchema,
        data: {
          conv: {
            connect: {
              id: ctx.conv.id,
            },
          },
          context,
          responses: {
            create: input.apps.map((app) => ({
              tTrigger: new Date(),
              app: {
                connectOrCreate: {
                  where: { id: app.id },
                  create: {
                    ...app,
                    user: ctx.user.id,
                  },
                },
              },
            })),
          },
        },
      })

      console.log("-- query LLM: ", { input, request })

      await Promise.all(
        request.responses.map(async (r) => {
          await triggerLLM({
            app: r.app,
            context,
            requestId: request.id,
            llmDelay: input.llmDelay,
          })
        }),
      )
      return request
    }),
})
