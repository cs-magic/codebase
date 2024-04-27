import { formatError } from "@cs-magic/common/utils/format-error"
import { logger } from "@cs-magic/log/logger"
import { createWechatyBot } from "@cs-magic/wechaty/create-wechaty-bot"
import { IContext } from "../schema/context"
import { loadBotToken } from "./load-bot-token"
import { syncClients } from "./sync-clients"
import { transferMessage } from "./transfer-message"

export const startBot = async (context: IContext) => {
  // 避免重复登录，会导致 padLocal 报错
  if (!context.bot) {
    logger.info("-- creating bot")

    const token = await loadBotToken()

    context.bot = createWechatyBot({
      name: "1", // todo
      token,
    })
      .on("error", (error) => {
        formatError(error)
      })
      .on("scan", (value, status) => {
        context.scan = { value, status }
        logger.info(`updated scan: ${JSON.stringify(context.scan)}`)
        transferMessage({ type: "scan", data: context.scan }, context.sockets)
      })
      .on("login", (user) => {
        // console.log("-- login: ", user)
        context.scan = null
        syncClients(context)
      })
  }

  // todo: if has cache,  start auto, o.w. wait for triggering in the frontend ?
  if (!context.bot.isLoggedIn) {
    logger.info("-- starting bot")
    await context.bot.start()
  }
}
