"use server"
import { callChatGPT } from "../../../../packages/llm/models/openai"
import { manager } from "@/app/api/llm/init"

import { ILLMMessage } from "@/schema/message"
import { IRequest, ISSEEvent } from "../../../../packages/common/lib/sse/schema"
import { App } from ".prisma/client"
import { db } from "../../../../packages/common/lib/db"
import { Prisma } from "@prisma/client"
import { getTriggerID } from "@/store/request.atom"

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

  console.log("[sse] triggered: ", {
    ...context,
    manager: { size: Object.keys(manager).length },
    triggerId,
  })

  const r: IRequest = (manager[triggerId] = {
    finished: false,
    data: [],
    clients: [],
  })

  const push = (e: ISSEEvent) => {
    r.data.push(e)
    r.clients.forEach((c) => c.onEvent(e))
  }

  const updateDB = (data: Prisma.ResponseUpdateInput) =>
    db.response.update({
      where: {
        requestId_appId: {
          requestId,
          appId,
        },
      },
      data,
    })

  const start = async () => {
    let output = ""
    await updateDB({
      tStart: new Date(),
    })

    try {
      if (["gpt-3.5-turbo", "gpt-4", "gpt-4-32k"].includes(app.modelName)) {
        const res = await callChatGPT({ app, context })
        for await (const chunk of res) {
          // console.log("[llm] chunk: ", JSON.stringify(chunk))
          const token = chunk.content as string
          output += token
          console.log("[llm] token: ", { triggerID: requestId, token })
          push({ event: "onData", data: token })
        }
      } else {
        throw new Error("暂不支持该模型（研发小哥正在加🍗中！）")
      }
    } catch (e) {
      console.error("[call] error: ", e)
      const err = e as { message: string }
      push({ event: "onError", data: err.message })
      await updateDB({
        error: err.message,
      })
    } finally {
      // close
      r.finished = true

      push({ event: "close" })
      await updateDB({
        tEnd: new Date(),
        response: output,
      })
      console.log("-- closing: ", { triggerId, output })
    }
  }

  void start()
  return true
}
