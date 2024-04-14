import { Prisma } from "@prisma/client"

export const userDetailSchema = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {},
})
export type IUser = Prisma.UserGetPayload<typeof userDetailSchema>
