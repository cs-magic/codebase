import { prettyError } from "packages/common-common/utils/pretty-error"
import { type Message, type Wechaty } from "wechaty"
import { getBotContextFromMessage } from "../utils/bot-context"
import { getHandlers } from "../utils/get-handlers"
import { prettyBotQuery } from "../utils/pretty-bot-query"

export const handleMessage = async (bot: Wechaty, message: Message) => {
  const handlers = getHandlers(bot)

  try {
    // todo: Promise.all, fix the storage logic on chat/...
    for (const handler of handlers) {
      await handler.onMessage(message)
    }
  } catch (e) {
    let s = prettyError(e)
    const context = await getBotContextFromMessage(bot, message)

    // bug (not solved): https://github.com/wechaty/puppet-padlocal/issues/292
    // from wang, 2024-04-13 01:36:14
    if (s.includes("filterValue not found for filterKey: id")) {
      s = `对不起，您的平台（例如 win 3.9.9.43）不支持 at 小助手，请更换平台再试`
      await message.say(await prettyBotQuery(context, "哎呀出错啦", s))
    }
    // !WARNING: 这是个 ANY EXCEPTION 机制，有可能导致无限循环，导致封号！！！
    // await message.say(await prettyBotQuery(context, "哎呀出错啦", s))
  }
}
