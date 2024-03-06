import { WritableStreamDefaultWriter } from "web-streams-polyfill/dist/types/ponyfill"
import {
  ISSEEvent,
  ISSERequest,
} from "../../../../packages/common/lib/sse/schema"
import { staticCreate } from "../../../../packages/common/lib/utils"

export const llmManager = staticCreate<Record<string, ISSERequest>>(() => ({}))

export const llmEncoder = new TextEncoder()

export const llmWrite = async (
  writer: WritableStreamDefaultWriter,
  sseEvent: ISSEEvent,
) => {
  // 返回客户端不需要有 close 标志，直接 readystate=2 即可
  if (sseEvent.event === "close") return await writer.close()

  const { event, data } = sseEvent

  // 要额外加一个 \n，否则不符合格式规范
  await writer.write(
    llmEncoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
  )
}

export const llmInit = async (
  clientId: string,
  writer: WritableStreamDefaultWriter,
  triggerId: string,
) => {
  const trigger = llmManager[triggerId]
  if (!trigger) return

  // 1. old (request.data 也在持续增加)
  const { response, error } = trigger.response
  if (response) await llmWrite(writer, { event: "onData", data: response })
  if (error) await llmWrite(writer, { event: "onError", data: error })

  // 2. new
  trigger.clients.push({
    id: clientId,
    onEvent: (e) => llmWrite(writer, e),
  })
}
