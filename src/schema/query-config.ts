import { modelViewSchema } from "@/schema/query-model"
import { Prisma } from "@prisma/client"
import { userListViewSchema } from "@/schema/user"

export const queryConfigInDBSchema =
  Prisma.validator<Prisma.QueryConfigDefaultArgs>()({
    include: {
      fromUser: userListViewSchema,
      model: modelViewSchema, // model虽然在系统里已经事先获取了一份，但可能不全
    },
  })
export type IQueryConfigInDB = Prisma.QueryConfigGetPayload<
  typeof queryConfigInDBSchema
>

export type IQueryConfigInChat = IQueryConfigInDB & {
  needFetchLLM?: boolean
}
