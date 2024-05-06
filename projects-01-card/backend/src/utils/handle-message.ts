import { dumpFile } from "@cs-magic/common/utils/dump-file"
import { formatError } from "@cs-magic/common/utils/format-error"
import { logger } from "@cs-magic/log/logger"
import { getConvPreference } from "@cs-magic/wechaty/utils/get-conv-preference"
import { parseLimitedCommand } from "@cs-magic/wechaty/utils/parse-command"
import path from "path"
import { WebSocket } from "ws"
import { Path } from "../../../../packages-to-classify/path"
import { BotCommandType, botCommandTypeSchema } from "../config"
import { IContext } from "../schema/context"
import { startBot } from "./start-bot"
import { syncClients } from "./sync-clients"

export const wechatyDataPath = path.join(Path.dataDir, "wechaty.data.json")
export type IWechatData = {
  puppet?: {
    padlocal?: {
      token?: string
    }
  }
}

export const handleMessage = async (
  context: IContext,
  messageBuffer: Buffer,
  socketId: string,
): Promise<IContext> => {
  try {
    const socket = context.sockets.find((s) => s.id === socketId)!

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
        await startBot(context)
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
        const data: IWechatData = {
          puppet: {
            padlocal: {
              token: `puppet_padlocal_${result.args}`,
            },
          },
        }
        await dumpFile(data, { fp: wechatyDataPath })
        // 切换 iPad 设备时，如果不先退出登录，在另一个设备登录后手机会被强制重新登陆，并限制扫码功能（需要好友解封）
        // todo 2024-04-27 09:23:31: 验证先退出登录后，是否可以有效缓解这个问题，如果不行的话只能直接买号了
        logger.info("logging out")
        await context.bot?.logout()
        logger.info("logged out")
        logger.info("starting new bot")
        await startBot(context)
        logger.info("started new bot")
        break

      case "get-preference":
        const convId = result.args
        const preference = await getConvPreference({ convId })
        logger.debug(`preference: %o`, preference)
        socket.send(JSON.stringify(preference))
        break

      case "set-preference":
        // todo
        break

      default:
        break
    }

    // logger.debug(`parsed command: ${result.command} ${result.args}`)
  } catch (e) {
    formatError(e)
  }

  return context
}
