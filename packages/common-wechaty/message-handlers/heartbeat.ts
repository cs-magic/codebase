import { MessageInterface } from "wechaty/impls"
import { parseCommands } from "../../common-common/parse-commands"
import { BaseMessageHandler } from "./_base"

export class HeartbeatMessageHandler extends BaseMessageHandler {
  name = "heartbeat"

  public async onMessage(message: MessageInterface) {
    const result = parseCommands(message.text(), ["ding"])
    if (!result.command) return

    switch (result.command) {
      case "ding":
        await message.say("dong")
        break
    }

    return true
  }
}
