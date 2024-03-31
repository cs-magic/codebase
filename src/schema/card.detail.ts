import { Prisma } from "@prisma/client"

export const cardDetailSchema = Prisma.validator<Prisma.CardDefaultArgs>()({
  include: {
    body: true,
  },
})
export type ICardDetail = Prisma.CardGetPayload<typeof cardDetailSchema>
