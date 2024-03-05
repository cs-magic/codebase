"use server"
import { getTriggerID } from "@/lib/utils"

import { ILLMMessage } from "@/schema/message"
import { Prisma } from "@prisma/client"
import { db } from "../../../../packages/common/lib/db"
import {
  ISSEEvent,
  ISSERequest,
} from "../../../../packages/common/lib/sse/schema"
import { callChatGPT } from "../../../../packages/llm/models/openai"
import { llmManager } from "./manager"
import { App } from ".prisma/client"

export const triggerLLM = async ({
  requestId,
  app,
  context,
}: {
  requestId: string
  app: App
  context: ILLMMessage[]
  // todo: more args
}) => {
  const appId = app.id
  const triggerId = getTriggerID(requestId, appId)

  const response: Prisma.ResponseUncheckedCreateInput = {
    appId,
    tStart: new Date(),
    requestId,
    response: "", // init or undefined, affecting later concat string
  }

  const r: ISSERequest = (llmManager[triggerId] = {
    clients: [],
    response,
  })

  const pushToClients = (e: ISSEEvent) => r.clients.forEach((c) => c.onEvent(e))

  console.log("[sse] triggered: ", {
    triggerId,
    context,
    triggers: Object.keys(llmManager),
  })

  const start = async () => {
    try {
      if (["gpt-3.5-turbo", "gpt-4", "gpt-4-32k"].includes(app.modelName)) {
        const res = await callChatGPT({ app, context })
        for await (const chunk of res) {
          // console.log("[llm] chunk: ", JSON.stringify(chunk))
          const token = chunk.content as string
          r.response.response += token
          // console.debug("[llm] token: ", { triggerID: requestId, token })
          pushToClients({ event: "onData", data: token })
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
      const responseInDB = await db.response.update({
        where: {
          requestId_appId: {
            requestId,
            appId,
          },
        },
        data: r.response,
      })

      pushToClients({ event: "close" })
      delete llmManager[requestId] // clean manager
      console.log("[sse] closed: ", responseInDB)
    }
  }

  void start()
  return true
}
