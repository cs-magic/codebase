import { Message, Wechaty } from "wechaty"
import { prettyQuery } from "../../common-common/pretty-query"
import { LiteralUnionSchema } from "../../common-common/schema"
import { IBotContext } from "../schema"

export class BaseMessageHandler {
  public bot: Wechaty
  public name: string = "_base"

  constructor(bot: Wechaty) {
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

  public prettyBotQuery = (title: string, contents: string[]) => {
    const context = this.bot.context

    if (!context) return prettyQuery("系统错误", ["Missing Context"])

    return prettyQuery(title, contents, {
      footer: `${context.name} ${context.version}`,
    })
  }

  public async handleCommand<K extends keyof IBotContext>(
    message: Message,
    field: K,
    schema: LiteralUnionSchema,
    value?: string,
  ) {
    try {
      await schema.parseAsync(value)
      if (this.bot.context) this.bot.context[field] = value as IBotContext[K]
      await message.say("ok")
    } catch (err) {
      // prettyError(err)
      await message.say(
        `操作失败，原因：${value} ∉ {${schema.options.map((o) => o.value).join(",")}}`,
      )
    }
  }
}
