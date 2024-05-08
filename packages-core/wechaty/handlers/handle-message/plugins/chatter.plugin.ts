import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { logger } from "@cs-magic/log/logger"
import { ILlmMessage } from "@cs-magic/p01-common/schema/message"
import { types } from "wechaty"
import { z } from "zod"
import { prisma } from "../../../../../packages-to-classify/db/providers/prisma"
import { safeCallLLM } from "../../../../../packages-core/llm"
import { trimMessages } from "../../../../../packages-core/llm/utils/calculate-token"

import { formatLlmMessage } from "../../../../../packages-core/llm/utils/format-llm-message"
import { FeatureMap, FeatureType } from "../../../schema/commands"
import { listMessagesOfLatestTopic } from "../../../utils/list-messages-of-latest-topic"
import { BasePlugin } from "./base.plugin"

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

export class ChatterPlugin extends BasePlugin {
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
        (command) => `  ${ChatterPlugin.name} ${command}`,
      ),
    )
  }

  async safeReplyWithAI() {
    const m = this.message
    // todo: @all 的时候有bug
    // const mentionList = await m.mentionList()
    // const mentionIds = mentionList.map((m) => m.id)
    // logger.debug("mention ids: %o", mentionIds)

    if (
      // 过滤非文本 todo: image/xxxx
      m.type() !== types.Message.Text ||
      // 过滤自己的消息
      m.self() ||
      // 过滤微信官方
      m.talker().id === "weixin" ||
      // 过滤群聊中没有at自己的消息 （私信要回）
      (m.room() &&
        // 没有被 at
        (!(await m.mentionSelf()) ||
          // ignore all
          this.text.includes("@All")) &&
        // 也没有问号开头
        //   todo: 允许开头有空格，要与后续找信息时对上（重构一下）
        !/^\s*[?？]/.exec(this.text))
    )
      return

    const convPreference = await this.getConvPreference()
    if (!convPreference.features.chatter.enabled) {
      const convData = await this.getConvData()
      // todo: user control
      if (!convData.plugin.chatter.turnOnReminded) {
        // await this.reply(
        //   [
        //     "看起来您是想和我进行AI聊天，但是当前该插件功能并未开启，请先打开后继续",
        //     SEPARATOR_LINE,
        //     "该消息近仅提示一次",
        //   ].join("\n"),
        // )
      }

      return logger.debug(`!convPreference.features.chatter.enabled`)
    }

    // todo: 市面上最牛逼的 AI 群聊回复逻辑
    // 顶层回复逻辑：只回答 上一次bot到本次bot准备回复之间，需要回答的N个问题（同一会话里，且已经有LLM在调用，且目前的消息不是队列的最尾部，则抛弃该LLM）
    // 中层选择1. 每条需要回复的消息，一一进行quote回复
    // 中层选择2. 所有待回复的消息，统一在一次回复里解决，然后不同的消息对象，使用 at 的技术
    // 底层的逻辑（每一个问题怎么回复）:【目的是意图识别的分类函数】
    // 1. 先判断用户的这个问题是否是恶意问题【风控】黑名单违规记录+1，直到3直接封号，并给出友好提示
    // 2. 是否需要进行文件解析【kimi】、文章解析【kimi】、图片理解【kimi/4v】等高消耗的大语言模型任务
    // 3. 组合上下文去回复 【长窗口怎么去handle】

    // 拿取最新的上下文记录
    const filteredMessages = await listMessagesOfLatestTopic(
      this.bot.context.wxid,
      this.convId,
    )

    const model = convPreference.features.chatter.model
    const messages: ILlmMessage[] = filteredMessages.map((m) => ({
      role:
        m.talkerId === this.bot.context.wxid
          ? ("assistant" as const)
          : ("user" as const),
      // todo: merge chats
      content: m.text ?? "",
    }))

    trimMessages(messages, model)
    // logger.info(`--  context(len=${context.length})`)

    void this.notify(
      [
        `🌈 calling LLM (model=${model})`,
        // SEPARATOR_LINE,
        // ...messages.map((m) => formatLlmMessage(m, 40)),
      ].join("\n"),
      "chatter",
    )

    // 送给 LLM
    // todo: 送给 agent
    const res = await safeCallLLM({
      messages,
      model,
      user: await this.getUserIdentity(),
    })

    if (res.error) throw new Error(res.error)

    const content = res.response?.choices[0]?.message.content
    if (!content)
      throw new Error(
        `invalid response content, please check Query(id=${res.query.id})`,
      )

    void this.reply(content)
    void this.notify(
      [`✅ called LLM`, SEPARATOR_LINE, content].join("\n"),
      "chatter",
    )
  }
}
