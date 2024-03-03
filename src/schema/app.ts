import { modelViewSchema } from "@/schema/model"
import { Prisma } from "@prisma/client"
import { userListViewSchema } from "@/schema/user"

export const AppInDBSchema = Prisma.validator<Prisma.QueryConfigDefaultArgs>()({
  include: {
    fromUser: userListViewSchema,
    model: modelViewSchema, // model虽然在系统里已经事先获取了一份，但可能不全
  },
})
export type IAppInDB = Prisma.QueryConfigGetPayload<typeof AppInDBSchema>

export type IAppInChat = IAppInDB & {
  needFetchLLM?: boolean
}
