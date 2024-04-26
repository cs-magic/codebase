import { logger } from "@cs-magic/log/logger"
import { RoomInvitation, Wechaty } from "wechaty"

export const handleRoomInvite = async (bot: Wechaty, room: RoomInvitation) => {
  logger.info(
    `auto accept invitation into room(id=${room.id}, topic=${await room.topic()})`,
  )
  // todo: notify and decide
  await room.accept()
}
