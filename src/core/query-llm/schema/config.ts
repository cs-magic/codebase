import { modelInDBSchema } from "@/core/query-llm/schema/model"
import { Prisma } from "@prisma/client"

export const queryConfigInDBSchema =
  Prisma.validator<Prisma.QueryConfigDefaultArgs>()({
    include: {
      model: modelInDBSchema,
    },
  })
export type IQueryConfigInDB = Prisma.QueryConfigGetPayload<
  typeof queryConfigInDBSchema
>

export type IQueryConfigInChat = IQueryConfigInDB & {
  needFetchLLM?: boolean
}
