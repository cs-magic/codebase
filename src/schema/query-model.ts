import { Prisma } from "@prisma/client"

export const modelInDBSchema = Prisma.validator<Prisma.ModelDefaultArgs>()({
  include: {
    company: true,
  },
})
export type IModelInDB = Prisma.ModelGetPayload<typeof modelInDBSchema>
export const modelViewSchema = Prisma.validator<Prisma.ModelDefaultArgs>()({
  include: {
    company: true,
  },
})
export type IModelView = Prisma.ModelGetPayload<typeof modelViewSchema>
