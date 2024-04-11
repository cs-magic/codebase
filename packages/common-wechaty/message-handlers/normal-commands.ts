import { MessageInterface } from "wechaty/impls"
import { ERR_MSG_INADEQUATE_PERMISSION } from "../../common-common/messages"
import { parseCommands } from "../../common-common/parse-commands"
import { getBotConfig } from "../get-bot-config"
import { IBotContext } from "../schema"
import { BaseMessageHandler } from "./_base"

export class NormalCommandsMessageHandler extends BaseMessageHandler {
  public async onMessage(message: MessageInterface) {
    const result = parseCommands(message.text(), ["/help", "/status", "/shelp"])

    const isAdmin = message.talker().name().includes("南川")

    if (!result.command) return

    const config = await getBotConfig({})

    switch (result.command) {
      case "/help":
        await message.say(config.help)
        break

      case "/status":
        await message.say(config.status)
        break

      case "/shelp":
        await message.say(
          isAdmin ? config.shelp : ERR_MSG_INADEQUATE_PERMISSION,
        )
        break
    }

    return true
  }
}
