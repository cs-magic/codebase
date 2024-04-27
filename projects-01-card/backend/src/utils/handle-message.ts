import { formatError } from "@cs-magic/common/utils/format-error"
import { logger } from "@cs-magic/log/logger"
import { parseLimitedCommand } from "@cs-magic/wechaty/utils/parse-command"
import { BotCommandType, botCommandTypeSchema } from "../config"
import { IContext } from "../schema/context"
import { startBot } from "./start-bot"
import { syncClients } from "./sync-clients"

export const handleMessage = async (
  context: IContext,
  messageBuffer: Buffer,
): Promise<IContext> => {
  try {
    const message = messageBuffer.toString()

    const result = parseLimitedCommand<BotCommandType>(
      messageBuffer.toString(),
      botCommandTypeSchema,
    )

    logger.debug({ message, result })

    if (!result) return context

    switch (result.command) {
      case "start":
        await context.bot?.stop()
        context = await startBot(context)
        break

      case "stop":
        await context.bot?.stop()
        syncClients(context)
        break

      case "logout":
        await context.bot?.logout()
        syncClients(context)
        break

      case "update-token":
        process.env.WECHATY_PUPPET_PADLOCAL_TOKEN = `puppet_padlocal_${result.args}`
        // 切换 iPad 设备时，如果不先退出登录，在另一个设备登录后手机会被强制重新登陆，并限制扫码功能（需要好友解封）
        // todo 2024-04-27 09:23:31: 验证先退出登录后，是否可以有效缓解这个问题，如果不行的话只能直接买号了
        await context.bot?.logout()
        context = await startBot(context)
        break

      default:
        break
    }

    logger.debug(`parsed command: ${result.command} ${result.args}`)
  } catch (e) {
    formatError(e)
  }

  return context
}
