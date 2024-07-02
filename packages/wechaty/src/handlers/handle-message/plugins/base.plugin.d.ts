import { LogLevel } from "@cs-magic/common"
import { IUserSummaryFilled } from "@cs-magic/prisma/schema/user.summary"
import { Message, Sayable, type Wechaty } from "wechaty"
import { IWechatData, IWechatPreference } from "../../../schema/bot.preference"
import { LlmScenario } from "../../../schema/bot.utils"
import { FeatureMap, FeatureType } from "../../../schema/commands"
export declare class BasePlugin {
  message: Message
  bot: Wechaty
  name: FeatureType | null
  i18n: FeatureMap<string>
  constructor(bot: Wechaty, message: Message)
  get room(): import("wechaty").Room | undefined
  get isRoom(): boolean
  get text(): string
  get quote(): {
    userName: string
    content: string
    quoted:
      | {
          id: string
          content: string
          type: import("wechaty-puppet").AppMessageType
          version: "mark@2024-04-19"
        }
      | {
          version: import("wechaty-puppet").PuppetVersion
          content: string
        }
  } | null
  get conv(): import("wechaty").Contact | import("wechaty").Room
  get convId(): string
  getTalkingUser(): Promise<IUserSummaryFilled>
  getUserIdentity(): Promise<string>
  getLatestMessages(n?: number): Promise<
    ({
      talker: {
        id: string
        createdAt: Date
        updatedAt: Date
        name: string | null
        avatar: string | null
        friend: boolean | null
        gender: number | null
        type: number | null
        weixin: string | null
        alias: string | null
        city: string | null
        province: string | null
        signature: string | null
        phone: string[]
        address: string | null
        star: boolean | null
        adminIdList: string[]
        memberIdList: string[]
        topic: string | null
        ownerId: string | null
        preference: import(".prisma/client").Prisma.JsonValue
        data: import(".prisma/client").Prisma.JsonValue
      }
      listener: {
        id: string
        createdAt: Date
        updatedAt: Date
        name: string | null
        avatar: string | null
        friend: boolean | null
        gender: number | null
        type: number | null
        weixin: string | null
        alias: string | null
        city: string | null
        province: string | null
        signature: string | null
        phone: string[]
        address: string | null
        star: boolean | null
        adminIdList: string[]
        memberIdList: string[]
        topic: string | null
        ownerId: string | null
        preference: import(".prisma/client").Prisma.JsonValue
        data: import(".prisma/client").Prisma.JsonValue
      } | null
      room: {
        id: string
        createdAt: Date
        updatedAt: Date
        name: string | null
        avatar: string | null
        friend: boolean | null
        gender: number | null
        type: number | null
        weixin: string | null
        alias: string | null
        city: string | null
        province: string | null
        signature: string | null
        phone: string[]
        address: string | null
        star: boolean | null
        adminIdList: string[]
        memberIdList: string[]
        topic: string | null
        ownerId: string | null
        preference: import(".prisma/client").Prisma.JsonValue
        data: import(".prisma/client").Prisma.JsonValue
      } | null
    } & {
      id: string
      createdAt: Date
      updatedAt: Date
      talkerId: string
      listenerId: string | null
      roomId: string | null
      timestamp: number
      type: number
      text: string | null
      mentionIdList: string[]
      filename: string | null
    })[]
  >
  getQuotedMessage(): Promise<Message | null | undefined>
  /**
   * 最好用户 recall 玩之后，用户的消息还可以recall，不过目前还不支持，也许可以recall 多条 类似 recall -n 3 之类
   */
  recallQuotedMessage(): Promise<boolean | undefined>
  getRoomTopic(): Promise<string | undefined>
  parse(input?: string): Promise<void>
  /**
   * todo: cache preference
   */
  getConvPreference(): Promise<IWechatPreference>
  getConvData(): Promise<IWechatData>
  getLang(): Promise<"zh" | "en">
  getData(): Promise<import("../../../schema/commands").Feature<string>>
  getTitle(): Promise<string>
  getDescription(): Promise<string>
  getCommands(): Promise<
    Record<
      string,
      {
        type: string
        description?: string | undefined
        priority?: import("./task.plugin").Priority | undefined
      }
    >
  >
  getStatus(reply?: boolean): Promise<string | undefined>
  getHelp(reply?: boolean): Promise<string | undefined>
  standardReply(content: string, tips?: string[]): Promise<void>
  help(): Promise<void>
  notify(
    content: Sayable,
    llmScenario?: LlmScenario,
    level?: LogLevel,
  ): Promise<void>
  reply(message: Sayable): Promise<void>
  updatePreferenceInDB(
    path: string,
    value: string,
    reply?: string | boolean | undefined,
    level?: "user" | "conv",
  ): Promise<void>
}
