import { z } from "zod"
import { getNewId } from "../../../../packages/common-algo/id"
import { prisma } from "../../../../packages/common-db/providers/prisma/connection"
import {
  convProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../../../packages/common-trpc/trpc"
import {
  createCallLLMSchema,
  parseApp,
} from "../../../../packages/common-llm/schema"
import {
  ConvUpdateInputSchema,
  ConvWhereUniqueInputSchema,
  UserUpdateInputSchema,
} from "../../../../prisma/generated/zod"

import { createAppSchema } from "../../../schema/app.create"
import { appDetailSchema } from "../../../schema/app.detail"
import { convDetailSchema, convSummarySchema } from "../../../schema/conv"
import { llmMessageSchema } from "../../../schema/message"
import { modelViewSchema } from "../../../schema/model"
import { userDetailSchema } from "../../../schema/user.detail"
import { triggerLLM } from "../llm/llm-triggle"

export const coreRouter = createTRPCRouter({
  getSelf: protectedProcedure.query(async ({ ctx }) =>
    prisma.user.findUniqueOrThrow({
      where: { id: ctx.user.id },
      ...userDetailSchema,
    }),
  ),

  updateSelf: protectedProcedure
    .input(UserUpdateInputSchema)
    .mutation(({ ctx, input }) => {
      console.log("update self")
      return prisma.user.update({
        where: { id: ctx.user.id },
        data: input,
      })
    }),

  listModels: publicProcedure.query(() =>
    prisma.model.findMany({
      ...modelViewSchema,
      orderBy: {
        // todo: by hot or so
        updatedAt: "desc",
      },
    }),
  ),

  listApps: publicProcedure.query(() =>
    prisma.app.findMany({
      where: { granted: true },
      ...appDetailSchema,
      orderBy: {
        // todo: by hot or so
        updatedAt: "desc",
      },
    }),
  ),

  listConv: protectedProcedure.query(({ ctx }) =>
    prisma.conv.findMany({
      where: { fromUserId: ctx.user.id },
      orderBy: { updatedAt: "desc" },
      ...convSummarySchema,
    }),
  ),

  getConv: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) =>
      prisma.conv.findUniqueOrThrow({
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
      prisma.conv.create({
        data: {
          ...input,
          fromUserId: ctx.user.id,
          apps: {
            connectOrCreate: input.apps.map((app) => ({
              where: { id: app.id },
              create: { ...app, user: ctx.user.id },
            })),
          },
          titleResponse: {
            create: {},
          },
        },
        ...convDetailSchema,
      }),
    ),

  updateConv: protectedProcedure
    .input(
      z.object({
        where: ConvWhereUniqueInputSchema,
        data: ConvUpdateInputSchema,
      }),
    )
    .mutation(({ ctx, input }) => {
      const { id, ...safeData } = input.data
      return prisma.conv.update({
        where: { ...input.where, fromUserId: ctx.user.id },
        data: safeData,
        ...convDetailSchema,
      })
    }),

  delConv: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) =>
      prisma.conv.delete({
        where: {
          id: input.id,
          fromUserId: ctx.user.id,
        },
      }),
    ),

  delAllConvs: protectedProcedure.mutation(({ ctx }) =>
    prisma.conv.deleteMany({ where: { fromUserId: ctx.user.id } }),
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
      const requestId = getNewId()
      const { context, convId } = input

      console.log("[query]: ", JSON.stringify({ requestId, input }, null, 2))

      const conv = await prisma.conv.update({
        where: { id: input.convId },
        ...convDetailSchema,
        data: {
          currentRequestId: requestId,

          // todo: only once
          titleResponse: {
            connectOrCreate: {
              where: { convId },
              create: {
                tTrigger: new Date(),
              },
            },
          },

          requests: {
            create: {
              id: requestId,
              context,
              responses: {
                create: [
                  ...input.apps.map((app) => ({
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
                ],
              },
            },
          },
        },
      })

      await Promise.all(
        conv.requests
          .find((r) => r.id === requestId)!
          .responses.map(async (r) => {
            await triggerLLM({
              requestId,
              task: {
                convId: undefined,
                appId: r.appId,
              },
              app: parseApp(r.app),
              context,
              llmDelay: input.llmDelay,
            })
          }),
      )

      // 如果已经更新了就不要改了
      if (!conv.titleResponse?.content) {
        await triggerLLM({
          requestId,
          task: {
            convId: input.convId,
            appId: undefined,
          },
          app: createCallLLMSchema.parse({
            modelName: "gpt-3.5-turbo",
          }),
          context: [
            {
              role: "system",
              content:
                "以下是我与你的一段对话，请做一个简要的总结（要求：不超过10个字）",
            },
            ...context,
          ],
          llmDelay: input.llmDelay,
        })
      }
      return requestId
    }),
})
