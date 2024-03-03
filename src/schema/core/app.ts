import { modelInDBSchema } from "@/schema/core/model"
import { Prisma } from "@prisma/client"

export const appInDBSchema = Prisma.validator<Prisma.AppDefaultArgs>()({
  include: {
    model: modelInDBSchema,
  },
})
export type IAppInDB = Prisma.AppGetPayload<typeof appInDBSchema>

export type IAppInChat = IAppInDB & {
  needFetchLLM?: boolean
}
