import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { logger } from "@cs-magic/log/logger"
import omit from "lodash/omit"
import { type Message, types, type Wechaty } from "wechaty"
import {
  commandsSchema,
  type CommandType,
  ManagerType,
} from "../../schema/commands"
import { formatTalkerFromMessage } from "../../utils/format-talker"
import { parseLimitedCommand } from "../../utils/parse-command"
import { parseText } from "../../utils/parse-message"
import { storageMessage } from "../../utils/storage-message"

import { BasePlugin } from "./plugins/base.plugin"
import { ChatterPlugin } from "./plugins/chatter.plugin"
import { ParserPlugin } from "./plugins/parser.plugin"
import { RoomPlugin } from "./plugins/room.plugin"
import { SystemPlugin } from "./plugins/system.plugin"
import { TaskPlugin } from "./plugins/task.plugin"

export const handleMessage = async (bot: Wechaty, message: Message) => {
  const tmm = {
    todo: new TaskPlugin(bot, message),
    chatter: new ChatterPlugin(bot, message),
    parser: new ParserPlugin(bot, message),
    system: new SystemPlugin(bot, message),
    base: new BasePlugin(bot, message),
    room: new RoomPlugin(bot, message),
  } satisfies Partial<Record<ManagerType, BasePlugin>>

  // message.toImage()

  const sendLink = () => {
    void message.say(
      new bot.UrlLink({
        title:
          "自定义内容 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890",
        description:
          "自定义摘要 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890 1234567890",
        url: "https://p01.cs-magic.cn",
        thumbnailUrl:
          "https://avatars.githubusercontent.com/u/33591398?s=80&v=4",
      }),
    )
  }

  const type = message.type()
  const text = message.text()

  logger.info(
    [
      `[onMessage ${types.Message[type]}]: %o`,
      await formatTalkerFromMessage(message),
      SEPARATOR_LINE,
      text,
    ].join("\n"),
    omit(message.payload, ["text", "type"]),
  )

  await storageMessage(message)

  switch (type) {
    case types.Message.Url:
      await new ParserPlugin(bot, message).parseSelf()
      return

    case types.Message.Video:
      logger.debug("== Video ==")
      return

    case types.Message.Image:
      logger.debug("== Image ==")
      const image = await message.toFileBox()
      return

    case types.Message.Text: {
      const text = parseText(message.text())
      const result = parseLimitedCommand<CommandType>(text, commandsSchema)
      // logger.debug("parsed command: %o", { text, result })

      if (result) {
        switch (result.command) {
          case "ding":
            return void bot.context?.addSendTask(() => message.say("dong"))

          case "help":
            await tmm.base.getHelp(true)
            return

          case "status":
            await tmm.base.getStatus(true)
            return

          case "recall":
            await tmm.base.recallQuotedMessage()
            return

          case "love":
            return await message.say(
              "你有什么想和我说的吗？（我是你最乖的树洞，我们之间的对话不会告诉任何人哦）",
            )

          case "system":
            await tmm.system.parse(result.args)
            return

          case "todo":
            await tmm.todo.parse(result.args)
            return

          case "chatter":
            // await tmm.chatter.parse(result.args)
            return

          case "parser":
            await tmm.parser.parse(result.args)
            return

          case "parse":
            await tmm.parser.parseQuote()
            return

          case "room":
            // await tmm.room.parse(result.args)
            return

          case "test-create-image-from-id": {
            await tmm.parser.parseQuotedImage()
            return
          }

          case "quote-reply": {
            await tmm.parser.quoteReply()
            return
          }
        }
      } else {
        await new ChatterPlugin(bot, message).safeReplyWithAI()
      }
    }
  }
}
