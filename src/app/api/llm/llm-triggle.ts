"use server"
import { ILLMMessage } from "@/schema/message"
import { Prisma } from "@prisma/client"
import { sleep } from "../../../../packages/common-algo/utils"
import { prisma } from "../../../../packages/common-db"
import { callChatGPT } from "../../../../packages/common-llm/models/openai"
import { ICreateCallLLM } from "../../../../packages/common-llm/schema"
import { ISSEEvent } from "../../../../packages/common-sse/schema"
import { getTriggerID } from "../../../utils"
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

  const r: Prisma.ResponseUncheckedCreateInput = {
    tStart: new Date(),
    requestId,
    content: "", // init or undefined, affecting later concat string
    appId:
      task.appId ??
      // compatible with conv
      "",
  }

  await llmManager.addTrigger(triggerId)
  console.log("[sse] triggered: ", {
    triggerId,
    context,
    triggers: await llmManager.listTriggers(),
  })

  const start = async () => {
    const pushToClients = async (e: ISSEEvent) => {
      await llmManager.pushEventToClients(triggerId, e)
    }

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
          r.content += token
          // console.debug("[llm] token: ", { triggerID: requestId, token })
          await pushToClients({ event: "onData", data: token })
          await sleep(llmDelay)
        }
      } else {
        throw new Error("暂不支持该模型（研发小哥正在加🍗中！）")
      }
    } catch (e) {
      console.error("[call] error: ", e)
      const err = e as { message: string }
      await pushToClients({ event: "onError", data: err.message })
      r.error = err.message
    } finally {
      r.tEnd = new Date()
      // 只在最后更新一次数据库
      if (task.appId) {
        await prisma.response.update({
          where: {
            requestId_appId: {
              requestId,
              appId: task.appId,
            },
          },
          data: r,
        })
      } else {
        const { requestId, appId, ...props } = r
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

      await pushToClients({ event: "close" })
      // clean
      await llmManager.cleanTrigger(triggerId)
      console.log("[sse] closed")
    }
  }

  void start()
  return true
}
