import { Prisma } from "@prisma/client"

export const userSummarySchema = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    image: true,
    name: true,
  },
})
export type IUserSummary = Prisma.UserGetPayload<typeof userSummarySchema> & {
  // compatible
  avatar?: string
}
