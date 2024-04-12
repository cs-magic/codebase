import { type Prisma } from "@prisma/client"
import { type Message } from "wechaty"
import { z } from "zod"
import { isNumeric } from "../../common-common/is-numeric"
import { prettyInvalidChoice } from "../../common-common/pretty-invalid-choice"
import { LiteralUnionSchema } from "../../common-common/schema"
import { prisma } from "../../common-db/providers/prisma"
import { callLLM } from "../../common-llm"
import { getTalkerPreference } from "../utils/get-talker-preference"
import { listMessagesOfLatestTopic } from "../utils/list-messages-of-latest-topic"
import { listMessagesOfSpecificTopic } from "../utils/list-messages-of-specific-topic"
import { listTopics } from "../utils/list-topics"
import { parseCommand } from "../utils/parse-command"
import { prettyBotQuery } from "../utils/pretty-bot-query"
import { BaseMessageHandler } from "./_base"

export const uniChatterSchema = z.union([
  z.literal("enable-uni-chatter"),
  z.literal("disable-uni-chatter"),
  z.literal("topic"),
  z.literal("list-topics"),
  z.literal("check-topic"),
  z.literal("new-topic"),
  z.literal("set-topic"),
])

export class UniChatterMessageHandler extends BaseMessageHandler {
  public async onMessage(message: Message) {
    const result = parseCommand<z.infer<typeof uniChatterSchema>>(
      message.text(),
      uniChatterSchema,
    )

    const table = prisma[
      message.room() ? "wechatRoom" : "wechatUser"
    ] as Prisma.WechatUserDelegate & Prisma.WechatRoomDelegate

    const convId = message.conversation().id

    const conv = await table.findUnique({
      where: { id: convId },
    })

    if (!conv) throw new Error("Missing Conv")

    const botWxid = this.bot.currentUser.payload?.id

    if (result) {
      const lang = (await getTalkerPreference(message))?.lang ?? "en"
      const topicDict = await listTopics(convId)

      const selectTopicSchema = z.union(
        // @ts-ignore
        Object.keys(topicDict).map((s: Readonly<string>) => z.literal(s)),
      ) as unknown as LiteralUnionSchema

      const topicChoices = selectTopicSchema.options.map((o) => o.value)

      const topicTarget = isNumeric(result.args)
        ? topicChoices[Number(result.args) - 1]
        : result.args

      const selectTopicResult =
        await selectTopicSchema.safeParseAsync(topicTarget)
      console.log({ selectTopicSchema, selectTopicResult })

      switch (result.command) {
        case "enable-uni-chatter":
          await table.update({
            where: { id: convId },
            data: {
              // chatbotTopic: null,
              chatbotEnabled: true,
            },
          })
          await message.say(
            await prettyBotQuery(
              "AI聊天",
              `已启动，当前话题：${conv.chatbotTopic}`,
              lang,
              ["list-topics", "new-topic", "disable-uni-chatter"],
            ),
          )
          break

        case "disable-uni-chatter":
          await table.update({
            where: { id: convId },
            data: {
              // chatbotTopic: null,
              chatbotEnabled: false,
            },
          })
          await message.say(
            await prettyBotQuery("AI聊天", "已关闭", lang, [
              "enable-uni-chatter",
              "list-topics",
            ]),
          )
          break

        case "new-topic":
          if (!result.args) {
            await message.say(
              await prettyBotQuery("新增话题", `失败，原因：不能为空`, lang),
            )
          } else {
            // 无法去重，因为已经入库了
            await table.update({
              where: { id: convId },
              data: {
                chatbotTopic: result.args,
              },
            })
            await message.say(
              await prettyBotQuery(
                "新增话题",
                `成功，当前会话为：${result.args}`,
                lang,
              ),
            )
          }

          break

        case "set-topic":
          if (selectTopicResult.success) {
            await table.update({
              where: { id: convId },
              data: {
                chatbotTopic: topicTarget,
              },
            })
            await message.say(
              await prettyBotQuery(
                "话题变更",
                `修改成功，当前会话为：${topicTarget}`,
                lang,
              ),
            )
          } else {
            await message.say(
              await prettyBotQuery(
                "话题变更",
                prettyInvalidChoice(
                  topicTarget ?? "undefined",
                  selectTopicSchema,
                ),
                lang,
              ),
            )
          }

          break

        case "check-topic":
          if (selectTopicResult.success && botWxid && topicTarget) {
            const messages = await listMessagesOfSpecificTopic(
              botWxid,
              convId,
              topicTarget,
            )
            await message.say(
              await prettyBotQuery(
                "查看话题详情",
                messages
                  .map((m, i) => `${i + 1}) ${m.talker.name}: ${m.text}\n`)
                  .join("\n"),
                lang,
              ),
            )
          } else {
            await message.say(
              await prettyBotQuery(
                "查看话题详情",
                prettyInvalidChoice(
                  topicTarget ?? "undefined",
                  selectTopicSchema,
                ),
                lang,
              ),
            )
          }
          break

        case "topic":
          await message.say(
            await prettyBotQuery(
              "当前话题",
              `name: ${conv?.chatbotTopic ?? "暂无"}`,
              lang,
            ),
          )
          break

        case "list-topics":
          const topicDictListed = await listTopics(convId)

          await message.say(
            await prettyBotQuery(
              "历史话题列表",
              Object.keys(topicDictListed)
                .map(
                  (k, index) =>
                    `${index + 1}. ${k} (${topicDictListed[k]}条消息)`,
                )
                .join("\n"),
              lang,
              ["set-topic", "new-topic"],
            ),
          )
          break
      }

      return
    }

    if (
      message.text().startsWith("/") ||
      !conv?.chatbotEnabled ||
      message.self() ||
      !(await message.mentionSelf()) ||
      !botWxid
    )
      return

    const talkerPreference = await getTalkerPreference(message)
    const model = talkerPreference?.model
    if (!model) throw new Error("no model in your preference")

    const filteredMessages = await listMessagesOfLatestTopic(botWxid, convId)
    const context = filteredMessages.map((m) => ({
      role: m.talkerId === botWxid ? ("assistant" as const) : ("user" as const),
      // todo: merge chats
      content: m.text ?? "",
    }))
    // console.log(`--  context(len=${context.length})`)

    const res = await callLLM({
      messages: context,
      model,
    })
    const content = res.response?.choices[0]?.message.content
    if (!content) throw new Error("LLM return nothing")
    await message.say(content)
  }
}
