"use server"
import { Prisma } from "@prisma/client"
import { sleep } from "../../../../packages/common-algo/utils"
import { prisma } from "../../../../packages/common-db"
import { callChatGPT } from "../../../../packages/common-llm/models/openai"
import { LlmActionPayload } from "../../../schema/sse"
import { getTriggerID } from "../../../utils"
import { StaticLlmManager } from "./manager-static"

export const dispatchLlmAction = async (payload: LlmActionPayload) => {
  const { request, action } = payload
  const { requestId, convId, status, type } = request
  const targetId = type === "conv-title" ? convId : request.appId
  if (!requestId || !targetId) return null
  const triggerId = getTriggerID(requestId, targetId)

  const llmManager = new StaticLlmManager(triggerId)

  if (action === "interrupt") {
    await llmManager.onTriggerEnds("interrupted")
    return null
  }

  const { context, llmDelay = 0, app } = payload

  const response: Prisma.ResponseUncheckedCreateInput = {
    tStart: new Date(),
    requestId,
    content: "", // init or undefined, affecting later concat string
    appId: type === "app-response" ? request.appId : "",
  }

  await llmManager.onTriggerStarts()
  console.log("[sse] triggered: ", {
    triggerId,
    context,
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
          // 用户打断
          if (!llmManager.trigger) break

          // console.log("[llm] chunk: ", JSON.stringify(chunk))
          const token = chunk.content as string
          response.content += token
          // console.debug("[llm] token: ", { triggerID: requestId, token })
          await llmManager.onEvent({ event: "data", data: token })
          await sleep(llmDelay)
        }
      } else {
        throw new Error("暂不支持该模型（研发小哥正在加🍗中！）")
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
      response.error = err.message
    } finally {
      response.tEnd = new Date()
      if (type === "app-response") {
        // update conv app
        await prisma.response.update({
          where: {
            requestId_appId: {
              requestId,
              appId: request.appId,
            },
          },
          data: response,
        })
      } else {
        // update conv title
        const { requestId, appId, ...props } = response
        await prisma.convTitleResponse.upsert({
          where: {
            convId,
          },
          create: {
            ...props,
            conv: {
              connect: {
                id: convId,
              },
            },
          },
          update: {
            ...props,
          },
        })
      }

      // clean
      await llmManager.onTriggerEnds("transfer completed")
      console.log("[sse] finished: ", { triggerId, response })
    }
  }

  void start()
  return null
}
