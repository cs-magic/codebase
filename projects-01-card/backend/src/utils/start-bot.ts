import { formatError } from "@cs-magic/common/utils/format-error"
import { logger } from "@cs-magic/log/logger"
import { createWechatyBot } from "@cs-magic/wechaty/create-wechaty-bot"
import { IContext } from "../schema/context"
import { syncClients } from "./sync-clients"
import { transferMessage } from "./transfer-message"

export const startBot = async (context: IContext): Promise<IContext> => {
  let { bot, scan, sockets } = context
  // 避免重复登录，会导致 padLocal 报错
  if (!bot) {
    logger.info("-- creating bot")
    bot = createWechatyBot({
      name: "1", // todo
    })
      .on("error", (error) => {
        formatError(error)
      })
      .on("scan", (value, status) => {
        scan = { value, status }
        logger.info(`updated scan: ${JSON.stringify(scan)}`)
        transferMessage({ type: "scan", data: scan }, sockets)
      })
      .on("login", (user) => {
        // console.log("-- login: ", user)
        scan = null
        syncClients({ bot, scan, sockets })
      })
  }

  // todo: if has cache,  start auto, o.w. wait for triggering in the frontend ?
  if (!bot.isLoggedIn) {
    logger.info("-- starting bot")
    await bot.start()
  }
  return { bot, scan, sockets }
}
