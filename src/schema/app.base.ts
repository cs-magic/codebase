import { Prisma } from "@prisma/client"

export const appBaseSchema = Prisma.validator<Prisma.AppDefaultArgs>()({
  select: {
    id: true,
    title: true,
  },
})
export type IAppBase = Prisma.AppGetPayload<typeof appBaseSchema>
