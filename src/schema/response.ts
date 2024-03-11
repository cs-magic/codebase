import { Prisma } from "@prisma/client"
import { appDetailSchema } from "./app.detail"
import { IBaseResponse } from "./query"

export const responseSchema = Prisma.validator<Prisma.ResponseDefaultArgs>()({
  include: {
    app: appDetailSchema,
  },
})
export type IResponse = Prisma.ResponseGetPayload<typeof responseSchema>

export type IUpdateResponse = (s: IBaseResponse) => void
