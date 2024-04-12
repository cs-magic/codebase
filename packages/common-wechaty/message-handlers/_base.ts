import jsYaml from "js-yaml"
import Mustache from "mustache"
import { Message, Wechaty } from "wechaty"
import { prettyDuration } from "../../common-common/pretty-duration"
import { prettyQuery } from "../../common-common/pretty-query"
import { LiteralUnionSchema } from "../../common-common/schema"
import { IBotPreference, IBotTemplate } from "../schema"
import { loadBotTemplate } from "../utils/bot-template"

export class BaseMessageHandler {
  public bot: Wechaty
  public name: string = "_base"

  constructor(bot: Wechaty) {
    this.bot = bot
    this._template = loadBotTemplate()
  }

  public _template: string

  get template(): IBotTemplate {
    const context = this.bot.context
    if (!context) throw new Error("Missing Context")

    const templateString = Mustache.render(this._template, {
      ...context,
      title: `${context.name} ${context.version}`,
      aliveTime: prettyDuration((Date.now() - context.startTime) / 1e3),
      prettyHandlers: context.preference.handlers.join(" --> "),
    })
    const templateData = jsYaml.load(templateString, {}) as IBotTemplate

    console.log({ templateString, templateData })
    return templateData
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

  public prettyBotQuery = (title: string, content: string) => {
    const context = this.bot.context

    if (!context) return prettyQuery("系统错误", "Missing Context")

    return prettyQuery(title, content, {
      footer: `${context.name} ${context.version}`,
    })
  }

  public async handleCommand<K extends keyof IBotPreference>(
    message: Message,
    field: K,
    schema: LiteralUnionSchema,
    value?: string,
  ) {
    try {
      const preference = this.bot.context?.preference
      if (!preference) throw new Error("Missing Preference")
      await schema.parseAsync(value)
      const old = preference[field]
      preference[field] = value as IBotPreference[K]
      await message.say(`[${field}] 更新成功： ${old} --> ${value}`)
    } catch (err) {
      // prettyError(err)
      await message.say(
        `操作失败，原因：${value} ∉ {${schema.options.map((o) => o.value).join(",")}}`,
      )
    }
  }
}
