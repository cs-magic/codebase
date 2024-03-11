import { Prisma } from "@prisma/client"

import { appDetailSchema } from "./app.detail"

import { convDetailSchema } from "./conv.detail"

export const userDetailSchema = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    appsWithChat: appDetailSchema,
    convs: convDetailSchema,
  },
})
export type IUser = Prisma.UserGetPayload<typeof userDetailSchema>
