"use server"

import { sleep } from "../../common-algo/utils"
import { callChatGPT, callLLMApiMock } from "../models/openai"
import { getChannelIdFomRequest, LLMActionPayload } from "@/schema/sse"
import { PusherLLMManager } from "../providers/llm-pusher"

export const callLLM = async (
  payload: LLMActionPayload,
  options: {
    onInit?: () => void
    onData?: (data: string) => void
    onError?: (error: string) => void
    onFinal?: () => void
  },
) => {
  const { request, action } = payload
  const channelId = getChannelIdFomRequest(request)
  console.log("[LLM] called: ", { ...payload, channelId })

  if (!channelId || !request.pusherServerId) return

  const llmManager = new PusherLLMManager(channelId, request.pusherServerId)

  if (action === "interrupt") {
    await llmManager.onTriggerEnds("interrupted")
    return
  }

  const { context, llmDelay = 0, app } = payload

  try {
    if (options.onInit) options.onInit()

    const api = ["gpt-3.5-turbo", "gpt-4", "gpt-4-32k"].includes(app.modelName)
      ? callChatGPT
      : callLLMApiMock

    // todo: external timeout of clash
    // todo: limit times / tokens
    const res = await api({ config: app, context })

    // ~~不需延后，pusher应该会自动接收之前的通知~~
    // 需要延后！
    // push的时候要把参数写全，否则会ignore掉
    await llmManager.onTriggerStarts()

    for await (const chunk of res) {
      // 用户打断
      if ((await llmManager.status) !== "responding") break

      const token = chunk.content as string

      if (options.onData) options.onData(token)

      // console.debug("[llm] token: ", { triggerID: requestId, token })
      await llmManager.onEvent({
        event: "data",
        data:
          request.type === "conv-title"
            ? { token, convId: request.convId }
            : { token },
      })

      await sleep(llmDelay)
    }
  } catch (e) {
    console.error("[LLM] error: ", e)

    const message = (e as { message: string }).message

    await llmManager.onEvent({ event: "error", data: { message } })

    if (options.onError) options.onError(message)
  } finally {
    console.log("[LLM] finished")

    if (options.onFinal) options.onFinal()

    // clean
    await llmManager.onTriggerEnds("responded")
  }
}
