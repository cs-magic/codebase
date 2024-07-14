import { logger } from "@cs-magic/common"
import { dumpFile } from "@cs-magic/common"
import { formatError } from "@cs-magic/common"
import { IWechatBotTransfer } from "@cs-magic/swot-bot"
import { getConvPreference } from "@cs-magic/swot-bot"
import { parseLimitedCommand } from "@cs-magic/swot-bot"
import path from "path"
import { BotCommandType, botCommandTypeSchema } from "../schema/commands.js"
import { IContext } from "../schema/context.js"
import { startBot } from "./start-bot.js"
import { syncClients } from "./sync-clients.js"

export const wechatyDataPath = path.join(process.cwd(), "wechaty.data.json")

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

      case "update-token": {
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
      }

      case "get-contacts": {
        const contacts = (await context.bot?.Contact.findAll()) ?? []
        const data: IWechatBotTransfer = {
          type: "contacts",
          data: contacts.map((c) => c.payload!),
        }
        // console.log("contacts data: ", data.data.slice(0, 5))
        socket.send(JSON.stringify(data))
        break
      }

      case "get-preference": {
        const convId = result.args
        const preference = await getConvPreference({ convId })
        logger.debug(`preference: %o`, preference)
        const data: IWechatBotTransfer = {
          type: "preference",
          data: preference,
        }
        socket.send(JSON.stringify(data))
        break
      }

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
