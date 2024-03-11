import { ILLMMessage } from "@/schema/message"
import { IBaseResponse } from "@/schema/query"
import { IRequest } from "@/schema/request"
import { LlmActionPayload } from "@/schema/sse"
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
    withConv?: {
      bestAppClientId: string
      systemPromptForConvTitle?: string
    }
  },
) => {
  const { pusherServerId, llmDelay, withConv } = options

  await Promise.all(
    request.responses.map(async (r) => {
      const payload: LlmActionPayload = {
        action: "trigger",
        request: {
          pusherServerId,
          requestId: request.id,
          appId: r.appId,
          appClientId: r.appClientId,
          type: "app-response",
          status: "to-response",
        },
        app: parseApp(r.app),
        context,
        llmDelay,
      }
      void callLLMWithDB<IBaseResponse>(payload, async (response) => {
        await prisma.response.update({
          where: {
            requestId_appId: {
              requestId: request.id,
              appId: r.appId,
            },
          },
          data: response,
        })

        // 使用最好的那个app回复的上下文进行总结
        if (
          withConv &&
          r.appClientId === withConv.bestAppClientId &&
          response.content
        ) {
          const payload: LlmActionPayload = {
            action: "trigger",
            request: {
              pusherServerId,
              convId: request.convId,
              type: "conv-title",
              status: "to-response",
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
          }

          void callLLMWithDB<IBaseResponse>(payload, async (response) => {
            console.log("-- updating conv title into db: ", { response })
            await prisma.convTitleResponse.update({
              where: { convId: request.convId },
              data: response,
            })
          })
        }
      })
    }),
  )
}
