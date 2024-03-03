import { z } from "zod"
import { ConversationType, Prisma } from "@prisma/client"
import { appInDBSchema, IAppInChat } from "@/schema/core/app"
import ConversationDefaultArgs = Prisma.ConversationDefaultArgs
import ConversationGetPayload = Prisma.ConversationGetPayload
import validator = Prisma.validator
import { IMessageInChat } from "@/schema/core/message"

export const createConversationSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  apps: z
    .object({
      modelId: z.string(),
      title: z.string(),
    })
    .array(),
  type: z.nativeEnum(ConversationType),
})
export type ICreateConversation = z.infer<typeof createConversationSchema>

export const conversationInDBSchema = validator<ConversationDefaultArgs>()({
  include: {
    apps: appInDBSchema,
    fromUser: true,
    messages: true,
  },
})
export type IConversationInDB = ConversationGetPayload<
  typeof conversationInDBSchema
>

export const listConversationSchema = validator<ConversationDefaultArgs>()({
  select: {
    id: true,
    title: true,
    updatedAt: true,

    // optional
    apps: false,
    messages: false,
    mainMessages: false,
    fromUser: false,
  },
})
export type IListConversation = ConversationGetPayload<
  typeof listConversationSchema
>

export type IConversationInChat = IListConversation & {
  apps?: IAppInChat[]
  messages?: IMessageInChat[]
  mainMessages?: string[]
}
