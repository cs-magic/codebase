import { WritableStreamDefaultWriter } from "web-streams-polyfill/dist/types/ponyfill"

import { llmManager } from "./llm-manager"
import { llmWrite } from "./llm-write"

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
  const request = llmManager[requestId]!

  // 1. old (request.data 也在持续增加)
  await Promise.all(request.data.map(async (e) => await llmWrite(writer, e)))

  // 2. new
  request.clients.push({
    onEvent: (e) => llmWrite(writer, e),
  })
}
