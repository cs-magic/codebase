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

  currentConversation: () => IConversationClient | null
  pApps: () => IPAppClient[]

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

export const conversationStore = proxy<IConversationStore>({
  persistedPApps: [],
  conversations: [],
  currentConversationId: null,
  currentConversation() {
    return (
      this.conversations.find((c) => c.id === this.currentConversationId) ??
      null
    )
  },
  pApps() {
    return this.currentConversation()?.pApps ?? this.persistedPApps
  },

  addPAppInHomePage(pApp) {
    console.log("addPAppInHomePage: ", { pApp })
    if (this.persistedPApps.length >= 3) return toast.error("最多只支持3个")
    this.persistedPApps.push(pApp)
  },

  useAddPAppInChatLayout: () => (pApp, conversation) => {
    const addPApp = api.llm.addPApp.useMutation()
    return async () => {
      if (conversation.pApps.length >= 3) return toast.error("最多只支持3个")
      const { id: conversationId } = conversation
      console.log("addPAppInChatLayout: ", { pApp, conversationId })
      // optimistic update
      conversation.pApps.push(pApp)
      await addPApp.mutateAsync({
        conversationId,
        id: pApp.id,
        modelId: pApp.modelId,
        title: pApp.title,
      })
    }
  },

  delPAppInHomePage(pAppId) {
    if (this.pApps().length <= 1) return toast.error("至少需要一个")
    remove(this.pApps(), (i) => i.id === pAppId)
  },

  useDelPAppInChatLayout: () => (pAppId, conversation) => {
    const { pApps, id: conversationId } = conversation
    if (pApps.length <= 1) return toast.error("至少需要一个")
    // optimistic update
    remove(pApps, (i) => i.id === pAppId)
    const delPApp = api.llm.delPApp.useMutation()
    delPApp.mutate({ conversationId, pAppId })
  },

  useAddConversation() {
    const router = useRouter()
    return () => {
      const conversationId = nanoid()
      // optimistic update
      router.replace(`/tt/${conversationId}`)
      const pApps = this.pApps()
      this.conversations.splice(0, 0, {
        id: conversationId,
        pApps,
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
          pApps,
          type: "LLM",
        })
      return conversationId
    }
  },

  useDelConversation() {
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
  },

  useQueryInChatLayout: () => (query, conversation) => {
    const { id: conversationId, messages, pApps } = conversation

    // optimistic update
    messages.push({
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
            pApps.find((p) => p.id === requestId)!.needFetchLLM = true
          })
        },
      })
      .mutate({ conversationId, query })
  },

  useQueryInHomePage() {
    const addConversation = this.useAddConversation()
    const queryInChatLayout = this.useQueryInChatLayout()
    return (query) => {
      if (!query) return toast.error("不能为空")
      // optimistic update
      const conversationId = addConversation()
      const conversation = this.conversations.find(
        (c) => c.id === conversationId,
      )
      if (!conversation) return toast.error("未找到会话")
      queryInChatLayout(query, conversation)
    }
  },
})
