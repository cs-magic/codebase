import { type Message, type Wechaty } from "wechaty"
import { type LiteralUnionSchema } from "../../common-common/schema"
import { type IBotPreference } from "../schema"

export class BaseMessageHandler {
  public bot: Wechaty
  public name: string

  constructor(name: string, bot: Wechaty) {
    this.name = name
    this.bot = bot
  }

  /**
   *
   * @param message
   *
   * @return
   *  - true: finished
   *  - false: continue to the next handler
   */
  public async onMessage(message: Message): Promise<boolean | void> {
    // 回复自己需要
    // web端会直接抛error，pad端会ignore
    // const listener = message.listener()

    throw new Error("onMessage not implemented.")
  }

  public async handleCommand<K extends keyof IBotPreference>(
    message: Message,
    field: K,
    schema: LiteralUnionSchema,
    value: IBotPreference[K],
  ) {
    try {
      const preference = this.bot.context.preference
      if (!preference) throw new Error("Missing Preference")
      await schema.parseAsync(value)
      const old = preference[field]
      preference[field] = value
      await message.say(
        `[${field}] 更新成功： ${JSON.stringify(old)} --> ${JSON.stringify(value)}`,
      )
    } catch (err) {
      // prettyError(err)
      await message.say(
        `操作失败，原因：${JSON.stringify(value)} ∉ {${schema.options.map((o) => o.value).join(",")}}`,
      )
    }
  }
}
