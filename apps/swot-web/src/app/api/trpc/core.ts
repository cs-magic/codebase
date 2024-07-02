import { userDetailSchema } from "@cs-magic/prisma/schema/user.detail"
import { z } from "zod"
import { prisma } from "@cs-magic/common"
import {
  createTRPCRouter,
  protectedProcedure,
} from "@cs-magic/common/trpc/trpc"

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
