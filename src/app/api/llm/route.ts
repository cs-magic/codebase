import { nanoid } from "nanoid"
import { NextRequest } from "next/server"
import { llmInit, llmManager, llmWrite } from "./manager"

export async function GET(req: NextRequest) {
  const triggerId = new URL(req.url).searchParams.get("r") ?? ""

  const clientId = nanoid()

  // NOTE: 不这么做服务器会报错，ref: https://github.com/vercel/next.js/discussions/61972#discussioncomment-8545109
  req.signal.onabort = async () => {
    console.log(`Client(id=${clientId}) aborted connection.`)

    // 1. 先写
    await llmWrite(writer, { event: "onError", data: "您已中止" })
    await writer.close()
    // 2. 再移除（2要在1之后）
    await llmManager.delClient(triggerId, clientId)
  }

  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()

  if (!(await llmManager.hasTrigger(triggerId)))
    void llmWrite(writer, { event: "onError", data: "请求不存在或已完成" })
  else void llmInit(clientId, writer, triggerId) // DO NOT await

  console.log("[sse] requested: ", {
    clientId,
    triggerId,
    triggers: await llmManager.listTriggers(),
  })

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  })
}
