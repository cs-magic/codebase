import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { logger } from "@cs-magic/log/logger"
import { Wechaty } from "wechaty"
import moment from "../../../packages-to-classify/datetime/moment"

export const sendMessageOnRoomJoin = async (bot: Wechaty, roomId: string) => {
  const room = await bot.Room.find({ id: roomId })
  if (!room) return logger.warn(`not found room(id=${roomId})`)

  void bot.context?.addSendTask(async () => {
    await room.say(`大家好！我是好用到哭的 AI 助理「飞脑」！
${SEPARATOR_LINE}
以下是我能为大家提供的服务：
  - 发送一篇公众号文章，我将为您总结
  - @我 问一个问题，我将为您解答
  - 其他定时提醒功能、社群管理功能（待完善）
期待能成为大家最得力的小助手呀！
${SEPARATOR_LINE}
- BUG 反馈请联系飞脑客服：MAGIC_SOSO
- 飞脑十分注重用户隐私，当前会话内的聊天记录不会共享于他人
- 当前版本：${bot.context?.version}
- 当前时间：${moment().format("YYYY/MM/DD HH:mm")}
`)
  })
}
