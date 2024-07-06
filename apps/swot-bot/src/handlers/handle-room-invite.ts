import { logger } from "@cs-magic/common/log"
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

  // todo: is the id of roomInvitation is the id of room (being accepted)?
  const roomId = roomInvitation.id
  logger.info({ roomId })

  const puppetProtocol = bot.context?.puppet.type
  if (puppetProtocol === "padlocal") {
    logger.debug(`auto-accepting room-invitation`)

    const roomTopic = await roomInvitation.topic()
    logger.debug({ roomTopic })

    // todo: intelligent notify and decide
    await roomInvitation.accept()

    logger.debug(`accepted`)
  } else {
    // todo: wechat4u 不支持获取topic，不支持自动同意
    logger.debug(
      `skipped auto-accepting room-invitation since Protocol(type=${puppetProtocol}) not supports`,
    )
  }

  // 不要在 room-invite 里发起群加入通知，而是在room-join里发，否则小群加入不会触发
  // await sendRoomInMessage(bot, roomId)
}
