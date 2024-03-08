"use server"
import { getTriggerID } from "@/lib/utils"

import { ILLMMessage } from "@/schema/message"
import { Prisma } from "@prisma/client"
import { prisma } from "../../../../packages/common/lib/db"
import {
  ISSEEvent,
  ISSERequest,
} from "../../../../packages/common/lib/sse/schema"
import { sleep } from "../../../../packages/common/lib/utils"
import { callChatGPT } from "../../../../packages/llm/models/openai"
import { ICreateCallLLM } from "../../../../packages/llm/schema"
import { llmManager } from "./manager"

export const triggerLLM = async ({
  task,
  requestId,
  app,
  context,
  llmDelay = 0,
}: {
  task:
    | {
        convId: undefined
        appId: string
      }
    | {
        convId: string
        appId: undefined
      }
  requestId: string
  app: ICreateCallLLM
  context: ILLMMessage[]
  llmDelay?: number
  // todo: more args
}) => {
  const triggerId = getTriggerID(requestId, task.convId ?? task.appId)

  const response: Prisma.ResponseUncheckedCreateInput = {
    tStart: new Date(),
    requestId,
    content: "", // init or undefined, affecting later concat string
    appId:
      task.appId ??
      // compatible with conv
      "",
  }

  const r: ISSERequest = {
    clients: [],
    response,
  }
  await llmManager.set(triggerId, r)

  const pushToClients = (e: ISSEEvent) => r.clients.forEach((c) => c.onEvent(e))

  console.log("[sse] triggered: ", {
    triggerId,
    context,
    triggers: Object.keys(llmManager),
  })

  const start = async () => {
    try {
      const {
        // todo: dynamic openai api key
        openAIApiKey,
        ...config
      } = app
      if (["gpt-3.5-turbo", "gpt-4", "gpt-4-32k"].includes(app.modelName)) {
        const res = await callChatGPT({
          // null --> default
          config,
          context,
        })
        for await (const chunk of res) {
          // console.log("[llm] chunk: ", JSON.stringify(chunk))
          const token = chunk.content as string
          r.response.content += token
          // console.debug("[llm] token: ", { triggerID: requestId, token })
          pushToClients({ event: "onData", data: token })
          await sleep(llmDelay)
        }
      } else {
        throw new Error("暂不支持该模型（研发小哥正在加🍗中！）")
      }
    } catch (e) {
      console.error("[call] error: ", e)
      const err = e as { message: string }
      pushToClients({ event: "onError", data: err.message })
      r.response.error = err.message
    } finally {
      r.response.tEnd = new Date()
      // 只在最后更新一次数据库
      if (task.appId) {
        await prisma.response.update({
          where: {
            requestId_appId: {
              requestId,
              appId: task.appId,
            },
          },
          data: r.response,
        })
      } else {
        const { requestId, appId, ...props } = r.response
        await prisma.convTitleResponse.upsert({
          where: {
            convId: task.convId,
          },
          create: {
            ...props,
            conv: {
              connect: {
                id: task.convId,
              },
            },
          },
          update: {
            ...props,
          },
        })
      }

      pushToClients({ event: "close" })
      // clean
      await llmManager.del(triggerId)
      console.log("[sse] closed")
    }
  }

  void start()
  return true
}
