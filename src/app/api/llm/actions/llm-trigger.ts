import { ConvTitleResponse, Response } from "@prisma/client"
import { prisma } from "../../../../../packages/common-db"
import {
  createCallLLMSchema,
  parseApp,
} from "../../../../../packages/common-llm/schema"
import { PusherServerId } from "../../../../../packages/common-puser/config"
import { IConvDetail } from "../../../../schema/conv"
import { ILLMMessage } from "../../../../schema/message"
import { LlmActionPayload } from "../../../../schema/sse"
import { callLLMWithDB } from "./llm-caller-with-db"

export const triggerLLMThreads = async (
  conv: IConvDetail,
  requestId: string,
  pusherServerId: PusherServerId,
  context: ILLMMessage[],
  llmDelay: number,
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
        await callLLMWithDB<Response>(payload, async (response) => {
          await prisma.response.update({
            where: { requestId_appId: { requestId, appId } },
            data: response,
          })
        })
      }),
  )

  // 如果已经更新了就不要改了
  if (conv.titleResponse?.content) {
  } else {
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
          content:
            "以下是我与你的一段对话，请做一个简要的总结（要求：不超过10个字）",
        },
        ...context,
      ],
      llmDelay,
    }
    await callLLMWithDB<ConvTitleResponse>(payload, async (response) => {
      await prisma.convTitleResponse.update({
        where: { convId: conv.id },
        data: response,
      })
    })
  }
}
