import { genNanoId } from "@cs-magic/common/utils/gen-nano-id"
import { logger } from "@cs-magic/log/logger"
import fw from "@fastify/websocket"

import Fastify from "fastify"
import remove from "lodash/remove"
import { IContext } from "./schema/context"
import { handleMessage } from "./utils/handle-message"
import { startBot } from "./utils/start-bot"
import { syncClients } from "./utils/sync-clients"

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

  await startBot(context)

  fastify.get("/context", {}, async () => {
    const bot = context.bot
    return {
      bot: {
        id: bot?.id,
        name: bot?.name,
        scan: context.scan,
      },
    }
  })

  fastify.get(
    "/ws",
    { websocket: true },
    async (socket /* WebSocket */, req /* FastifyRequest */) => {
      // The WebSocket connection is established at this point, ref: https://chat.openai.com/c/41683f6c-265f-4a36-ae33-4386970bd14c

      const id = genNanoId()

      socket.id = id

      socket.on("close", () => {
        remove(context.sockets, (s) => s.id === id)
      })

      socket.on("message", async (m: Buffer) => {
        context = await handleMessage(context, m, id)
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
  void fastify.listen({ port: Number(process.env.PORT ?? 40414) })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
