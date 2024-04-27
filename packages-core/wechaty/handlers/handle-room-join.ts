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

  const roomInDB = await prisma.wechatRoom.findUnique({
    where: { id: room.id },
  })
  if (!roomInDB) return

  const data = getRobustData(roomInDB)
  data.room.newInvitees.push(...inviteeList.map((i) => i.id))

  if (!data.room.welcome.sent) {
    void bot.context.addSendTask(async () => {
      await room.say(`感谢${inviter.name()}邀请！
${SEPARATOR_LINE}
大家好啊，我是大家的 AI 助手「${name}」，以下是我能为大家提供的服务：
  - 发送一篇公众号文章到本会话内，我将基于大模型为您总结
  - 以问号开头问一个问题，我将基于大模型为您解答
  - 定时提醒功能、社群管理功能（待完善）
期待能成为大家最得力的小助手呀！
${SEPARATOR_LINE}
PS: 有任何建议或者意见，可以直接提出来哦（以加号开头），例如：
+ 提个需求，我希望每五个人加入群聊，${name}就发送一次群通知
+ 提个建议，我希望${name}回复的语气更可爱点
+ 提个bug，刚刚${name}没有回复我的问题
${SEPARATOR_LINE}
当前版本：${version}
当前时间：${moment().format("YYYY/MM/DD HH:mm")}
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
    preference.onRoomJoin?.sayAnnounce?.enabled &&
    data.room.newInvitees.length >= (preference.onRoomJoin?.sayAnnounce?.n ?? 1)
  ) {
    data.room.newInvitees = []
    // 不能是空字符
    if (roomNotice.trim()) await room.say(roomNotice)
  }

  await prisma.wechatRoom.update({
    where: { id: roomInDB.id },
    data: {
      data: JSON.stringify(data),
    },
  })
}
