import { Prisma } from "@prisma/client"

export const convSummarySchema = Prisma.validator<Prisma.ConvDefaultArgs>()({
    select: {
        id: true,
        updatedAt: true,
        titleResponse: {
            select: {
                content: true,
            },
        },
        currentRequestId: true,
    },
})
export type IConvBase = Prisma.ConvGetPayload<typeof convSummarySchema>
