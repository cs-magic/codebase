import { WritableStreamDefaultWriter } from "web-streams-polyfill/dist/types/ponyfill"
import {
  ISSEEvent,
  ISSERequest,
} from "../../../../packages/common/lib/sse/schema"
import { staticCreate } from "../../../../packages/common/lib/utils"

export const llmManager = staticCreate<Record<string, ISSERequest>>(() => ({}))
console.log({ llmManager })

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

/**
 * // todo: ref: https://github.com/vercel/next.js/discussions/61972#discussioncomment-8545109
 * req.signal.onabort = async () => {
 *   const index = m.endpoints.findIndex((e) => e === endpoint)
 *   console.log(`[sse] client[${index}] ABORTED`)
 *   await writer.close() // unnecessary but better
 *   m.endpoints.splice(index, 1)
 * }
 * @param sseEvent
 */
export const llmInit = async (
  writer: WritableStreamDefaultWriter,
  requestId: string,
) => {
  const request = llmManager[requestId]
  if (!request) return

  // 1. old (request.data 也在持续增加)
  const { response, error } = request.response
  if (response) await llmWrite(writer, { event: "onData", data: response })
  if (error) await llmWrite(writer, { event: "onError", data: error })

  // 2. new
  request.clients.push({
    onEvent: (e) => llmWrite(writer, e),
  })
}
