"use server"
import { callChatGPT } from "../../../../packages/llm/models/openai"
import { manager } from "@/app/api/llm/init"

import { ILLMMessage } from "@/schema/message"
import { IRequest, ISSEEvent } from "../../../../packages/common/lib/sse/schema"
import { App } from ".prisma/client"

export const triggerLLM = async ({
  triggerID,
  app,
  context,
}: {
  triggerID: string
  app: App
  context: ILLMMessage[]
  // todo: more args
}) => {
  // register into manger for later requests to read

  const r: IRequest = (manager[triggerID] = {
    finished: false,
    data: [],
    clients: [],
  })
  console.log("[llm] triggered: ", {
    ...context,
    manager: { size: Object.keys(manager).length },
  })
  // console.debug("[sse] manager added: ", { manager })

  const push = (e: ISSEEvent) => {
    r.data.push(e)
    r.clients.forEach((c) => c.onEvent(e))
  }

  const start = async () => {
    try {
      if (["gpt-3.5-turbo", "gpt-4", "gpt-4-32k"].includes(app.modelName)) {
        const res = await callChatGPT({
          app,
          context,
        })
        for await (const chunk of res) {
          // console.log("[llm] chunk: ", JSON.stringify(chunk))
          const token = chunk.content as string
          console.log("[llm] token: ", { triggerID: triggerID, token })
          push({ event: "onData", data: token })
        }
      } else {
        throw new Error("暂不支持该模型（研发小哥正在加🍗中！）")
      }
    } catch (e) {
      console.error("[call] error: ", e)
      const err = e as { message: string }
      push({ event: "onError", data: err.message })
    } finally {
      // close
      push({ event: "close" })
      r.finished = true
    }
  }

  void start()
  return true
}
