import { Message, Wechaty } from "wechaty"
import { LiteralUnionSchema } from "../../common-llm/schema/llm"

export class BaseMessageHandler<T = object> {
  public bot: Wechaty
  public context: T
  public name: string = "_base"

  constructor(bot: Wechaty, context: T) {
    this.bot = bot
    this.context = context
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

  public async handleCommand<K extends keyof T>(
    message: Message,
    field: K,
    schema: LiteralUnionSchema,
    value?: string,
  ) {
    try {
      await schema.parseAsync(value)
      this.context[field] = value as T[K]
      await message.say("ok")
    } catch (err) {
      // prettyError(err)
      await message.say(
        `操作失败，原因：${value} ∉ {${schema.options.map((o) => o.value).join(",")}}`,
      )
    }
  }
}
