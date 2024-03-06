import { Prisma } from "@prisma/client"
import { appDetailSchema } from "./app"
import { convDetailSchema } from "./conv"

export const userDetailSchema = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    apps: appDetailSchema,
    convs: convDetailSchema,
  },
})
export type IUser = Prisma.UserGetPayload<typeof userDetailSchema>
