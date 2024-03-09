import { prisma } from "../../common-db"
import { createCallLLMSchema, parseApp } from "../schema"
import { CONV_SUMMARY_PROMPT } from "../store"
import { PusherServerId } from "../../common-puser/config"
import { IConvDetail } from "@/schema/conv"
import { ILLMMessage } from "@/schema/message"
import { IBaseResponse } from "@/schema/query"
import { LlmActionPayload } from "@/schema/sse"
import { callLLMWithDB } from "./llm-caller-with-db"

export const triggerLLMThreads = async (
  conv: IConvDetail,
  requestId: string,
  pusherServerId: PusherServerId,
  context: ILLMMessage[],
  llmDelay: number,
  bestAppId: string,
  systemPromptForConvTitle?: string,
) => {
  await Promise.all(
    conv.requests
      .find((r) => r.id === requestId)!
      .responses.map(async (r) => {
        const appId = r.appId
        const payload: LlmActionPayload = {
          action: "trigger",
          request: {
            pusherServerId,
            requestId,
            appId,
            type: "app-response",
            status: "to-response",
          },
          app: parseApp(r.app),
          context,
          llmDelay,
        }
        void callLLMWithDB<IBaseResponse>(payload, async (response) => {
          await prisma.response.update({
            where: { requestId_appId: { requestId, appId } },
            data: response,
          })

          // 使用最好的那个app回复的上下文进行总结
          if (
            appId === bestAppId &&
            !conv.titleResponse?.tStart &&
            response.content
          ) {
            const payload: LlmActionPayload = {
              action: "trigger",
              request: {
                pusherServerId,
                convId: conv.id,
                type: "conv-title",
                status: "to-response",
              },
              app: createCallLLMSchema.parse({
                modelName: "gpt-3.5-turbo",
              }),
              context: [
                {
                  role: "system",
                  content: systemPromptForConvTitle ?? CONV_SUMMARY_PROMPT,
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
                where: { convId: conv.id },
                data: response,
              })
            })
          }
        })
      }),
  )
}
