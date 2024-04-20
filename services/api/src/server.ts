import { genId } from "@cs-magic/common/utils/gen-id"
import { logger } from "@cs-magic/log/logger"
import { createWechatyBot } from "@cs-magic/wechaty/create-wechaty-bot"
import fw from "@fastify/websocket"
import dotenv from "dotenv"

import Fastify from "fastify"
import remove from "lodash/remove"
import { Path } from "../../../common/path"
import { IContext } from "./schema/context"
import { handleMessage } from "./utils/handle-message"
import { syncClients } from "./utils/sync-clients"
import { transferMessage } from "./utils/transfer-message"

dotenv.config({ path: Path.envFile })

logger.info("fastify initializing...")
const fastify = Fastify({
  logger: true,
})

// socket
void fastify.register(fw)
void fastify.register(async function (fastify) {
  // init context

  let context: IContext = {
    bot: null,
    scan: null,
    sockets: [],
  }

  /**
   * 卸载这里，方便监听 onScan
   */
  const startBot = async () => {
    let { bot, scan, sockets } = context
    // 避免重复登录，会导致 padLocal 报错
    if (!bot) {
      logger.info("-- creating bot")
      bot = createWechatyBot({
        name: "1", // todo
      })
        .on("scan", (value, status) => {
          context.scan = { value, status }
          logger.info(`updated scan: ${JSON.stringify(context.scan)}`)
          transferMessage({ type: "scan", data: context.scan }, sockets)
        })
        .on("login", (user) => {
          // console.log("-- login: ", user)
          context.scan = null
          context.bot = bot
          syncClients(context)
        })
    }

    // todo: if has cache,  start auto, o.w. wait for triggering in the frontend ?
    if (!bot.isLoggedIn) {
      logger.info("-- starting bot")
      await bot.start()
    }
  }

  await startBot()

  fastify.get(
    "/ws",
    { websocket: true },
    async (socket /* WebSocket */, req /* FastifyRequest */) => {
      // The WebSocket connection is established at this point, ref: https://chat.openai.com/c/41683f6c-265f-4a36-ae33-4386970bd14c

      const id = genId()

      socket.id = id

      socket.on("close", () => {
        remove(context.sockets, (s) => s.id === id)
      })

      socket.on("message", async (m: Buffer) => {
        context = await handleMessage(context, m)
      })

      context.sockets.push(socket)

      syncClients({
        ...context,
        // only self to update upon init
        sockets: [socket],
      })
    },
  )
})

// http
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" }
})

try {
  logger.info("fastify listening...")
  void fastify.listen({ port: 40414 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
