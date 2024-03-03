import { z } from "zod"
import { ConversationType, Prisma } from "@prisma/client"
import ModelDefaultArgs = Prisma.ModelDefaultArgs
import ModelGetPayload = Prisma.ModelGetPayload
import ConversationDefaultArgs = Prisma.ConversationDefaultArgs
import ConversationGetPayload = Prisma.ConversationGetPayload
import validator = Prisma.validator
import AppDefaultArgs = Prisma.AppDefaultArgs
import AppGetPayload = Prisma.AppGetPayload

export const createConversationSchema = z.object({
  id: z.string(),
  pApps: z
    .object({
      modelId: z.string(),
      title: z.string(),
    })
    .array(),
  type: z.nativeEnum(ConversationType),
})
export type ICreateConversation = z.infer<typeof createConversationSchema>

export const modelSchema = validator<ModelDefaultArgs>()({
  include: {
    company: true,
  },
})
export type IModel = ModelGetPayload<typeof modelSchema>

export const appSchema = validator<AppDefaultArgs>()({
  include: {
    model: modelSchema,
  },
})
export type IApp = AppGetPayload<typeof appSchema>

export const conversationSchema = validator<ConversationDefaultArgs>()({
  include: {
    pApps: appSchema,
    fromUser: true,
    messages: true,
  },
})
export type IConversation = ConversationGetPayload<typeof conversationSchema>

export type IAppClient = IApp & {
  needFetchLLM?: boolean
}

export const conversationListViewSchema = validator<ConversationDefaultArgs>()({
  select: {
    id: true,
    title: true,
  },
})
export type IConversationListView = ConversationGetPayload<
  typeof conversationListViewSchema
>
