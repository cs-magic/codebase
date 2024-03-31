import { Prisma } from "@prisma/client"

export const cardBodyBasicSchema =
  Prisma.validator<Prisma.CardBodyDefaultArgs>()({
    include: {},
  })
export type ICardBodyBasic = Prisma.CardBodyGetPayload<
  typeof cardBodyBasicSchema
>
