import { logger } from "@cs-magic/log/logger"
import { type Wechaty, WechatyBuilder } from "wechaty"
import { logEnv } from "../../packages-to-classify/env/utils/log-env"
import { handleWechatyBot } from "./handlers"

/**
 * 这是一个 wrapper， 请在其他地方 start
 *
 * todo: 当 bot 被拉到一个群的时候，自动触发一句说明
 *
 * @param name
 */
export const createWechatyBot = ({
  name,
  token,
}: {
  name?: string
  token?: string
}) => {
  // log env to ensure puppet info.
  logEnv("wechaty")

  logger.info(`-- init bot(name=${name})`)

  const bot = WechatyBuilder.build({
    name, // 加了名字后就可以自动存储了
    puppetOptions: {
      // I added in padlocal, 2024-04-27 08:49:22
      restartOnFailure: false,
      token,
    },
  }) as Wechaty // 等会再更新其他扩展的信息

  handleWechatyBot(bot)

  return bot
}
