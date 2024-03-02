import {
  conversationProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc"
import { db } from "@/server/db"
import {
  conversationSchema,
  createConversationSchema,
  modelSchema,
  pAppSchema,
} from "@/schema/conversation"
import { z } from "zod"

import { triggerLLM } from "@/app/api/llm/triggerLLM"

export const llmRouter = createTRPCRouter({
  listModels: publicProcedure.query(async () => {
    return db.model.findMany({
      ...modelSchema,
      ...{ orderBy: { updatedAt: "desc" } },
    })
  }),

  listPApps: publicProcedure.query(async () => {
    return db.pApp.findMany({
      // 只筛选官方p-app，不选自动生成的
      where: {
        id: {
          equals: db.pApp.fields.modelId,
        },
      },
      ...pAppSchema,
      orderBy: { updatedAt: "desc" },
    })
  }),

  getPApp: publicProcedure.input(z.string()).query(async ({ input }) => {
    return db.pApp.findUniqueOrThrow({ where: { id: input }, ...pAppSchema })
  }),

  listConversations: protectedProcedure.query(async () => {
    return db.conversation.findMany({
      ...conversationSchema,
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
          pApps: {
            create: input.pApps,
          },
        },
        ...conversationSchema,
      })
      console.log("[add-conv] conv: ", JSON.stringify(conversation, null, 2))
      return conversation
    }),

  queryConversation: conversationProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      console.log({ input })
      const { conversation } = ctx

      return Promise.all(
        conversation.pApps.map(async (p) => {
          const requestId = p.id
          const result = await triggerLLM({
            requestId,
            modelId: p.modelId,
            messages: [{ content: input.query, role: "user" }],
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
          pApps: {
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
          pApps: {
            delete: {
              id: input.pAppId,
            },
          },
        },
      })
    }),
})
