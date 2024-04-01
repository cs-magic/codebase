import { Prisma } from "@prisma/client"

export const cardBasicSchema = Prisma.validator<Prisma.CardDefaultArgs>()({})
export type ICardBasic = Prisma.CardGetPayload<typeof cardBasicSchema>
