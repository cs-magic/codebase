import { formatError } from "@cs-magic/common/utils/format-error"
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
  logger.info(`onRoomInvite`)

  try {
    // todo: is the id of roomInvitation is the id of room (being accepted)?
    const roomId = roomInvitation.id
    logger.info({ roomId })

    // wechat4u 不支持获取topic
    // const roomTopic = await roomInvitation.topic()
    // logger.info({ roomTopic })

    // todo: intelligent notify and decide
    // wechat4u 不支持自动同意
    logger.info(`accepting room invitation`)
    await roomInvitation.accept()
    logger.info(`accepted`)

    // 不要在 room-invite 里发起群加入通知，而是在room-join里发，否则小群加入不会触发
    // await sendRoomInMessage(bot, roomId)
  } catch (e) {
    formatError(e)
  }
}
