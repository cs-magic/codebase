import {
  convProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../packages/common/lib/trpc/trpc"
import { db } from "../../packages/common/lib/db"
import { z } from "zod"
import { modelViewSchema } from "@/schema/model"
import {
  convDetailSchema,
  convSummarySchema,
  requestSchema,
} from "@/schema/conv"
import { AppInDBSchema } from "@/schema/app"
import { llmMessageSchema } from "@/schema/message"
import { triggerLLM } from "@/app/api/llm/triggerLLM"
import { getTriggerID } from "@/store/request.atom"

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

  listApps: publicProcedure.query(() =>
    db.app.findMany({
      ...AppInDBSchema,
      orderBy: {
        // todo: by hot or so
        updatedAt: "desc",
      },
    }),
  ),

  listConv: protectedProcedure.query(() =>
    db.conv.findMany({
      orderBy: { updatedAt: "desc" },
      ...convSummarySchema,
    }),
  ),

  getQueryConv: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) =>
      db.conv.findUniqueOrThrow({
        where: input,
        ...convDetailSchema,
      }),
    ),

  addQueryConv: protectedProcedure
    // 不用加 queryConfig，这是后续本地生成，再上传的，在query的时候才会触发
    .input(
      z.object({ id: z.string().optional(), title: z.string().optional() }),
    )
    .mutation(({ input, ctx }) =>
      db.conv.create({
        data: { ...input, fromUserId: ctx.user.id },
        ...convDetailSchema,
      }),
    ),

  deleteQueryConvs: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => db.conv.delete({ where: input })),

  deleteAllQueryConvs: protectedProcedure.mutation(({ ctx }) =>
    db.conv.deleteMany({ where: { fromUserId: ctx.user.id } }),
  ),

  query: convProcedure
    .input(
      z.object({
        context: llmMessageSchema.array(),
        apps: z
          .object({
            id: z.string(),
            modelName: z.string(),
            title: z.string().nullable(),
            systemPrompt: z.string().nullable(),
            temperature: z.number().nullable(),
          })
          .array(),
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
          const triggerID = getTriggerID(input.convId, request.id, r.app.id)
          await triggerLLM({ app: r.app, context, triggerID })
        }),
      )
      return request
    }),
})
