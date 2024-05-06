import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { logger } from "@cs-magic/log/logger"
import { Contact, Room, Wechaty } from "wechaty"
import moment from "../../../packages-to-classify/datetime/moment"
import { prisma } from "../../../packages-to-classify/db/providers/prisma"
import {
  getRobustData,
  getRobustPreference,
} from "../utils/get-robust-preference"

/**
 * 小群邀请自己也会触发该 hook
 *
 * @param bot
 * @param room
 * @param inviteeList
 * @param inviter
 * @param date
 */
export const handleRoomJoin = async (
  bot: Wechaty,
  room: Room,
  inviteeList: Contact[],
  inviter: Contact,
  date: Date | undefined,
) => {
  const { name, version } = bot.context.data

  const roomInDB = await prisma.wechatConv.findUnique({
    where: { id: room.id },
  })
  if (!roomInDB) return

  const data = getRobustData(roomInDB)
  data.room.newInvitees.push(...inviteeList.map((i) => i.id))

  if (!data.room.welcome.sent) {
    void bot.context.addSendTask(async () => {
      await room.say(`大家好！我是好用到哭的 AI 助理「飞脑」！
${SEPARATOR_LINE}
以下是我能为大家提供的服务：
  - 发送一篇公众号文章，我将为您总结
  - @我 问一个问题，我将为您解答
  - 其他定时提醒功能、社群管理功能（待完善）
期待能成为大家最得力的小助手呀！
${SEPARATOR_LINE}
- BUG 反馈请联系飞脑客服：MAGIC_SOSO
- 续费请联系我的邀请者：${inviter.name()}
- 当前版本：${version}
- 当前时间：${moment().format("YYYY/MM/DD HH:mm")}
`)
      // pessimistic update
      data.room.welcome.sent = true
    })
  }

  const roomNotice = await room.announce()
  logger.info(
    `invitees: %o`,
    inviteeList.map((i) => i.payload),
  )
  logger.info(`notice: %o`, roomNotice)

  const preference = getRobustPreference(roomInDB)
  if (
    preference.on.roomJoin.sayAnnounce.enabled &&
    data.room.newInvitees.length >= preference.on.roomJoin.sayAnnounce.n
  ) {
    data.room.newInvitees = []
    // 不能是空字符
    if (roomNotice.trim()) await room.say(roomNotice)
  }

  await prisma.wechatConv.update({
    where: { id: roomInDB.id },
    data: {
      data: JSON.stringify(data),
    },
  })
}
