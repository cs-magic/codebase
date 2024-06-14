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
import { TestPlugin } from "./plugins/test.plugin"

export const handleMessage = async (bot: Wechaty, message: Message) => {
  const tmm = {
    base: new BasePlugin(bot, message),
    todo: new TaskPlugin(bot, message),
    chatter: new ChatterPlugin(bot, message),
    parser: new ParserPlugin(bot, message),
    system: new SystemPlugin(bot, message),
    room: new RoomPlugin(bot, message),
    test: new TestPlugin(bot, message),
  } satisfies Partial<Record<ManagerType, BasePlugin>>

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
      return

    case types.Message.Text: {
      const text = parseText(message.text())
      const result = parseLimitedCommand<CommandType>(text, commandsSchema)
      // logger.debug("parsed command: %o", { text, result })

      if (result) {
        switch (result.command) {
          case "test":
            return void tmm.test.run(result.args)

          case "ding":
            return void bot.context?.addSendTask(async () => {
              logger.info(`\n-- sending ding`)
              const sentMessage = await message.say("dong")
              // logger.info(`\n-- sent`)
              logger.info(`\n-- sentMessage: [%o]`, sentMessage)
            })

          case "help":
            return await tmm.base.getHelp(true)

          case "status":
            return await tmm.base.getStatus(true)

          case "recall":
            return await tmm.base.recallQuotedMessage()

          case "system":
            return await tmm.system.parse(result.args)

          case "todo":
            return await tmm.todo.parse(result.args)

          case "chatter":
            return // await tmm.chatter.parse(result.args)

          case "parser":
            return await tmm.parser.parse(result.args)

          case "parse":
            return await tmm.parser.parseQuote()

          case "room":
            return // await tmm.room.parse(result.args)

          // todo: 树洞
          case "love":
            return await message.say(
              "你有什么想和我说的吗？（我是你最乖的树洞，我们之间的对话不会告诉任何人哦）",
            )
        }
      } else {
        await new ChatterPlugin(bot, message).safeReplyWithAI()
      }
    }
  }
}
