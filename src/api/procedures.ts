import { z } from "zod"
import { db } from "../../packages/common/lib/db"
import { protectedProcedure } from "./trpc"
import { queryConvDetailViewSchema } from "@/schema/query-conv"

export const queryConvProcedure = protectedProcedure
  .input(z.object({ conversationId: z.string() }))
  .use(async ({ ctx, next, input }) => {
    const conversation = await db.queryConv.findUniqueOrThrow({
      where: {
        id: input.conversationId,
        fromUserId: ctx.user.id,
      },
      ...queryConvDetailViewSchema,
    })

    return next({
      ctx: {
        conversation,
      },
    })
  })
