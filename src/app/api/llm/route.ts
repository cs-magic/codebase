import { NextRequest } from "next/server"
import { db } from "../../../../packages/common/lib/db"
import { TRIGGER_SEPARATOR } from "../../../lib/utils"
import { llmInit, llmWrite } from "./manager"

export async function GET(req: NextRequest) {
  const triggerId = new URL(req.url).searchParams.get("r") ?? ""
  const [requestId = "", appId = ""] = triggerId.split(TRIGGER_SEPARATOR)
  const response = await db.response.findUnique({
    where: {
      requestId_appId: { requestId, appId },
    },
  })

  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()

  type Status = "NOT_FOUND" | "FINISHED" | "ING"
  let status: Status
  if (!response) {
    void llmWrite(writer, { event: "onError", data: "请求不存在" })
    status = "NOT_FOUND"
  } else if (response.tEnd) {
    void llmWrite(writer, { event: "onError", data: "请求已完成" })
    status = "FINISHED"
  } else {
    void llmInit(writer, triggerId) // DO NOT await
    status = "ING"
  }
  console.log("[sse] triggered: ", { triggerId, status })

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  })
}
