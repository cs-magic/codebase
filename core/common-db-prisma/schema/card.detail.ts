import { Prisma } from "@prisma/client"

export const cardDetailSchema = Prisma.validator<Prisma.CardDefaultArgs>()({})
export type ICardDetail = Prisma.CardGetPayload<typeof cardDetailSchema>
