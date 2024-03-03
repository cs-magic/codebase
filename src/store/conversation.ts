import { proxy } from "valtio"
import { IAppClient, IConversationListView } from "@/schema/conversation"
import { last } from "lodash"
import { IMessageInChat } from "@/schema/message"

class ConversationStore {
  /**
   * 数据库里所有的 app，一次获取，然后持久化
   */
  public allApps: IAppClient[] = []
  /**
   * 当前选中的 pApps，如果服务器有，就从服务器刷新
   */
  public apps: IAppClient[] = []
  /**
   * 当前被选中的 app
   */
  public curPApp: IAppClient | null = null

  /**
   * 从服务器加载的会话列表
   */
  public conversations: IConversationListView[] = []
  /**
   * 会话列表是否在拉取
   */
  public conversationsValid = false
  /**
   * 当前选中的会话
   */
  public conversation: IConversationListView | null = null

  /**
   * 当前会话的所有消息
   */
  public messages: IMessageInChat[] = []
  /**
   * 当前会话的主要消息
   */
  public context: IMessageInChat[] = []

  /**
   * 用户当前发送的消息，需要被作为父结点引用
   */
  public get lastUserMessage(): IMessageInChat | null {
    const replied = this.messages.filter((m) => m.role === "user")
    return last(replied) ?? null
  }

  /**
   * 被选中的回答
   */
  public get lastRepliedMessage(): IMessageInChat | null {
    const replied = this.messages.filter((m) => m.pAppId === this.curPApp?.id)
    return last(replied) ?? null
  }
}

export const conversationStore = proxy(new ConversationStore())
