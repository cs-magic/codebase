import { type MessageInterface } from "wechaty/impls"
import { parseCommand } from "../utils/parse-command"
import { BaseMessageHandler } from "./_base"

export class HeartbeatMessageHandler extends BaseMessageHandler {
  public async onMessage(message: MessageInterface) {
    const result = parseCommand(message.text(), ["ding"])
    if (!result) return

    switch (result.command) {
      case "ding":
        await message.say("dong")
        break
    }
  }
}
