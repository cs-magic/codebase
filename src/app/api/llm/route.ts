import { NextRequest } from "next/server"
import { manager } from "@/app/api/llm/init"
import { ISSEEvent } from "@/app/api/llm/schema"

import { UnexpectedError } from "@/common/schema/errors"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const requestId = searchParams.get("r")
  console.log("[sse]: ", { requestId, manager })
  if (!requestId)
    return Response.json({ error: "no requestId found" }, { status: 400 })
  const request = manager[requestId]
  if (!request)
    // todo: db
    return Response.json({ error: "no request running" }, { status: 400 })
  console.log("[sse]: ", JSON.stringify(request))

  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()
  const encoder = new TextEncoder()

  const init = async () => {
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
    const sendToken = async (sseEvent: ISSEEvent) => {
      // 返回客户端不需要有 close 标志，直接 readystate=2 即可
      if (sseEvent.event === "close") return await writer.close()
      const { event, data } = sseEvent
      // 要额外加一个 \n，否则不符合格式规范
      await writer.write(
        encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`),
      )
    }
    // old (request.data 也在持续增加)
    await Promise.all(request.data.map(async (e) => await sendToken(e)))
    // new
    request.clients.push({
      onEvent: sendToken,
    })
  }

  void init() // DO NOT await

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  })
}
