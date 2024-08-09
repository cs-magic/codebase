import { spawn } from "child_process"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const payload: string[] = []

  const { searchParams } = new URL(req.url)
  const useSSE = searchParams.get("useSSE")
  const update = searchParams.get("update")
    console.log({update, useSSE})

  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()
  const encoder = new TextEncoder()
  const send = (s: string) =>
    writer.write(encoder.encode(s))

  const genData = async () =>
    await new Promise((resolve, reject) => {
      const cmd = spawn("which yarn && yarn -v && yarn update", { shell: true })

      cmd.stdout.on("data", (data: Buffer) => {
        const s = data.toString()
        console.log(`[cmd] stdout: ${s}`)
        // payload.stdOut.push(typeof data)
        payload.push(s)
        void send(s)
      })

      cmd.stderr.on("data", (data: string) => {
        console.log(`[cmd] stderr: ${data}`)
        payload.push(data)
        void send(data)
      })

      cmd.on("error", (error) => {
        console.log(`[cmd] error: ${error.message}`)
        payload.push(error.message)
      })

      cmd.on("close", (code) => {
        console.log(`[cmd] close: child process exited with code ${code}`)
        void writer.close()
        resolve(true)
      })
    })

  /**
   * 防止被编译的时候运行
   */
  if (update) {
    if (useSSE) {
      void genData()
      return new Response(responseStream.readable, {
        headers: {
          "Content-Type": "text/event-stream",
          Connection: "keep-alive",
          "Cache-Control": "no-cache, no-transform",
        },
      })
    }
    await genData()
  }

  return new Response(payload.join("\n"), { status: 200 })
}
