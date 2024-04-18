import { SEPARATOR_LINE } from "@cs-magic/common/const"
import { selectFromList } from "@cs-magic/common/utils/select-from-list"
import { types } from "wechaty"
import { z } from "zod"
import { prisma } from "../../../../packages/common-db/providers/prisma"
import { safeCallLLM } from "../../../../packages/common-llm"
import { FeatureMap, FeatureType } from "../../schema/commands"
import { type IWechatUserPreference } from "../../schema/wechat-user"
import { getConvPreference } from "../../utils/get-conv-preference"
import { getConvRow } from "../../utils/get-conv-row"
import { getConvTable } from "../../utils/get-conv-table"
import { getRobustPreference } from "../../utils/get-robust-preference"
import { listMessagesOfLatestTopic } from "../../utils/list-messages-of-latest-topic"
import { listMessagesOfSpecificTopic } from "../../utils/list-messages-of-specific-topic"
import { listTopics } from "../../utils/list-topics"
import { parseLimitedCommand } from "../../utils/parse-command"
import { BaseManager } from "./base.manager"

const commandTypeSchema = z.enum([
  "enable",
  "disable",
  // "new", "list"
])
type CommandType = z.infer<typeof commandTypeSchema>
const i18n: FeatureMap<CommandType> = {
  zh: {
    title: "AI 聊天室",
    description: "你可以与搭载了主流大模型能力的 AI 进行聊天",
    commands: {
      启动: {
        type: "enable",
        description: "启用 AI 聊天（直接 @我 即可回复您）",
      },
      停止: {
        type: "disable",
        description: "停止 AI 聊天",
      },
      // 新话题: {
      //   type: "new",
      //   description: "开启新话题",
      // },
      // 历史: {
      //   type: "list",
      //   description: "查询话题历史",
      // },
    },
  },
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

export class ChatManager extends BaseManager {
  public i18n = i18n
  public name: FeatureType = "chatter"

  async help() {
    const commands = await this.getCommands()
    const desc = await this.getDescription()
    const preference = await this.getConvPreference()
    await this.standardReply(
      [
        desc,
        SEPARATOR_LINE,
        "Status:",
        `  - enabled: ${preference.chatEnabled}`,
      ].join("\n"),
      Object.keys(commands).map((command) => `  ${this.name} ${command}`),
    )
  }

  async parse(input?: string) {
    if (!input) return this.help()

    const commands = this.i18n[await this.getLang()].commands
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

        // case "list":
        //   await this.listTopicsAction()
        //   break
        //
        // case "new":
        //   await this.newTopic(parsed.args)
        //   break
      }
    }
  }

  async _listTopics() {
    return listTopics(this.convId)
  }

  async listTopicsAction() {
    const topics = await this._listTopics()
    await this.standardReply(
      Object.keys(topics)
        .map((k, index) => `${index + 1}. ${k} (${topics[k]}条消息)`)
        .join("\n"),
      ["chatter new"],
    )
  }

  async enableChat() {
    const row = await getConvTable(this.message).update({
      where: { id: this.convId },
      data: {
        preference: {
          ...(await getConvPreference(this.message)),
          chatEnabled: true,
        },
      },
    })
    const p: IWechatUserPreference = row.preference
    await this.standardReply(
      `Congratulation, Super Chatter has been activated!\nI almost know anything, hope you would like! 😄`,
      [
        // "chatter list",
        // "chatter new",
        "- You should @me if you are in a group chat.",
        "- You can deactivate me via sending: `chatter disable`",
      ],
    )
  }

  async disableChat() {
    await getConvTable(this.message).update({
      where: { id: this.convId },
      data: {
        preference: {
          ...(await getConvPreference(this.message)),
          chatEnabled: false,
        },
      },
    })
    await this.standardReply(
      `Okay, I'm going to take a break!\nFeel free to activate me again when you need me~ 👋🏻`,
      ["- You can activate me via sending: `chatter enable`."],
    )
  }

  async newTopic(chatTopic?: string) {
    const preference = await getConvPreference(this.message)

    const row = await prisma.wechatUser.update({
      where: { id: this.convId },
      data: {
        preference: {
          ...preference,
          chatTopic,
        },
      },
    })

    const preferenceNew = getRobustPreference(row)

    await this.standardReply(
      `new topic: ${preferenceNew.chatTopic}\nmodel: ${preferenceNew.model}`,
      // ["chatter list"],
    )
  }

  async checkTopic(selectChatTopic?: string) {
    // 1. 罗列话题
    const topics = await this._listTopics()

    // 2. 匹配用户的输入，确定话题的名称（不要用序号，因为数据库里记录都是名称）
    // 如果有多个匹配，使用最新的
    const topicIndex = await selectFromList(
      Object.keys(topics),
      selectChatTopic,
    )

    if (!this.botWxid) throw new Error("无法获取到小助手微信ID")

    const messages = await listMessagesOfSpecificTopic(
      this.botWxid,
      this.convId,
      Object.keys(topics)[topicIndex]!,
    )

    await this.standardReply(
      "话题详情：\n" +
        messages
          .map((m, i) => `${i + 1}) ${m.talker.name}: ${m.text}\n`)
          .join("\n"),
      // ["chatter list"],
    )
  }

  async safeReplyWithAI() {
    const m = this.message
    const text = this.message.text()
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
          (await m.mentionList()).some((m) => m.id === this.botWxid)
        ) &&
        // 支持 叹号快捷触发
        //   todo: 允许开头有空格，要与后续找信息时对上（重构一下）
        !/^[!！]/.exec(text)) ||
      // 过滤非文本 todo: image/xxxx
      m.type() !== types.Message.Text ||
      // 过滤命令风格回复
      text.startsWith("/")
    )
      return

    const convInDB = await getConvRow(this.message)
    const preference = getRobustPreference(convInDB)
    if (!preference.chatEnabled) {
      // await this.standardReply("此会话中暂没有开启AI聊天哦", ["enable-chat"])
      return
    }

    const filteredMessages = await listMessagesOfLatestTopic(
      this.botWxid,
      this.convId,
    )

    const context = filteredMessages.map((m) => ({
      role:
        m.talkerId === this.botWxid
          ? ("assistant" as const)
          : ("user" as const),
      // todo: merge chats
      content: m.text ?? "",
    }))
    // logger.info(`--  context(len=${context.length})`)

    void this.notify(`calling LLM from ${await this.formatTalker()}`)

    const res = await safeCallLLM({
      messages: context,
      model: preference.model,
    })

    if (res.error) throw new Error(res.error)

    const content = res.response?.choices[0]?.message.content
    if (!content)
      throw new Error(
        `invalid response content, please check Query(id=${res.query.id})`,
      )

    void this.addTask(() => m.say(content))
    void this.notify(`DONE calling LLM from ${await this.formatTalker()}`)
  }
}
