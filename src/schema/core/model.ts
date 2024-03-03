import { Prisma } from "@prisma/client"

export const modelInDBSchema = Prisma.validator<Prisma.ModelDefaultArgs>()({
  include: {
    company: true,
  },
})
export type IModelInDB = Prisma.ModelGetPayload<typeof modelInDBSchema>
