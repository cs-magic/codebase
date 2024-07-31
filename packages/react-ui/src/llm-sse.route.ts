import type { ITransEvent } from "@cs-magic/common"

import { llmEncoder, StaticLLMManager } from "@cs-magic/llm"
import { nanoid } from "nanoid"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const triggerId = new URL(req.url as string).searchParams.get("r") ?? ""
  const clientId = nanoid()

  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()

  const write = async (event: ITransEvent) => {
    // console.log("[sse] client --> user: ", event)
    // 要额外加一个 \n，否则不符合格式规范
    await writer.write(
      llmEncoder.encode(
        `event: ${event.event}\ndata: ${JSON.stringify(event?.data ?? "")}\n\n`,
      ),
    )
  }

  const llmManager = new StaticLLMManager(triggerId)

  // NOTE: 不这么做服务器会报错，ref: https://github.com/vercel/next/discussions/61972#discussioncomment-8545109
  req.signal.onabort = async () => {
    console.log(`Client(id=${clientId}) aborted connection.`)

    // 1. 先写
    await write({ event: "error", data: { message: "您已中止" } })
    await writer.close()
    // 2. 再移除（2要在1之后）
    await llmManager.onClientDisconnected(clientId)
  }

  void llmManager.onClientConnected({
    id: clientId,
    // todo: onEvent in serialization approach like Redis?
    onEvent: async (sseEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await write(sseEvent)
      if (sseEvent.event === "close") await writer.close()
    },
  })

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  })
}
