import { env, logEnv } from "@cs-magic/common"
import { logger } from "@cs-magic/common"
import { type Wechaty, WechatyBuilder } from "wechaty"

import { handleWechatyBot } from "./handlers/index.js"

/**
 * 这是一个 wrapper， 请在其他地方 start
 *
 */
export const createWechatyBot = () => {
  // log env to ensure puppet info.
  logEnv("wechaty")

  const name = env.WECHATY_PUPPET_NAME ?? "default"
  logger.info(`-- init bot(name=${name})`)

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了

    puppetOptions: {
      // mark@2024-04-27 08:49:22: for padlocal
      restartOnFailure: false,
    },
  }) as Wechaty // 等会再更新其他扩展的信息

  // todo: is ready ok ?
  handleWechatyBot(bot)

  return bot
}
