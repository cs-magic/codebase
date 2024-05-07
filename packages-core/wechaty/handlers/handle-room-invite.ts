import { logger } from "@cs-magic/log/logger"
import { RoomInvitation, Wechaty } from "wechaty"

/**
 * 只有在邀请需要确认时才会触发，小群不会触发 room-invite，但在接受后会触发 room-join
 *
 * @param bot
 * @param roomInvitation
 */
export const handleRoomInvite = async (
  bot: Wechaty,
  roomInvitation: RoomInvitation,
) => {
  logger.info(
    `auto accept invitation into room(id=${roomInvitation.id}, topic=${await roomInvitation.topic()})`,
  )
  // todo: intelligent notify and decide
  await roomInvitation.accept()

  // todo: is the id of roomInvitation is the id of room (being accepted)?
  const roomId = roomInvitation.id
  logger.info(`roomInvitation(id=${roomId})`)

  // 不要在 room-invite 里发起群加入通知，而是在room-join里发，否则小群加入不会触发
  // await sendRoomInMessage(bot, roomId)
}
