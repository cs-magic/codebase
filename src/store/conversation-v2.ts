import { proxy } from "valtio"
import { IConversationClient, IPApp, IPAppClient } from "@/schema/conversation"
import { api } from "@/lib/trpc/react"
import { toast } from "sonner"
import { remove } from "lodash"
import { useRouter } from "next/navigation"
import { nanoid } from "nanoid"

export interface IConversationStore {
  /**
   * == states
   */
  /**
   * pApp 要能持久化，每次用户打开是上次的
   */
  persistedPApps: IPAppClient[]
  conversations: IConversationClient[]
  currentConversationId: string | null

  readonly currentConversation: IConversationClient | null

  /**
   * == actions
   */
  /**
   * 用户在弹窗界面增加一个pApp
   * - 最多只能有3个，或者视窗口长度限制
   * - 首页里增加要持久化
   * - 会话里增加要与数据库同步
   * @param pApp
   */
  addPAppInHomePage: (pApp: IPApp) => void
  useAddPAppInChatLayout: () => (
    pApp: IPApp,
    conversation: IConversationClient,
  ) => void
  /**
   * 用户在首页或者会话里删除一个pApp
   * - 最少要有1个
   * - 首页里增加要持久化
   * - 会话里增加要与数据库同步
   * @param pAppId
   */
  delPAppInHomePage: (pAppId: string) => void
  useDelPAppInChatLayout: () => (
    pAppId: string,
    conversation: IConversationClient,
  ) => void
  /**
   * 1. 用户在首页query后将自动触发新建一个会话
   * 2. 用户在会话列表可以点击新增一个会话
   * --
   * 返回 id，用于其他的函数
   */
  useAddConversation: () => () => string
  /**
   * 用户在会话列表页的展开工具里删除一个会话
   * @param conversationId
   */
  useDelConversation: () => (conversationId: string) => void
  /**
   * 用户在首页query
   * @param query
   */
  useQueryInHomePage: () => (query: string) => void
  /**
   * 用户在会话里query
   * @param conversationId
   * @param query
   */
  useQueryInChatLayout: () => (
    query: string,
    conversation: IConversationClient,
  ) => void
}

export class ConversationStore implements IConversationStore {
  currentConversationId: string|null = null
  conversations: IConversationClient[] = []
  persistedPApps: IPAppClient[] = []
  private get currentConversation() {
    return this.conversations.find((c) => c.id === this.currentConversationId) ?? null
  }
  private get pApps() {
    return this.currentConversation?.pApps ?? this.persistedPApps
  }

  public addPAppInHomePage (pApp: IPAppClient)  {
    console.log("addPAppInHomePage: ", { pApp })
if (this.persistedPApps.length >= 3) return toast.error("最多只支持3个")
this.persistedPApps.push(pApp)
}

public useAddPAppInChatLayout () {
      const addPApp = api.llm.addPApp.useMutation()
      return async (pApp: IPAppClient) => {
        if(!this.currentConversationId) return toast.error("会话尚未初始化")
        if (this.pApps.length >= 3) return toast.error("最多只支持3个")
        // optimistic update
        this.pApps.push(pApp)
        await addPApp.mutateAsync({
          conversationId: this.currentConversationId,
          id: pApp.id,
          modelId: pApp.modelId,
          title: pApp.title,
        })
      }
}

    public delPAppInHomePage (pAppId: string) {
  if (this.pApps.length <= 1) return toast.error("至少需要一个")
  remove(this.pApps, (i) => i.id === pAppId)
}

   public useDelPAppInChatLayout () {
      const delPApp = api.llm.delPApp.useMutation()
    return (pAppId: string) => {
      if(!this.currentConversationId) return toast.error("会话尚未初始化")

      if (this.pApps.length <= 1) return toast.error("至少需要一个")
      // optimistic update
      remove(this.pApps, (i) => i.id === pAppId)
      delPApp.mutate({ conversationId: this.currentConversationId, pAppId })
    }
   }

    public useAddConversation () {
  const router = useRouter()
  return () => {
    const conversationId = nanoid()
    // optimistic update
    router.replace(`/tt/${conversationId}`)
    this.conversations.splice(0, 0, {
      id: conversationId,
      pApps: this.pApps,
      messages: [],
    })
    this.currentConversationId = conversationId

    api.llm.createConversation
        .useMutation({
          onError: () => {
            // todo: more friendly alert dialog
            toast.error(
                "不好意思，新建会话失败，请刷新后再试，该会话将被重置！",
            )
          },
        })
        .mutate({
          pApps: this.pApps,
          type: "LLM",
        })
    return conversationId
  }
}

    public useDelConversation () {
    return (conversationId: string) => {
      // optimistic update
      remove(this.conversations, (c) => c.id === conversationId)
      if (conversationId === this.currentConversationId)
        this.currentConversationId = null

      void api.llm.delConversation
          .useMutation({})
          .mutateAsync({ conversationId })
          .catch((error) => {
            console.error(error)
            toast.error("删除失败！")
          })
    }
  }

   public useQueryInChatLayout () {
    return (query: string) => {
      if(!this.currentConversation) return toast.error("会话尚未初始化")
      const conversationId = this.currentConversation.id

      // optimistic update
      this.currentConversation.messages.push({
        id: nanoid(),
        updatedAt: new Date(),
        content: query,
        role: "user",
        conversationId,
        pAppId: null,
        parentId: null,
      })

      api.llm.queryConversation
          .useMutation({
            onError: () => {
              // todo: any rollback?
              toast.error("消息回复出错，请刷新后重试！")
            },
            onSuccess: (data) => {
              data.forEach(({ requestId, result }) => {
                if (!result) return toast.error(`App ${requestId} 出错`)
                this.pApps.find((p) => p.id === requestId)!.needFetchLLM = true
              })
            },
          })
          .mutate({ conversationId, query })
    }
   }

   public useQueryInHomePage () {
  const addConversation = this.useAddConversation()
  const queryInChatLayout = this.useQueryInChatLayout()
  return (query: string) => {
    if (!query) return toast.error("不能为空")
    // optimistic update
    const conversationId = addConversation()
    queryInChatLayout(query, conversation)
  }
},
}

