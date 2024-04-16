import { Prisma } from "@prisma/client"

export const userDetailSchema = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {},
})
export type IUserDetail = Prisma.UserGetPayload<typeof userDetailSchema>
