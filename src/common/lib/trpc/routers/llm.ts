import {
  conversationProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/common/lib/trpc/trpc"
import { db } from "@/common/lib/db"
import {
  conversationInDBSchema,
  createConversationSchema,
} from "@/schema/query-conv"
import { z } from "zod"

import { triggerLLM } from "@/app/api/llm/triggerLLM"

import { llmMessageSchema } from "@/schema/query-message"
import { modelInDBSchema } from "@/schema/query-model"
import { queryConfigInDBSchema } from "@/schema/query-config"

export const llmRouter = createTRPCRouter({
  listModels: publicProcedure.query(async () => {
    return db.model.findMany({
      ...modelInDBSchema,
      ...{ orderBy: { updatedAt: "desc" } },
    })
  }),

  listApps: publicProcedure.query(async () => {
    return db.queryConfig.findMany({
      // 只筛选官方app，不选自动生成的
      where: {
        id: {
          equals: db.queryConfig.fields.modelId,
        },
      },
      ...queryConfigInDBSchema,
      orderBy: { updatedAt: "desc" },
    })
  }),

  getPApp: publicProcedure.input(z.string()).query(async ({ input }) => {
    return db.queryConfig.findUniqueOrThrow({
      where: { id: input },
      ...queryConfigInDBSchema,
    })
  }),

  listConversations: protectedProcedure.query(async () => {
    return db.conversation.findMany({
      ...conversationInDBSchema,
      orderBy: { updatedAt: "desc" },
    })
  }),

  // todo: 感觉还是装饰器模式更直观一些， ref: https://trpc.io/docs/server/procedures#reusable-base-procedures
  getConversation: conversationProcedure.query(async ({ input, ctx }) => {
    return ctx.conversation
  }),

  delConversation: conversationProcedure.mutation(async ({ input }) => {
    return db.conversation
      .delete({ where: { id: input.conversationId } })
      .catch(console.error)
  }),

  deleteAllConversations: protectedProcedure.mutation(() => {
    return db.conversation.deleteMany({})
  }),

  addConversation: protectedProcedure
    .input(createConversationSchema)
    .mutation(async ({ input, ctx }) => {
      console.log("[add-conv] input: ", JSON.stringify(input, null, 2))
      const conversation = await db.conversation.create({
        data: {
          id: input.id,
          fromUserId: ctx.user.id,
          type: input.type,
        },
        ...conversationInDBSchema,
      })
      console.log("[add-conv] conv: ", JSON.stringify(conversation, null, 2))
      return conversation
    }),

  queryConversation: conversationProcedure
    .input(
      z.object({
        messages: llmMessageSchema.array(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      console.log("[schema] input: ", input)
      const { conversation } = ctx

      return Promise.all(
        conversation.queryConfig.queryConfig(async (p) => {
          const requestId = p.id
          const result = await triggerLLM({
            requestId,
            modelId: p.modelId,
            messages: input.messages,
          })
          return { requestId, result }
        }),
      )
    }),

  addPApp: conversationProcedure
    .input(
      // todo: type
      z.object({
        // 因为客户端也需要自己生成新的id，所以直接从客户端拿就好了
        id: z.string(),
        modelId: z.string(),
        title: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return db.conversation.update({
        where: { id: ctx.conversation.id },
        data: {
          queryConfig: {
            create: {
              id: input.id,
              modelId: input.modelId,
              title: input.title,
            },
          },
        },
      })
    }),

  delPApp: conversationProcedure
    .input(z.object({ pAppId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return db.conversation.update({
        where: { id: ctx.conversation.id },
        data: {
          queryConfig: {
            delete: {
              id: input.pAppId,
            },
          },
        },
      })
    }),
})
