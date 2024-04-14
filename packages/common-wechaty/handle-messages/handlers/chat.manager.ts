import { IWechatUserPreference } from "@/schema/wechat-user"
import { types } from "wechaty"
import { prisma } from "../../../common-db/providers/prisma"
import { callLLM } from "../../../common-llm"
import { getConvRow } from "../../utils/get-conv-row"
import { getConvTable } from "../../utils/get-conv-table"
import { getRobustPreference } from "../../utils/get-robust-preference"
import { getConvPreference } from "../../utils/get-conv-preference"
import { listMessagesOfLatestTopic } from "../../utils/list-messages-of-latest-topic"
import { listMessagesOfSpecificTopic } from "../../utils/list-messages-of-specific-topic"
import { listTopics } from "../../utils/list-topics"
import { robustSelect } from "../../utils/validate-input"
import { BaseManager } from "./base.manager"

export class ChatManager extends BaseManager {
  async _listTopics() {
    return listTopics(this.convId)
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
    const row = await getConvTable(this.message).update({
      where: { id: this.convId },
      data: {
        preference: {
          ...(await getConvPreference(this.message)),
          chatEnabled: true,
        },
      },
    })
    const p: IWechatUserPreference | null = row.preference
    await this.standardReply(`已启动，当前话题：${p?.chatTopic ?? "默认"}`, [
      "list-topics",
      "new-topic",
      "disable-chat",
    ])
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
    await this.standardReply(`已关闭`, ["enable-chat"])
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
      `新增话题成功，当前会话为：${preferenceNew.chatTopic}，模型为：${preferenceNew.model}`,
      ["list-topics"],
    )
  }

  async checkTopic(selectChatTopic?: string) {
    // 1. 罗列话题
    const topics = await this._listTopics()

    // 2. 匹配用户的输入，确定话题的名称（不要用序号，因为数据库里记录都是名称）
    // 如果有多个匹配，使用最新的
    const topicTarget = await robustSelect(Object.keys(topics), selectChatTopic)

    if (!this.botWxid) throw new Error("无法获取到小助手微信ID")

    const messages = await listMessagesOfSpecificTopic(
      this.botWxid,
      this.convId,
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
        )) ||
      // 过滤非文本 todo: image/xxxx
      m.type() !== types.Message.Text ||
      // 过滤命令风格回复
      m.text().startsWith("/")
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
