import { z } from "zod"
import { pusherServerIdSchema } from "@/lib/puser/config"
import { Message } from "@prisma/client"

export const createMessageSchema = z.object({
  pusherServerId: pusherServerIdSchema.optional(),
  id: z.string().nullable(),
  text: z.string(),
})

export type IMessageInChat = Pick<
  Message,
  | "id"
  | "updatedAt"
  | "content"
  | "role"
  | "pAppId"
  | "conversationId"
  | "parentId"
> & {
  isError?: boolean
}
