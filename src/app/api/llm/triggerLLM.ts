"use server"
import { callChatGPT } from "@/server/llm/openai"
import { last } from "lodash"
import { MessageRole } from "@prisma/client"
import { manager } from "@/app/api/llm/init"
import { IRequest, ISSEEvent } from "@/app/api/llm/schema"

export const triggerLLM = async (context: {
  requestId: string
  modelId: string
  messages: { content: string; role: MessageRole }[]
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

  const successfullyCall = async () => {
    try {
      const res = await callChatGPT({
        modelId,
        // todo: context
        prompt: last(messages)!.content,
      })
      for await (const chunk of res) {
        // console.log("[llm] chunk: ", JSON.stringify(chunk))
        const token = chunk.content as string
        console.log("[llm] token: ", { requestId, token })
        const e: ISSEEvent = { event: "data", data: token }
        r.data.push(e)
        r.clients.forEach((c) => c.onEvent(e))
      }
    } catch (e) {
      console.error("[call] error: ", e)
    } finally {
      // close
      const e: ISSEEvent = { event: "close" }
      r.data.push(e)
      r.clients.forEach((c) => c.onEvent(e))
      r.finished = true
    }
  }

  if (["gpt-3.5-turbo", "gpt-4", "gpt-4-32k"].includes(modelId)) {
    // do not wait, o.w. frontend is blocked
    void successfullyCall()
    return true
  }
  // todo: more models
  return false
}
