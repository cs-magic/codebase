import { nanoid } from "nanoid"
import { NextRequest } from "next/server"
import { ITransEvent } from "../../../common-sse/schema"
import { StaticLLMManager } from "./provider-static"
import { llmEncoder } from "./utils"

export async function GET(req: NextRequest) {
  const triggerId = new URL(req.url).searchParams.get("r") ?? ""
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

  // NOTE: 不这么做服务器会报错，ref: https://github.com/vercel/next.js/discussions/61972#discussioncomment-8545109
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
