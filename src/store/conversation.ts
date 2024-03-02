import { proxy } from "valtio"
import { IConversationClient, IPAppClient } from "@/schema/conversation"
import { api } from "@/lib/trpc/react"
import { toast } from "sonner"
import { last, remove } from "lodash"
import { useRouter } from "next/navigation"
import { nanoid } from "nanoid"
import { IMessageInChat } from "@/schema/message"

export interface IConversationStore {
  // >> 1. state
  /**
   * pApp 要能持久化，每次用户打开是上次的
   */
  persistedPApps: IPAppClient[]
  conversations: IConversationClient[]
  conversationsValid: boolean
  /**
   * Attention :由路由更新，不要自己更新，否则会导致干扰！
   */
  currentConversationId: string | null

  // computed
  currentConversation: IConversationClient | null
  currentMessages: IMessageInChat[]
  currentSnapshot: string[]
  currentPAppId?: string
  pApps: IPAppClient[]
}

export const conversationStore = proxy<IConversationStore>({
  persistedPApps: [],
  conversations: [],
  conversationsValid: false,
  currentConversationId: null,
  get currentConversation() {
    return (
      this.conversations.find(
        // todo: auto infer?
        (c: IConversationClient) => c.id === this.currentConversationId,
      ) ?? null
    )
  },
  get pApps() {
    return this.currentConversation?.pApps ?? this.persistedPApps
  },
  get currentSnapshot() {
    const messageSnapshots: string[][] =
      this.currentConversation?.messageSnapshots ?? []
    return last(messageSnapshots) ?? []
  },
  get currentMessages() {
    return this.currentConversation?.messages ?? []
  },
  get currentPAppId() {
    return this.currentConversation?.selectedPAppId
  },
})

/**
 * 用户在弹窗界面增加一个pApp
 * - 最多只能有3个，或者视窗口长度限制
 * - 首页里增加要持久化
 * - 会话里增加要与数据库同步
 * @param pApp
 */
export function useAddPApp() {
  const addPApp = api.llm.addPApp.useMutation()
  const { pApps, currentMessages, currentConversationId, currentPAppId } =
    conversationStore

  return async (pApp: IPAppClient) => {
    // optimistic update
    pApps.push(pApp)
    const conversationId = currentConversationId
    if (conversationId) {
      await addPApp.mutateAsync({
        conversationId,
        id: pApp.id,
        modelId: pApp.modelId,
        title: pApp.title,
      })
      // 如果此时有pApp的话，更新它的最新条目
      if (currentPAppId) {
        currentMessages.push({
          ...last(currentMessages.filter((m) => m.pAppId === currentPAppId))!,
          pAppId: pApp.id,
        })
      }
    }
  }
}

/**
 * 用户在首页或者会话里删除一个pApp
 * - 最少要有1个
 * - 首页里增加要持久化
 * - 会话里增加要与数据库同步
 * @param pAppId
 */
export function useDelPApp() {
  const delPApp = api.llm.delPApp.useMutation()

  return async (pAppId: string) => {
    if (conversationStore.pApps.length <= 1) return toast.error("至少需要一个")
    // optimistic update
    remove(conversationStore.pApps, (i) => i.id === pAppId)
    if (conversationStore.currentConversationId)
      delPApp.mutate({
        conversationId: conversationStore.currentConversationId,
        pAppId,
      })

    if (pAppId === conversationStore.currentPAppId) {
      conversationStore.currentPAppId = conversationStore.pApps[0]!.id
    }
  }
}

/**
 * 1. 用户在首页query后将自动触发新建一个会话
 * 2. 用户在会话列表可以点击新增一个会话
 * --
 * 返回 id，用于其他的函数
 */
export function useAddConversation() {
  const router = useRouter()
  const addConversation = api.llm.addConversation.useMutation({
    onError: () => {
      // todo: more friendly alert dialog
      toast.error("不好意思，新建会话失败，请刷新后再试，该会话将被重置！")
    },
  })
  return async () => {
    conversationStore.conversationsValid = false
    const conversationId = nanoid()

    const pApps = conversationStore.pApps.map((p) => ({
      ...p,
      needFetchLLM: false, // reset need-fetch
    }))
    conversationStore.conversations.splice(0, 0, {
      id: conversationId,
      pApps,
      messages: [],
      messageSnapshots: [],
      selectedPAppId: pApps[0]!.id, // 默认第一个
    })
    const data = await addConversation.mutateAsync({
      id: conversationId,
      pApps,
      type: "LLM",
    })
    const conversation = conversationStore.conversations.find(
      (c) => c.id === data.id,
    )
    // 若还在的话
    if (conversation) {
      conversation.pApps = data.pApps
      conversation.selectedPAppId = data.pApps[0]!.id
    }
    conversationStore.currentConversationId = conversationId
    conversationStore.conversationsValid = true // final valid
    router.push(`/tt/${conversationId}`) // 异步
    return conversationId
  }
}

/**
 * 用户在会话列表页的展开工具里删除一个会话
 * @param conversationId
 */
export function useDelConversation() {
  const router = useRouter()
  const delConversation = api.llm.delConversation.useMutation({
    onError: (error) => {
      console.error(error)
      toast.error("删除失败！")
    },
  })

  return (conversationId: string) => {
    // optimistic update
    remove(conversationStore.conversations, (c) => c.id === conversationId)
    if (conversationId === conversationStore.currentConversationId)
      router.push("/tt")

    void delConversation.mutateAsync({ conversationId })
  }
}

/**
 * 1. 用户在首页query
 * 2. 用户在会话里query
 * @param query
 */
export function useQuery() {
  const addConversation = useAddConversation()
  const queryLLM = api.llm.queryConversation.useMutation({
    onError: () => {
      // todo: any rollback?
      toast.error("消息回复出错，请刷新后重试！")
    },
    onSuccess: (data) => {
      data.forEach(({ requestId, result }) => {
        if (!result) return toast.error(`App ${requestId} 出错`)
        console.log({
          pApps: conversationStore.pApps.map((i) => i.id),
          requestId,
          result,
        })
        const pApp = conversationStore.pApps.find((p) => p.id === requestId)
        // 有可能已经换成新的pApp了
        if (pApp) pApp.needFetchLLM = true
      })
    },
  })

  return async (query: string) => {
    if (!query) return toast.error("不能为空")

    // optimistic update
    if (!conversationStore.currentConversationId) await addConversation()
    const {
      id: conversationId,
      messages,
      messageSnapshots,
      selectedPAppId,
    } = conversationStore.currentConversation!
    const id = nanoid()
    messages.push({
      id,
      updatedAt: new Date(),
      content: query,
      role: "user",
      conversationId,
      pAppId: null,
      parentId: null,
    })

    // init snapshots
    if (!messageSnapshots.length) {
      messageSnapshots.push([id])
    } else {
      messageSnapshots.push(last(messageSnapshots)!)
      const theLastSelectedMessage = last(
        messages.filter((m) => m.pAppId === selectedPAppId),
      )!
      last(messageSnapshots)!.push(theLastSelectedMessage.id, id)
    }

    const snapshot = last(messageSnapshots)!
    const context = snapshot.map((s) => messages.find((m) => m.id === s)!)
    console.log("query context: ", { context, snapshot })
    queryLLM.mutate({ conversationId, messages: context })
  }
}

export const useDeleteAllConversations = () => {
  const router = useRouter()
  const deleteAllConversations = api.llm.deleteAllConversations.useMutation({
    onSuccess: () => {
      conversationStore.conversations = []
      router.push("/tt")
    },
  })
  return () => deleteAllConversations.mutate()
}

export const selectPApp = (pAppId: string) => {
  if (conversationStore.currentConversation)
    conversationStore.currentConversation.selectedPAppId = pAppId
}

export const resetPAppSSE = (pAppId: string) => {
  const pApp = conversationStore.pApps.find((p) => p.id === pAppId)
  if (pApp) pApp.needFetchLLM = false
}
