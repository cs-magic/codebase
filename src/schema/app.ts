import { modelViewSchema } from "@/schema/model"
import { Prisma } from "@prisma/client"
import { userListViewSchema } from "@/schema/user"
import { z } from "zod"

export const appInDBSchema = Prisma.validator<Prisma.AppDefaultArgs>()({
  include: {
    fromUser: userListViewSchema,
    model: modelViewSchema, // model虽然在系统里已经事先获取了一份，但可能不全
  },
})
export type IAppInDB = Prisma.AppGetPayload<typeof appInDBSchema>

export type IAppInChat = IAppInDB

export const createAppSchema = z.object({
  id: z.string(),
  modelName: z.string(),
  title: z.string().nullable(),
  systemPrompt: z.string().nullable(),
  temperature: z.number().nullable(),
})
