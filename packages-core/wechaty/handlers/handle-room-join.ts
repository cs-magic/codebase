import { logger } from "@cs-magic/log/logger"
import { Contact, Room, Wechaty } from "wechaty"
import { prisma } from "../../../packages-to-classify/db/providers/prisma"
import {
  getRobustData,
  getRobustPreference,
} from "../utils/get-robust-preference"
import { sendMessageOnRoomJoin } from "../utils/send-message-on-room-join"

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
  const roomInDB = await prisma.wechatConv.findUnique({
    where: { id: room.id },
  })
  if (!roomInDB) return

  const includeSelf = inviteeList.some(
    (invitee) => invitee.id === bot.context?.wxid,
  )
  logger.info(`invitees has self: ${includeSelf}`)
  if (includeSelf) {
    void sendMessageOnRoomJoin(bot, room.id)
  }

  const data = getRobustData(roomInDB)
  data.room.newInvitees.push(...inviteeList.map((i) => i.id))

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
