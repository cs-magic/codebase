import { z } from "zod"
import { ConversationType, Prisma } from "@prisma/client"
import { IMessageInChat } from "@/schema/message"
import validator = Prisma.validator
import ModelDefaultArgs = Prisma.ModelDefaultArgs
import ModelGetPayload = Prisma.ModelGetPayload
import ConversationDefaultArgs = Prisma.ConversationDefaultArgs
import ConversationGetPayload = Prisma.ConversationGetPayload
import PAppDefaultArgs = Prisma.PAppDefaultArgs
import PAppGetPayload = Prisma.PAppGetPayload

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

export const pAppSchema = validator<PAppDefaultArgs>()({
  include: {
    model: modelSchema,
  },
})
export type IPApp = PAppGetPayload<typeof pAppSchema>

export const conversationSchema = validator<ConversationDefaultArgs>()({
  include: {
    pApps: pAppSchema,
    fromUser: true,
    messages: true,
  },
})
export type IConversation = ConversationGetPayload<typeof conversationSchema>

export type IPAppClient = IPApp & {
  needFetchLLM?: boolean
}

export interface IConversationClient {
  id: string
  pApps: IPAppClient[]
  messages: IMessageInChat[]
  // 这是一个栈（todo：森林？）
  messageSnapshots: string[][]
  selectedPAppId?: string
}
