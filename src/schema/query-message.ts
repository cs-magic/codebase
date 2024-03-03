import { z } from "zod"
import { pusherServerIdSchema } from "../../packages/common/lib/puser/config"
import { Message, MessageRole } from "@prisma/client"

/**
 * todo: ensure it is consistent with Prisma.Message
 */
export const llmMessageSchema = z.object({
  content: z.string(),
  role: z.nativeEnum(MessageRole),
})
export type ILLMMessage = z.infer<typeof llmMessageSchema>

export const createMessageSchema = z.object({
  pusherServerId: pusherServerIdSchema.optional(),
  id: z.string().nullable(),
  text: z.string(),
})
export type ICreateMessage = z.infer<typeof createMessageSchema>

export type IMessageInChat = Pick<
  Message,
  | "id"
  | "updatedAt"
  | "content"
  | "role"
  | "appId"
  | "conversationId"
  | "parentId"
> & {
  isError?: boolean
}
