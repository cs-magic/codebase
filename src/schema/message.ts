import { z } from "zod"

export const messageRoleSchema = z.union([
  z.literal("user"),
  z.literal("assistant"),
  z.literal("system"),
  z.literal("function"),
])
export type RoleType = z.infer<typeof messageRoleSchema>

/**
 * todo: ensure it is consistent with Prisma.Message
 */
export const llmMessageSchema = z.object({
  content: z.string(),
  role: messageRoleSchema,
})
export type ILLMMessage = z.infer<typeof llmMessageSchema>

export type IMessageInChat = ILLMMessage & {
  updatedAt?: Date
  isError?: boolean
}
export type IContext = IMessageInChat[]
