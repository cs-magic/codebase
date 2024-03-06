import { Prisma } from "@prisma/client"

export const userListViewSchema = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    image: true,
    name: true,
  },
})
export type IUserListView = Prisma.UserGetPayload<typeof userListViewSchema>
