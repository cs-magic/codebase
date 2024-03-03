import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"
import { db } from "@/server/db"
import { $Enums } from "@prisma/client"
import { createMessageSchema } from "@/schema/core/message"
import { pusherSend } from "@/lib/puser/server/actions"
import ConversationType = $Enums.ConversationType

export const messageRouter = createTRPCRouter({
  add: protectedProcedure
    .input(createMessageSchema)
    .mutation(async ({ input, ctx }) => {
      const { id: userId } = ctx.user
      const { text, id: conversationId } = input
      // const message = await db.message.create({
      //   data: {
      //     fromUser: {
      //       connect: {
      //         id: userId,
      //       },
      //     },
      //     content: text,
      //     toConversation: {
      //       connectOrCreate: {
      //         where: { id: conversationId ?? "" },
      //         create: {
      //           type: ConversationType.LLM,
      //           users: {
      //             connect: [{ id: userId }],
      //           },
      //         },
      //       },
      //     },
      //   },
      // })
      //
      // const channelId = message.toConversationId
      // const serverId = input.pusherServerId
      // if (serverId) {
      //   void pusherSend(serverId, channelId, "onUserMessage", {
      //     channelId,
      //     content: text,
      //     fromUserId: userId,
      //   })
      // }
      //
      // return message
    }),
})
