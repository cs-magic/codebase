import { userDetailSchema } from "@cs-magic/common"
import { prisma } from "@cs-magic/common/dist/db/prisma.js"
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../../../trpc/trpc"

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
