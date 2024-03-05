import { NextRequest } from "next/server"
import { llmInit, llmManager, llmWrite } from "./manager"

export async function GET(req: NextRequest) {
  const triggerId = new URL(req.url).searchParams.get("r") ?? ""

  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()

  if (!llmManager[triggerId])
    void llmWrite(writer, { event: "onError", data: "请求不存在或已完成" })
  else void llmInit(writer, triggerId) // DO NOT await

  console.log("[sse] requested: ", {
    triggerId,
    triggers: Object.keys(llmManager),
  })

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  })
}
