import { genId } from "@cs-magic/common/gen-id"
import { prettyError } from "@cs-magic/common/pretty-error"
import logger from "@cs-magic/log/logger"
import { createWechatyBot } from "@cs-magic/wechaty/create-wechaty-bot"
import { IWechatBotScan, IWechatBotTransfer } from "@cs-magic/wechaty/schema"
import { parseCommand } from "@cs-magic/wechaty/utils/parse-command"
import fw from "@fastify/websocket"
import Fastify from "fastify"
import { Wechaty } from "wechaty"
import WebSocket from "ws"
import { botCommands } from "./config"

const fastify = Fastify({
  logger: true,
})

let bot: Wechaty | null = null
const sockets: Record<string, WebSocket.WebSocket> = {}
let scan: IWechatBotScan | null = null

// socket
void fastify.register(fw)
void fastify.register(async function (fastify) {
  fastify.get(
    "/ws",
    { websocket: true },
    (socket /* WebSocket */, req /* FastifyRequest */) => {
      // The WebSocket connection is established at this point.
      // ref: https://chat.openai.com/c/41683f6c-265f-4a36-ae33-4386970bd14c

      const id = genId()
      socket.on("close", () => {
        if (id in sockets) delete sockets[id]
      })

      socket.on("message", async (messageBuffer: Buffer) => {
        try {
          const message = messageBuffer.toString()

          const result = parseCommand(messageBuffer.toString(), botCommands)

          logger.debug({ message, result })

          if (!result) return

          switch (result.command) {
            case "start":
              // 避免重复登录，会导致 padLocal 报错
              if (!bot) {
                bot = createWechatyBot({
                  name: result.args,
                })
                  .on("scan", (value, status) => {
                    scan = { value, status }
                    transfer({ type: "scan", data: scan }, true)
                  })
                  .on("login", (user) => {
                    scan = null
                    syncClients(true)
                  })
              }
              if (!bot.isLoggedIn) {
                await bot.start()
              }

              break

            case "stop":
              await bot?.stop()
              syncClients(true)
              break

            case "logout":
              await bot?.logout()
              syncClients(true)
              break

            default:
              break
          }

          logger.debug(`✅ ${result.command} ${result.args}`)
        } catch (e) {
          prettyError(e)
        }
      })

      const transfer = (data: IWechatBotTransfer, all = false) => {
        if (all)
          Object.values(sockets).forEach((socket) => {
            socket.send(JSON.stringify(data))
          })
        else socket.send(JSON.stringify(data))
      }

      const syncClients = (all = false) => {
        const loggedIn = bot?.isLoggedIn ?? false
        transfer({ type: "loggedIn", data: loggedIn }, all)

        // avoid bot.currentUser to catch errors
        if (loggedIn) {
          const user = bot?.currentUser.payload
          if (user) transfer({ type: "login", data: user }, all)
        } else if (scan) {
          transfer({ type: "scan", data: scan }, all)
        }
      }

      // Perform initial actions here
      // logger.log("WebSocket connection established with client")
      syncClients(false)
      sockets[id] = socket
    },
  )
})

// http
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" }
})

try {
  void fastify.listen({ port: 40414 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
