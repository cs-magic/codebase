"use server"
import { callChatGPT } from "@/server/models/openai"
import { manager } from "@/app/api/llm/init"
import { IRequest, ISSEEvent } from "@/app/api/llm/schema"

import { ILLMMessage } from "@/schema/query-message"

export const triggerLLM = async (context: {
  requestId: string
  modelId: string
  messages: ILLMMessage[]
  // todo: more args
}) => {
  // register into manger for later requests to read
  const { requestId, modelId, messages } = context
  const r: IRequest = (manager[requestId] = {
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
      if (["gpt-3.5-turbo", "gpt-4", "gpt-4-32k"].includes(modelId)) {
        const res = await callChatGPT({
          modelId,
          messages,
        })
        for await (const chunk of res) {
          // console.log("[llm] chunk: ", JSON.stringify(chunk))
          const token = chunk.content as string
          console.log("[llm] token: ", { requestId, token })
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
