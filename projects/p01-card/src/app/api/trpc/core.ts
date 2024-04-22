import { userDetailSchema } from "@cs-magic/prisma/schema/user.detail"
import { z } from "zod"
import { prisma } from "../../../../../../packages/db/providers/prisma"
import {
  createTRPCRouter,
  protectedProcedure,
} from "../../../../../../packages/trpc/trpc"

export const coreRouter = createTRPCRouter({
  getSelf: protectedProcedure.query(async ({ ctx }) =>
    prisma.user.findUniqueOrThrow({
      where: { id: ctx.user.id },
      ...userDetailSchema,
    }),
  ),

  updateSelf: protectedProcedure
    .input(z.object({}))
    .mutation(({ ctx, input }) => {
      console.log("update self")
      return prisma.user.update({
        where: { id: ctx.user.id },
        data: input,
      })
    }),
})
