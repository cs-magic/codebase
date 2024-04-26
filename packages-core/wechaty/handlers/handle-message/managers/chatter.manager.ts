import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { types } from "wechaty"
import { z } from "zod"
import { safeCallLLM } from "../../../../../packages-to-classify/llm"
import { FeatureMap, FeatureType } from "../../../schema/commands"
import { getConvTable } from "../../../utils/get-conv-table"
import { listMessagesOfLatestTopic } from "../../../utils/list-messages-of-latest-topic"
import { parseLimitedCommand } from "../../../utils/parse-command"
import { BaseManager } from "./base.manager"

const commandTypeSchema = z.enum([
  "enable",
  "disable",
  // "new", "list"
])
type CommandType = z.infer<typeof commandTypeSchema>
const i18n: FeatureMap<CommandType> = {
  en: {
    title: "Super Chatter",
    description:
      "Hello, I am the Super Chatter!" +
      "\nThe Only One AI Bot You Need in the WeChat ecosystem." +
      "\nWhat I can help you today? 🍺",
    commands: {
      enable: {
        type: "enable",
        description: "enable AI chat",
      },
      disable: {
        type: "disable",
        description: "disable AI chat",
      },
      // new: {
      //   type: "new",
      //   description: "create a new topic",
      // },
      // list: {
      //   type: "list",
      //   description: "list all the topics",
      // },
    },
  },
}

export class ChatterManager extends BaseManager {
  static name: FeatureType = "chatter"
  public i18n = i18n

  async help() {
    const commands = await this.getCommands()
    const desc = await this.getDescription()
    const preference = await this.getConvPreference()
    await this.standardReply(
      [
        desc,
        SEPARATOR_LINE,
        "Status:",
        `  - enabled: ${preference.features.chatter.enabled}`,
        `  - model: ${preference.features.chatter.model}`,
      ].join("\n"),
      Object.keys(commands).map(
        (command) => `  ${ChatterManager.name} ${command}`,
      ),
    )
  }

  async parse(input?: string) {
    if (!input) return this.help()

    const commands = this.i18n[await this.getLang()]?.commands
    if (!commands) return

    const commandTypeSchema = z.enum(
      Object.keys(commands) as [string, ...string[]],
    )

    const parsed = parseLimitedCommand(input, commandTypeSchema)

    if (parsed) {
      const commandKeyInInput = parsed.command
      const commandKeyInEnum = commands[commandKeyInInput]?.type
      const commandType = await commandTypeSchema.parseAsync(commandKeyInEnum)

      switch (commandType) {
        case "enable":
          await this.enableChat()
          break

        case "disable":
          await this.disableChat()
          break
      }
    }
  }

  async enableChat() {
    await this.updatePreferenceInDB("features.chatter.enabled", true, true)
  }

  async disableChat() {
    await getConvTable(this.isRoom).update({
      where: { id: this.convId },
      data: {
        preference: JSON.stringify({
          ...(await this.getConvPreference()),
          chatterEnabled: false,
        }),
      },
    })
    await this.standardReply(
      `Okay, I'm going to take a break!\nFeel free to activate me again when you need me~ 👋🏻`,
      ["- You can activate me via sending: `chatter enable`."],
    )
  }

  async safeReplyWithAI() {
    const m = this.message
    if (
      // 过滤自己的消息
      m.self() ||
      // 过滤微信官方
      m.talker().id === "weixin" ||
      // 过滤群聊中没有at自己的消息 （私信要回）
      (m.room() &&
        !(
          // including @all
          // await m.mentionSelf()
          // excluding @all
          (await m.mentionList()).some((m) => m.id === this.bot.context.wxid)
        ) &&
        // 支持 叹号快捷触发
        //   todo: 允许开头有空格，要与后续找信息时对上（重构一下）
        !/^[?？]/.exec(this.text)) ||
      // 过滤非文本 todo: image/xxxx
      m.type() !== types.Message.Text
    )
      return

    const convPreference = await this.getConvPreference()
    if (!convPreference.features.chatter.enabled) {
      // await this.standardReply("此会话中暂没有开启AI聊天哦", ["enable-chat"])
      return
    }

    const filteredMessages = await listMessagesOfLatestTopic(
      this.bot.context.wxid,
      this.convId,
    )

    const context = filteredMessages.map((m) => ({
      role:
        m.talkerId === this.bot.context.wxid
          ? ("assistant" as const)
          : ("user" as const),
      // todo: merge chats
      content: m.text ?? "",
    }))
    // logger.info(`--  context(len=${context.length})`)

    void this.notify(`🌈 calling LLM`, "chatter")

    const res = await safeCallLLM({
      messages: context,
      model: convPreference.fetch?.detail?.summary?.model ?? "gpt-3.5-turbo",
      user: await this.getUserIdentity(),
    })

    if (res.error) throw new Error(res.error)

    const content = res.response?.choices[0]?.message.content
    if (!content)
      throw new Error(
        `invalid response content, please check Query(id=${res.query.id})`,
      )

    void this.bot.context.addSendTask(() => m.say(content))
    void this.notify(
      [`✅ called LLM`, SEPARATOR_LINE, content].join("\n"),
      "chatter",
    )
  }
}
