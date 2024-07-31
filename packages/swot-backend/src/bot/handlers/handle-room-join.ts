import { logger } from "@cs-magic/common"
import { prisma } from "@cs-magic/common/dist/server.js"
import { Contact, Room, Wechaty } from "wechaty"
import {
  getRobustData,
  getRobustPreference,
  sendMessageOnRoomJoin,
} from "../utils/index.js"

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
  logger.info(`onRoomJoin`)

  const roomInDB = await prisma.wechatConv.findUnique({
    where: { id: room.id },
  })
  if (!roomInDB) return

  const includeSelf = inviteeList.some(
    (invitee) => invitee.id === bot.context?.wxid,
  )
  logger.info(
    `inviter(id=${inviter.id}, name=${inviter.name()})\ninvitees %o\nhas self: ${includeSelf}`,
    inviteeList.map((i) => i.payload),
  )
  if (includeSelf) {
    void sendMessageOnRoomJoin(bot, room.id)
  }

  // todo: only padlocal can get roomNotice
  // if (bot.context?.puppet.type === "padlocal") {
  const roomNotice = await room.announce()
  logger.info(`notice: %o`, roomNotice)

  const data = getRobustData(roomInDB)
  data.room.newInvitees.push(...inviteeList.map((i) => i.id))
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
  // }
}
