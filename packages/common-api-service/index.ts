import fw from "@fastify/websocket"
import { createWechatyBot } from "@cs-magic/wechaty/create-wechaty-bot"
import { parseCommand } from "@cs-magic/wechaty/utils/parse-command"
import Fastify from "fastify"
import { Wechaty } from "wechaty"
import { z } from "zod"
import { prettyError } from "@cs-magic/common/pretty-error"

const fastify = Fastify({
  logger: true,
})

// http
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" }
})

let bot: Wechaty | null = null

export const botCommands = z.enum(["start", "stop", "state", "logout"])

// socket
void fastify.register(fw)
void fastify.register(async function (fastify) {
  fastify.get(
    "/ws",
    { websocket: true },
    (socket /* WebSocket */, req /* FastifyRequest */) => {
      socket.on("message", async (messageBuffer: Buffer) => {
        try {
          const message = messageBuffer.toString()

          const result = parseCommand(messageBuffer.toString(), botCommands)

          console.log({ messageBuffer, message, result })

          if (!result) return

          switch (result.command) {
            case "start":
              socket.send("starting")
              bot = createWechatyBot({
                name: result.args,
                onScan: (value, status) => {
                  console.log({ value, status })
                  socket.send(
                    JSON.stringify({ type: "scan", data: { value, status } }),
                  )
                },
              })
              await bot.start()
              socket.send("started")
              break

            case "stop":
              socket.send("stopping")
              await bot?.stop()
              // await bot?.logout()
              socket.send("stopped")
              break

            case "state":
              socket.send(JSON.stringify(bot?.state))
              break

            case "logout":
              await bot?.logout()
              break

            default:
              break
          }

          console.log(`✅ ${result.command} ${result.args}`)
        } catch (e) {
          prettyError(e)
        }
      })
    },
  )
})

try {
  void fastify.listen({ port: 40414 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
