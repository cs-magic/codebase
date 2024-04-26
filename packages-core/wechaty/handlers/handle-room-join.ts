import { logger } from "@cs-magic/log/logger"
import { Contact, Room, Wechaty } from "wechaty"
import { prisma } from "../../../packages-to-classify/db/providers/prisma"
import {
  getRobustData,
  getRobustPreference,
} from "../utils/get-robust-preference"

export const handleRoomJoin = async (
  bot: Wechaty,
  room: Room,
  inviteeList: Contact[],
  inviter: Contact,
  date: Date | undefined,
) => {
  const roomNotice = await room.announce()
  logger.info(`invitees: %o`, inviteeList)
  logger.info(`notice: %o`, roomNotice)

  const roomInDB = await prisma.wechatRoom.findUnique({
    where: { id: room.id },
  })
  if (!roomInDB) return

  const preference = getRobustPreference(roomInDB)
  if (!preference.onRoomJoin?.sayAnnounce?.enabled) return

  const data = getRobustData(roomInDB)
  data.roomNewInvitees.push(...inviteeList.map((i) => i.id))
  if (
    data.roomNewInvitees.length >= (preference.onRoomJoin?.sayAnnounce?.n ?? 1)
  ) {
    data.roomNewInvitees = []
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
