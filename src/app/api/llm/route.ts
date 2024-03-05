import { NextRequest } from "next/server"
import { llmInit } from "./llm-init"
import { llmManager } from "./llm-manager"
import { llmWrite } from "./llm-write"

export async function GET(req: NextRequest) {
  const requestId = new URL(req.url).searchParams.get("r") ?? ""
  const requests = Object.keys(llmManager)
  const isHit = requests.includes(requestId)
  console.log("[sse] GET: ", { requestId, requests, isHit })

  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()

  if (isHit)
    void llmInit(writer, requestId) // DO NOT await
  else void llmWrite(writer, { event: "onError", data: "请求不存在" })

  console.log("[sse] Response: ", { requestId })

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  })
}
