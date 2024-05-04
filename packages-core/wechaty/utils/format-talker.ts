import { Message } from "wechaty"
import { prisma } from "../../../packages-to-classify/db/providers/prisma"

import { LlmScenario } from "../schema/bot.utils"
import { getRobustData } from "./get-robust-preference"

/**
 * 展示用户信息，与它的调用量
 *
 * @param message
 * @param type
 */
export const formatTalkerFromMessage = async (
  message: Message,
  type?: LlmScenario,
) => {
  let s = message.talker().name()
  if (type) {
    const row = await prisma.wechatUser.findUnique({
      where: { id: message.talker().id },
    })
    const data = getRobustData(row)
    s += `(${data.plugin[type].success}/${data.plugin[type].called})`
  }

  const roomTopic = await message.room()?.topic()

  if (roomTopic) {
    s += `@${roomTopic}`

    if (type) {
      const row = await prisma.wechatRoom.findUnique({
        where: { id: message.room()?.id },
      })
      const data = getRobustData(row)
      s += `(${data.plugin[type].success}/${data.plugin[type].called})`
    }
  }

  return s
}
