import { ILLMMessage } from "@/schema/message"
import { IBaseResponse } from "@/schema/query"
import { IRequest } from "@/schema/request"
import { prisma } from "../../common-db"
import { PusherServerId } from "../../common-pusher/schema"
import { createCallLLMSchema, parseApp } from "../schema"
import { CONV_SUMMARY_PROMPT } from "../store"
import { callLLMWithDB } from "./llm-caller-with-db"

export const triggerLLMThreads = async (
  request: IRequest,
  context: ILLMMessage[],
  options: {
    pusherServerId: PusherServerId
    llmDelay: number
  },
  withConv?: {
    userId: string
    convId: string
    bestChatId: string
    systemPromptForConvTitle?: string
  },
) => {
  const { pusherServerId, llmDelay } = options

  await Promise.all(
    /**
     * 1. responses of chats
     */
    request.responses.map(async (r) => {
      void callLLMWithDB<IBaseResponse>(
        {
          action: "trigger",
          request: {
            pusherServerId,
            requestId: request.id,
            appId: r.appId!,
            type: "app-response",
            status: "to-response",
          },
          app: { ...parseApp(r.app!), timeout: 3000 },
          context,
          llmDelay,
        },
        async (response) => {
          console.log("-- updating app response: ", { response, r })

          await prisma.response.update({
            where: {
              id: r.id,
            },
            data: response,
          })

          /**
           * 2. response of conv title
           */

          if (
            !withConv ||
            r.appClientId !== withConv.bestChatId ||
            !response.content
          )
            return

          // 使用最好的那个app回复的上下文进行总结
          void callLLMWithDB<IBaseResponse>(
            {
              action: "trigger",
              request: {
                pusherServerId,
                convId: request.convId,
                type: "conv-title",
                status: "to-response",
                userId: withConv.userId,
              },
              app: createCallLLMSchema.parse({
                modelName: "gpt-3.5-turbo",
              }),
              context: [
                {
                  role: "system",
                  content:
                    withConv.systemPromptForConvTitle ?? CONV_SUMMARY_PROMPT,
                },
                ...context,
                {
                  role: "assistant",
                  content: response.content,
                },
              ],
              llmDelay,
            },
            async (response) => {
              console.log("-- updating conv title into db: ", { response })
              await prisma.response.update({
                where: { convId: request.convId },
                data: response,
              })
            },
          )
        },
      )
    }),
  )
}
