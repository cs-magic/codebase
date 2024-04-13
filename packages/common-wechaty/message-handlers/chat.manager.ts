import { IWechatUserPreference } from "@/schema/wechat-user"
import { prisma } from "../../common-db/providers/prisma"
import { callLLM } from "../../common-llm"
import { getRobustPreference } from "../utils/get-robust-preference"
import { listMessagesOfLatestTopic } from "../utils/list-messages-of-latest-topic"
import { listMessagesOfSpecificTopic } from "../utils/list-messages-of-specific-topic"
import { listTopics } from "../utils/list-topics"
import { robustSelect } from "../utils/validate-input"
import { BaseManager } from "./base.manager"

export class ChatManager extends BaseManager {
  async _listTopics() {
    return listTopics(this._convId)
  }

  async listTopicsAction() {
    const topics = await this._listTopics()
    await this.standardReply(
      Object.keys(topics)
        .map((k, index) => `${index + 1}. ${k} (${topics[k]}条消息)`)
        .join("\n"),
      ["new-topic"],
    )
  }

  async enableChat() {
    const row = await this._convTable.update({
      where: { id: this._convId },
      data: {
        preference: {
          chatEnabled: true,
        },
      },
    })
    const p: IWechatUserPreference | null = row.preference
    await this.standardReply(`已启动，当前话题：${p?.chatTopic ?? "默认"}`, [
      "list-topics",
      "new-topic",
      "disable-ai-chat",
    ])
  }

  async disableChat() {
    await this._convTable.update({
      where: { id: this._convId },
      data: {
        preference: {
          chatEnabled: false,
        },
      },
    })
    await this.standardReply(`已关闭`, ["enable-ai-chat"])
  }

  async newTopic(chatTopic?: string) {
    if (!chatTopic) throw new Error(`新增话题失败，原因：不能为空`)

    const row = await prisma.wechatUser.update({
      where: { id: this._convId },
      data: {
        preference: {
          chatTopic,
        },
      },
    })

    const preference = getRobustPreference(row)

    await this.standardReply(
      `新增话题成功，当前会话为：${preference.chatTopic}，模型为：${preference.model}`,
      ["list-topics"],
    )
  }

  async checkTopic(selectChatTopic?: string) {
    // 1. 罗列话题
    const topics = await this._listTopics()

    // 2. 匹配用户的输入，确定话题的名称（不要用序号，因为数据库里记录都是名称）
    // 如果有多个匹配，使用最新的
    const topicTarget = await robustSelect(Object.keys(topics), selectChatTopic)

    if (!this._botWxid) throw new Error("无法获取到小助手微信ID")

    const messages = await listMessagesOfSpecificTopic(
      this._botWxid,
      this._convId,
      topicTarget,
    )

    await this.standardReply(
      "话题详情：\n" +
        messages
          .map((m, i) => `${i + 1}) ${m.talker.name}: ${m.text}\n`)
          .join("\n"),
      ["list-topics"],
    )
  }

  async safeReplyWithAI() {
    const m = this.message
    if (
      // 过滤命令风格回复
      m.text().startsWith("/") ||
      // 过滤自己的消息
      m.self() ||
      // 过滤群聊中没有at自己的消息 （私信要回）
      (m.room() && !(await m.mentionSelf()))
    )
      return

    const convInDB = await this._getConvInDB()
    const preference = getRobustPreference(convInDB)
    if (!preference.chatEnabled) {
      return this.standardReply("此会话中暂没有开启AI聊天哦", [
        "enable-ai-chat",
      ])
    }

    const filteredMessages = await listMessagesOfLatestTopic(
      this._botWxid,
      this._convId,
    )

    const context = filteredMessages.map((m) => ({
      role:
        m.talkerId === this._botWxid
          ? ("assistant" as const)
          : ("user" as const),
      // todo: merge chats
      content: m.text ?? "",
    }))
    // console.log(`--  context(len=${context.length})`)

    const res = await callLLM({
      messages: context,
      model: preference.model,
    })
    if (res.error) throw new Error(res.error)
    const content = res.response?.choices[0]?.message.content
    if (!content)
      throw new Error(`回复结构不正确，请检查：queryId=${res.query.id}`)
    await m.say(content)
  }
}
