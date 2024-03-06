import { modelViewSchema } from "@/schema/model"
import { Prisma } from "@prisma/client"
import { z } from "zod"
import { userListViewSchema } from "./user.base"

export const appDetailSchema = Prisma.validator<Prisma.AppDefaultArgs>()({
  include: {
    fromUser: userListViewSchema,
    model: modelViewSchema, // model虽然在系统里已经事先获取了一份，但可能不全
  },
})
export type IAppDetail = Prisma.AppGetPayload<typeof appDetailSchema>

/**
 * todo: use from app model
 */
export const createAppSchema = z.object({
  id: z.string(),
  modelName: z.string(),
  title: z.string().nullable(),
  systemPrompt: z.string().nullable(),
  temperature: z.number().nullable(),
})
export type ICreateApp = z.infer<typeof createAppSchema>
