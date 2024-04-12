import { type MessageInterface } from "wechaty/impls"
import { parseCommand } from "../utils/parse-command"
import { BaseMessageHandler } from "./_base"
import { z } from "zod"

export const heartbeatSchema = z.union([
  z.literal("ding"),
  // union at least two
  z.literal("ding"),
])

export class HeartbeatMessageHandler extends BaseMessageHandler {
  public async onMessage(message: MessageInterface) {
    const result = parseCommand(message.text(), heartbeatSchema)
    if (!result) return

    switch (result.command) {
      case "ding":
        await message.say("dong")
        break
    }
  }
}
