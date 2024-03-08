"use server"
import { sleep } from "../../../../packages/common-algo/utils"
import {
  callChatGPT,
  callLlmApiMock,
} from "../../../../packages/common-llm/models/openai"
import {
  getTriggerIdFromSseRequest,
  LlmActionPayload,
} from "../../../schema/sse"
import { PusherLlmManager } from "./manager-pusher"

export const dispatchLlmAction = async (
  payload: LlmActionPayload,
  options: {
    onInit?: () => void
    onData?: (data: string) => void
    onError?: (error: string) => void
    onFinal?: () => void
  },
) => {
  const { request, action } = payload
  const triggerId = getTriggerIdFromSseRequest(request)

  const llmManager = new PusherLlmManager(request)

  if (action === "interrupt") {
    await llmManager.onTriggerEnds("interrupted")
    return null
  }

  const { context, llmDelay = 0, app } = payload

  await llmManager.onTriggerStarts()
  console.log("[sse] triggered: ", {
    triggerId,
    context,
  })

  const start = async () => {
    try {
      if (options.onInit) options.onInit()
      const {
        // todo: dynamic openai api key
        openAIApiKey,
        ...config
      } = app
      const api = ["gpt-3.5-turbo", "gpt-4", "gpt-4-32k"].includes(
        app.modelName,
      )
        ? callChatGPT
        : callLlmApiMock
      const res = await api({
        // null --> default
        config,
        context,
      })
      for await (const chunk of res) {
        // todo: 用户打断
        // if (!llmManager.trigger) break

        // console.log("[llm] chunk: ", JSON.stringify(chunk))
        const token = chunk.content as string
        if (options.onData) options.onData(token)
        // console.debug("[llm] token: ", { triggerID: requestId, token })
        await llmManager.onEvent({ event: "data", data: token })
        await sleep(llmDelay)
      }
    } catch (e) {
      console.error("[call] error: ", e)
      const err = e as {
        message: string
      }
      await llmManager.onEvent({
        event: "error",
        data: err.message,
      })
      if (options.onError) options.onError(err.message)
    } finally {
      if (options.onFinal) options.onFinal()
      // clean
      await llmManager.onTriggerEnds("transfer completed")
      console.log("[sse] finished: ", { triggerId })
    }
  }

  void start()
  return null
}
