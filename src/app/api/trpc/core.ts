import { z } from "zod"
import { getNewId } from "../../../../packages/common-algo/id"
import { prisma } from "../../../../packages/common-db/providers/prisma/connection"

import { triggerLLMThreads } from "../../../../packages/common-llm/actions/llm-trigger"

import { pusherServerIdSchema } from "../../../../packages/common-pusher/schema"
import {
  convProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../../../packages/common-trpc/trpc"
import {
  ConvUpdateInputSchema,
  ConvWhereUniqueInputSchema,
  UserUpdateInputSchema,
} from "../../../../prisma/generated/zod"

import { createAppSchema } from "../../../schema/app.create"
import { appDetailSchema } from "../../../schema/app.detail"
import { convSummarySchema } from "../../../schema/conv.base"
import { convDetailSchema } from "../../../schema/conv.detail"
import { llmMessageSchema } from "../../../schema/message"
import { modelViewSchema } from "../../../schema/model"
import { requestSchema } from "../../../schema/request"
import { userDetailSchema } from "../../../schema/user.detail"

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
      orderBy: { createdAt: "desc" },
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
        requestId: z.string().optional(),
        context: llmMessageSchema.array(),
        apps: createAppSchema.array(),

        bestAppId: z.string(),
        llmDelay: z.number().default(0),
        pusherServerId: pusherServerIdSchema,
        systemPromptForConvTitle: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        context,
        convId,
        pusherServerId,
        llmDelay,
        requestId = getNewId(),
        bestAppId,
        systemPromptForConvTitle,
      } = input

      console.log("[query]: ", JSON.stringify({ requestId, input }, null, 2))

      const request = await prisma.request.create({
        data: {
          id: requestId,
          context,
          conv: {
            connect: {
              id: convId,
            },
          },
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
        ...requestSchema,
      })

      void triggerLLMThreads(
        request,
        pusherServerId,
        context,
        llmDelay,
        bestAppId,
        systemPromptForConvTitle,
      )
      return requestId
    }),
})
