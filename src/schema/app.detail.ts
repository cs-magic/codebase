import { Prisma } from "@prisma/client"
import { createAppSchema } from "./app.create"
import { modelViewSchema } from "./model"
import { IAppResponse } from "./query"
import { userListViewSchema } from "./user.base"
import { z } from "zod"

export const appDetailSchema = Prisma.validator<Prisma.AppDefaultArgs>()({
  include: {
    fromUser: userListViewSchema,
    model: modelViewSchema, // model虽然在系统里已经事先获取了一份，但可能不全
  },
})

export type IAppDetail = Prisma.AppGetPayload<typeof appDetailSchema>

// export type IAppDetail = Omit<
//   Prisma.AppGetPayload<typeof appDetailSchema>,
//   // for typescript check of valtio snapshot
//   "stop"
// > & {
//   stop: Readonly<string[]>
// }

export type IAppClientSpecial = {
  isDraft: boolean
}
