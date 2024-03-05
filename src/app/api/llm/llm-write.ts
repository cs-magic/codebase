import { WritableStreamDefaultWriter } from "web-streams-polyfill/dist/types/ponyfill"
import { ISSEEvent } from "../../../../packages/common/lib/sse/schema"

import { llmEncoder } from "./llm-encoder"

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
