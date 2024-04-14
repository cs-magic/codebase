import { prisma } from "../../../../../../packages/common-db/providers/prisma";
import {
  createTRPCRouter,
  protectedProcedure,
} from "../../../../../../packages/common-trpc/trpc";
import { UserUpdateInputSchema } from "../../../../prisma/generated/zod";
import { userDetailSchema } from "../../../schema/user.detail";

export const coreRouter = createTRPCRouter({
  getSelf: protectedProcedure.query(async ({ ctx }) =>
    prisma.user.findUniqueOrThrow({
      where: { id: ctx.user.id },
      ...userDetailSchema,
    }),
  ),

  updateSelf: protectedProcedure
    .input(UserUpdateInputSchema)
    .mutation(({ ctx, input }) => {
      console.log("update self");
      return prisma.user.update({
        where: { id: ctx.user.id },
        data: input,
      });
    }),
});
