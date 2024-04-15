import { prettyError } from "@cs-magic/common/pretty-error"
import { createWechatyBot } from "@cs-magic/wechaty/create-wechaty-bot"
import { IWechatBotTransfer } from "@cs-magic/wechaty/schema"
import { parseCommand } from "@cs-magic/wechaty/utils/parse-command"
import fw from "@fastify/websocket"
import Fastify from "fastify"
import { Wechaty } from "wechaty"
import { botCommands } from "./config"

const fastify = Fastify({
  logger: true,
})

let bot: Wechaty | null = null

// socket
void fastify.register(fw)
void fastify.register(async function (fastify) {
  fastify.get(
    "/ws",
    { websocket: true },
    (socket /* WebSocket */, req /* FastifyRequest */) => {
      // The WebSocket connection is established at this point.
      // ref: https://chat.openai.com/c/41683f6c-265f-4a36-ae33-4386970bd14c

      const transfer = (data: IWechatBotTransfer) => {
        socket.send(JSON.stringify(data))
      }

      const syncUser = () => {
        const loggedIn = bot?.isLoggedIn ?? false
        transfer({ type: "loggedIn", data: loggedIn })

        const user = bot?.currentUser
        if (user) transfer({ type: "login", data: user })
      }

      const init = () => {
        // Perform initial actions here
        console.log("WebSocket connection established with client")
        syncUser()
      }

      init()

      socket.on("message", async (messageBuffer: Buffer) => {
        try {
          const message = messageBuffer.toString()

          const result = parseCommand(messageBuffer.toString(), botCommands)

          console.log({ messageBuffer, message, result })

          if (!result) return

          switch (result.command) {
            case "start":
              // 避免重复登录，会导致 padLocal 报错
              if (bot?.isLoggedIn) break

              bot = createWechatyBot({
                name: result.args,
              })
                .on("scan", (value, status) => {
                  transfer({ type: "scan", data: { value, status } })
                })
                .on("login", (user) => {
                  syncUser()
                })
              await bot.start()
              break

            case "stop":
              await bot?.stop()
              break

            case "logout":
              await bot?.logout()
              break

            default:
              break
          }

          // 命令操作完成后同步一下状态
          syncUser()

          console.log(`✅ ${result.command} ${result.args}`)
        } catch (e) {
          prettyError(e)
        }
      })
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
