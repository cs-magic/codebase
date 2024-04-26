import { logger } from "@cs-magic/log/logger"
import { RoomInvitation, Wechaty } from "wechaty"

/**
 * 只有在邀请需要确认时才会触发，小群不会触发 room-invite，但在接受后会触发 room-join
 *
 * @param bot
 * @param room
 */
export const handleRoomInvite = async (bot: Wechaty, room: RoomInvitation) => {
  logger.info(
    `auto accept invitation into room(id=${room.id}, topic=${await room.topic()})`,
  )
  // todo: notify and decide
  await room.accept()
}
