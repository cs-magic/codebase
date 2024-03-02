import { proxy } from "valtio"
import { IConversationBasic, IPApp } from "@/schema/conversation"
import { api } from "@/lib/trpc/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { IMessageInChat } from "@/schema/message"
import { nanoid } from "nanoid"
import { remove } from "lodash"

/////////////////////////
// interface
/////////////////////////

export type IPAppClient = IPApp & {
  needFetchLLM?: boolean
}

export interface IConversationState {
  pApps: IPAppClient[]

  conversationId: string | null
  conversations: IConversationBasic[]

  messages: IMessageInChat[]
}

/////////////////////////
// states
/////////////////////////

export const conversationsState = proxy<IConversationState>({
  pApps: [],
  conversations: [],
  conversationId: null,
  messages: [],
})

/////////////////////////
// Actions (code split)
/////////////////////////

export interface IConversationActions {
  /**
   * 用户在弹窗界面增加一个pApp
   * - 最多只能有3个，或者视窗口长度限制
   * - 首页增加要
   * - 会话里增加要与数据库同步
   * @param pApp
   */
  addApp: (pApp: IPApp) => void
  delApp: (pAppId: string) => void

  addConversation: () => void
  delConversation: (conversationId: string) => void

  queryInHomePage: (query: string) => void
  queryInChatLayout: (conversationId: string | null, query: string) => void
}

/**
 * 增加 pApp 时，要与数据库同步
 */
export const useAddPApp = () => {
  const conversationId = conversationsState.conversationId
  const addPApp = api.llm.addPApp.useMutation()

  return async (pApp: IPApp) => {
    console.log("adding pApp: ", { conversationId, pApp })
    if (conversationId) {
      await addPApp.mutateAsync({
        conversationId,
        id: pApp.id,
        modelId: pApp.modelId,
        title: pApp.title,
      })
    }
    conversationsState.pApps.push(pApp)
  }
}

/**
 * 减少 pApp 时：
 * 1. 要确保至少有1个
 * 2. 要与数据库同步
 */
export const useDelPApp = () => {
  const conversationId = conversationsState.conversationId
  const delPApp = api.llm.delPApp.useMutation()
  return async (pAppId: string) => {
    // 至少要有1个
    if (conversationsState.pApps.length === 1) return
    // 更新数据库
    if (conversationId) await delPApp.mutateAsync({ conversationId, pAppId })
    // 更新本地
    remove(conversationsState.pApps, (i) => i.id === pAppId)
  }
}

export const useInitConversations = () => {
  const { data: conversations = [] } = api.llm.listConversations.useQuery()

  useEffect(() => {
    // console.log("inited conversations: ", conversations)
    conversationsState.conversations = conversations
  }, [
    // 自己确保只运行一次
    conversations,
  ])
}

export const useAddConversation = () => {
  const router = useRouter()

  const { isLoading, mutateAsync } = api.llm.createConversation.useMutation({
    onSuccess: (conversation) => {
      conversationsState.conversations.splice(0, 0, conversation)
      toast.success("新建会话成功")
      router.push(`/tt/${conversation.id}`)
      conversationsState.messages = []
    },
    onError: (error) => {
      console.error(error)
      toast.error("新建会话失败")
    },
  })

  const addConversationWithoutPrompt = () =>
    mutateAsync({ pApps: conversationsState.pApps, type: "LLM" })

  return {
    addConversationWithoutPrompt,
    isLoading,
  }
}

export const useQueryInHomePage = () => {
  const { addConversationWithoutPrompt, isLoading } = useAddConversation()
  const { queryInChatLayout } = useQueryInChatLayout()
  const queryInHomePage = async (query: string) => {
    const conversation = await addConversationWithoutPrompt()
    queryInChatLayout(conversation.id, query)
  }
  return { queryInHomePage, isLoading }
}

export const useQueryInChatLayout = () => {
  const doQuery = api.llm.queryConversation.useMutation({
    onSuccess: (data) => {
      data.forEach(({ requestId, result }) => {
        if (result) {
          const p = conversationsState.pApps.find((p) => p.id === requestId)
          console.log({ p, requestId })
          if (p) p.needFetchLLM = true
        }
      })
    },
  })

  const queryInChatLayout = (conversationId: string | null, query: string) => {
    console.log("[query]: ", { conversationId, query })
    if (!conversationId) return

    doQuery.mutate({ conversationId, query })

    conversationsState.messages.push({
      id: nanoid(),
      updatedAt: new Date(),
      content: query,
      role: "user",
      conversationId,
      pAppId: null,
      parentId: null,
    })
  }
  return { queryInChatLayout }
}

export const useDeleteConversation = () => {
  const deleteConversation = api.llm.delConversation.useMutation({})

  return async (conversationId: string) => {
    void deleteConversation
      .mutateAsync({ conversationId })
      .catch((error) => {
        console.error(error)
        toast.error("删除失败！")
      })
      .then(() => {
        toast.success("删除成功")
        const index = conversationsState.conversations.findIndex(
          (i) => i.id === conversationId,
        )
        if (index < 0) return
        conversationsState.conversations.splice(index, 1)
      })
  }
}
