import { config } from "@cs-magic/common"
import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { moment } from "@cs-magic/common/datetime/moment"
import logger from "@cs-magic/common/log"
import { Friendship, types, Wechaty } from "wechaty"

/**
 * 单方面把bot删了后，再添加bot，不会触发 friendship
 *
 * @param bot
 * @param friendship
 */
export const handleFriendship = async (
  bot: Wechaty,
  friendship: Friendship,
) => {
  logger.info(`onFriendship: %o`, friendship)

  if (
    // todo: 这个是用户首次添加bot？ (3)
    friendship.type() === types.Friendship.Verify ||
    // bot把用户删了后，用户再次添加bot (2)
    friendship.type() === types.Friendship.Receive
  )
    // 如果不接受好友的话，无法接受转账（但红包可以，但红包无法hook）
    await friendship.accept()

  const user = friendship.contact()

  await bot.context?.addSendTask(async () => {
    await user.say(`您好啊！我是好用到哭的 AI 助理「飞脑」！
${SEPARATOR_LINE}
这是我能为您提供的服务：
  - 发送一篇公众号文章，我将为您总结
  - 问我一个问题，我将为您解答
  - 其他定时提醒功能、社群管理功能（待完善）
您也可以把我拉到其他群里，产生的费用您可以自行向群友收取。
${SEPARATOR_LINE}
- BUG 反馈请联系飞脑客服：${config.company["customer-service"].wxid}
- 飞脑十分注重用户隐私，与您的聊天记录不会共享于他人
- 续费请扫码：XXX (新朋友免费赠送100飞币)
- 当前版本：${bot.context?.version}
- 当前时间：${moment().format("YYYY/MM/DD HH:mm")}
`)
  })
}
