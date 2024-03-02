import { proxy } from "valtio"
import { IConversationClient, IPAppClient } from "@/schema/conversation"
import { api } from "@/lib/trpc/react"
import { toast } from "sonner"
import { last, remove } from "lodash"
import { useRouter } from "next/navigation"
import { IMessageInChat } from "@/schema/message"

export interface IConversationStore {
  // >> 1. state
  /**
   * pApp 要能持久化，每次用户打开是上次的
   */
  allPApps: IPAppClient[]
  persistedPApps: IPAppClient[]
  conversations: IConversationClient[]
  conversationsValid: boolean
  /**
   * Attention :由路由更新，不要自己更新，否则会导致干扰！
   */
  currentConversationId: string | null
  currentPAppId: string | null

  // computed
  currentConversation: IConversationClient | null
  currentMessages: IMessageInChat[]
  pApps: IPAppClient[]
}

export const conversationStore = proxy<IConversationStore>({
  allPApps: [],
  persistedPApps: [],
  conversations: [],
  conversationsValid: false,
  currentConversationId: null,
  currentPAppId: null,
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
  get currentMessages() {
    return this.currentConversation?.messages ?? []
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
  conversationStore.currentPAppId = pAppId
}

export const resetPAppSSE = (pAppId: string) => {
  const pApp = conversationStore.pApps.find((p) => p.id === pAppId)
  if (pApp) pApp.needFetchLLM = false
}
