import { z } from "zod"

export const messageRoleSchema = z.union([
  z.literal("user"),
  z.literal("assistant"),
  z.literal("system"),
  z.literal("function"),
])
export type RoleType = z.infer<typeof messageRoleSchema>

/**
 * ref: https://platform.openai.com/docs/api-reference/chat/create#chat-create-messages
 */
export const llmMessageSchema = z.object({
  content: z.union([
    z.string(),
    z
      .union([
        z.object({
          type: z.literal("text"),
          text: z.string(),
        }),
        z.object({
          type: z.literal("image_url"),
          // 注意，示例是错的，必须是object才对
          image_url: z.object({
            url: z.string(),
            detail: z.string().optional(),
          }),
        }),
      ])
      .array(),
  ]),
  role: messageRoleSchema,
  name: z.string().optional(),
})
export type ILlmMessage = z.infer<typeof llmMessageSchema>

export type IMessageInChat = ILlmMessage & {
  updatedAt?: Date
  isError?: boolean
}
export type IContext = IMessageInChat[]
